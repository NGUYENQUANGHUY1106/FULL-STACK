from flask import Flask,Blueprint,render_template

add_products = Blueprint('add_products',__name__)
@add_products.route('/add_products',methods = ['GET','POST'])
def add_product():
    return render_template('add_products.html')
  