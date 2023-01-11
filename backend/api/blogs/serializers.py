from dataclasses import fields
from rest_framework import serializers
from api.blogs.models import Blog, Comment, Like, ReadingList, PostImage
from api.account.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("name", "username", "avatar")

    extra_kwargs = {
        "user": {"read_only": True},
        "username": {"read_only": True},
        "avatar": {"read_only": True},
    }


class CommentSerializer(serializers.ModelSerializer):
    user = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("user", "content", "created")

    extra_kwargs = {
        "user": {"read_only": True},
    }


class BlogSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    thumbnail = serializers.ImageField(use_url=True)
    # comments = CommentSerializer(many=True)

    class Meta:
        model = Blog
        fields = (
            "title",
            "slug",
            "thumbnail",
            "content",
            "category",
            "status",
            "is_featured",
            "must_read",
            "created",
            "likes_count",
            "comments_count",
            "reading_list_count",
            "author",
            # "comments",
        )
        extra_kwargs = {
            "is_featured": {"read_only": True},
            "is_must_read": {"read_only": True},
            "slug": {"read_only": True},
            "author": {"read_only": True},
            "comment": {"read_only": True},
        }


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

        extra_kwargs = {
            "user": {"read_only": True},
            "post": {"read_only": True},
        }

    def create(self, validated_data):
        user = validated_data.get("user")
        post = validated_data.get("post")
        liked = Like.objects.filter(user=user, post=post.id)
        if liked:
            instance = liked.delete()
            return instance
        else:
            instance = Like.objects.create(**validated_data)
            return instance


class ReadingListSerializer(serializers.ModelSerializer):
    post = BlogSerializer(read_only=True)

    class Meta:
        model = ReadingList
        fields = ("post",)

        extra_kwargs = {
            "user": {"read_only": True},
            "post": {"read_only": True},
        }

    def create(self, validated_data):
        user = validated_data.get("user")
        post = validated_data.get("post")
        saved = ReadingList.objects.filter(user=user, post=post.id)
        if saved:
            instance = saved.delete()
            return instance
        else:
            instance = ReadingList.objects.create(**validated_data)
            return instance


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = PostImage
        fields = ("image",)
