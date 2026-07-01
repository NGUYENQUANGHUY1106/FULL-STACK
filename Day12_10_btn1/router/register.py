from unittest import result
from datetime import timedelta
from flask import Blueprint,render_template,request,current_app,session
import re
import os
register_bp = Blueprint('register',__name__)
AllOWED_extensions = {'png','jpg','jpeg', 'gif'}
MAX_FILE_SIZE = 1
def check_valid_email(email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return  re.match(pattern,email)
def check_allowed_file(filename):
      return '.' in filename and filename.rsplit('.',1)[1].lower() in AllOWED_extensions

def handle_file_upload(files):
    result = {
           'success' : False,
           'error' : None
     }
    for file in files:
          if not file or file.filename == '':
                result['error'] = 'Vui lòng chọn một file'
                return result
          if not check_allowed_file(file.filename):
                result['error'] = 'Chỉ chấp nhận file ảnh'
                return result
          file.seek(0,os.SEEK_END)
          file_size = file.tell()
          file.seek(0)
          if file_size > MAX_FILE_SIZE * 1024 * 1024:
                result['error'] = 'Chỉ upload được file có kích thước 1MB'
                return result
    result['success'] = True
    return result
    

@register_bp.route('/register',methods = ['GET','POST'])
def register():
    errors = {}
    email = ""
    password = ""
    file = ""
    if request.method == 'POST':
      email = request.form.get('email','').strip()
      password = request.form.get('password','').strip()
      file = request.files.get('avatar')
      if not file or file.filename == '':
           errors['file'] = 'Vui Lòng chọn file'
      if not email:
           errors['email'] = 'Vui lòng nhập email'
      elif not check_valid_email(email):
           errors['email'] = 'Email không đúng định dạng'
      if not password:
           errors['password'] = 'Vui lòng nhập password'
      file_length = request.files.getlist('avatar')
      if file :
       if len(file_length) >3:
           errors['file'] = 'Chỉ được upload tối đa 3 file'
       else:
           upload_result = handle_file_upload([file])
           if not upload_result['success']:
                errors['file'] = upload_result['error']
      if not errors:
            upload_folder = os.path.join(current_app.root_path,'uploads')
            if not os.path.exists(upload_folder):
                  os.makedirs(upload_folder)
            file_path = os.path.join(upload_folder,file.filename)
            file.save(file_path)
            session['email'] = email
            session['password'] = password
            print("đăng kí thành công")
            
            
            return render_template("register.html",errors = errors ,email = email ,password = password ,filename =file.filename if file else None)
    return render_template("register.html",errors = errors,email = email ,password = password ,filename = None)
            
                  
