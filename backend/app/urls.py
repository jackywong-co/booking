from django.urls import path
from django.contrib.auth import views as auth_views
from app import views

urlpatterns = [
    path('', views.index, name='home'),

    path('login/', auth_views.LoginView.as_view(template_name='index.html'), name='login'),

]
