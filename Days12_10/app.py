from flask import Blueprint, Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'supersecretkey'

@app.route('/login',methods = ['GET','POST'])
def login ():
    if request.method == 'POST':
        session['username'] = request.form['username']
        #  lưu dữ liệu vào session username = tên người dùng nhập vào 
        return redirect(url_for('profile'))
    # rediect chuyển tự động sang trang profile nếu người dùng đã đăng nhập
    return render_template('login.html')
@app.route('/profile')
def profile():
     username = session.get('username')
     if not username:
         return redirect(url_for('login'))
     return render_template("profile.html", username=username)
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))
if __name__ == "__main__":
    app.run(debug=True)