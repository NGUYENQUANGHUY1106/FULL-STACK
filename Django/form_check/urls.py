from django.urls import path
from form_check import views

urlpatterns = [
   path('list/',views.list_blog,name="list_blog"),
   path('add/',views.add_blog,name="add_blog")
]