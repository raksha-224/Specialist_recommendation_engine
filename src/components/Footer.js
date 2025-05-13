import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '8px 0',
      backgroundColor: 'transparent',
      textAlign: 'center',
      position: 'relative',
      width: '100%',
      marginTop: '0'
    }}>
      <p style={{ 
        margin: 0,
        fontSize: '0.85rem',
        color: '#6c757d',
        opacity: 0.8
      }}>&copy; {new Date().getFullYear()} HealthGuide. All rights reserved.</p>
    </footer>
  );
};

export default Footer;