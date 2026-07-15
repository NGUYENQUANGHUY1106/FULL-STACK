from flask import Flask, Blueprint,session,render_template,request

list_products_bp = Blueprint('list_products',__name__)

@list_products_bp.route('/list_products')
def list_products():
    cart = session.get('cart',[])

    return render_template('list_products.html', cart =  cart)  