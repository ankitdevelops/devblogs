from django.urls import path
from .views import (
    BlogListCreateView,
    BlogDetailsUpdateDeleteView,
    FeaturedBlogs,
    CommentCreateView,
    LikeCreateView,
    ReadingListView,
    CategoryListView,
    SearchListView,
    PostImageView,
    check_liked_by_user,
    check_post_saved_by_user,
)

urlpatterns = [
    path("", BlogListCreateView.as_view(), name="blog-home"),
    path(
        "blog/<str:slug>/",
        BlogDetailsUpdateDeleteView.as_view(),
        name="api-blog-details-view",
    ),
    path("blog/category/<str:category>/", CategoryListView.as_view(), name="category"),
    path("blog/search/<str:keyword>/", SearchListView.as_view(), name="search"),
    path("featured/", FeaturedBlogs.as_view(), name="featured-blog"),
    path("comment/", CommentCreateView.as_view(), name="create-comment"),
    path("comment/<str:slug>/", CommentCreateView.as_view(), name="get-comment"),
    path("like/", LikeCreateView.as_view(), name="like-post"),
    path(
        "like/<str:slug>/",
        check_liked_by_user,
    ),
    path("reading-list/", ReadingListView.as_view(), name="reading-list"),
    path(
        "reading-list/<str:slug>/", check_post_saved_by_user, name="reading-list-check"
    ),
    path("images/", PostImageView.as_view()),
]
