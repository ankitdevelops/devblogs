from django.shortcuts import render
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from api.blogs.models import Blog, Comment, Like, ReadingList
from .serializers import (
    BlogSerializer,
    CommentSerializer,
    LikeSerializer,
    ReadingListSerializer,
)

# Create your views here.


class BlogListCreateView(ListCreateAPIView):
    queryset = Blog.objects.filtered()
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(author=self.request.user)


class BlogDetailsUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.filtered()
    serializer_class = BlogSerializer
    lookup_field = "slug"


class FeaturedBlogs(ListAPIView):
    queryset = Blog.objects.filtered()
    serializer_class = BlogSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(status="published", is_archived=False, is_featured=True)


class CommentCreateView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        blog = Blog.objects.get(slug=self.request.data["blogSlug"])
        serializer.save(user=self.request.user, blog=blog)

    def get_queryset(self):
        blog = Blog.objects.get(slug=self.kwargs["slug"])
        qs = super().get_queryset()
        return qs.filter(blog=blog)


class LikeCreateView(ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user)

    def perform_create(self, serializer):
        blog = Blog.objects.get(slug=self.request.data["slug"])
        serializer.save(user=self.request.user, post=blog)


# function to check if user liked a post or not
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(
    [
        "GET",
    ]
)
def check_liked_by_user(request, slug):
    post = Blog.objects.get(slug=slug)
    like_status = Like.objects.filter(user=request.user, post=post).exists()
    return Response({"status": like_status})


@api_view(
    [
        "GET",
    ]
)
def check_post_saved_by_user(request, slug):
    post = Blog.objects.get(slug=slug)
    like_status = ReadingList.objects.filter(user=request.user, post=post).exists()
    return Response({"status": like_status})


class ReadingListView(ListCreateAPIView):
    queryset = ReadingList.objects.all()
    serializer_class = ReadingListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user)

    def perform_create(self, serializer):
        blog = Blog.objects.get(slug=self.request.data["slug"])
        serializer.save(user=self.request.user, post=blog)


class CategoryListView(ListAPIView):
    queryset = Blog.objects.filtered()
    serializer_class = BlogSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(category=self.kwargs["category"])


class SearchListView(ListAPIView):
    queryset = Blog.objects.filtered()
    serializer_class = BlogSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(
            Q(title__icontains=self.kwargs["keyword"])
            | Q(content__icontains=self.kwargs["keyword"])
        )
