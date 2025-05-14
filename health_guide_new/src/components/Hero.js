import React from 'react';
import heroImage from '../image.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero">
          <div className="hero-content">
            <h1>Instant Health Insights</h1>
            <p>
              Welcome to HealthGuide - get potential health insights through our advanced analysis We help you:
            </p>
            <ul style={{ 
              listStyle: 'none', 
              marginBottom: '0',  // Reduced margin since we removed buttons
              color: '#5a6a7e'
            }}>
              <li style={{ marginBottom: '10px' }}>
                ✓ Input your symptoms and get instant disease predictions
              </li>
              <li style={{ marginBottom: '10px' }}>
                ✓ Find qualified specialists based on your diagnosis
              </li>
              <li style={{ marginBottom: '10px' }}>
                ✓ Access personalized health recommendations
              </li>
            </ul>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Health Diagnosis" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
