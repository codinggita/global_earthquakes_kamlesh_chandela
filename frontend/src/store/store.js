import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import earthquakeReducer from '../features/earthquakes/earthquakeSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    earthquakes: earthquakeReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
