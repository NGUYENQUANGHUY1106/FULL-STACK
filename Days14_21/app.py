from flask import Flask ,render_template,request,redirect
from db import get_connection

app = Flask(__name__)

@app.route('/add_products',methods = ['GET','POST'])
def add_product():
    if request.method  == 'POST':
        name = request.form['name']
        age = request.form['age']
        country = request.form['country']
        position = request.form['position']
        salary = request.form['salary']

        # kết nối với csdl
        conn = get_connection()

        # tạo con trỏ  để gửi câu lệnh sql đến Mysql
        cur = conn.cursor()

        cur.execute(
            "INSERT INTO club(name,age,country,position,salary) VALUES (%s, %s, %s, %s, %s)",(name,age,country,position,salary)
        )
        
        # lữu duex liệu
        conn.commit()

        cur.close()
        conn.close()

        return redirect('/list_product')
    return render_template('add_products.html')
@app.route('/list_product')
def list_product():
    conn = get_connection()
    cur = conn.cursor()

    # lấy toàn bộ danh sách

    cur.execute(
        "SELECT * FROM  club ORDER BY id ASC"
    )
    # lấy tất cả dữ liệu

    players = cur.fetchall()

    cur.close()
    conn.close()
    return render_template('list_product.html',players = players)
@app.route('/edit_product/<int:id>',methods = ['GET','POST'])
def edit_product(id):
   if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']
        country = request.form['country']
        position = request.form['position']
        salary = request.form['salary']

        conn = get_connection()
        cur =  conn.cursor()

        cur.execute(
            "UPDATE club SET name = %s, age =%s, country = %s,position = %s,salary = %s WHERE id = %s",(name,age,country,position,salary,id)
        )
        conn.commit()

        cur.close()
        conn.close()

        return redirect ('/list_product')
   conn = get_connection()
   cur  = conn.cursor()

   cur.execute(
       "SELECT * FROM club WHERE id = %s",(id,)
   )
   product_ed = cur.fetchone()

   cur.close()
   conn.close()
   return render_template('edit_product.html', product_ed = product_ed)
@app.route('/delete-product/<int:id>')
def delete_product(id):
    conn = get_connection()
    cur  = conn.cursor()
    cur.execute(
        "DELETE FROM club WHERE id = %s",(id,)
    )
    conn.commit()
    cur.close()
    conn.close()

    return redirect ('/list_product')
    
if __name__ == '__main__':
    app.run(debug=True)
