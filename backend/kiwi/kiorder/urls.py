from django.urls import path
from .views import hello_world, order_tts

urlpatterns = [
    path('hello', hello_world),
    path('api/v1/order_tts', order_tts),
]
