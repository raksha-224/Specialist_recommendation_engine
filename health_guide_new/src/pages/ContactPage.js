import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      content: '+1 (555) 123-4567',
      delay: 0.1
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'support@healthguide.com',
      delay: 0.2
    },
    {
      icon: '📍',
      title: 'Location',
      content: 'Santa Clara, CA',
      delay: 0.3
    }
  ];

  return (
    <div className="contact-container" style={{ padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1e2a3a'
        }}>
          Contact Us
        </h1>

        {/* Contact Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: info.delay }}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{info.icon}</div>
              <h3 style={{ marginBottom: '10px', color: '#1e2a3a' }}>{info.title}</h3>
              <p style={{ color: '#5a6a7e' }}>{info.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage; 
