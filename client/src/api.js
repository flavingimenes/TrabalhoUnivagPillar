import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000
});
export const auth = axios.create({
  baseURL: 'http://localhost:3001/auth',
  timeout: 10000
});

// anexa token
const withToken = (config) => {
  const t = localStorage.getItem('token');
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
};
api.interceptors.request.use(withToken);
auth.interceptors.request.use(withToken);

// se o token expirar, desloga
const onUnauthorized = (error) => {
  if (error?.response?.status === 401) {
    localStorage.clear();
    window.location.href = '/login';
  }
  return Promise.reject(error);
};
api.interceptors.response.use(r => r, onUnauthorized);
auth.interceptors.response.use(r => r, onUnauthorized);
