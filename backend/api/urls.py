from django.urls import path, include

urlpatterns = [
    path("blogs/", include("api.blogs.urls")),
    path("user/", include("api.account.urls")),
]
