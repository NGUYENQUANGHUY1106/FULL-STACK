from flask import Blueprint, render_template, request
import re

auth_bp = Blueprint('auth', __name__)

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    errors = {}
    email = ""
    password = ""
    


    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()

      
        if not email:
            errors['email'] = "Vui lòng nhập Email"
        elif not is_valid_email(email):
            errors['email'] = "Email không hợp lệ"

       
        if not password:
            errors['password'] = "Vui lòng nhập Password"

        
       
           
    return render_template(
        "login.html",
        errors=errors,
        email=email,
        password=password,
       
    )