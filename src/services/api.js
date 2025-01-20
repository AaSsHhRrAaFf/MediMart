// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor for adding auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Use localStorage to store tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
