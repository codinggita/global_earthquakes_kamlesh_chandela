import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...', fullPage = false }) => {
  if (fullPage) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ mt: 2 }}>{message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
      <CircularProgress size={40} />
      <Typography variant="body2" sx={{ ml: 2 }}>{message}</Typography>
    </Box>
  );
};

export default Loader;
