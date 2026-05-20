import api from '../../services/api';

export const getAllEarthquakes = async (params) => {
  const response = await api.get('/earthquakes', { params });
  return response.data;
};

export const getEarthquakeById = async (id) => {
  const response = await api.get('/earthquakes/' + id);
  return response.data;
};

export const createEarthquakeAPI = async (data) => {
  const response = await api.post('/earthquakes', data);
  return response.data;
};

export const updateEarthquakeAPI = async (id, data) => {
  const response = await api.patch('/earthquakes/' + id, data);
  return response.data;
};

export const deleteEarthquakeAPI = async (id) => {
  const response = await api.delete('/earthquakes/' + id);
  return response.data;
};
