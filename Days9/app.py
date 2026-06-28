from flask import Flask, jsonify, request,render_template

app = Flask(__name__)




@app.route('/login',methods=['GET','POST'])
def login():
    errors = {} 
    email = ""
    password = ""
    if request.method == 'POST':  
        # get hoặc post dữ liệu
        email = request.form.get('email','').strip()
        # dữ liệu form
        password = request.form.get('password','').strip()
        
        if not email:
            errors['email'] = "Vui Lòng Nhập Email"
        if not password:
            errors['password'] = "Vui lòng nhập Password"
        if not errors:
             return "Đăng nhập thành công"
        
    return render_template('login.html',errors=errors,email=email,password=password)


    
def create_newStudent(count=10):

    students = []
    for i in range(1, count+1):
        student = {
            'name': f'Nguyễn Văn Cường {i}',
            'email': f'thehalfheart{i}@gmail.com',
            'age': 29
        }
        students.append(student)
    return students

@app.route('/')
# tạo mảng từ 1 đến 10 
def home():

    number = [];
    for i in range(1,10):
        number.append(i)
    return render_template('index.html', numbers=number)
@app.route('/students')
def newStudent():
    # gọi hàm đê tẠO Danh sachgs thAY VÌ TẠO THU CÔNG
    students_list = create_newStudent()

    return render_template('table.html', newStudent=students_list)

if __name__ == '__main__':
    app.run(debug=True)