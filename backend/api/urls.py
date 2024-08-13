from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from api.views import FileViewSet, shared_file_view, UserViewSet

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'files', FileViewSet, basename='file')
router.register(r'users', UserViewSet)


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
   
    path('', views.getRoutes),
    path('', include(router.urls)),
    path('share/<str:share_key>/', shared_file_view, name='shared_file_view'),  
]