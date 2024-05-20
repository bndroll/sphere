from flask import Flask, request, jsonify
#import tensorflow_hub as hub
#import tensorflow_text
import uuid
import numpy as np

#embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder-multilingual-large/3")

app = Flask(__name__)

@app.route('/embeddings', methods=['POST'])
def get_embeddings():
    data = request.json

#    data["sentence"]
#    embedding = embed([sentence])[0].numpy().tolist()
#    vector = np.linalg.norm(np.array(embedding))
    result = {"id": data["id"], "embedding": 0}

    return jsonify(result)

app.run(debug=True, host='0.0.0.0', port=8070)