from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
with open('spam_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = [data['message']]
    vectorized = vectorizer.transform(message)
    prediction = model.predict(vectorized)[0]
    result = "Spam" if prediction == 1 else "Not Spam"
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
