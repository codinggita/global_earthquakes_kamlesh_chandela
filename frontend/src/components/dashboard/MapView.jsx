import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MapView = ({ earthquakes = [], height = 400 }) => {
  return (
    <Paper sx={{ p: 2, height }}>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 15 }}>
        Map view requires a map library (Leaflet/Google Maps) integration.
        Earthquake coordinates are ready for rendering.
      </Typography>
      <Typography variant="caption" color="text.disabled" display="block" align="center">
        {earthquakes.length} earthquake locations available
      </Typography>
    </Paper>
  );
};

export default MapView;
