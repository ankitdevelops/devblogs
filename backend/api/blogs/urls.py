from django.urls import path
from .views import (
    BlogListCreateView,
    BlogDetailsUpdateDeleteView,
    FeaturedBlogs,
    CommentCreateView,
    LikeCreateView,
    ReadingListView,
    check_liked_by_user,
)

urlpatterns = [
    path("", BlogListCreateView.as_view(), name="blog-home"),
    path(
        "blog/<str:slug>/",
        BlogDetailsUpdateDeleteView.as_view(),
        name="api-blog-details-view",
    ),
    path("featured/", FeaturedBlogs.as_view(), name="featured-blog"),
    path("comment/", CommentCreateView.as_view(), name="create-comment"),
    path("comment/<str:slug>/", CommentCreateView.as_view(), name="get-comment"),
    path("like/", LikeCreateView.as_view(), name="like-post"),
    path(
        "like/<str:slug>",
        check_liked_by_user,
    ),
    path("reading-list/", ReadingListView.as_view(), name="reading-list"),
    # path("reading-list/<str:slug>/", ReadingListView.as_view(), name="reading-list"),
]
