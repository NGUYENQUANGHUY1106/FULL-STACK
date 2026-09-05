import json
import os

from django.core.files.storage import default_storage
from django.shortcuts import render, redirect,get_object_or_404

from Product.models import Product, Brand, Category
from Users.models import User


ALLOWED_FILE = {'png', 'jpg', 'jpeg', 'gif'}
MAX_SIZE_FILE = 1 * 1024 * 1024  # 1MB


def allowed_file(filename):

    return (
        '.' in filename
        and filename.rsplit('.', 1)[1].lower() in ALLOWED_FILE
    )


def add_product(request):

    errors = {}

    brands = Brand.objects.all()
    categories = Category.objects.all()
    user_id = request.session.get('user_id')
    if not user_id:
         return redirect('login')
    user = get_object_or_404(User,id = user_id)

    if request.method == 'POST':

        name = request.POST.get('name')
        price = request.POST.get('price')
        category_id = request.POST.get('category')
        brand_id = request.POST.get('brand')
        status = request.POST.get('status')
        sale = request.POST.get('sale')
        company = request.POST.get('company')
        detail = request.POST.get('detail')

        files = request.FILES.getlist('image')


        if not files:

            errors['file'] = 'Vui lòng chọn ít nhất một file'

        elif len(files) > 3:

            errors['file'] = 'Chỉ được chọn tối đa 3 ảnh'

        else:

            for file in files:

                # Kiểm tra định dạng
                if not allowed_file(file.name):

                    errors['file'] = (
                        f'{file.name} không phải là file hình ảnh hợp lệ'
                    )

                    break

                if file.size > MAX_SIZE_FILE:

                    errors['file'] = (
                        f'{file.name} vượt quá kích thước 1MB'
                    )

                    break

        if not errors:

            print("File hợp lệ")

            images_name = []

            for file in files:

                file_path = default_storage.save(
                    file.name,
                    file
                )

                images_name.append(file_path)

            
            # chuyển thành json
            image_json = json.dumps(images_name)

            Product.objects.create(

                id_user=user ,

                name=name,

                price=price,

                id_category_id=category_id,

                id_brand_id=brand_id,

                status=status,

                sale=sale,

                company=company,

                image=image_json,

                detail=detail
            )

            return redirect('my_product')

    return render(
        request,
        'Product/add_product.html',
        {
            'errors': errors,
            'brand': brands,
            'category': categories
                            }
    )