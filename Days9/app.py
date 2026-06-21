from flask import Flask, jsonify, request,render_template

app = Flask(__name__)





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
    # {'name': 'Nguyễn Văn Cường 1', 'email': 'thehalfheart1@gmail.com', 'age': 29},
    # {'name': 'Nguyễn Văn Cường 2', 'email': 'thehalfheart2@gmail.com', 'age': 29},
    # {'name': 'Nguyễn Văn Cường 3', 'email': 'thehalfheart3@gmail.com', 'age': 29},
    # {'name': 'Nguyễn Văn Cường 4', 'email': 'thehalfheart4@gmail.com', 'age': 29},
    # {'name': 'Nguyễn Văn Cường 5', 'email': 'thehalfheart5@gmail.com', 'age': 29},
    # {'name': 'Nguyễn Văn Cường 6', 'email': 'thehalfheart6@gmail.com', 'age': 29}

    return render_template('table.html', newStudent=students_list)

if __name__ == '__main__':
    app.run(debug=True)