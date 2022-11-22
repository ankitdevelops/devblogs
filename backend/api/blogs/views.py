from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from api.blogs.models import Blog, Comment
from .serializers import BlogSerializer

# Create your views here.


class BlogListCreateView(ListCreateAPIView):
    queryset = (
        Blog.objects.all()
        .filter(status="published", is_archived=False)
        .order_by("-updated")
    )
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(author=self.request.user)


class BlogDetailsUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = (
        Blog.objects.all()
        .filter(status="published", is_archived=False)
        .order_by("-updated")
    )
    serializer_class = BlogSerializer
    lookup_field = "slug"
