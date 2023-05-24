from django.contrib import admin
from django.conf import settings
from django.http import HttpResponse
from django.urls import path, include


def version(request):
    return HttpResponse(f"version: {settings.VERSION}({settings.APP_ENV})")


urlpatterns = [
    path('', version, name='version'),
    path('admin/', admin.site.urls),
    path('api/v1/', include('account.urls')),
    path('api/v1/', include(('app.urls', 'api'), namespace='users_v1')),
]
