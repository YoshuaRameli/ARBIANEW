from flask import Blueprint, render_template

accesibilidad_bp = Blueprint('accesibilidad', __name__)

@accesibilidad_bp.route('/accesibilidad')
def accesibilidad():
    return render_template('accesibilidad.html')
