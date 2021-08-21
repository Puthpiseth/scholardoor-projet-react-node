import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:9000`,
});

api.interceptors.request.use((config) => {
  // console.log(token)
  if(localStorage.getItem('token')) {
    const {token} = JSON.parse(localStorage.getItem('token'));
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;