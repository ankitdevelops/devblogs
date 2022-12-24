from dataclasses import fields
from rest_framework import serializers
from api.blogs.models import Blog, Comment
from api.account.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("name", "username", "avatar")


class CommentSerializer(serializers.ModelSerializer):
    user = AuthorSerializer()

    class Meta:
        model = Comment
        fields = ("user", "content", "created")


class BlogSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    thumbnail = serializers.ImageField(use_url=True)
    comments = CommentSerializer(many=True)

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
            "author",
            "comments",
            "likes_count",
            "comments_count",
            "reading_list_count",
        )
        extra_kwargs = {
            "is_featured": {"read_only": True},
            "is_must_read": {"read_only": True},
            "slug": {"read_only": True},
            "author": {"read_only": True},
            "comment": {"read_only": True},
        }
