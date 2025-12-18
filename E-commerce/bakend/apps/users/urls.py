# apps/users/urls.py
from django.urls import path
from .views import register_user, logout_user, CustomTokenObtainPairView, ProfileImageUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('registro/', register_user, name='user-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('logout/', logout_user, name='logout_user'),
    path('profile/update-image/', ProfileImageUpdateView.as_view(), name='profile_update-image'),
]