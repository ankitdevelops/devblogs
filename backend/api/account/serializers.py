from rest_framework import serializers
from api.blogs.serializers import BlogSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=60, min_length=6, write_only=True)
    confirm_password = serializers.CharField(
        max_length=60, min_length=6, write_only=True
    )

    class Meta:
        model = get_user_model()
        fields = (
            "name",
            "username",
            "email",
            "password",
            "confirm_password",
            "is_staff",
            "last_login",
        )

        extra_kwargs = {
            "is_author": {"read_only": True},
            "is_staff": {"read_only": True},
            "last_login": {"read_only": True},
        }

    def create(self, validated_data):
        if validated_data.get("password") != validated_data.get("confirm_password"):
            raise serializers.ValidationError("Password don't match")
        validated_data.pop("confirm_password")
        user = get_user_model().objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    authorBlogs = BlogSerializer(read_only=True, many=True)
    avatar = serializers.ImageField(use_url=True)

    class Meta:
        model = get_user_model()
        fields = (
            "name",
            "username",
            "email",
            "avatar",
            "designation",
            "date_joined",
            "about",
            "phone_number",
            "skills",
            "learning",
            "available_for",
            "authorBlogs",
        )
        extra_kwargs = {
            "username": {"read_only": True},
            "email": {"read_only": True},
            "authorBlogs": {"read_only": True},
        }


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username

        return token


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "name",
            "username",
            "email",
            "avatar",
            "is_staff",
        )
