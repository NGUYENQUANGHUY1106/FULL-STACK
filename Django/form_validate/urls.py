from django.urls import path
from form_validate import views

urlpatterns = [
    path('add/', views.add_product,name="add_product"),
    path('list/',views.list_product,name="list_product")
]