import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createEarthquake } from '../../features/earthquakes/earthquakeSlice';
import { useToast } from '../../components/common/Toast';
import EarthquakeForm from '../../components/earthquakes/EarthquakeForm';

const CreateEarthquake = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleSubmit = async (data) => {
    const result = await dispatch(createEarthquake(data));
    if (!result.error) {
      showToast('Earthquake created successfully', 'success');
      navigate('/earthquakes');
    } else {
      showToast(result.payload || 'Failed to create earthquake', 'error');
    }
  };

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/earthquakes')} sx={{ mb: 2 }}>Back to List</Button>
      <EarthquakeForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default CreateEarthquake;
