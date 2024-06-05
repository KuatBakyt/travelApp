from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", UserRegistrationAPIView.as_view(), name="register-user"),
    path("login/", UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("user/", UserInfoAPIView.as_view(), name="user-info"),
    path('categories/', CategoryListCreate.as_view(), name='category-list'),
    path('news/', NewsListCreate.as_view(), name='news-list'),
    path('news/<int:id>/', NewsRetrieve.as_view(), name='news-retrieve'),
    path('tours/', TourListCreate.as_view(), name='tour-list'),
    path('tours/<int:id>/', TourRetrieve.as_view(), name='tour-retrieve'),
    path('comments/', CommentListCreate.as_view(), name='comment-list'),
    path('requests/', RequestListCreate.as_view(), name='request-list')
]
