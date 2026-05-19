import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import analyticsService from '../../services/analytics.service';

export const fetchCountryAnalysis = createAsyncThunk('analytics/countryAnalysis', async (year, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getCountryAnalysis(10, year);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchMagnitudeAnalysis = createAsyncThunk('analytics/magnitudeAnalysis', async (year, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getMagnitudeAnalysis(year);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchDepthAnalysis = createAsyncThunk('analytics/depthAnalysis', async (year, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getDepthAnalysis(year);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchMonthlyAnalysis = createAsyncThunk('analytics/monthlyAnalysis', async (year, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getMonthlyAnalysis(year);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchHighestMagnitude = createAsyncThunk('analytics/highestMagnitude', async (year, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getHighestMagnitude(year);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchDeepest = createAsyncThunk('analytics/deepest', async (year, { rejectWithValue }) => {
  try {
    const response = await analyticsService.getDeepest(1, year); // limit to 1 since we only need the single deepest event for the card
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

const initialState = {
  countryAnalysis: null,
  magnitudeAnalysis: null,
  depthAnalysis: null,
  monthlyAnalysis: null,
  highestMagnitude: null,
  deepest: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryAnalysis.pending, (state) => { state.loading = true; })
      .addCase(fetchCountryAnalysis.fulfilled, (state, action) => { state.loading = false; state.countryAnalysis = action.payload; })
      .addCase(fetchCountryAnalysis.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMagnitudeAnalysis.fulfilled, (state, action) => { state.magnitudeAnalysis = action.payload; })
      .addCase(fetchDepthAnalysis.fulfilled, (state, action) => { state.depthAnalysis = action.payload; })
      .addCase(fetchMonthlyAnalysis.fulfilled, (state, action) => { state.monthlyAnalysis = action.payload; })
      .addCase(fetchHighestMagnitude.fulfilled, (state, action) => { state.highestMagnitude = action.payload; })
      .addCase(fetchDeepest.fulfilled, (state, action) => { state.deepest = action.payload; });
  },
});

export default analyticsSlice.reducer;
