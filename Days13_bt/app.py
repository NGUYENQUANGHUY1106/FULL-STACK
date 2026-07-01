from flask import Flask,render_template

app = Flask(__name__)

@app.route('/main')
def main():
    return render_template("main.html")
@app.route('/login')
def login():
    return render_template('login.html')
@app.route('/cart')
def cart():
    return render_template('cart.html')
@app.route('/account')
def account():
    return render_template('account.html')
if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1',port=5000)