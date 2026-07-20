from django.urls import path

from users import views



urlpatterns = [
    path('list/',views.list_user ,name = "list_user"),
    path('add/', views.add_user , name='add_user'),
    path('edit/<int:user_id>/', views.edit_user, name='edit_user'),
    path('delete/<int:user_id>/',views.delete_user, name='delete_user'),
]