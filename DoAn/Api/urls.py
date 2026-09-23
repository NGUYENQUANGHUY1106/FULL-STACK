from django.urls import path
from .import views

urlpatterns = [
    path('api/list/',views.blog_api_list),
    path('api/create/',views.blog_api_create),
    path('api/detail/<int:id>/',views.blog_api_detail),
    path('api/update/<int:id>/',views.blog_api_update),
    path('api/delete/<int:id>/',views.blog_api_delete),


    path('api/register/',views.register ,name='register' ),
    path('api/login/',views.login,name='login'),
    path('api/blog_list/',views.blog_list,name='blog_list'),


]