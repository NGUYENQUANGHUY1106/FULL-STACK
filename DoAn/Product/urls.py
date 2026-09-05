from django.urls import path
from .import views
from .router.my_product import my_product
from .router.add_product import add_product
from .router.edit_product import edit_product
from .router.product_details  import product_details

urlpatterns = [
    # views
    path('account/my_product/',my_product,name='my_product'),
    path('account/add_product/',add_product,name='add_product'),
    path('account/edit_product/<int:id>/',edit_product,name='edit_product'),
    path('account/product_details/<int:id>/',product_details,name='product_details'),
    
]