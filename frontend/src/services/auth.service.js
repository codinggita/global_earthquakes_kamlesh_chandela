import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.patch('/auth/profile', data);
    return response.data;
  },
  changePassword: async (data) => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  resetPassword: async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },
  verifyToken: async (token) => {
    const response = await api.post('/auth/jwt/verify-token', { token });
    return response.data;
  },
  refreshToken: async () => {
    const response = await api.post('/auth/jwt/refresh-token');
    return response.data;
  },
  revokeToken: async () => {
    const response = await api.delete('/auth/jwt/revoke-token');
    return response.data;
  }
};

export default authService;
