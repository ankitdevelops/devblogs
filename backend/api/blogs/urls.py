from django.urls import path
from .views import BlogListCreateView, BlogDetailsUpdateDeleteView

urlpatterns = [
    path("", BlogListCreateView.as_view(), name="blog-home"),
    path(
        "<str:slug>/",
        BlogDetailsUpdateDeleteView.as_view(),
        name="api-blog-details-view",
    ),
]
