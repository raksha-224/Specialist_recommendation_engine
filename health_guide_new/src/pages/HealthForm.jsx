import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HealthForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    contact_number: "",
    email: "",
    residential_address: "",
    known_allergies: "",
    existing_conditions: "",
    current_medications: "",
    pincode: "",
    past_surgeries: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://specialist-recommendation-engine.onrender.com/accounts/health/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Health form submitted successfully!");
        setFormData({
          full_name: "",
          date_of_birth: "",
          gender: "",
          contact_number: "",
          email: "",
          residential_address: "",
          known_allergies: "",
          existing_conditions: "",
          current_medications: "",
          pincode: "",
          past_surgeries: "",
        });
      } else {
        setMessage(
          "❌ Error: " +
            (result.errors
              ? JSON.stringify(result.errors)
              : result.message || "Unknown error")
        );
      }
    } catch (error) {
      setMessage("❌ Error submitting form: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>🩺 Patient Health Registration</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([field, value]) => (
          <div key={field} style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}:
            </label>
            <input
              type={field === "date_of_birth" ? "date" : "text"}
              name={field}
              value={value}
              onChange={handleChange}
              required={
                field !== "known_allergies" &&
                field !== "current_medications" &&
                field !== "past_surgeries"
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}

      {message.startsWith("✅") && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/predict")}
          >
            Go to Symptom Checker →
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthForm;
