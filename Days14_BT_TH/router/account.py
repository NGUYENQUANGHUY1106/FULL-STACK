from flask import Flask , render_template,session,redirect,request,Blueprint,current_app
from  werkzeug.security import generate_password_hash
from db import execute, fetch_one
import os

account_bp = Blueprint('account',__name__)


@account_bp.route('/account',methods = ['GET','POST'])
def account():
    id = session.get('id')
    if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        avatar = request.files['avatar']
        user = fetch_one(
        "SELECT avatar FROM register WHERE id = %s",(id,))
        avatar_name = user['avatar']
        
        password = request.form['password']
        if avatar and avatar.filename != '':
            upload_folder = os.path.join(current_app.root_path,'uploads')
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            avatar_path = os.path.join(upload_folder,avatar.filename)
            avatar.save(avatar_path)
            avatar_name = avatar.filename
        if password.strip():
            password_new = generate_password_hash(password)

            execute(
            """
            UPDATE register
            SET email=%s, name=%s, avatar=%s, password=%s
            WHERE id=%s
            """,
            (email, name, avatar_name, password_new, id)
            )
        else:
            execute(
                """
                UPDATE register
                SET email=%s, name=%s, avatar=%s
                WHERE id=%s
                """,
                (email, name, avatar_name, id)
            )
            session['name'] = name
        return redirect('/account')
    user =  fetch_one(
        "SELECT * FROM register WHERE id = %s",
        (id,)
    )
    return render_template('account.html', user = user)
        