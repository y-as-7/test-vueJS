import axios from 'axios';
import { BASE_URL } from './endpoints';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',  
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

instance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
    } else if (error.response && error.response.status === 500) {
      console.error('Server error! Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default instance;
