from flask import Blueprint, Flask,render_template,request,current_app,session
import re 
import os
from router.form import form_bp
from router.table import table_bp
app = Flask(__name__)
app.secret_key ='Login';
app.register_blueprint(form_bp)
app.register_blueprint(table_bp)

if __name__ == '__main__':
    app.run(debug=True)

 