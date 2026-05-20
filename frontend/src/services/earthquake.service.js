import api from './api';

const earthquakeService = {
  getAll: async (params) => {
    const response = await api.get('/earthquakes', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get('/earthquakes/' + id);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/earthquakes', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.patch('/earthquakes/' + id, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete('/earthquakes/' + id);
    return response.data;
  },
  checkExists: async (id) => {
    const response = await api.get('/earthquakes/exists/' + id);
    return response.data;
  },
  bulkCreate: async (data) => {
    const response = await api.post('/earthquakes/bulk-create', data);
    return response.data;
  },
  bulkUpdate: async (data) => {
    const response = await api.patch('/earthquakes/bulk-update', data);
    return response.data;
  },
  bulkDelete: async (ids) => {
    const response = await api.delete('/earthquakes/bulk-delete', { data: { ids } });
    return response.data;
  },
  getByCountry: async (country, params) => {
    const response = await api.get('/earthquakes/country/' + country, { params });
    return response.data;
  },
  getByPlace: async (place) => {
    const response = await api.get('/earthquakes/place/' + place);
    return response.data;
  },
  getHighMagnitude: async (params) => {
    const response = await api.get('/earthquakes/high-magnitude', { params });
    return response.data;
  },
  getDeep: async (params) => {
    const response = await api.get('/earthquakes/deep', { params });
    return response.data;
  },
  getRecent: async (params) => {
    const response = await api.get('/earthquakes/recent', { params });
    return response.data;
  },
  getCritical: async () => {
    const response = await api.get('/earthquakes/critical');
    return response.data;
  },
  getFiltered: async (filterType, params) => {
    const response = await api.get(`/earthquakes/filter/${filterType}`, { params });
    return response.data;
  },
  getRandom: async () => {
    const response = await api.get('/earthquakes/random');
    return response.data;
  }
};

export default earthquakeService;
