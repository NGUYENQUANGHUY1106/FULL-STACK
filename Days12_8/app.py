from flask import Flask , send_from_directory
import os
from router.auth import auth_bp
app = Flask(__name__)
app.register_blueprint(auth_bp)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(os.path.join(app.root_path,'uploads'),filename)
if __name__ == '__main__':
    app.run(debug=True)