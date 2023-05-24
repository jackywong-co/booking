"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

from core.constants import APPEnvironment

os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      f'core.settings.{os.getenv("APP_ENV", APPEnvironment.DEVELOPMENT.value)}')

application = get_asgi_application()
