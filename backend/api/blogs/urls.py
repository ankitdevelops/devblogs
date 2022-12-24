from django.urls import path
from .views import (
    BlogListCreateView,
    BlogDetailsUpdateDeleteView,
    FeaturedBlogs,
    CommentCreateView,
)

urlpatterns = [
    path("", BlogListCreateView.as_view(), name="blog-home"),
    path("featured/", FeaturedBlogs.as_view(), name="featured-blog"),
    path("comment/", CommentCreateView.as_view(), name="create-comment"),
    path("comment/<str:slug>/", CommentCreateView.as_view(), name="get-comment"),
    path(
        "<str:slug>/",
        BlogDetailsUpdateDeleteView.as_view(),
        name="api-blog-details-view",
    ),
]
