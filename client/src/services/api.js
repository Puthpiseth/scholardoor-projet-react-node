import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:9000/users`,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type':'application/x-www-form-urlencorded',
  // },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if(token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default api;