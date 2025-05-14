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
  const [specialists, setSpecialists] = useState([]);

  // Debug: track changes to specialists
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
    setSpecialists([]);
    setMessage('');

    try {
      const csrfToken = getCookie('csrftoken');

      const response = await fetch('http://localhost:8000/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ text: symptoms }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.top_prediction || 'No prediction returned');
        setAlternatives(data.alternatives || []);

        // ✅ Fixed: correct endpoint + limit to 3 specialists
        const specialistResponse = await fetch('http://localhost:8000/specialist/recommend/?limit=3', {
          method: 'GET',
          headers: {
            'X-CSRFToken': csrfToken
          },
          credentials: 'include'
        });

        const specialistData = await specialistResponse.json();
        console.log(specialistData);  // DEBUG

        if (specialistResponse.ok && specialistData.recommended_specialists?.length > 0) {
          setSpecialists(specialistData.recommended_specialists);
          if (specialistData.message) {
            setMessage(specialistData.message);  // fallback message from backend
          }
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

      {message && !specialists.length && <p style={{ color: 'red' }}>{message}</p>}

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

      {prediction && specialists.length > 0 && (
        <div className="specialist-recommendation">
          <h4>Recommended Specialists:</h4>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          <ul>
            {specialists.map((specialist, index) => (
              <li key={index}>
                <strong>{specialist.full_name}</strong> ({specialist.specialty_description})<br />
                {specialist.practice_address_street}, {specialist.practice_address_city}, {specialist.practice_address_state} {specialist.practice_address_zip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
