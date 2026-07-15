from flask import Flask, Blueprint, jsonify,session,render_template,request


list_products_bp = Blueprint('list_products',__name__)

@list_products_bp.route('/list_products')
def list_products():
    cart = session.get('cart',[])
    for item in cart:
        item['total'] = int(item['qty']) * int(item['price'])
    return render_template('list_products.html', cart =  cart)  
    # plus
@list_products_bp.route('/plus_products', methods=['POST'])
def plus_products():
    data = request.get_json()
    products_id = data['id'];

    
    print("Plus Product")
    cart = session.get('cart',[])
    for item in cart:
        if item['id'] == int(products_id):
            item['qty'] += 1
            total = int(item['qty']) * int(item['price'])

            session['cart'] = cart

            return jsonify({
                "status": "success",
                "qty": item['qty'],
                "total": total
            })

    return jsonify({
    "status":"fail"
    }),404
@list_products_bp.route('/minus_products', methods=['POST'])
def minus_products():
    data = request.get_json()
    products_id = data['id']

    print("ok")

    cart = session.get('cart',[])
    for item in cart:
        if item['id'] == int(products_id):
            if item['qty'] <= 1 :
                print("Không thể xóa sản phẩm cuối cùng ")
                item['qty'] = 1 ;
                total =  1 * int(item['price'])
                return jsonify({
                "status" :"ok",
                "qty" : item['qty'],
                "total" : total
            })
            item['qty'] -=1;
            total = int(item['qty']) * int(item['price'])

            session['cart'] = cart

            return jsonify({
                "status" :"ok",
                "qty" : item['qty'],
                "total" : total
            })
    return jsonify({
            "status" : "False",

        }),404
@list_products_bp.route('/delete_products',methods = ['POST'])
def delete_products():
    data = request.get_json()
    products_id = data['id']

    cart = session.get('cart',[]);
    print("ok")
    for item in cart:
        if item['id'] == int(products_id):
            cart.remove(item)
            session['cart'] = cart;
            break
    return jsonify({
        "status" : "ok",
        "cart" : cart
    })