import axios from 'axios';

const API_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const register = (email: string, password: string) => {
  return api.post('/register', { email, password });
};

export const getUsers = (page: number) => {
  return api.get(`/users?page=${page}`);
};
