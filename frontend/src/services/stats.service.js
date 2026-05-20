import api from './api';

const statsService = {
  getCount: async (year) => {
    const response = await api.get('/stats/earthquakes/count', { params: { ...(year && { year }) } });
    return response.data;
  },
  getHighestMagnitude: async (year) => {
    const response = await api.get('/stats/earthquakes/highest-magnitude', { params: { ...(year && { year }) } });
    return response.data;
  },
  getDeepest: async (year) => {
    const response = await api.get('/stats/earthquakes/deepest', { params: { ...(year && { year }) } });
    return response.data;
  },
  getAverageDepth: async (year) => {
    const response = await api.get('/stats/earthquakes/average-depth', { params: { ...(year && { year }) } });
    return response.data;
  },
  getAverageMagnitude: async (year) => {
    const response = await api.get('/stats/earthquakes/average-magnitude', { params: { ...(year && { year }) } });
    return response.data;
  },
  getCountryCount: async (year) => {
    const response = await api.get('/stats/earthquakes/country-count', { params: { ...(year && { year }) } });
    return response.data;
  },
  getTypeCount: async (year) => {
    const response = await api.get('/stats/earthquakes/type-count', { params: { ...(year && { year }) } });
    return response.data;
  },
  getReviewedCount: async (year) => {
    const response = await api.get('/stats/earthquakes/reviewed-count', { params: { ...(year && { year }) } });
    return response.data;
  },
  getMonthlyCount: async (year) => {
    const response = await api.get('/stats/earthquakes/monthly-count', { params: { year } });
    return response.data;
  },
  getNetworkCount: async (year) => {
    const response = await api.get('/stats/earthquakes/network-count', { params: { ...(year && { year }) } });
    return response.data;
  },
  getHighMagnitudeCount: async (minMag = 6) => {
    const response = await api.get('/stats/earthquakes/high-magnitude-count', { params: { minMag } });
    return response.data;
  },
  getDeepCount: async (minDepth = 300) => {
    const response = await api.get('/stats/earthquakes/deep-count', { params: { minDepth } });
    return response.data;
  },
};

export default statsService;
