from transformers import AutoImageProcessor, TFViTForImageClassification
import tensorflow as tf
import requests
from flask import Flask, request, jsonify
from PIL import Image
from flask_cors import CORS

import os
def loadProcessor():
    image_processor = AutoImageProcessor.from_pretrained('model', local_files_only=True)
    #image_processor = AutoImageProcessor.from_pretrained('skyau/dog-breed-classifier-vit')
    return image_processor
def loadModel():
    model = TFViTForImageClassification.from_pretrained('model', local_files_only=True)
    #model = TFViTForImageClassification.from_pretrained('skyau/dog-breed-classifier-vit')
    return model
app = Flask(__name__)
CORS(app)
app.image_processor = loadProcessor()
app.model = loadModel()

@app.route('/api/predictbreed', methods=['POST'])
def predict():
    data = request.get_json()
    # Verificar si 'image_url' está presente en el objeto JSON o en la cadena de consulta
    if data and 'image_url' in data:
        url = data['image_url']
    elif request.args.get('image_url'):
        url = request.args.get('image_url')
    else:
        return jsonify({'error': 'Parámetro "image_url" no proporcionado'}), 400
    #url = 'https://images.hola.com/imagenes/mascotas/20190820147813/razas-perros-pequenos-parecen-grandes/0-711-550/razas-perro-pequenos-grandes-m.jpg'

    image = Image.open(requests.get(url, stream=True).raw)
    
    inputs = app.image_processor(image, return_tensors="tf")
    logits = app.model(**inputs).logits
    predicted_label = int(tf.math.argmax(logits, axis=-1))
    #breed = app.model.config.id2label[predicted_label]
    response_data = {'breed': predicted_label}
    print(response_data)
    response = jsonify(response_data)
    return response

    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
