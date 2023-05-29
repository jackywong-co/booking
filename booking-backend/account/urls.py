from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView
from account import views

router = SimpleRouter()
router.register(r'user', views.UserViewSet, basename='user')
router.register(r'', views.AuthViewSet, basename='auth')
urlpatterns = [
    path('', include(router.urls)),
]
