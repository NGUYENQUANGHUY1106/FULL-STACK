from flask import session ,request,render_template,url_for,Blueprint

import re

table_bp = Blueprint('table',__name__)

@table_bp.route('/table')
def table():
    session_data =  session.get('users',[])
    return render_template('table.html',session_data= session_data)