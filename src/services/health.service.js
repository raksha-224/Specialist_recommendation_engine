import axios from 'axios';

const API_URL = 'http://localhost:8000/accounts/';

const checkHealthFormStatus = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL + 'health/status/', {
            withCredentials: true,
            headers: {
                'Authorization': `Token ${token}`
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