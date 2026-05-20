import api from '../../services/api';

export const getCountryAnalysis = async (limit = 10) => {
  const response = await api.get('/analytics/country-analysis', { params: { limit } });
  return response.data;
};

export const getMagnitudeAnalysis = async () => {
  const response = await api.get('/analytics/magnitude-analysis');
  return response.data;
};

export const getDepthAnalysis = async () => {
  const response = await api.get('/analytics/depth-analysis');
  return response.data;
};

export const getMonthlyAnalysis = async (year) => {
  const response = await api.get('/analytics/monthly-analysis', { params: { year } });
  return response.data;
};
