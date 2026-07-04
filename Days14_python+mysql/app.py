from flask import Flask , render_template,request,redirect
from db import execute, fetch_all, get_connection_database

app = Flask(__name__)

@app.route('/add_players',methods = ['GET','POST'])
def add_players():
    errors = {}
    name = ""
    position = ""
    salary = ""
    nationality = ""
    exp = ""
    if request.method == 'POST':
        name = request.form['name']
        position = request.form['position']
        salary = request.form['salary']
        nationality =  request.form['nationality']
        exp = request.form['exp']
        conn = get_connection_database()
        cur = conn.cursor()
        if not name :
            errors['name'] = 'Vui lòng nhập tên cầu thủ'
        if not position:
            errors['position'] = 'Vui lòng nhập vị trí'
        if not salary:
            errors['salary'] = 'Lương không được để trống'
        if not nationality:
            errors['nationality'] = 'Hãy nhập quốc tịch'
        if not exp :
            errors['exp'] = 'Vui lòng nhập số năm đã thi đấu chuyên nghiệp'
        if not errors:
         cur.execute("INSERT INTO players (name,position,salary,nationality,exp) VALUES (%s, %s, %s, %s , %s)",(name,position,salary,nationality,exp)
                    )    
        #  lưu dữ liệu xuống database
         conn.commit()
        # đóng kết nối
         cur.close()
         conn.close()
         return redirect ('/list_players')

        
        # quay lại trang list players
    return render_template('add_players.html',errors = errors ,name = name,position = position,salary = salary,nationality = nationality,exp = exp)

@app.route('/list_players')
def list_players():
    conn  = get_connection_database()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM players ORDER BY id ASC"
    )
    players = cur.fetchall()
    #  biến đổi thành có Dictcursor để có id và value
    print (players)
    return render_template("list_players.html",players = players)
if __name__ == '__main__':
    app.run(debug=True)
    # sử dụng dictCursor sẽ cho ra mảng Dict gọi tới giá trị bằng tên cột 
    #  nếu muốn gọi đến [0], [1] thì bỏ dòng nó sẽ ra một mảng tuple có số tương ứng vs giá trị 0,1,2,3,4,5