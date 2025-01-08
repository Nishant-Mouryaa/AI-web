// src/api/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
 
