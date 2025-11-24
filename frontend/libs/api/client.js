import axios from 'axios';

// Use VITE_API_BASE_URL from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://10.200.40.129:5000/api'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
