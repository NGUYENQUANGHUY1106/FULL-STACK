from flask import Flask, redirect , request,render_template,session,Blueprint

my_products = Blueprint('my_products',__name__)
@my_products.route('/my_products')
def my_product():
    return render_template('my_products.html')