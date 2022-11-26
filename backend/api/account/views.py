from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import UserRegisterSerializer, UserProfileSerializer
from api.account.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from api.blogs.models import Blog


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


class UserProfileView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(username=self.kwargs["username"])


# Trying to Add Username in login returned token
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
