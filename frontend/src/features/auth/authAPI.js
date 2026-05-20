import api from '../../services/api';

export const loginAPI = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logoutAPI = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getProfileAPI = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateProfileAPI = async (data) => {
  const response = await api.patch('/auth/profile', data);
  return response.data;
};
