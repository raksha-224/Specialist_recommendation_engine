import axios from 'axios';

const API_URL = 'https://specialist-recommendation-engine.onrender.com/accounts/';

// Function to get a cookie by name
export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// Register a new user
const register = async (username, email, password1, password2) => {
    try {
        const response = await axios.post(API_URL + 'register/', {
            username,
            email,
            password1,
            password2
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Login user
const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + 'login/', {
            username,
            password
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            withCredentials: true
        });

        if (response.data) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Check if user is logged in
const isLoggedIn = () => {
    return localStorage.getItem('token') ? true : false;
};

// Get current user
const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    // In a complete implementation, you would decode the JWT token here
    // and return the user information
    return token;
};

const authService = {
    register,
    login,
    isLoggedIn,
    getCurrentUser
};

export default authService;
