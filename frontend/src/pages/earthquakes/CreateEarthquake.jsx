import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createEarthquake } from '../../features/earthquakes/earthquakeSlice';
import { useToast } from '../../components/common/Toast';
import EarthquakeForm from '../../components/earthquakes/EarthquakeForm';

const CreateEarthquake = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
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
    <Box sx={{ p: 0.5 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/earthquakes')}
        variant="outlined"
        sx={{
          mb: 3.5,
          borderRadius: 3,
          px: 2.2,
          py: 0.8,
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'none',
          borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
          color: 'text.secondary',
          '&:hover': {
            borderColor: '#8b5cf6',
            color: '#8b5cf6',
            bgcolor: 'rgba(139,92,246,0.04)',
            transform: 'translateX(-2px)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Back to List
      </Button>
      <EarthquakeForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default CreateEarthquake;
