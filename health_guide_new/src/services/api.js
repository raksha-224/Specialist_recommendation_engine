import axios from 'axios';

const API = axios.create({
  baseURL: 'https://health-backend.onrender.com', // ✅ your backend URL here
  withCredentials: true, // if you’re using session auth / CSRF
});

export default API;
