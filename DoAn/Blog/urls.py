from django.urls import path
from .import views

urlpatterns = [
    path('add_blog',views.add_blog,name='add_blog'),
    path('list_blog',views.blog_list,name='blog_list')
]