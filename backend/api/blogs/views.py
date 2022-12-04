from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from api.blogs.models import Blog, Comment
from .serializers import BlogSerializer

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
