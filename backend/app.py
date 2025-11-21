from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/predict", methods=["POST"])
def receive():
    data = request.get_json()
    print("Recived data:", data)
    return {"prediction: 43"}
