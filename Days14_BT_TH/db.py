import pymysql

def get_connection():
     return pymysql.connect (
          host= "localhost",
          user= "root",
          password= "",
          database= "sell",
          charset= "utf8mb4",
          cursorclass= pymysql.cursors.DictCursor

     )
def fetch_all(sql,params = None):
     
     conn = get_connection()

     cur = conn.cursor()

     cur.execute(sql,params or ())

     result = cur.fetchall()

     cur.close()
     conn.close()

     return result
def fetch_one(sql,params = None):
     conn = get_connection()
     cur  = conn.cursor()

     cur.execute(sql,params or ())

     result = cur.fetchone()

     cur.close()
     conn.close()

     return result
def execute(sql,params = None):
     conn = get_connection()
     cur  = conn.cursor()
     cur.execute(sql, params or ())

     conn.commit()

     cur.close()
     conn.close()