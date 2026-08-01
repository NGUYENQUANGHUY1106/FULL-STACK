from django.urls import path
from . import views

urlpatterns = [
    path('register_superuser/', views.register_superuser, name='register_superuser')
]