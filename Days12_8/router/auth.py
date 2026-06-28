import os
from flask import Blueprint,request,current_app,render_template

auth_bp = Blueprint('auth',__name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
max_file_size = 1 

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

def handle_file_upload(files):
        result = {
            "success": False,
            "error": None,
        }
        for file in files:
            if not file or file.filename == '':
                result['error'] = "Vui lòng chọn một file"
                return result
            if not allowed_file(file.filename):
                result['error'] = "Chỉ chấp nhận file ảnh [PNG,JPG,JPEG,GIF]!"
                return result
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file.seek(0)
            if file_size > max_file_size * 1024 *1024:
                result['error'] = "File quá lớn Chỉ tối đa 1 MB"
                return result
        result['success'] = True
        return result
@auth_bp.route('/login',methods = ['GET','POST'])
def login():

    errors = {}
    file = ""

    if request.method == 'POST':
        file = request.files.get('avatar')
        #  iểm tra nội dung của file
        if file:
            print("Thông tin file: ",file)
            print("Tên file: ",file.filename)
            print("Loại file", file.content_type)
            print("Kích thước file: ",len(file.read()))
            file.seek(0)
        files_length = request.files.getlist("avatar") 
        if len(files_length) > 3:
            errors['file'] = "Chi được upload tối đa 3 file"
        else:
            upload_result = handle_file_upload([file])
            if not upload_result['success']:
                errors['file'] = upload_result['error']
        if not errors:
            UPLOAD_FOLDER = os.path.join(current_app.root_path,'uploads')
            # tạo thư mục uploaf nếu chưa có 
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)
            file_path = os.path.join(UPLOAD_FOLDER,file.filename)
            file.save(file_path)
            return render_template(
            "login.html",
            errors={},
            filename=file.filename
    )

    return render_template('login.html',errors=errors,filename= None)