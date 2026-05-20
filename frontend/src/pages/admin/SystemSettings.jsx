import React from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Divider } from '@mui/material';

const SystemSettings = () => {
  return (
    <Box><Typography variant="h4" gutterBottom>System Settings</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>General Settings</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Enable notifications" />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Security Settings</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Two-factor authentication" />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Data Settings</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Auto-backup enabled" />
      </Paper>
    </Box>
  );
};

export default SystemSettings;
