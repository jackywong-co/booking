"""
WSGI config for server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from core.constants import APPEnvironment

os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      f'core.settings.{os.getenv("APP_ENV", APPEnvironment.DEVELOPMENT.value)}')

application = get_wsgi_application()
