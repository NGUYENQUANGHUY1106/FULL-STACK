import pymysql

def get_connection_database():
    # hàm gọi đến để kết nối với database
    conn = pymysql.connect(
        host='localhost',
        user= 'root',
        password= '',
        database='hoc_sql',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
        # trả về dạng DictCursor
        # {'id': 1, name = 'ok'}
    
    )
    return conn

def fetch_all(sql,params =None):
    # chạy select để trả về tất cả dữ liệu
    conn = get_connection_database()
    cur = conn.cursor()

    cur.execute(sql, params or ())
    # nếu sql là select * from prodcut where id = %s và paramas = (5,) params là giá trị để điền vào idđó parmas đó là khi mà người dùng cần chỉ đến id nào học lấy nhiều tên sản phẩm trùng nhau sẽ truyền vào params nếu k có gì thì nó là ()
    result = cur.fetchall()
    # lấy tất cả các dòng

    cur.close()
    conn.close()

    return result
    #  trả về dữ liệu sau khi lấy
def fetch_one (sql, params =None):
    # chạy select trả về 1 dòng
    conn = get_connection_database()
    cur = conn.cursor()

    cur.execute(sql,params or ())
    result = cur.fetchone()

    cur.close()
    conn.close()

    return result;
def execute(sql,params = None):
    # chạy các lệnh insert,update,delete
    conn = get_connection_database()
    cur = conn.cursor()
    cur.execute(sql,params or ())
    conn.commit()
    # lưu và dữ liệu vào database

    cur.close()
    conn.close()