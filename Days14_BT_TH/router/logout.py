from flask  import Flask , render_template , redirect ,Blueprint,session

logout_bp = Blueprint('logout',__name__)
@logout_bp.route('/logout')
def logout():
    session.clear()
    return redirect('/login')