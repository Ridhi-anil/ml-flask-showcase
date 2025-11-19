import React, { useState } from "react";
import "./Form.css";

export default function Form() {
  const [formData, setFormData] = useState({
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
    year: "",
    month: ""
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend endpoint
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="container">
      <h1>Earthquake ML Model Predictor</h1>

      <form onSubmit={handleSubmit} className="form-grid">
        {Object.keys(formData).map((key) => (
          <div key={key} className="input-group">
            <label>{key}</label>
            <input
              type="number"
              step="any"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit" className="predict-btn">Predict</button>
      </form>

      {prediction && (
        <div className="result-box">
          <h2>Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}
