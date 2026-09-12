from django.urls import path
from .import views

urlpatterns = [
    # views
    path('account/my_product/',views.my_product,name='my_product'),
    path('account/add_product/',views.add_product,name='add_product'),
    path('account/edit_product/<int:id>/',views.edit_product,name='edit_product'),
    path('account/product_details/<int:id>/',views.product_details,name='product_details'),
    path('account/add_to_cart/',views.add_to_cart,name= 'add_to_cart'),
    path('account/cart/',views.cart,name='cart'),
    path('account/checkout',views.checkout,name='checkout')
    
]