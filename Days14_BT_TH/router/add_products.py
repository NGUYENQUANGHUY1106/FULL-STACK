from flask import Flask,Blueprint,render_template,request,current_app,session,redirect
import os

from db import execute

add_products = Blueprint('add_products',__name__)
@add_products.route('/add_products',methods = ['GET','POST'])
def add_product():
    errors = {}
    title = ""
    price = ""
    file = ""
    file_name = ""
    if request.method == 'POST':
        id_user = session.get('id')
        title = request.form.get('title')
        price = request.form.get('price')
        file = request.files.get('file')
        if not title:
            errors['title'] = 'Vui lòng nhập tên sản phẩm'
        if not price:
            errors['price'] = 'Vui lòng nhập giá của sản phẩm'
        if not file or file.filename == '':
            errors['file'] = 'Vui lòng chọn hình ảnh của sản phẩm '
        else:
            upload_folder = os.path.join(current_app.root_path,'uploads')
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            file_path = os.path.join(upload_folder,file.filename)
            file.save(file_path)
            file_name = file.filename
        if not errors:
            execute(
                "INSERT INTO product (title,price,image,id_user) VALUES (%s, %s, %s, %s) ",(title,price,file.filename,id_user)
            )
            print("up load sản phẩm thành công")
            return redirect('/my_products')

    return render_template('add_products.html',errors = errors , title = title ,price = price ,file_name = file_name)
  