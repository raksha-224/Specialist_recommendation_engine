// dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import healthService from '../services/health.service';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authService.isLoggedIn()) {
        navigate('/login');
        return;
      }

      try {
        const status = await healthService.checkHealthFormStatus();
        setHasSubmittedForm(status);
        setError(null);
      } catch (error) {
        console.error('Error checking health form status:', error);
        setError('Failed to check health form status');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleCheckSymptoms = () => {
    if (!hasSubmittedForm) {
      navigate('/health-form');
    } else {
      navigate('/predict');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '15px 40px 0',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: 'calc(100vh - 60px)'
    }}>
      <h1 style={{ 
        fontSize: '2.2rem', 
        fontWeight: 'bold',
        marginBottom: '0.3rem',
        color: '#1e2a3a'
      }}>
        Welcome to Your Health Dashboard
      </h1>
      <p style={{ 
        fontSize: '1rem',
        color: '#6c757d',
        marginBottom: '1rem'
      }}>
        Track your health information and get personalized recommendations all in one place.
      </p>

      {/* Health Summary Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '15px 20px',
        marginBottom: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor: '#dc3545',
          borderRadius: '4px 0 0 4px'
        }}></div>
        <h2 style={{ 
          fontSize: '1.3rem',
          fontWeight: 'bold',
          marginBottom: '0.75rem',
          paddingLeft: '10px'
        }}>
          Your Health Summary
        </h2>
        <div style={{ paddingLeft: '10px' }}>
          <h3 style={{ 
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '0.4rem'
          }}>
            {hasSubmittedForm ? 'Profile Complete!' : 'Get Started'}
          </h3>
          <p style={{ 
            color: '#6c757d',
            marginBottom: '0',
            fontSize: '0.95rem'
          }}>
            {hasSubmittedForm 
              ? 'Your health profile is ready. You can now check your symptoms and get instant predictions.'
              : 'Complete your health profile to receive personalized health recommendations.'}
          </p>
        </div>
      </div>

      {/* Action Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '15px 20px',
        marginBottom: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor: '#dc3545',
          borderRadius: '4px 0 0 4px'
        }}></div>
        <h2 style={{ 
          fontSize: '1.3rem',
          fontWeight: 'bold',
          marginBottom: '0.4rem'
        }}>
          {hasSubmittedForm ? 'Ready to Check Symptoms?' : 'Complete Your Health Profile'}
        </h2>
        <p style={{ 
          color: '#6c757d',
          marginBottom: '1rem',
          fontSize: '0.95rem'
        }}>
          {hasSubmittedForm 
            ? 'Get instant health predictions based on your symptoms'
            : 'Fill out your health profile to unlock symptom checking'}
        </p>
        <button
          onClick={handleCheckSymptoms}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.3s ease'
          }}
        >
          {hasSubmittedForm ? 'Check Symptoms' : 'Update Your Profile'}
        </button>
      </div>

      {/* Update Profile Card - Only show if profile is complete */}
      {hasSubmittedForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '15px 20px',
          marginBottom: '5px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: '#dc3545',
            borderRadius: '4px 0 0 4px'
          }}></div>
          <h2 style={{ 
            fontSize: '1.3rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Need to Update Your Profile?
          </h2>
          <button
            onClick={() => navigate('/health-form')}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.3s ease'
            }}
          >
            Update Health Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;