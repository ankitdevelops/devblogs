from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from api.blogs.models import Blog, Comment
from .serializers import BlogSerializer, CommentSerializer

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
        print(self.kwargs["slug"])
        blog = Blog.objects.get(slug=self.kwargs["slug"])
        qs = super().get_queryset()
        return qs.filter(blog=blog)

    # def list(self, request, *args, **kwargs):
    # queryset = self.filter_queryset(self.get_queryset())

    # page = self.paginate_queryset(queryset)
    # if page is not None:
    #     serializer = self.get_serializer(page, many=True)
    #     return self.get_paginated_response(serializer.data)

    # serializer = self.get_serializer(queryset, many=True)
    # return Response(serializer.data)
