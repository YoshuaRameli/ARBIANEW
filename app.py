from flask import Flask
from routes.arbia import arbia_bp
from routes.accesibilidad import accesibilidad_bp
from routes.inicio import inicio_bp


app = Flask(__name__)
app.secret_key = 'default_secret_key'

# Registrar el blueprint
app.register_blueprint(arbia_bp)
app.register_blueprint(accesibilidad_bp)
app.register_blueprint(inicio_bp)

@app.route('/')
def home():
    return "Dirigete a arbia :)!"

if __name__ == '__main__':
    app.run(debug=True)

