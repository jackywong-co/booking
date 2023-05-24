import os
import environ
from datetime import timedelta
from pathlib import Path

from core.constants import APPEnvironment

# Directory
# ------------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENVS_DIR = BASE_DIR / 'envs'
LOGS_DIR = BASE_DIR / 'logs'

# ENV
# ------------------------------------------------------------------------------
APP_ENV = os.getenv('APP_ENV', APPEnvironment.DEVELOPMENT.value)
env = environ.Env()
if os.path.exists(ENVS_DIR / f'.env.{APP_ENV}'):
    env.read_env(os.path.join(ENVS_DIR, f'.env.{APP_ENV}'))
    print(f"Environment Set: {APP_ENV}")
else:
    print(f"Environment Setting NOT Exit: {os.path.join(ENVS_DIR, f'.env.{APP_ENV}')}")
    raise SystemExit

# Deployment
# ------------------------------------------------------------------------------
VERSION = env.str('VERSION', '')
SECRET_KEY = env.str('DJANGO_SECRET_KEY', '')
ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'
ASGI_APPLICATION = 'core.asgi.application'

# Application
# ------------------------------------------------------------------------------
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]

LOCAL_APPS = [
    'app',
    'account'
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# Middleware
# ------------------------------------------------------------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Templates
# ------------------------------------------------------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Database
# ------------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'account.User'
AUTHENTICATION_BACKENDS = ['account.backends.EmailBackend']

# Auth
# ------------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# ------------------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Hong_Kong'
USE_I18N = True
USE_TZ = True

# Static
# ------------------------------------------------------------------------------
STATIC_URL = 'static/'

# Restful Framework
# ------------------------------------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
    ],
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer'
    ),
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'ALLOWED_VERSIONS': ['users_v1'],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

# JWT
# ------------------------------------------------------------------------------
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

# Logging
# ------------------------------------------------------------------------------
LOGGING_FILE_ENABLE = env.bool('LOGGING_FILE_ENABLE', False)
LOGGING_FORMATTERS = {
    'verbose': {
        'format': '{asctime}  [{levelname}]  {pathname}  <{funcName}>  {message}',
        'style': '{',
    },
    'simple': {
        'format': '{asctime}  [{levelname}]  {message}',
        'style': '{',
    }
}
if LOGGING_FILE_ENABLE:
    LOGS_DIR = env.str('LOGGING_FILE_LOG_PATH', BASE_DIR / 'logs')
    Path(LOGS_DIR).mkdir(parents=True, exist_ok=True)
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': LOGGING_FORMATTERS,
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
                'level': 'DEBUG',
                'formatter': 'simple',
            },
            'file.root': {
                'class': 'logging.FileHandler',
                'level': env.str('LOGGING_LOG_LEVEL_ROOT', 'INFO'),
                'formatter': 'verbose',
                'filename': os.path.join(LOGS_DIR, 'app.log'),
            },
            'file.django': {
                'class': 'logging.FileHandler',
                'level': env.str('LOGGING_LOG_LEVEL_DJANGO', 'WARNING'),
                'formatter': 'verbose',
                'filename': os.path.join(LOGS_DIR, 'django.log'),
            },
            'file.celery': {
                'class': 'logging.FileHandler',
                'level': env.str('LOGGING_LOG_LEVEL_CELERY', 'INFO'),
                'formatter': 'verbose',
                'filename': os.path.join(LOGS_DIR, 'celery.log'),
            }
        },
        'loggers': {
            '': {
                'handlers': ['console', 'file.root'],
                'level': env.str('LOGGING_LOG_LEVEL_ROOT', 'INFO'),
                'propagate': False,
            },
            'django': {
                'handlers': ['console', 'file.django'],
                'level': env.str('LOGGING_LOG_LEVEL_DJANGO', 'WARNING'),
                'propagate': False,
            },
            'celery_logger': {
                'handlers': ['console', 'file.celery'],
                'level': env.str('LOGGING_LOG_LEVEL_CELERY', 'INFO'),
                'propagate': False,
            },
        }
    }
else:
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': LOGGING_FORMATTERS,
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
                'level': 'DEBUG',
                'formatter': 'simple',
            },
        },
        'loggers': {
            '': {
                'handlers': ['console'],
                'level': env.str('LOGGING_LOG_LEVEL_ROOT', 'INFO'),
                'propagate': False,
            },
            'django': {
                'handlers': ['console'],
                'level': env.str('LOGGING_LOG_LEVEL_DJANGO', 'WARNING'),
                'propagate': False,
            },
            'celery_logger': {
                'handlers': ['console'],
                'level': env.str('LOGGING_LOG_LEVEL_CELERY', 'INFO'),
                'propagate': False,
            },
        }
    }
