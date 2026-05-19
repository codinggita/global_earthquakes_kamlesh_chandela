import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  theme: 'light',
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setTheme: (state, action) => { state.theme = action.payload; },
    showToast: (state, action) => { state.toast = action.payload; },
    hideToast: (state) => { state.toast = null; },
  },
});

export const { toggleSidebar, setTheme, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
