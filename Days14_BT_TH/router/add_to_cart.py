from flask import Flask, jsonify , render_template ,request , session, Blueprint,redirect

from db import get_connection,execute,fetch_one

add_to_cart_bp = Blueprint('add_to_cart',__name__)

@add_to_cart_bp.route('/add_to_cart', methods=['POST'])
def add_to_cart():

    data = request.get_json()
    products_id = int(data['id'])

    products = fetch_one(
        "SELECT * FROM product WHERE id = %s",
        (products_id,)
    )

    if not products:
        return jsonify({
            'status': 'fail',
            'message': 'No product'
        }), 404

    cart = session.get('cart', [])
    found = False

    for item in cart:
        if item['id'] == products_id:
            item['qty'] += 1
            found = True
            break

    if not found:
        products_data = {
            'id': products['id'],
            'name': products['title'],
            'price': products['price'],
            'image': products['image'],
            'qty': 1
        }
        cart.append(products_data)
    session['cart'] = cart

    # return jsonify({
    #     'status': 'success',
    #     'product': session['cart']
    # })
    print(cart)
    return redirect('/list_products')
    
   
   
