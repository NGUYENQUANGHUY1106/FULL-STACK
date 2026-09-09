import json

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.shortcuts import get_object_or_404

from Product.models import Product, Cart
from Users.models import User


@require_POST
def add_to_cart(request):

    try:
        user_id = request.session.get('user_id')
        if not user_id:

            return JsonResponse({
                'success': False,
                'message': 'Bạn cần đăng nhập'
            })



        data = json.loads(request.body)

        product_id = data.get('product_id')


        if not product_id:

            return JsonResponse({
                'success': False,
                'message': 'Không có product_id'
            })

        product = get_object_or_404(
            Product,
            id=product_id
        )


        user = get_object_or_404(
        User,
        id=user_id
        )


        cart_item = Cart.objects.filter(
            id_user=user,
            id_product=product
        ).first()


        if cart_item:

            cart_item.quantity += 1

            cart_item.save()


        else:

            cart_item = Cart.objects.create(

                id_user=user,

                id_product=product,

                quantity=1

            )


        cart_count = 0

        cart_items = Cart.objects.filter(
            id_user=user
        )

        for item in cart_items:

            cart_count += item.quantity


        return JsonResponse({

            'success': True,

            'message':
                'Đã thêm sản phẩm vào giỏ hàng',

            'product_id':
                product.id,

            'quantity':
                cart_item.quantity,

            'cart_count':
                cart_count

        })


    except json.JSONDecodeError:

        return JsonResponse({

            'success': False,

            'message':
                'Dữ liệu JSON không hợp lệ'

        })


    except Exception as e:

        print(
            "LỖI ADD TO CART:",
            e
        )

        return JsonResponse({

            'success': False,

            'message':
                str(e)

        })