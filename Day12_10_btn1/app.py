from flask import Flask, render_template, request,session
from router.register import register_bp
from router.login import login_bp

app = Flask(__name__)
app.register_blueprint(register_bp)
app.register_blueprint(login_bp)
app.secret_key ='register';
if __name__ == '__main__':
    app.run(debug=True)