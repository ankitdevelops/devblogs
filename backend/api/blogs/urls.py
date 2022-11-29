from django.urls import path
from .views import BlogListCreateView, BlogDetailsUpdateDeleteView, FeaturedBlogs

urlpatterns = [
    path("", BlogListCreateView.as_view(), name="blog-home"),
    path("featured/", FeaturedBlogs.as_view(), name="featured-blog"),
    path(
        "<str:slug>/",
        BlogDetailsUpdateDeleteView.as_view(),
        name="api-blog-details-view",
    ),
]
