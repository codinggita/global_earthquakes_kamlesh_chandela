import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography, Card, CardContent, Button, Chip, Fade, LinearProgress, Divider } from '@mui/material';
import EarthquakeIcon from '@mui/icons-material/Terrain';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RefreshIcon from '@mui/icons-material/Refresh';
import { fetchEarthquakes } from '../../features/earthquakes/earthquakeSlice';
import RecentActivity from '../../components/dashboard/RecentActivity';
import StatCard from '../../components/dashboard/StatCard';
import Loader from '../../components/common/Loader';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { earthquakes, total, loading } = useSelector((state) => state.earthquakes);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  const [globalStats, setGlobalStats] = useState({ highMag: 0, deep: 0, reviewed: 0 });

  useEffect(() => {
    dispatch(fetchEarthquakes({ page: 1, limit: 5, sort: '-time' }));
    fetchGlobalStats();

    let interval;
    if (isLive) {
      interval = setInterval(() => {
        dispatch(fetchEarthquakes({ page: 1, limit: 5, sort: '-time' }));
        fetchGlobalStats();
        setLastUpdated(new Date());
      }, 30000); // Refresh every 30 seconds
    }

    return () => clearInterval(interval);
  }, [dispatch, isLive]);

  const fetchGlobalStats = async () => {
    try {
      const [highMagRes, deepRes, reviewedRes] = await Promise.all([
        import('../../services/api').then(m => m.default.get('/earthquakes/high-magnitude?limit=1')),
        import('../../services/api').then(m => m.default.get('/earthquakes/deep?limit=1')),
        import('../../services/api').then(m => m.default.get('/stats/earthquakes/reviewed-count'))
      ]);
      setGlobalStats({
        highMag: highMagRes.data.pagination?.total || highMagRes.data.data?.length || 0,
        deep: deepRes.data.pagination?.total || deepRes.data.data?.length || 0,
        reviewed: reviewedRes.data.data?.reviewedCount || 0
      });
    } catch (err) {
      console.error('Error fetching global stats:', err);
    }
  };

  const handleManualRefresh = () => {
    dispatch(fetchEarthquakes({ page: 1, limit: 5, sort: '-time' }));
    fetchGlobalStats();
    setLastUpdated(new Date());
  };

  if (loading && earthquakes.length === 0) return <Loader />;

  return (
    <Box sx={{ p: 1 }}>
      {/* ── Header ─────────────────────────────── */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2.5, mb: 3.5 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'text.primary',
              mb: 0.5,
            }}
          >
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>
              Live Monitoring:
            </Typography>
            {isLive ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <Box
                  sx={{
                    width: 7, height: 7, borderRadius: '50%', bgcolor: '#ef4444',
                    animation: 'pulseRing 1.8s ease-in-out infinite',
                    '@keyframes pulseRing': {
                      '0%':  { boxShadow: '0 0 0 0 rgba(239,68,68,0.5)' },
                      '70%': { boxShadow: '0 0 0 7px rgba(239,68,68,0)' },
                      '100%':{ boxShadow: '0 0 0 0 rgba(239,68,68,0)' },
                    },
                  }}
                />
                <Typography sx={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 800, letterSpacing: '0.05em' }}>ACTIVE</Typography>
              </Box>
            ) : (
              <Typography sx={{ fontSize: '0.72rem', color: '#475569', fontWeight: 700 }}>PAUSED</Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Updated {lastUpdated.toLocaleTimeString()}</Typography>
          <Button startIcon={<RefreshIcon />} variant="outlined" size="small" onClick={handleManualRefresh}>Refresh</Button>
          <Button
            variant={isLive ? 'contained' : 'outlined'}
            size="small"
            color={isLive ? 'error' : 'primary'}
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? 'Stop Live' : 'Start Live'}
          </Button>
        </Box>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2.5 }} />}

      {/* ── Stat Cards ─────────────────────────── */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Global Events" value={total} icon={<EarthquakeIcon />} color="#818cf8" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Critical Events (6+)" value={globalStats.highMag} icon={<WarningIcon />} color="#f87171" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Deep Source Events" value={globalStats.deep} icon={<SearchIcon />} color="#fbbf24" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Verified Reports" value={globalStats.reviewed} icon={<AnalyticsIcon />} color="#34d399" />
        </Grid>
      </Grid>

      {/* ── Feed + System ──────────────────────── */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Real-time Seismic Feed</Typography>
                <Chip
                  label="Latest 5"
                  size="small"
                  sx={{
                    height: 20, fontSize: '0.65rem', fontWeight: 800,
                    background: 'rgba(129,140,248,0.12)', color: '#a5b4fc',
                    border: '1px solid rgba(129,140,248,0.2)',
                  }}
                />
              </Box>
              <Fade in={!loading}>
                <Box>
                  <RecentActivity activities={earthquakes} />
                </Box>
              </Fade>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>System Dynamics</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                Actively syncing with the MongoDB cluster.
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.secondary', mb: 1.5 }}>Active Feeds</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>MongoDB Connection</Typography>
                  <Chip
                    label="Stable"
                    size="small"
                    sx={{ height: 18, fontSize: '0.6rem', fontWeight: 800, background: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: '1px solid rgba(52,211,153,0.2)' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>Data Sync Mode</Typography>
                  <Chip
                    label={isLive ? 'Live' : 'Manual'}
                    size="small"
                    sx={{
                      height: 18, fontSize: '0.6rem', fontWeight: 800,
                      background: isLive ? 'rgba(248,113,113,0.12)' : 'rgba(129,140,248,0.12)',
                      color: isLive ? '#fca5a5' : '#a5b4fc',
                      border: isLive ? '1px solid rgba(248,113,113,0.2)' : '1px solid rgba(129,140,248,0.2)',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>Data Records</Typography>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#818cf8' }}>{total?.toLocaleString()} entries</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
