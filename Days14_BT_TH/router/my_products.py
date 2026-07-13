from flask import Flask, redirect , request,render_template,session,Blueprint

from db import fetch_all

my_products = Blueprint('my_products',__name__)
@my_products.route('/my_products')
def my_product():
    id = session.get('id')
    products = fetch_all(
        "SELECT * FROM product  WHERE id_user = %s",
        (id,)
    )
    print(products)
    return render_template('my_products.html',products = products)