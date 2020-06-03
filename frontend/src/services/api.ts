import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const my_api = axios.create({
  // baseURL: 'https://trybe-project-explorer-backend.herokuapp.com',
  baseURL: 'http://localhost:8000',
});

export default api;
