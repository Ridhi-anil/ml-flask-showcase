import React, { useState } from "react";
import "./Form.css";
import Input from "./Input";

export default function Form() {
  const [prediction, setPrediction] = useState();

  const [formsData, setFormData] = useState({
    magnitude: "",
    cdi: "",
    mmi: "",
    sig: "",
    nst: "",
    dmin: "",
    gap: "",
    depth: "",
    latitude: "",
    longitude: "",
    Year: "",
    Month: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formsData),
    });

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="container">
      <h1>Earthquake ML Model Predictor</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        {Object.entries(formsData).map(([key, value]) => (
          <Input
            key={key}
            label={key}
            name={key}
            onChange={(e) => handleChange(e)}
            value={value}
          />
        ))}
        <button type="submit" className="predict-btn">
          Predict
        </button>
      </form>

      {prediction ? (
        prediction == 0 ? (
          <div className="result-box">
            <h2>Prediction Result:</h2>
            <p>Tsunami Not Expected</p>
          </div>
        ) : (
          <div className="result-box">
            <h2>Prediction Result:</h2>
            <p>Tsunami Expected!!</p>
          </div>
        )
      ) : null}
    </div>
  );
}
