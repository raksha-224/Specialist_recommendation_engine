import axios from 'axios';

const API_URL = 'https://specialist-recommendation-engine.onrender.com/accounts/';

export const checkHealthFormStatus = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}health/status/`, {
      withCredentials: true,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Adjust based on your backend's actual response format
    return response.data.hasSubmittedForm;
  } catch (error) {
    if (error.response?.status === 401) {
      window.location.href = '/login';
      return false;
    }

    console.error("❌ Error checking health form status:", error.response?.data || error.message);
    throw error;
  }
};
