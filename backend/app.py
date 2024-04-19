from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods = ['POST'])
def analyze():
    data = request.get_json()
    tweet = data['tweet']
    analysis = TextBlob(tweet)
    if analysis.sentiment.polarity > 0:
        sentiment = 'Positive'
    elif analysis.sentiment.polarity == 0:
        sentiment = 'Neutral'
    else:
        sentiment = 'Negative'
    return jsonify(sentiment = sentiment)

if __name__ == '__main__':
    app.run(debug = True, port = 5000)
    
