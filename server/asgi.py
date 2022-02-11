"""
ASGI config for server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""
from django.core.asgi import get_asgi_application


import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django_asgi_app = get_asgi_application()
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path

from app import consumers
from .middleware import TokenAuthMiddleware


application = ProtocolTypeRouter({
    # Django's ASGI application to handle traditional HTTP requests
    "http": django_asgi_app,

    # WebSocket chat handler
    "websocket": TokenAuthMiddleware(
        URLRouter([
            re_path("", consumers.NotificationConsumer.as_asgi()),
        ])
    ),
})