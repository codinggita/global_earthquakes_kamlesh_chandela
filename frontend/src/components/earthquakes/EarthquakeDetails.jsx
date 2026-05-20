import React from 'react';
import { Box, Grid, Paper, Typography, Chip, Divider } from '@mui/material';
import { getMagnitudeColor, formatDate } from '../../utils/helpers';

const DetailRow = ({ label, value }) => (
  <Grid item xs={6} sm={4} md={3}>
    <Typography variant="caption" color="text.secondary">{label}</Typography>
    <Typography variant="body2" fontWeight="medium">{value || 'N/A'}</Typography>
  </Grid>
);

const EarthquakeDetails = ({ earthquake }) => {
  if (!earthquake) return null;

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Earthquake Details</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label={'Mag: ' + earthquake.mag} color={getMagnitudeColor(earthquake.mag)} />
          <Chip label={earthquake.status} color={earthquake.status === 'reviewed' ? 'success' : 'warning'} variant="outlined" />
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={2}>
        <DetailRow label="Earthquake ID" value={earthquake.id} />
        <DetailRow label="Time" value={formatDate(earthquake.time)} />
        <DetailRow label="Place" value={earthquake.place} />
        <DetailRow label="Country" value={earthquake.country} />
        <DetailRow label="Type" value={earthquake.type} />
        <DetailRow label="Magnitude" value={earthquake.mag} />
        <DetailRow label="Mag Type" value={earthquake.magType} />
        <DetailRow label="Depth" value={earthquake.depth + ' km'} />
        <DetailRow label="Latitude" value={earthquake.latitude} />
        <DetailRow label="Longitude" value={earthquake.longitude} />
        <DetailRow label="Network" value={earthquake.net} />
        <DetailRow label="Location Source" value={earthquake.locationSource} />
        <DetailRow label="Mag Source" value={earthquake.magSource} />
        <DetailRow label="Gap" value={earthquake.gap} />
        <DetailRow label="RMS" value={earthquake.rms} />
        <DetailRow label="Dmin" value={earthquake.dmin} />
        <DetailRow label="NST" value={earthquake.nst} />
        <DetailRow label="Mag Error" value={earthquake.magError} />
        <DetailRow label="Mag NST" value={earthquake.magNst} />
        <DetailRow label="Horizontal Error" value={earthquake.horizontalError} />
        <DetailRow label="Depth Error" value={earthquake.depthError} />
        <DetailRow label="Depth Category" value={earthquake.depthCategory} />
        <DetailRow label="Magnitude Category" value={earthquake.magnitudeCategory} />
        <DetailRow label="Year" value={earthquake.year} />
        <DetailRow label="Month" value={earthquake.month} />
        <DetailRow label="Day" value={earthquake.day} />
      </Grid>
    </Paper>
  );
};

export default EarthquakeDetails;
