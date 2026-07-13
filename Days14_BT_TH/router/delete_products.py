from flask import Flask,render_template,redirect,request,session,Blueprint

from db import execute

delete_products_bp = Blueprint('delete',__name__)

@delete_products_bp.route('/delete_products/<int:id>',methods = ['GET','POST'])
def delete_products(id):
    print(id)
    execute(
           "DELETE FROM product WHERE id = %s",
           (id,)
       )
    return redirect('/my_products')