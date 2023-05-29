from .base import *


# Django
# ------------------------------------------------------------------------------
DEBUG = False
ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', [])


# Database
# ------------------------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env.str('DATABASE_NAME', ''),
        'USER': env.str('DATABASE_USER', ''),
        'PASSWORD': env.str('DATABASE_PASSWORD', ''),
        'HOST': env.str('DATABASE_HOST', ''),
        'PORT': env.str('DATABASE_PORT', ''),
    }
}

# CORS
# ------------------------------------------------------------------------------
CORS_EXPOSE_HEADERS = []
CORS_ALLOW_CREDENTIALS = False
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', [])

# CSRF
# ------------------------------------------------------------------------------
CSRF_USE_SESSIONS = False
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SAMESITE = 'Strict'
CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS', [])
CSRF_COOKIE_SECURE = True


# Session
# ------------------------------------------------------------------------------
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_SECURE = True


# SECURITY
# ------------------------------------------------------------------------------
# SSL
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)

# HTTPS
SECURE_HSTS_SECONDS = 518400
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool(
    "DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True
)
SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)

# CONTENT_TYPE
SECURE_CONTENT_TYPE_NOSNIFF = env.bool(
    "DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True
)
