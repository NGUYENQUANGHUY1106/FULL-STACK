from flask import Flask, jsonify, request, render_template

app = Flask(__name__)
@app.route('/bai1',methods = ['GET','POST'])
def bai1():
    errors = {}
    number = ""

    if  request.method == 'POST':
        number = request.form.get('number','').strip()
        
        if not number:
            errors['number'] = "Vui lòng nhập số để kiểm tra"
        else:
           number = int(number)

           if number % 7 == 0:
            return f"Số {number} chia hết cho 7"
           else:
            return f"Số {number} không chia hết cho 7"
         
    return render_template('bai1.html',errors=errors,number=number)

@app.route('/bai2',methods = ['GET','POST'])
def bai2():
    errors = {}
    toan = ""
    ly = ""
    hoa = ""

    sum = 0 


    if request.method == 'POST':
        toan = request.form.get('toan','').strip()
        ly = request.form.get('ly','').strip()
        hoa = request.form.get('hoa','').strip()
        if not toan:
            errors['toan'] = "Vui lòng nhập điểm môn Toán"
        if not ly :
            errors['ly'] = "Vui lòng nhập điểm môn lý"
        if not hoa:
            errors['hoa'] = "Vui lòng nhập điểm môn hóa"
        else:
            toan = float(toan)
            ly = float(ly)
            hoa = float(hoa)
        if toan == 1 or ly == 1 or hoa == 1:
            return "Điểm liệt"
        if not errors:
            sum = float(toan) + float(ly) + float(hoa)
            if sum >=15:
                return f"Đậu tốt nghiệp với tổng điểm là {sum}"
            else:
                return f"Rớt tốt nghiệp với tổng điểm là {sum}"
    return render_template('bai2.html', errors=errors, toan=toan, ly=ly, hoa=hoa)

@app.route('/bai3',methods = ['GET','POST'])
def bai3():
    errors = {}
    toan = ""
    ly = ""
    hoa = ""
    tienganh = ""
    van = ""
    lichsu = ""

    tbc = 0 


    if request.method == 'POST':
        toan = request.form.get('toan','').strip()
        ly = request.form.get('ly','').strip()
        hoa = request.form.get('hoa','').strip()
        tienganh = request.form.get('tienganh','').strip()
        van = request.form.get('van','').strip()
        lichsu = request.form.get('lichsu','').strip()
        if not toan:
            errors['toan'] = "Vui lòng nhập điểm môn Toán"
        if not ly :
            errors['ly'] = "Vui lòng nhập điểm môn lý"
        if not hoa:
            errors['hoa'] = "Vui lòng nhập điểm môn hóa"
        if not tienganh:
            errors['tienganh'] = "Vui lòng nhập điểm môn Tiếng Anh"
        if not van:
            errors['van'] = "Vui lòng nhập điểm môn Văn"
        if not lichsu:
            errors['lichsu'] = "Vui lòng nhập điểm môn Lịch Sử"
        if float(toan) == 4 or float(ly) == 4 or float(hoa) == 4 or float(tienganh) == 4 or float(van) == 4 or float(lichsu) == 4:
            return "Học sinh yếu"
        if float(toan) <0 or float(toan) >10 or float(ly) <0 or float(ly) >10 or float(hoa) <0 or float(hoa) >10 or float(tienganh) <0 or float(tienganh) >10 or float(van) <0 or float(van) >10 or float(lichsu) <0 or float(lichsu) >10:
            return "Điểm không hợp lệ"
        if not errors: 
            tbc =(float(toan) + float(ly) + float(hoa) + float(tienganh) + float(van) + float(lichsu)) / 6
            if tbc <5:
                return f"Học sinh yếu điểm tbc là {tbc}"
            elif tbc >=5 and tbc <6.5:
                return f"học sinh trung bình điểm tbc là {tbc}"
            elif tbc >=6.5 and tbc <7.9:
                return f"học sinh khá điểm tbc là {tbc}"
            elif tbc >=7.9 and tbc <= 10:
                return f"học sinh giỏi điểm tbc là {tbc}"
    return render_template('bai3.html', errors=errors, toan=toan, ly=ly, hoa=hoa, tienganh=tienganh, van=van, lichsu=lichsu)
if __name__ == '__main__':
    app.run(debug=True)