import React, { useState, useEffect } from 'react';
import './PredictionPage.css';

// Helper to read CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const trimmed = cookie.trim();
      if (trimmed.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(trimmed.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const PredictionPage = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [specialists, setSpecialists] = useState([]);  // State for specialists

  // UseEffect to track changes in specialists (for debugging purposes)
  useEffect(() => {
    console.log("Specialists updated:", specialists);
  }, [specialists]);

  const handlePredict = async () => {
    if (!symptoms.trim()) {
      alert("Please enter your symptoms.");
      return;
    }

    setLoading(true);
    setPrediction('');
    setAlternatives([]);
    setSpecialists([]);  // Reset specialists
    setMessage('');

    try {
      const csrfToken = getCookie('csrftoken');  // ✅ Read CSRF token

      const response = await fetch('http://localhost:8000/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken  // ✅ Send CSRF token
        },
        credentials: 'include',      // ✅ Send session cookie
        body: JSON.stringify({ text: symptoms }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.top_prediction || 'No prediction returned');
        setAlternatives(data.alternatives || []);

        // Now fetch specialists based on the prediction
        const specialistResponse = await fetch(`http://localhost:8000/recommend/?disease=${data.top_prediction}`, {
          method: 'GET',
          headers: {
            'X-CSRFToken': csrfToken,  // Send CSRF token for recommendation
          },
          credentials: 'include', // Include session cookie
        });

        const specialistData = await specialistResponse.json();
        console.log(specialistData); // Debugging: Log the specialist data

        if (specialistResponse.ok) {
          setSpecialists(specialistData.recommended_specialists || []);  // Set specialist data if available
        } else {
          setMessage("❌ No specialists found for this disease.");
        }
      } else {
        setMessage("❌ Error: " + JSON.stringify(data));
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <h2>How are you feeling today?</h2>

      <textarea
        rows="4"
        placeholder="Describe your symptoms (e.g. headache, sore throat)..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="symptom-input"
      />

      <button onClick={handlePredict} disabled={loading} className="predict-btn">
        {loading ? 'Predicting...' : 'Get Prediction'}
      </button>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {prediction && (
        <div className="result-box">
          <h4>Top Prediction:</h4>
          <p>{prediction}</p>

          {alternatives.length > 0 && (
            <>
              <h4>Other Possibilities:</h4>
              <ul>
                {alternatives.map((alt, index) => (
                  <li key={index}>
                    {alt.disease}: {(alt.probability * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Display specialists only after prediction is made */}
      {prediction && specialists.length > 0 ? (
        <div className="specialist-recommendation">
          <h4>Recommended Specialists:</h4>
          <ul>
            {specialists.map((specialist, index) => (
              <li key={index}>
                <strong>{specialist.full_name}</strong> ({specialist.specialty_description})<br />
                {specialist.practice_address_street}, {specialist.practice_address_city}, {specialist.practice_address_state} {specialist.practice_address_zip}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        prediction && <p>No specialists found for this disease.</p> // Show this only if a prediction has been made
      )}
    </div>
  );
};

export default PredictionPage;
