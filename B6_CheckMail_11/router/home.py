from flask import Blueprint, render_template
# Blueprint chia module thành các phần nhỏ
home_bp = Blueprint('home',__name__)

@home_bp.route('/index')
def home():
    numbers = list(range(1,11))
    return render_template('index.html',numbers=numbers)
