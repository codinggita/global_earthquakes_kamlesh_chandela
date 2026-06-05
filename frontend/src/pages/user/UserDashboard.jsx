import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, Typography, Card, CardContent,
  Button, Chip, Fade, LinearProgress, Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EarthquakeIcon from '@mui/icons-material/Terrain';
import WarningIcon    from '@mui/icons-material/Warning';
import LayersIcon     from '@mui/icons-material/Layers';
import VerifiedIcon   from '@mui/icons-material/Verified';
import RefreshIcon    from '@mui/icons-material/Refresh';
import AnalyticsIcon  from '@mui/icons-material/Analytics';
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
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
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

      {/* ── Hero Banner Card ── */}
      <Box
        sx={{
          p: 3.5,
          mb: 4,
          borderRadius: '24px',
          background: isDark ? '#2e2a1e' : '#fff4d2',
          border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2.5,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Smiling Sun (Left side) */}
        <Box
          sx={{
            position: { xs: 'relative', sm: 'absolute' },
            left: { xs: 0, sm: 20 },
            top: { xs: 0, sm: '50%' },
            transform: { xs: 'none', sm: 'translateY(-50%)' },
            width: 70,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            mr: { xs: 0, sm: 2 },
            mb: { xs: 2, sm: 0 },
          }}
          className="float-slow"
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <path d="M35 5V11M35 59V65M5 35H11M59 35H65M13.8 13.8L18 18M52 52L56.2 56.2M13.8 56.2L18 52M52 18L56.2 13.8" stroke={isDark ? '#ffffff' : '#0f172a'} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="35" cy="35" r="16" fill="#fbbf24" stroke={isDark ? '#ffffff' : '#0f172a'} strokeWidth="3.5" />
            <circle cx="30" cy="32" r="2" fill={isDark ? '#ffffff' : '#0f172a'} />
            <circle cx="40" cy="32" r="2" fill={isDark ? '#ffffff' : '#0f172a'} />
            <path d="M29 38C31 41 39 41 41 38" stroke={isDark ? '#ffffff' : '#0f172a'} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Box>

        {/* Fluffy Cloud (Center background/floating) */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '80%', sm: '42%' },
            top: '15%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: { xs: 0.2, sm: 1 },
          }}
          className="float-medium"
        >
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <path d="M15 30C15 20 25 15 30 20C35 12 50 15 50 25C55 25 57 32 50 35C45 38 15 38 15 30Z" fill="#ffffff" stroke={isDark ? '#ffffff' : '#0f172a'} strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </Box>

        {/* Serpentine Ribbon (Right background) */}
        <Box
          sx={{
            position: 'absolute',
            right: 15,
            top: '10%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: { xs: 0.1, sm: 1 },
          }}
          className="float-fast"
        >
          <svg width="25" height="60" viewBox="0 0 25 60" fill="none">
            <path d="M12 5C22 15 5 25 12 35C20 45 5 50 12 55" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </svg>
        </Box>

        {/* Sparkle star near text */}
        <Box
          sx={{
            position: 'absolute',
            left: '60%',
            top: '55%',
            zIndex: 0,
            pointerEvents: 'none',
            display: { xs: 'none', sm: 'block' },
          }}
          className="float-medium"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="#fbbf24" stroke={isDark ? '#ffffff' : '#0f172a'} strokeWidth="2.5" />
          </svg>
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1, pl: { xs: 0, sm: 11 } }}>
          <Typography
            sx={{
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2.1rem' },
              letterSpacing: '-0.03em',
              color: isDark ? '#ffffff' : '#0f172a',
              lineHeight: 1.15,
              mb: 0.8,
            }}
          >
            {getGreeting()},{' '}
            <Box
              component="span"
              sx={{
                color: '#ff5e7e',
              }}
            >
              {user?.name?.split(' ')[0] || 'User'}
            </Box>
          </Typography>

          {/* Live status line */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            {isLive ? (
              <>
                <Box
                  sx={{
                    width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff5e7e',
                    border: isDark ? '1px solid #ffffff' : '1px solid #0f172a',
                    animation: 'seismicPulse 2s ease-in-out infinite',
                    '@keyframes seismicPulse': {
                      '0%':  { boxShadow: '0 0 0 0 rgba(255,94,126,0.6)' },
                      '70%': { boxShadow: '0 0 0 7px rgba(255,94,126,0)' },
                      '100%':{ boxShadow: '0 0 0 0 rgba(255,94,126,0)' },
                    },
                  }}
                />
                <Typography sx={{ fontSize: '0.8rem', color: isDark ? '#9ca3af' : '#475569', fontWeight: 800 }}>
                  Telemetry Link:{' '}
                  <Box component="span" sx={{ color: '#ff5e7e', fontWeight: 900 }}>ACTIVE</Box>
                  {' — '}updated at {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: isDark ? '#6b7280' : '#94a3b8', border: isDark ? '1px solid #ffffff' : '1px solid #0f172a' }} />
                <Typography sx={{ fontSize: '0.8rem', color: isDark ? '#9ca3af' : '#475569', fontWeight: 800 }}>
                  Telemetry Link:{' '}
                  <Box component="span" sx={{ color: isDark ? '#9ca3af' : '#475569', fontWeight: 900 }}>PAUSED</Box>
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* Right: Controls toolbar */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <Button
            startIcon={<RefreshIcon sx={{ fontSize: 15 }} />}
            variant="outlined"
            size="small"
            onClick={handleManualRefresh}
            sx={{
              borderRadius: '14px',
              fontSize: '0.82rem',
              fontWeight: 800,
              fontFamily: '"Fredoka", sans-serif',
              px: 2.5,
              py: 1.1,
              textTransform: 'none',
              borderColor: isDark ? '#ffffff' : '#0f172a',
              borderWidth: '2.5px !important',
              color: isDark ? '#ffffff' : '#0f172a',
              backgroundColor: isDark ? '#161a2b' : '#ffffff',
              boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
              '&:hover': {
                borderColor: isDark ? '#ffffff' : '#0f172a',
                backgroundColor: isDark ? '#2e1b23' : '#ffecf0',
                transform: 'translate(-2px, -2px)',
                boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
              },
              transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            Refresh Feed
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setIsLive(!isLive)}
            sx={{
              borderRadius: '14px',
              fontSize: '0.82rem',
              fontWeight: 800,
              fontFamily: '"Fredoka", sans-serif',
              px: 2.5,
              py: 1.1,
              textTransform: 'none',
              border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
              backgroundColor: '#ff5e7e',
              color: '#ffffff',
              boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
              '&:hover': {
                backgroundColor: '#e03f60',
                borderColor: isDark ? '#ffffff' : '#0f172a',
                transform: 'translate(-2px, -2px)',
                boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
              },
              transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {isLive ? 'Stop Real-time' : 'Start Real-time'}
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
            color: '#ff5e7e',
          },
          {
            title: 'Deep Source Events',
            value: globalStats.deep,
            icon:  <LayersIcon />,
            color: '#fbbf24',
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
      <Grid container spacing={3.5}>

        {/* Real-time feed */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              height: '100%',
              borderColor: isDark ? '#ffffff !important' : '#8b5cf6 !important',
              boxShadow: isDark ? '4px 4px 0px 0px #ffffff !important' : '4px 4px 0px 0px #0f172a !important',
            }}
          >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              {/* Section header */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Fredoka", sans-serif',
                      fontWeight: 800, fontSize: '1.2rem',
                      color: 'text.primary', letterSpacing: '-0.01em',
                    }}
                  >
                    Seismic Telemetry Feed
                  </Typography>
                  {/* Floating star */}
                  <Box className="float-slow" sx={{ display: 'inline-flex', ml: 0.5 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#ff5e7e" strokeWidth="2.5" fill="none" />
                    </svg>
                  </Box>
                </Box>
                <Chip
                  label="LIVE TELEMETRY"
                  size="small"
                  sx={{
                    height: 22, fontSize: '0.65rem', fontWeight: 800,
                    background: isLive ? '#ffecf0' : 'rgba(100,116,139,0.08)',
                    color: isLive ? '#ff5e7e' : '#64748b',
                    border: `1.5px solid ${isLive ? '#ff5e7e' : 'rgba(100,116,139,0.2)'}`,
                    '& .MuiChip-label': { px: 1.2 },
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
          <Card
            sx={{
              height: '100%',
              borderColor: isDark ? '#ffffff !important' : '#fbbf24 !important',
              boxShadow: isDark ? '4px 4px 0px 0px #ffffff !important' : '4px 4px 0px 0px #0f172a !important',
            }}
          >
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography
                  sx={{
                    fontFamily: '"Fredoka", sans-serif',
                    fontWeight: 800, fontSize: '1.2rem',
                    color: 'text.primary', letterSpacing: '-0.01em',
                  }}
                >
                  System Status
                </Typography>
                {/* Floating star */}
                <Box className="float-medium" sx={{ display: 'inline-flex', ml: 0.5 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#ff5e7e" strokeWidth="2.5" fill="none" />
                  </svg>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 600, mb: 3 }}>
                Infrastructure & telemetry pipeline health
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              {/* Status rows */}
              {[
                {
                  label: 'MongoDB Connection',
                  status: 'Stable',
                  color: '#10b981', bg: '#e6f9f3', border: '#10b981',
                  pulseColor: '#10b981',
                },
                {
                  label: 'Data Sync Mode',
                  status: isLive ? 'Real-time' : 'Manual',
                  color: isLive ? '#ff5e7e' : '#475569',
                  bg:     isLive ? '#ffecf0' : 'rgba(100,116,139,0.08)',
                  border: isLive ? '#ff5e7e' : 'rgba(100,116,139,0.2)',
                  pulseColor: isLive ? '#ff5e7e' : '#475569',
                },
                {
                  label: 'USGS API Link',
                  status: 'Connected',
                  color: '#3b82f6', bg: '#e6f0ff', border: '#3b82f6',
                  pulseColor: '#3b82f6',
                },
              ].map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    mb: i < 2 ? 2.5 : 0,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box
                      sx={{
                        width: 8, height: 8, borderRadius: '50%', bgcolor: row.pulseColor,
                        border: isDark ? '1px solid #ffffff' : '1px solid #0f172a',
                        animation: 'healthPulse 2s infinite',
                        '@keyframes healthPulse': {
                          '0%': { boxShadow: `0 0 0 0 ${row.pulseColor}77` },
                          '70%': { boxShadow: `0 0 0 5px ${row.pulseColor}00` },
                          '100%': { boxShadow: `0 0 0 0 ${row.pulseColor}00` },
                        }
                      }}
                    />
                    <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.82rem', fontWeight: 800, color: 'text.secondary' }}>
                      {row.label}
                    </Typography>
                  </Box>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      height: 22, fontSize: '0.65rem', fontWeight: 800,
                      background: row.bg, color: row.color,
                      border: `1.5px solid ${row.border}`,
                      '& .MuiChip-label': { px: 1.2 },
                    }}
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2.5 }} />

              {/* Records count Console Box -> View System Analytics Button */}
              <Button
                onClick={() => navigate('/analytics')}
                variant="contained"
                startIcon={<AnalyticsIcon />}
                sx={{
                  width: '100%',
                  borderRadius: '14px',
                  border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
                  boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
                  background: '#8b5cf6',
                  color: '#ffffff',
                  py: 1.2,
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  '&:hover': {
                    background: '#7c3aed',
                    borderColor: isDark ? '#ffffff' : '#0f172a',
                    transform: 'translate(-2px, -2px)',
                    boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
                  },
                  transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                View System Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
