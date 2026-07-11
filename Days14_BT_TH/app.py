from flask import Flask , Blueprint,render_template,send_from_directory
from datetime import timedelta
from router.register import auth_register
from router.login import auth_login
from router.logout  import logout_bp
from router.account import account_bp
from router.my_products import my_products
from router.add_products import add_products
app = Flask(__name__)
app.secret_key = 'login'
@app.route('/')
def main():
    return render_template('home.html')
# TRẢ FILE
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads',filename)

app.register_blueprint(auth_register)
app.register_blueprint(auth_login)
app.register_blueprint(logout_bp)
app.register_blueprint(account_bp)
app.register_blueprint(my_products)
app.register_blueprint(add_products)
if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1',port=5000)