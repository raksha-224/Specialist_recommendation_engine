import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = {
    mission: {
      title: 'Our Mission',
      content: 'To revolutionize healthcare accessibility by providing rapid health insights and seamlessly connecting patients with specialized medical professionals.'
    },
    technology: {
      title: 'Our Technology',
      content: 'We utilize advanced machine learning algorithms and data analysis to predict potential health conditions based on symptoms, ensuring accurate and reliable results.'
    },
    impact: {
      title: 'Our Impact',
      content: 'Helping thousands of users make informed decisions about their health through accurate symptom analysis and specialist recommendations.'
    }
  };

  const stats = [
    { number: '87%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Availability' },
    { number: '1000+', label: 'Disease Database' },
    { number: '300+', label: 'Specialist Network' }
  ];

  return (
    <div className="about-container" style={{ padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1e2a3a'
        }}>
          About HealthGuide
        </h1>

        {/* Interactive Tabs */}
        <div className="tabs-container" style={{
          maxWidth: '800px',
          margin: '0 auto 40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: activeTab === tab ? '#d64550' : '#f8f9fa',
                  color: activeTab === tab ? 'white' : '#1e2a3a',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tabs[tab].title}
              </button>
            ))}
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: '20px',
              textAlign: 'center',
              fontSize: '18px',
              lineHeight: '1.6'
            }}
          >
            {tabs[activeTab].content}
          </motion.div>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <h2 style={{ 
                color: '#d64550', 
                fontSize: '36px',
                marginBottom: '10px'
              }}>
                {stat.number}
              </h2>
              <p style={{ 
                color: '#5a6a7e',
                fontSize: '16px'
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage; 