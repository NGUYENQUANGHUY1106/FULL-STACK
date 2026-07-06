import pymysql
def get_connection():
    conn = pymysql.connect(
        host = "localhost",
        user = "root",
        password= "",
        database= "hoc_sql",
        charset= "utf8mb4",
        cursorclass= pymysql.cursors.DictCursor

    )
    return conn
    