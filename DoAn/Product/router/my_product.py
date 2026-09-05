import json

from django.shortcuts import render
from Product.models import Product

def my_product(request):
    user_id = request.session.get('user_id')

    my_product = Product.objects.filter(id_user = user_id)


    for product in my_product:
        try:
            image_filename =  json.loads(product.image)
            # chuổi thành Json
            if image_filename:
                product.first_image = image_filename[0]
            else:
                product.first_image = None

        except(json.JSONDecodeError,TypeError):
            product.first_image = None




    return render(request,'Product/my_product.html',{'my_product' : my_product})