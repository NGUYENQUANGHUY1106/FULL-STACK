from django.urls import path
from .import views

urlpatterns = [
    path('add_blog',views.add_blog,name='add_blog'),
    path('list_blog',views.blog_list,name='blog_list'),
    path('blog_details/<int:id>',views.blog_details,name='blog_details'),
    path(
        'rate/<int:id>/',
        views.rate_blog,
        name='rate_blog'
    ),
    path('comment_blog/<int:blog_id>/',views.comment_blog,name='comment_blog')
]