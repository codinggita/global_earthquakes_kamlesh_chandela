import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import earthquakeService from '../../services/earthquake.service';

export const fetchEarthquakes = createAsyncThunk('earthquakes/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const response = await earthquakeService.getAll(params);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch earthquakes');
  }
});

export const fetchEarthquakeById = createAsyncThunk('earthquakes/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await earthquakeService.getById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch earthquake');
  }
});

export const createEarthquake = createAsyncThunk('earthquakes/create', async (data, { rejectWithValue }) => {
  try {
    const response = await earthquakeService.create(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create earthquake');
  }
});

export const updateEarthquake = createAsyncThunk('earthquakes/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await earthquakeService.update(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update earthquake');
  }
});

export const deleteEarthquake = createAsyncThunk('earthquakes/delete', async (id, { rejectWithValue }) => {
  try {
    await earthquakeService.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete earthquake');
  }
});

const initialState = {
  earthquakes: [],
  currentEarthquake: null,
  total: 0,
  pagination: { page: 1, limit: 10, totalPages: 0, hasNext: false, hasPrev: false },
  loading: false,
  error: null,
  filters: {
    country: '', magType: '', status: '', minMagnitude: '', maxMagnitude: '',
    minDepth: '', maxDepth: '', net: '', year: '', month: '',
  },
  sort: '-time',
};

const earthquakeSlice = createSlice({
  name: 'earthquakes',
  initialState,
  reducers: {
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
    resetFilters: (state) => { state.filters = initialState.filters; },
    setSort: (state, action) => { state.sort = action.payload; },
    setPage: (state, action) => { state.pagination.page = action.payload; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarthquakes.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEarthquakes.fulfilled, (state, action) => {
        state.loading = false;
        state.earthquakes = action.payload.data;
        state.total = action.payload.total;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEarthquakes.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchEarthquakeById.fulfilled, (state, action) => { state.currentEarthquake = action.payload.data; })
      .addCase(createEarthquake.fulfilled, (state, action) => {
        state.earthquakes.unshift(action.payload.data);
        state.total += 1;
      })
      .addCase(updateEarthquake.fulfilled, (state, action) => {
        const index = state.earthquakes.findIndex(e => e._id === action.payload.data._id);
        if (index !== -1) state.earthquakes[index] = action.payload.data;
        if (state.currentEarthquake?._id === action.payload.data._id) state.currentEarthquake = action.payload.data;
      })
      .addCase(deleteEarthquake.fulfilled, (state, action) => {
        state.earthquakes = state.earthquakes.filter(e => e._id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { setFilters, resetFilters, setSort, setPage, clearError } = earthquakeSlice.actions;
export default earthquakeSlice.reducer;
