import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const api = axios.create({
  baseURL: base.endsWith('/api') ? base : `${base}/api`,
});

// Optional: attach token if you don’t already in interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('saapaadu_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
