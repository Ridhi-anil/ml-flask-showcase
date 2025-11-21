from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd


app = Flask(__name__)
CORS(app)

model = joblib.load("./model/model.pkl")
colnames = joblib.load("./model/cols.pkl")


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/predict", methods=["POST"])
def receive():
    # take the input from user
    data = request.get_json()
    # convert the json file to a dataFrame
    df = pd.DataFrame([data])
    df = df.reindex(columns=colnames)

    # predict the values
    prediction = model.predict(df)[0]

    return jsonify({"prediction": str(prediction)})


if __name__ == '__main__':

    app.debug = True
    app.run()
