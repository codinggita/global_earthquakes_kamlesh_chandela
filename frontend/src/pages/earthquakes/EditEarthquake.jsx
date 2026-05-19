import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchEarthquakeById, updateEarthquake } from '../../features/earthquakes/earthquakeSlice';
import { useToast } from '../../components/common/Toast';
import EarthquakeForm from '../../components/earthquakes/EarthquakeForm';
import Loader from '../../components/common/Loader';

const EditEarthquake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/earthquakes')} sx={{ mb: 2 }}>Back to List</Button>
      {currentEarthquake ? <EarthquakeForm initialData={currentEarthquake} onSubmit={handleSubmit} /> : <Typography>Earthquake not found</Typography>}
    </Box>
  );
};

export default EditEarthquake;
