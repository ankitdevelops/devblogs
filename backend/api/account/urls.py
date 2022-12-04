from django.urls import path
from .views import UserRegisterView, UserProfileView, MyTokenObtainPairView, UserInfo
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("register/", UserRegisterView.as_view(), name="register_user"),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("", UserInfo.as_view()),
    path("<str:username>/", UserProfileView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
