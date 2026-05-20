import api from './api';

const analyticsService = {
  getHighestMagnitude: async (year) => {
    const response = await api.get('/analytics/earthquakes/highest-magnitude', { params: { ...(year && { year }) } });
    return response.data;
  },
  getDeepest: async (limit = 10, year) => {
    const response = await api.get('/analytics/earthquakes/deepest', { params: { limit, ...(year && { year }) } });
    return response.data;
  },
  getRecentActivity: async (days = 30) => {
    const response = await api.get('/analytics/earthquakes/recent-activity', { params: { days } });
    return response.data;
  },
  getCountryAnalysis: async (limit = 10, year) => {
    const response = await api.get('/analytics/earthquakes/country-analysis', { params: { limit, ...(year && { year }) } });
    return response.data;
  },
  getMagnitudeAnalysis: async (year) => {
    const response = await api.get('/analytics/earthquakes/magnitude-analysis', { params: { ...(year && { year }) } });
    return response.data;
  },
  getDepthAnalysis: async (year) => {
    const response = await api.get('/analytics/earthquakes/depth-analysis', { params: { ...(year && { year }) } });
    return response.data;
  },
  getMonthlyAnalysis: async (year = 2015) => {
    const response = await api.get('/analytics/earthquakes/monthly-analysis', { params: { year } });
    return response.data;
  },
  getErrorAnalysis: async () => {
    const response = await api.get('/analytics/earthquakes/error-analysis');
    return response.data;
  }
};

export default analyticsService;
