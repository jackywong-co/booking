from django.urls import path, include
from rest_framework.routers import SimpleRouter

from app import views

router = SimpleRouter()
router.register(r'record', views.RecordViewSet, basename='record')
urlpatterns = [
    path('', include(router.urls)),
]
