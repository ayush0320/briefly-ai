import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000"
});

// Add a request interceptor to include the token in headers
// Interceptor to add Authorization header with token from localStorage
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;