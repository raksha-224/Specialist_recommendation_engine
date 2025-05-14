import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Optional: use to decode JWT

const API_URL = 'https://specialist-recommendation-engine.onrender.com/accounts/';

// Function to get a cookie by name (for CSRF if needed)
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
                'Content-Type': 'application/json'
                // Uncomment if backend needs CSRF
                // 'X-CSRFToken': getCookie('csrftoken')
            }
        });
        return response.data;
    } catch (error) {
        console.error("❌ Registration error:", error?.response?.data || error.message);
        throw error?.response?.data || { error: "Registration failed" };
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
                'Content-Type': 'application/json'
            }
        });

        if (response.data?.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error("❌ Login error:", error?.response?.data || error.message);
        throw error?.response?.data || { error: "Login failed" };
    }
};

// Logout user
const logout = () => {
    localStorage.removeItem('token');
};

// Check if user is logged in
const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

// Get current user (decoded from token)
const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch (e) {
        console.warn("⚠️ Invalid token");
        return null;
    }
};

const authService = {
    register,
    login,
    logout,
    isLoggedIn,
    getCurrentUser
};

export default authService;
