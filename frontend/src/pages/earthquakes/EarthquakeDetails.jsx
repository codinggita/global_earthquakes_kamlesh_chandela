import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchEarthquakeById } from '../../features/earthquakes/earthquakeSlice';
import EarthquakeDetailsComponent from '../../components/earthquakes/EarthquakeDetails';
import Loader from '../../components/common/Loader';

const EarthquakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEarthquake, loading } = useSelector((state) => state.earthquakes);

  useEffect(() => { dispatch(fetchEarthquakeById(id)); }, [dispatch, id]);

  if (loading && !currentEarthquake) return <Loader />;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/earthquakes')} sx={{ mb: 2 }}>Back to List</Button>
      {currentEarthquake ? <EarthquakeDetailsComponent earthquake={currentEarthquake} /> : <Typography>Earthquake not found</Typography>}
    </Box>
  );
};

export default EarthquakeDetails;
