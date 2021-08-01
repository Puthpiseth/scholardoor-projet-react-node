import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:8000/users`,
  // credentials: 'include'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers.token = token;
  }
  return config;
});

export default api;