import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const RegisterPage = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Basic validation
    if (formData.password1 !== formData.password2) {
      setErrorMessage('Passwords do not match');
      setLoading(false);
      return;
    }

        try {
      await authService.register(
        formData.username,
        formData.email,
        formData.password1,
        formData.password2
      );
      
      await authService.login(formData.username, formData.password1);
      setIsLoggedIn(true);
      navigate("/health-form");

    } catch (error) {
      const errorData = error?.response?.data;

      if (errorData) {
        const firstKey = Object.keys(errorData)[0];
        setErrorMessage(errorData[firstKey][0] || 'Registration failed.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create an Account</h2>
        
        {errorMessage && (
          <div className="error-message" style={{ marginBottom: '20px', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              id="password1"
              name="password1"
              className="form-control"
              value={formData.password1}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              className="form-control"
              value={formData.password2}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="form-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
