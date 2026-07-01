from flask import Blueprint, Flask , render_template , request,url_for,session,redirect
import re
form_bp = Blueprint('form',__name__)
def check_valid_eamil(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern,email)
@form_bp.route('/form',methods = ['GET','POST'])
def form():
     errors = {}
     email = ""
     password = ""
     city = ""
     if request.method == 'POST':
       email = request.form.get('email','').strip()
       password = request.form.get('password','').strip()
       city  = request.form.get('city','').strip()
       if not email:
        errors['email'] = 'Vui lòng nhập email'
       elif not check_valid_eamil(email):
        errors['email']  ='Email không đúng định dạng'
       if not password :
        errors['password'] = 'Vui lòng nhập password'
       if not city :
        errors['city'] = 'VUi lòng nhập thành phố'
       if not errors:
        new_users =    {
          "email" : email,
          "password" : password,
          "city" :  city
               }
        if 'users' not in session:
         session['users'] = []
        else:
         session['users'].append(new_users)
        session.modified = True
        print(dict(session))
        print( 'Đăng kí thành công')
     return render_template('form.html',email = email,city = city,password = password,errors = errors)  