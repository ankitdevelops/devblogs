from rest_framework import serializers
from api.account.models import User
from api.blogs.serializers import BlogSerializer
from api.blogs.models import Blog


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=60, min_length=6, write_only=True)
    # confirm_password = serializers.CharField(
    #     max_length=60, min_length=6, write_only=True
    # )

    class Meta:
        model = User
        fields = (
            "name",
            "username",
            "email",
            "password",
            # "confirm_password",
            "is_author",
            "is_staff",
            "last_login",
        )

        extra_kwargs = {
            "is_author": {"read_only": True},
            "is_staff": {"read_only": True},
            "last_login": {"read_only": True},
        }

    def create(self, validated_data):
        # if validated_data.get("password") != validated_data.get("confirm_password"):
        #     raise serializers.ValidationError("Password don't match")
        # validated_data.pop("confirm_password")
        # print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class UserBlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = (
            "title",
            "slug",
            # "thumbnail",
            # "content",
            # "category",
            # "status",
            # "is_featured",
            # "is_must_read",
            # "created",
        )


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username

        return token
