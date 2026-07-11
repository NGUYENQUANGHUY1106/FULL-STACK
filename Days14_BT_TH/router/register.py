from flask import Flask,Blueprint,redirect,request,render_template,session,current_app
from werkzeug.security import generate_password_hash,check_password_hash
import os

from db import execute
auth_register = Blueprint('register',__name__)

ALLOWED_FILE = {'png','jpg','jpeg','gif'}
MAX_FILE_SIZE = 1
def check_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_FILE
@auth_register.route('/register',methods = ['GET','POST'])
def register():
    errors = {}
    email = ""
    name = ""
    password = ""
    avatar = "",
    hashed_password = ""
    if request.method =='POST':
        email = request.form['email']
        name = request.form['name']
        password = request.form['password']

        print("PASSWORD REGISTER:", repr(password))

        hashed_password = generate_password_hash(password)

        print("HASH REGISTER:", hashed_password)
        avatar = request.files['avatar']
        if not avatar or avatar.filename == '':
            errors['avatar'] = 'Vui lòng chọn file trước khi upload'
        elif not check_file(avatar.filename):
            errors['avatar'] = 'Chỉ chấp nhận file dạng hình ảnh'
        else:
          avatar.seek(0,os.SEEK_END)
          avatar_size = avatar.tell()
          avatar.seek(0)
          if avatar_size > MAX_FILE_SIZE * 1024 * 1024:
              errors['avatar'] = 'Không được upload file quá 1 MB'
        if not email:
            errors['email'] = 'Vui lòng nhập email'
        if not name:
            errors['name'] = 'Vui lòng nhập tên'
        if not password:
            errors['password'] =  'Vui lòng nhập password'
        if not errors:
            UPLOAD_FOLDERS = os.path.join(current_app.root_path,'uploads')
            # kiểm tra thử mực upload có chưa
            if not os.path.exists(UPLOAD_FOLDERS):
                os.makedirs(UPLOAD_FOLDERS)
            avatar_path = os.path.join(UPLOAD_FOLDERS,avatar.filename)
            avatar.save(avatar_path)
            hashed_password = generate_password_hash(password)
            execute(
                "INSERT INTO register(email,name,password,avatar) VALUES (%s, %s, %s, %s)",(email,name,hashed_password,avatar.filename)
            )
            
            print('Upload file thành công file đã được lưu trong thư mục')
            return redirect ('/login')
    return render_template("register.html",errors = errors,email = email ,name = name,hashed_password = hashed_password,avatar = avatar)


