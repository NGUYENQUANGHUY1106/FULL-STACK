import ast
import json
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.db.models import Sum, F
from Product.models import Cart

def cart(request):
    user_id = request.session.get('user_id')
    if not user_id:
        if request.method == 'POST':
            return JsonResponse({'success': False, 'message': 'Chưa đăng nhập'}, status=401)
        return render(request, 'product/cart.html', {'cart_items': [], 'total': 0})

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cart_id = data.get('cart_id')
            action = data.get('action')

            if not cart_id:
                return JsonResponse({'success': False, 'message': 'Không có cart_id'})

            cart_item = get_object_or_404(
                Cart.objects.select_related('id_product'),
                id=cart_id,
                id_user_id=user_id
            )

            is_deleted = False

            if action == 'increase':
                cart_item.quantity += 1
                cart_item.save()
            elif action == 'decrease':
                cart_item.quantity -= 1
                if cart_item.quantity <= 0:
                    cart_item.delete()
                    is_deleted = True
                else:
                    cart_item.save()
            elif action == 'delete':
                    cart_item.delete()
                    is_deleted = True
            else:
                return JsonResponse({'success': False, 'message': 'Action không hợp lệ'})

            # lấy lại toàn bộ giỏ hàng sau khi đã chỉnh
            user_cart = Cart.objects.filter(id_user_id=user_id).select_related('id_product')
            #  tổng tiền
            total = sum(item.id_product.price * item.quantity for item in user_cart)
            # tỏng số lượng snar phẩm 
            cart_count = sum(item.quantity for item in user_cart)

            if is_deleted:
                return JsonResponse({
                    'success': True,
                    'deleted': True,
                    'cart_id': cart_id,
                    'cart_count': cart_count,
                    'total': float(total)
                })

            item_total = cart_item.id_product.price * cart_item.quantity
            return JsonResponse({
                'success': True,
                'deleted': False,
                'cart_id': cart_item.id,
                'quantity': cart_item.quantity,
                'item_total': float(item_total),
                'total': float(total),
                'cart_count': cart_count
            })

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'JSON không hợp lệ'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    # lúc vừa vào trang cart
    cart_items = Cart.objects.filter(id_user_id=user_id).select_related('id_product')
    total = 0
    # tính tổng tiền lúc vừa mới vào trang
    for item in cart_items:
        try:
            item.id_product.images = ast.literal_eval(item.id_product.image) if item.id_product.image else []
        except (ValueError, SyntaxError):
            item.id_product.images = []
        total += item.id_product.price * item.quantity

    return render(
        request,
        'product/cart.html',
        {
            'cart_items': cart_items,
            'total': total
        }
    )