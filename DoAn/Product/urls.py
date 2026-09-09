from django.urls import path
from .import views
from .router.my_product import my_product
from .router.add_product import add_product
from .router.edit_product import edit_product
from .router.product_details  import product_details
from .router.add_to_cart import add_to_cart
from .router.cart import cart

urlpatterns = [
    # views
    path('account/my_product/',my_product,name='my_product'),
    path('account/add_product/',add_product,name='add_product'),
    path('account/edit_product/<int:id>/',edit_product,name='edit_product'),
    path('account/product_details/<int:id>/',product_details,name='product_details'),
    path('account/add_to_cart/',add_to_cart,name= 'add_to_cart'),
    path('account/cart/',cart,name='cart')
    
]