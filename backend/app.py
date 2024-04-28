from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import torch
from models import * 

import sys
sys.path.append('./models')

# Relative imports assuming 'models' folder is structured correctly
from api import predict_text

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/api/analyze', methods=['POST'])
def api_analyze():
    content = request.json
    tweet = content['tweet']
    sentiment_label = predict_text(tweet, False)
    topic_label = predict_text(tweet, True)
    return jsonify({'sentiment': sentiment_label, 'topic': topic_label})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
