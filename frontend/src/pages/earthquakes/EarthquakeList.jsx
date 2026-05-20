import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchEarthquakes, deleteEarthquake, setFilters, resetFilters, setSort, setPage } from '../../features/earthquakes/earthquakeSlice';
import { useToast } from '../../components/common/Toast';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import EarthquakeTable from '../../components/earthquakes/EarthquakeTable';
import EarthquakeFilters from '../../components/earthquakes/EarthquakeFilters';

import SyncIcon from '@mui/icons-material/Sync';
import api from '../../services/api';

const EarthquakeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { earthquakes, total, pagination, loading, filters, sort } = useSelector((state) => state.earthquakes);
  const user = useSelector((state) => state.auth.user);
  const [deleteId, setDeleteId] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [globalStats, setGlobalStats] = useState({ highMag: 0, deep: 0, reviewed: 0 });

  useEffect(() => { fetchData(); }, [pagination.page, pagination.limit, sort, filters]);

  // Fetch real global counts from backend (not from local paginated earthquakes array)
  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const [highMagRes, deepRes, reviewedRes] = await Promise.all([
          api.get('/stats/earthquakes/high-magnitude-count'),
          api.get('/stats/earthquakes/deep-count'),
          api.get('/stats/earthquakes/reviewed-count'),
        ]);
        setGlobalStats({
          highMag: highMagRes.data.data?.highMagnitudeCount || 0,
          deep: deepRes.data.data?.deepCount || 0,
          reviewed: reviewedRes.data.data?.reviewedCount || 0,
        });
      } catch (err) {
        console.error('Failed to fetch global stats:', err);
      }
    };
    fetchGlobalStats();
  }, []);

  const fetchData = () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      sort,
      ...filters
    };

    // Only delete truly empty values, keep 0
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null || params[key] === '') {
        delete params[key];
      }
    });

    console.log('Fetching earthquakes with params:', params);
    dispatch(fetchEarthquakes(params));
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await api.post('/admin/sync-usgs', {});
      showToast(res.data.message, 'success');
      fetchData();
    } catch (err) {
      showToast('Sync failed', 'error');
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteEarthquake(deleteId));
    showToast(result.error ? (result.payload || 'Delete failed') : 'Earthquake deleted successfully', result.error ? 'error' : 'success');
    setDeleteId(null);
    if (!result.error) fetchData();
  };

  const handlePageChange = (page) => dispatch(setPage(page));
  const handleLimitChange = (limit) => { dispatch(setFilters({ limit })); dispatch(setPage(1)); };
  const handleFilterChange = (key, value) => { dispatch(setFilters({ [key]: value })); dispatch(setPage(1)); };
  const handleResetFilters = () => { dispatch(resetFilters()); dispatch(setPage(1)); };

  if (loading && earthquakes.length === 0) return <Loader />;

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="800">Earthquake Records</Typography>
          <Typography variant="body2" color="textSecondary">Manage and monitor global seismic events</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          {user?.role === 'admin' && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SyncIcon />}
              onClick={handleSync}
              disabled={syncing}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            >
              {syncing ? 'Syncing...' : 'Sync USGS'}
            </Button>
          )}
          {['admin', 'moderator'].includes(user?.role?.trim()) && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => navigate('/earthquakes/create')}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            >
              Add New Event
            </Button>
          )}
        </Box>
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary" gutterBottom>Total</Typography><Typography variant="h4">{total}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary" gutterBottom>High Mag (6+)</Typography><Typography variant="h4" color="error">{globalStats.highMag}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary" gutterBottom>Deep ({'>'}300km)</Typography><Typography variant="h4">{globalStats.deep}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary" gutterBottom>Per Page (Limit)</Typography><Typography variant="h4" color="info.main">{pagination.limit}</Typography></CardContent></Card></Grid>
      </Grid>
      <EarthquakeFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
      <EarthquakeTable
        earthquakes={earthquakes} page={pagination.page} limit={pagination.limit} total={total}
        onPageChange={handlePageChange} onLimitChange={handleLimitChange}
        onView={(id) => navigate('/earthquakes/' + id)} onEdit={(id) => navigate('/earthquakes/' + id + '/edit')}
        onDelete={(id) => setDeleteId(id)} loading={loading}
      />
      <ConfirmDialog open={!!deleteId} title="Delete Earthquake" message="Are you sure? This cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </Box>
  );
};

export default EarthquakeList;

