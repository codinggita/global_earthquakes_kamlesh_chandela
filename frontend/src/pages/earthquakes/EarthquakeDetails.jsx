import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchEarthquakeById } from '../../features/earthquakes/earthquakeSlice';
import EarthquakeDetailsComponent from '../../components/earthquakes/EarthquakeDetails';
import Loader from '../../components/common/Loader';

const EarthquakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { currentEarthquake, loading } = useSelector((state) => state.earthquakes);

  useEffect(() => { dispatch(fetchEarthquakeById(id)); }, [dispatch, id]);

  if (loading && !currentEarthquake) return <Loader />;

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
      {currentEarthquake ? <EarthquakeDetailsComponent earthquake={currentEarthquake} /> : <Typography>Earthquake not found</Typography>}
    </Box>
  );
};

export default EarthquakeDetails;
