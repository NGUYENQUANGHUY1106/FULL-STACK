import ast

from django.shortcuts import render,get_object_or_404
from Product.models import Product,Category,Brand
def product_details(request,id):
    products = Product.objects.filter(id=id)

    for product  in products :
        try:
            if  isinstance(product.image,str):
                product.images = ast.literal_eval(product.image)
            else:
                product.images = product.image or []
        except Exception:
            product.images = []
    return render(request, 'Product/product_details.html', {'products': products,
                                                            
                                                            })