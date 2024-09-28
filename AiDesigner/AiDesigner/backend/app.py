from flask import Flask, request, jsonify
import random
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'  # Asegúrate de que esta carpeta exista
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/generate-design', methods=['POST'])
def generate_design():
    if 'bocetos' in request.files:
        files = request.files.getlist('bocetos')
        for file in files:
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    data = request.form  # Cambiado para manejar datos de formulario en lugar de JSON
    
    industry = data.get('industry')
    style = data.get('style')
    color = data.get('color')
    font = data.get('font')
    columns = data.get('columns')
    menu = data.get('menu')
    
    print(f"Industry: {industry}, Style: {style}, Color: {color}, Font: {font}, Columns: {columns}, Menu: {menu}, File: {filename}")
    
    # Lógica para generar diseño
    design = {
        'backgroundColor': color,
        'fontFamily': font,
        'gridTemplateColumns': f'repeat({columns}, 1fr)',
        'menuStyle': menu,
        'layoutStyle': random.choice(['classic', 'modern', 'grid']),  # Ejemplo de generación aleatoria
    }

    return jsonify({'design': design})

if __name__ == '__main__':
    app.run(debug=True)
