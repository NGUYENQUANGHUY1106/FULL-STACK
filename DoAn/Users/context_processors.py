from Product.models import Cart
from .models import User


def user_info(request):

    user = None
    user_id = request.session.get('user_id')
    cart_count = 0

    if user_id:

        try:
            user = User.objects.get(id=user_id)

            cart_items = Cart.objects.filter(
                id_user_id=user_id
            )

            for item in cart_items:
                cart_count += item.quantity

        except User.DoesNotExist:
            user = None

    return {
        'current_user': user,
        'id': user_id,
        'cart_count': cart_count
    }