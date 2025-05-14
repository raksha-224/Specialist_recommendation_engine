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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSpecialists = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const csrfToken = getCookie('csrftoken');
      
      const response = await fetch('http://localhost:8000/specialist/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setSpecialists(data);
      } else {
        setMessage("Error loading specialists");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const filteredSpecialists = specialists.filter(spec =>
    spec.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.specialty_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="specialist-container">
      <h2>Find Medical Specialists</h2>

      <input
        type="text"
        placeholder="Search by name or specialty..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <button onClick={fetchSpecialists} disabled={loading} className="refresh-btn">
        {loading ? 'Refreshing...' : 'Refresh List'}
      </button>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {filteredSpecialists.length > 0 ? (
        <div className="results-box">
          <h4>Available Specialists:</h4>
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
        </div>
      ) : (
        !loading && <p>No specialists found matching your search.</p>
      )}
    </div>
  );
};

export default SpecialistPage;