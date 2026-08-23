from django.urls import path
from .import views

urlpatterns = [
    path('list_product',views.list_product,name='list_product')
]