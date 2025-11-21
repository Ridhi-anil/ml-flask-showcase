from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/predict", methods=["POST"])
def receive():
    data = request.get_json()
    print("Recived data:", data)
    return jsonify({"prediction": "43"})


if __name__ == '__main__':
    app.debug = True
    app.run()
