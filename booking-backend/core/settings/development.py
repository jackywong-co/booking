from .base import *


# Django
# ------------------------------------------------------------------------------
DEBUG = True
ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', [])


# Database
# ------------------------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# CORS
# ------------------------------------------------------------------------------
CORS_EXPOSE_HEADERS = ['X-CSRFToken']
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', [])


# CSRF
# ------------------------------------------------------------------------------
CSRF_USE_SESSIONS = False
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS', [])


# Session
# ------------------------------------------------------------------------------
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'


# JWT
# ------------------------------------------------------------------------------
SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(days=1)
