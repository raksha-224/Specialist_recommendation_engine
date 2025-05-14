import React, { useState, useEffect } from 'react';
import './SpecialistPage.css';

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

const SpecialistPage = () => {
  const [specialists, setSpecialists] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecommendations = async () => {
    try {
      const csrfToken = getCookie('csrftoken');

      const response = await fetch(`http://localhost:8000/recommend/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setSpecialists(data.recommended_specialists || []);
        setMessage(data.message || '');
        setError('');
      } else {
        setError(data.error || 'Failed to load recommendations');
        setSpecialists([]);
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
      setSpecialists([]);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const filteredSpecialists = specialists.filter(spec =>
    spec.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.specialty_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="specialist-container">
      <h2>Recommended Specialists</h2>

      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Search by name or specialty..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredSpecialists.length > 0 ? (
        <ul className="specialist-list">
          {filteredSpecialists.map((spec) => (
            <li key={spec.npi} className="specialist-item">
              <strong>{spec.full_name}</strong>
              <p>Specialty: {spec.specialty_description}</p>
              <p>Location: {spec.practice_address_city}, {spec.practice_address_state}, {spec.practice_address_zip}</p>
              <p>Organization: {spec.affiliated_organizations}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching specialists found.</p>
      )}
    </div>
  );
};

export default SpecialistPage;
