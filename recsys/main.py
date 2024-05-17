from flask import Flask, request, jsonify
import tensorflow_hub as hub
import tensorflow_text
import uuid
import numpy as np

embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder-multilingual-large/3")

app = Flask(__name__)

@app.route('/embeddings', methods=['POST'])
def get_embeddings():
    sentences_data = request.json

    results = []

    for data in sentences_data:
        sentence = data["sentence"]
        embedding = embed([sentence])[0].numpy().tolist()
        vector = np.linalg.norm(np.array(embedding))
        result = {"id": data["id"], "embedding": vector}
        results.append(result)

    return jsonify(results)

app.run(debug=True, host='0.0.0.0', port=8000)
