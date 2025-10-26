
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth tokens if they exist, e.g., in localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Assuming backend expects a Bearer token
    // config.headers.Authorization = `Bearer ${token}`;
  }
  // The provided PHP scripts seem to rely on POST data rather than JSON bodies for some actions.
  // We may need to adjust content-type per request, for example when uploading files.
  // For now, this is a sensible default.
  return config;
});

export default api;
