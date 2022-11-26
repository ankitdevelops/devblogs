from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import UserRegisterSerializer, UserBlogListSerializer
from api.account.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


class UserRegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            res = {
                "user": serializer.data,
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            }

            return Response(res, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserBlogListSerializer
    lookup_field = "username"

    def list(self, request, *args, **kwargs):
        """
        Currently returning details of logged in user
        change this by username
        """
        user = self.queryset.get(username=kwargs["username"])
        queryset = self.filter_queryset(user.authorBlogs.all())
        serializer = self.get_serializer(queryset, many=True)
        print(user.avatar.url)
        data = {
            "user": {
                "username": user.username,
                "name": user.name,
                "email": user.email,
                "avatar": user.avatar.url,
                "blogs": serializer.data,
                "about": user.about,
                "designation": user.designation,
            },
        }
        return Response(data)


# Trying to Add Username in login returned token
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
