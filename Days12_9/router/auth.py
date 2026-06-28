from flask import Blueprint, Flask, current_app,render_template, request
import os
import re
from  werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth',__name__)
ALLOWED_EXTENSIONS = {'png','jpg','jpeg', 'gif'}
MAX_FILE_SIZE = 1

def allowed_file(filename):
    # tạo hàm kiểm tra ddininhj dạng file truyền vào filename vd abc.jpg
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
def checkMail(email):
    # tạo hàm kiểm tra định dạng email
    pattern  = r'^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(pattern,email) is not None
def handle_file_upload(files):
    result = {
        'success' : False,
        'error' :None
                }
    for file in files:
        if not file or file.filename == '':
        #  kiểm tra xem có tồn tại file hay không
            result['error'] = 'Vui lòng chọn một file'
            return result
        if not allowed_file(file.filename):
            result['error'] = 'Chỉ chấp nhận file ảnh '
            return result
        file.seek(0,os.SEEK_END)
        # chạy đến cuối file để lấy kích thước
        file_size = file.tell()
        # kiểm tra kích thước của file
        file.seek(0)
        #  quay lại đầu file 
        if file_size > MAX_FILE_SIZE  * 1024  * 1024:
            result['error'] = 'Chỉ upload được file có kích thước 1 MB'
            return result
    result['success'] = True
    return result
@auth_bp.route('/login',methods = ['GET','POST'])

def login():
     errors = {}
     email = ""
     password = ""
     file = ""
     hashed_password = ""
     if request.method == 'POST':
        file = request.files.get('avatar')
        email = request.form.get('email','').strip()
        password = request.form.get('password','').strip()
            #  lưu file vào thư mục upload
        if not email:
            errors['email'] = 'Vui lòng nhập email'
        elif not checkMail(email):
            errors['email'] ='Email không đúng định dạng '
        if not password:
            errors['password'] = 'Vui lòng nhập mật khẩu'
        if not errors:
            hashed_password = generate_password_hash(password)
        if file :
         files_length = request.files.getlist('avatar')
        if len(files_length) > 3:
            errors['file'] = "Chỉ upload được tốt đa 3 file"
        else:
            upload_result = handle_file_upload([file])
            # truyền giá trị của hàm kiểm tra ảnh và biến upload__result
            if not upload_result['success']:
                #  nếu k có success = true thì gán lỗi vào biến errors
                errors['file'] =  upload_result['error']
        if not errors:
            UPLOAD_FOLDER = os.path.join(current_app.root_path,'uploads')
            # tạo đường dẩn cho thư mục upload
            if not os.path.exists(UPLOAD_FOLDER):
                # nếu chưa có thư mục upload thì tạo mới
                os.makedirs(UPLOAD_FOLDER)
            file_path = os.path.join(UPLOAD_FOLDER,file.filename)
            file.save(file_path)
            return render_template(
             "index.html",
                  errors=errors,
                 email=email,
               password=password,
              filename=file.filename if file else None,
                 hashed_password=hashed_password
)
     return render_template('index.html',errors = errors,email = email,hashed_password= hashed_password, filename = None,password = password)




