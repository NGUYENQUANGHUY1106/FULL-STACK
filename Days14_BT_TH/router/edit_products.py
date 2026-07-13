from flask import Flask ,render_template,redirect,request,session,Blueprint,current_app
import os

from db import execute, fetch_one
edit_product_bp =  Blueprint('edit_products',__name__)
@edit_product_bp.route('/edit_products/<int:id>',methods = ['GET','POST'])
def edit_products(id):
     print(id)
     products = fetch_one(
     "SELECT * FROM product WHERE id = %s",
     (id,))

     if request.method == 'POST':
        title = request.form.get('title')
        price = request.form.get('price')
        image = request.files.get('image')
        image_name = products['image']
        if image and image.filename != '':
            upload_folder = os.path.join(current_app.root_path,'uploads')
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            image_path = os.path.join(upload_folder,image.filename)
            image.save(image_path)
            image_name = image.filename
        execute(
        "UPDATE product SET title =%s, price = %s, image =%s WHERE id = %s",(title,price,image_name,id)
        )
        print('ok')
        return redirect('/my_products')
     return render_template('edit_products.html', products = products)