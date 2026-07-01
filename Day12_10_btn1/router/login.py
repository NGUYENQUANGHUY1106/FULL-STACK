from flask import Blueprint,Flask , render_template ,request ,redirect,url_for,session
app = Flask(__name__)

login_bp = Blueprint('login_bp',__name__)
@login_bp.route('/login',methods = ['GET','POST'])
def login():
    email_input = ""
    password_input = ""
    errors = {}
    email = session.get('email');
    password = session.get('password');
    print("Email trong session:", session.get("email"))
    print("Password trong session:", session.get("password"))
    print(dict(session))
    
    if request.method == "POST":
        email_input = request.form.get('email_input')
        password_input = request.form.get('password_input')
        if not email_input:
         errors['email'] = 'Vui lòng nhập Email'
        if not password_input:
         errors['password'] = 'Vui lòng nhập mật khẩu' 
        if email_input == email and password_input == password:
            print ( "Đăng nhập thành công")
        else:
             print ( "Email hoặc mật khẩu không đúng" )
    return render_template("login.html",errors = errors ,email_input = email_input)
