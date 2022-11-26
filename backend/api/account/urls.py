from django.urls import path
from .views import UserRegisterView, UserProfileView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("register/", UserRegisterView.as_view()),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("<str:username>/", UserProfileView.as_view()),
]
