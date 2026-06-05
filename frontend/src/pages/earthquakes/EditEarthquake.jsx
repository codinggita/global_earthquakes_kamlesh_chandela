import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchEarthquakeById, updateEarthquake } from '../../features/earthquakes/earthquakeSlice';
import { useToast } from '../../components/common/Toast';
import EarthquakeForm from '../../components/earthquakes/EarthquakeForm';
import Loader from '../../components/common/Loader';

const EditEarthquake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { showToast } = useToast();
  const { currentEarthquake, loading } = useSelector((state) => state.earthquakes);

  useEffect(() => { dispatch(fetchEarthquakeById(id)); }, [dispatch, id]);

  const handleSubmit = async (data) => {
    const result = await dispatch(updateEarthquake({ id, data }));
    if (!result.error) {
      showToast('Earthquake updated successfully', 'success');
      navigate('/earthquakes');
    } else {
      showToast(result.payload || 'Failed to update earthquake', 'error');
    }
  };

  if (loading && !currentEarthquake) return <Loader />;

  return (
    <Box sx={{ p: 0.5 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/earthquakes')}
        variant="outlined"
        sx={{
          mb: 3.5,
          borderRadius: '12px',
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 800,
          borderColor: isDark ? '#ffffff' : '#0f172a',
          borderWidth: '2.5px !important',
          color: isDark ? '#ffffff' : '#0f172a',
          backgroundColor: isDark ? '#161a2b' : '#ffffff',
          boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
          '&:hover': {
            borderColor: '#ff5e7e',
            color: '#ff5e7e',
            boxShadow: '3px 3px 0px 0px #ff5e7e',
            transform: 'translate(-2px, -2px)',
          },
          transition: 'all 0.15s ease',
        }}
      >
        Back to List
      </Button>
      {currentEarthquake ? <EarthquakeForm initialData={currentEarthquake} onSubmit={handleSubmit} /> : <Typography sx={{ mt: 2 }}>Earthquake not found</Typography>}
    </Box>
  );
};

export default EditEarthquake;
