import axios from 'axios';

const api = axios.create({
  baseURL: 'http://backend:3006'
});

export default api;
