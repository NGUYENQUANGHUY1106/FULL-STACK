from flask import Flask , Blueprint,render_template,send_from_directory,session
from datetime import timedelta
from db import fetch_all
from router.register import auth_register
from router.login import auth_login
from router.logout  import logout_bp
from router.account import account_bp
from router.my_products import my_products
from router.add_products import add_products
from router.edit_products import edit_product_bp
from router.delete_products import delete_products_bp
from router.add_to_cart import add_to_cart_bp
from router.list_proucts import list_products_bp
app = Flask(__name__)
app.secret_key = 'login'
@app.route('/')
def main():
    products = fetch_all(
        "SELECT * FROM product"
    )
    print(products)
    return render_template ('home.html',products = products)
# TRẢ FILE
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads',filename)
app.register_blueprint(auth_register)
app.register_blueprint(auth_login)
app.register_blueprint(logout_bp)
app.register_blueprint(account_bp)
app.register_blueprint(my_products)
app.register_blueprint(add_products)
app.register_blueprint(edit_product_bp)
app.register_blueprint(delete_products_bp)
app.register_blueprint(add_to_cart_bp)
app.register_blueprint(list_products_bp)
@app.context_processor
# truyền biến trả về cho tất cả các templates
def total_cart():
    cart = session.get('cart',[])
    total_cart = 0;
    for item in cart :
        total_cart += item['qty']
    return  {
        "total_cart" :total_cart
    }
if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1',port=5000)