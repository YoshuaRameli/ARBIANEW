from flask import Blueprint, render_template

arbia_bp = Blueprint('arbia', __name__)

@arbia_bp.route('/arbia')
def arbia():
    return render_template('arbia.html')
