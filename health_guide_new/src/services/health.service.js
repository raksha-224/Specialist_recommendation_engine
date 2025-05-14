import axios from 'axios';

// ✅ Updated API URL for Render backend
const API_URL = 'https://specialist-recommendation-engine.onrender.com/accounts/';

const checkHealthFormStatus = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL + 'health/status/', {
            withCredentials: true,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.hasSubmittedForm;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // If unauthorized, redirect to login
            window.location.href = '/login';
            return false;
        }
        console.error('Error checking health form status:', error);
        throw error; // Let the component handle the error
    }
};

const healthService = {
    checkHealthFormStatus
};

export default healthService;
