import json

from django.core.files.storage import default_storage
from django.shortcuts import render, redirect, get_object_or_404

from Product.models import Product, Category, Brand


def edit_product(request, id):

    product = get_object_or_404(Product, id=id)

    try:
        image_filenames = json.loads(product.image)

        if image_filenames:
            product.images = image_filenames
        else:
            product.images = []

    except (json.JSONDecodeError, TypeError):
        product.images = []

    categories = Category.objects.all()
    brands = Brand.objects.all()

    if request.method == 'POST':

        name = request.POST.get('name')
        price = request.POST.get('price')
        category_id = request.POST.get('category')
        brand_id = request.POST.get('brand')
        status = request.POST.get('status')
        sale = request.POST.get('sale')
        company = request.POST.get('company')
        detail = request.POST.get('detail')

        delete_images = request.POST.getlist('delete_images')

        new_images = request.FILES.getlist('image')

        try:
            old_images = json.loads(product.image)

            if not old_images:
                old_images = []

        except (json.JSONDecodeError, TypeError):
            old_images = []

        remaining_images = []

        for image in old_images:
            if image not in delete_images:
                remaining_images.append(image)

        total_images = len(remaining_images) + len(new_images)

        if total_images > 3:

            product.images = old_images

            return render(
                request,
                'Product/edit_product.html',
                {
                    'product': product,
                    'categories': categories,
                    'brands': brands,
                    'error': 'Tổng số ảnh không được vượt quá 3!'
                }
            )

        for image in new_images:

            image_name = default_storage.save(
                image.name,
                image
            )

            remaining_images.append(image_name)

        product.image = json.dumps(remaining_images)

        product.name = name
        product.price = price
        product.status = status
        product.company = company
        product.detail = detail

        if sale:
            product.sale = sale

        if category_id:
            product.id_category_id = category_id

        if brand_id:
            product.id_brand_id = brand_id

        product.save()

        return redirect('my_product')

    return render(
        request,
        'Product/edit_product.html',
        {
            'product': product,
            'categories': categories,
            'brands': brands
        }
    )