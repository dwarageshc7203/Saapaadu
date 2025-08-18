import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // 👈 your NestJS backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
