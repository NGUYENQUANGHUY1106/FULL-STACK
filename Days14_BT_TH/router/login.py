from flask import Flask , Blueprint , request ,render_template,session,redirect
from werkzeug.security import generate_password_hash,check_password_hash

from db import execute, fetch_one

auth_login = Blueprint('login', __name__)

@auth_login.route('/login',methods = ['GET','POST'])
def login ():
    errors = {}
    email = ""
    password = ""
    user = ""
    if request.method == 'POST':
      email =  request.form['email']
      password  = request.form['password']
    if not email :
       errors['email']  = 'Vui lòng nhập email'
    if not password :
       errors['password'] = 'Vui lòng nhập password'
    if not errors:
        user =   fetch_one(
          "SELECT * FROM register WHERE  email = %s ",(email,)
       )
      
    if user:    
        # print("pw DB",user['password'])
        # print("pw input", password)
        result = check_password_hash(user['password'],password)
        print(result)
        if result:
              session['email'] = user['email']
              session['name'] = user['name']
              session['id'] = user['id']
              print(dict(session))
              return redirect('/')
        else:
           print("sai mật khẩu")
           errors['password'] = 'Mật khẩu chưa đúng'
    else:
       print("không tìm thấy tài khoản")
       errors['email'] = 'không tìm thấy email '
        

    
    
    return render_template('login.html',errors = errors,email = email , password = password)