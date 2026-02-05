import axios from "axios";

// Create an Axios instance with a base URL
// Cookie based authentication

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/",
  withCredentials: true,
});

// Add a request interceptor to include the token in headers
// Interceptor to add Authorization header with token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
