import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Typography, Card, CardContent,
  Button, Chip, Fade, LinearProgress, Divider,
} from '@mui/material';
import EarthquakeIcon from '@mui/icons-material/Terrain';
import WarningIcon    from '@mui/icons-material/Warning';
import LayersIcon     from '@mui/icons-material/Layers';
import VerifiedIcon   from '@mui/icons-material/Verified';
import RefreshIcon    from '@mui/icons-material/Refresh';
import { fetchEarthquakes } from '../../features/earthquakes/earthquakeSlice';
import RecentActivity from '../../components/dashboard/RecentActivity';
import StatCard       from '../../components/dashboard/StatCard';
import Loader         from '../../components/common/Loader';

/* Time-based greeting */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { earthquakes, total, loading } = useSelector((s) => s.earthquakes);
  const user = useSelector((s) => s.auth.user);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive,      setIsLive]      = useState(true);
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
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [dispatch, isLive]);

  const fetchGlobalStats = async () => {
    try {
      const [highMagRes, deepRes, reviewedRes] = await Promise.all([
        import('../../services/api').then(m => m.default.get('/earthquakes/high-magnitude?limit=1')),
        import('../../services/api').then(m => m.default.get('/earthquakes/deep?limit=1')),
        import('../../services/api').then(m => m.default.get('/stats/earthquakes/reviewed-count')),
      ]);
      setGlobalStats({
        highMag:  highMagRes.data.pagination?.total   || highMagRes.data.data?.length || 0,
        deep:     deepRes.data.pagination?.total      || deepRes.data.data?.length    || 0,
        reviewed: reviewedRes.data.data?.reviewedCount || 0,
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

  if (loading && !earthquakes.length) return <Loader />;

  return (
    <Box sx={{ p: 0.5 }}>

      {/* ── Hero header ────────────────────────────────────────── */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems:    { xs: 'flex-start', sm: 'flex-end' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Left: greeting + status */}
        <Box>
          <Typography
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem' },
              letterSpacing: '-0.03em',
              color: 'text.primary',
              lineHeight: 1.1,
              mb: 0.5,
            }}
          >
            {getGreeting()},{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {user?.name?.split(' ')[0] || 'User'}
            </Box>
          </Typography>

          {/* Live status line */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isLive ? (
              <>
                <Box
                  sx={{
                    width: 7, height: 7, borderRadius: '50%', bgcolor: '#ef4444',
                    animation: 'seismicPulse 2s ease-in-out infinite',
                    '@keyframes seismicPulse': {
                      '0%':  { boxShadow: '0 0 0 0 rgba(239,68,68,0.55)' },
                      '70%': { boxShadow: '0 0 0 7px rgba(239,68,68,0)' },
                      '100%':{ boxShadow: '0 0 0 0 rgba(239,68,68,0)' },
                    },
                  }}
                />
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500 }}>
                  Live monitoring{' '}
                  <Box component="span" sx={{ color: '#f87171', fontWeight: 700 }}>active</Box>
                  {' — '}updated at {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </>
            ) : (
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500 }}>
                Live monitoring{' '}
                <Box component="span" sx={{ color: '#3f5068', fontWeight: 700 }}>paused</Box>
              </Typography>
            )}
          </Box>
        </Box>

        {/* Right: controls */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            startIcon={<RefreshIcon sx={{ fontSize: 16 }} />}
            variant="outlined"
            size="small"
            onClick={handleManualRefresh}
            sx={{ fontSize: '0.78rem', px: 1.5, py: 0.6, height: 34 }}
          >
            Refresh
          </Button>
          <Button
            variant={isLive ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setIsLive(!isLive)}
            sx={{
              fontSize: '0.78rem', px: 1.5, py: 0.6, height: 34,
              ...(isLive
                ? { background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.30)', boxShadow: 'none', '&:hover': { background: 'rgba(239,68,68,0.18)', boxShadow: 'none' } }
                : {}),
            }}
          >
            {isLive ? 'Stop Live' : 'Start Live'}
          </Button>
        </Box>
      </Box>

      {/* Progress bar */}
      {loading && (
        <Box sx={{ mb: 3, borderRadius: 100, overflow: 'hidden' }}>
          <LinearProgress />
        </Box>
      )}

      {/* ── Stat cards ─────────────────────────────────────────── */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        {[
          {
            title: 'Total Global Events',
            value: total,
            icon:  <EarthquakeIcon />,
            color: '#8b5cf6',
          },
          {
            title: 'Critical Events (M6+)',
            value: globalStats.highMag,
            icon:  <WarningIcon />,
            color: '#ef4444',
          },
          {
            title: 'Deep Source Events',
            value: globalStats.deep,
            icon:  <LayersIcon />,
            color: '#f59e0b',
          },
          {
            title: 'Verified Reports',
            value: globalStats.reviewed,
            icon:  <VerifiedIcon />,
            color: '#10b981',
          },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
              sx={{ height: '100%' }}
            >
              <StatCard {...card} loading={loading && !earthquakes.length} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* ── Main content area ───────────────────────────────────── */}
      <Grid container spacing={2.5}>

        {/* Real-time feed */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              {/* Section header */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 700, fontSize: '1rem',
                      color: 'text.primary', letterSpacing: '-0.01em',
                    }}
                  >
                    Real-time Seismic Feed
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.2, fontWeight: 500 }}>
                    Latest 5 events sorted by time
                  </Typography>
                </Box>
                <Chip
                  label="Live"
                  size="small"
                  sx={{
                    height: 22, fontSize: '0.65rem', fontWeight: 800,
                    background: isLive ? 'rgba(239,68,68,0.10)' : 'rgba(255,255,255,0.05)',
                    color: isLive ? '#f87171' : '#3f5068',
                    border: isLive ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(255,255,255,0.06)',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              </Box>

              <Fade in={!loading}>
                <Box>
                  <RecentActivity activities={earthquakes} loading={loading && !earthquakes.length} />
                </Box>
              </Fade>
            </CardContent>
          </Card>
        </Grid>

        {/* System status panel */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Typography
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 700, fontSize: '1rem',
                  color: 'text.primary', letterSpacing: '-0.01em', mb: 0.3,
                }}
              >
                System Status
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, mb: 2.5 }}>
                Infrastructure & data pipeline health
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              {/* Status rows */}
              {[
                {
                  label: 'MongoDB Connection',
                  status: 'Stable',
                  color: '#34d399', bg: 'rgba(52,211,153,0.10)', border: 'rgba(52,211,153,0.25)',
                  dot: '#10b981',
                },
                {
                  label: 'Data Sync Mode',
                  status: isLive ? 'Live' : 'Manual',
                  color: isLive ? '#f87171' : '#7a8ea6',
                  bg:     isLive ? 'rgba(248,113,113,0.10)' : 'rgba(122,142,166,0.10)',
                  border: isLive ? 'rgba(248,113,113,0.25)' : 'rgba(122,142,166,0.20)',
                  dot:    isLive ? '#ef4444' : '#4b5e74',
                },
                {
                  label: 'USGS API',
                  status: 'Connected',
                  color: '#60a5fa', bg: 'rgba(96,165,250,0.10)', border: 'rgba(96,165,250,0.25)',
                  dot: '#3b82f6',
                },
              ].map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    mb: i < 2 ? 1.8 : 0,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: row.dot, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 500, color: 'text.secondary' }}>
                      {row.label}
                    </Typography>
                  </Box>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      height: 20, fontSize: '0.62rem', fontWeight: 800,
                      background: row.bg, color: row.color,
                      border: `1px solid ${row.border}`,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2.5 }} />

              {/* Records count */}
              <Box
                sx={{
                  p: 1.5, borderRadius: '12px',
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(139,92,246,0.07)'
                    : 'rgba(139,92,246,0.04)',
                  border: '1px solid rgba(139,92,246,0.15)',
                }}
              >
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7c5cbf', mb: 0.5 }}>
                  Total Records
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800, fontSize: '1.6rem',
                    color: (theme) => theme.palette.mode === 'dark' ? '#a78bfa' : '#7c3aed',
                    letterSpacing: '-0.03em', lineHeight: 1,
                  }}
                >
                  {total?.toLocaleString() ?? '—'}
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: (theme) => theme.palette.mode === 'dark' ? '#4b3d73' : '#9ca3af', fontWeight: 500, mt: 0.3 }}>
                  earthquake entries in database
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
