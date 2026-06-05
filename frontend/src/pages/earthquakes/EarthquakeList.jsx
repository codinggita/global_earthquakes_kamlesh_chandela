import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon        from '@mui/icons-material/Add';
import SyncIcon       from '@mui/icons-material/Sync';
import TerrainIcon    from '@mui/icons-material/Terrain';
import WarningIcon    from '@mui/icons-material/Warning';
import LayersIcon     from '@mui/icons-material/Layers';
import VerifiedIcon   from '@mui/icons-material/Verified';
import { CircularProgress } from '@mui/material';
import { fetchEarthquakes, deleteEarthquake, setFilters, resetFilters, setSort, setPage } from '../../features/earthquakes/earthquakeSlice';
import { useToast } from '../../components/common/Toast';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import EarthquakeTable from '../../components/earthquakes/EarthquakeTable';
import EarthquakeFilters from '../../components/earthquakes/EarthquakeFilters';
import api from '../../services/api';

/* ── Mini stat card doodles ─────────────────────────────────── */
const StarDoodle = () => (
  <Box sx={{ position: 'absolute', right: 12, bottom: 8, opacity: 0.85, pointerEvents: 'none' }} className="float-slow">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#ff5e7e" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    </svg>
  </Box>
);

const LoopDoodle = () => (
  <Box sx={{ position: 'absolute', right: 12, bottom: 8, opacity: 0.85, pointerEvents: 'none' }} className="float-medium">
    <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
      <path d="M5 25C15 25 15 5 20 15C25 25 25 5 28 10" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </Box>
);

const SquiggleDoodle = () => (
  <Box sx={{ position: 'absolute', right: 12, bottom: 8, opacity: 0.85, pointerEvents: 'none' }} className="float-fast">
    <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
      <path d="M5 15C10 10 15 20 20 10C25 5 25 25 28 15" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </Box>
);

const StripesDoodle = () => (
  <Box sx={{ position: 'absolute', right: 12, bottom: 8, opacity: 0.85, pointerEvents: 'none' }} className="float-medium">
    <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
      <path d="M5 22L18 8M12 24L25 10M20 26L28 18" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </Box>
);

/* ── Mini stat card ─────────────────────────────────────────── */
const MiniStat = ({ label, value, icon, color, loading }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Playful Neubrutal colors mapping based on label
  let cardBg = isDark ? '#2e1b23' : '#ffe6eb'; // default Pink
  let accentColor = '#ff5e7e';
  let doodle = <StarDoodle />;

  if (label.toLowerCase().includes('critical')) {
    cardBg = isDark ? '#162a26' : '#e6f9f3'; // Green
    accentColor = '#10b981';
    doodle = <LoopDoodle />;
  } else if (label.toLowerCase().includes('deep')) {
    cardBg = isDark ? '#2e2a1e' : '#fff4d2'; // Yellow
    accentColor = '#fbbf24';
    doodle = <SquiggleDoodle />;
  } else if (label.toLowerCase().includes('verified')) {
    cardBg = isDark ? '#1a233b' : '#e6f0ff'; // Blue
    accentColor = '#3b82f6';
    doodle = <StripesDoodle />;
  }

  return (
    <Box
      sx={{
        p: 2.2,
        borderRadius: '16px',
        height: '100%',
        background: cardBg,
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDark
            ? '4px 4px 0px 0px #ffffff'
            : '4px 4px 0px 0px #0f172a',
        },
      }}
    >
      {doodle}

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2, position: 'relative', zIndex: 2 }}>
        <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDark ? '#ffffff' : '#0f172a' }}>
          {label}
        </Typography>
        <Box sx={{ p: 0.6, borderRadius: '8px', background: '#ffffff', color: accentColor, border: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a', display: 'flex', alignItems: 'center', '& .MuiSvgIcon-root': { fontSize: '15px !important' } }}>
          {icon}
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ width: 80, height: 32, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', animation: 'shimmer 1.6s ease-in-out infinite' }} />
      ) : (
        <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '2.1rem', lineHeight: 1, letterSpacing: '-0.03em', color: isDark ? '#ffffff' : '#0f172a', position: 'relative', zIndex: 2 }}>
          {typeof value === 'number' ? value.toLocaleString() : (value ?? '—')}
        </Typography>
      )}
    </Box>
  );
};

/* ── Main component ─────────────────────────────────────────── */
const EarthquakeList = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const theme      = useTheme();
  const isDark     = theme.palette.mode === 'dark';
  const { showToast } = useToast();
  const { earthquakes, total, pagination, loading, filters, sort } = useSelector((state) => state.earthquakes);
  const user = useSelector((state) => state.auth.user);
  const [deleteId, setDeleteId] = useState(null);
  const [syncing,  setSyncing]  = useState(false);
  const [globalStats, setGlobalStats] = useState({ highMag: 0, deep: 0, reviewed: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  // Local limit state so the dropdown never snaps back while waiting for the API response
  const [localLimit, setLocalLimit] = useState(pagination.limit);

  useEffect(() => { fetchData(); }, [pagination.page, localLimit, sort, filters]);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      setStatsLoading(true);
      try {
        const [highMagRes, deepRes, reviewedRes] = await Promise.all([
          api.get('/stats/earthquakes/high-magnitude-count'),
          api.get('/stats/earthquakes/deep-count'),
          api.get('/stats/earthquakes/reviewed-count'),
        ]);
        setGlobalStats({
          highMag:  highMagRes.data.data?.highMagnitudeCount || 0,
          deep:     deepRes.data.data?.deepCount             || 0,
          reviewed: reviewedRes.data.data?.reviewedCount     || 0,
        });
      } catch (err) { console.error('Failed to fetch global stats:', err); }
      setStatsLoading(false);
    };
    fetchGlobalStats();
  }, []);

  const fetchData = () => {
    const params = { page: pagination.page, limit: localLimit, sort, ...filters };
    Object.keys(params).forEach(k => {
      if (params[k] === undefined || params[k] === null || params[k] === '') delete params[k];
    });
    dispatch(fetchEarthquakes(params));
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await api.post('/admin/sync-usgs', {});
      showToast(res.data.message, 'success');
      fetchData();
    } catch { showToast('Sync failed', 'error'); }
    finally { setSyncing(false); }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteEarthquake(deleteId));
    showToast(result.error ? (result.payload || 'Delete failed') : 'Earthquake deleted successfully', result.error ? 'error' : 'success');
    setDeleteId(null);
    if (!result.error) fetchData();
  };

  const handlePageChange   = (page)  => dispatch(setPage(page));
  // Use local state so the rows-per-page dropdown updates immediately without waiting for API
  const handleLimitChange  = (limit) => { setLocalLimit(limit); dispatch(setPage(1)); };
  const handleFilterChange = (key, value) => { dispatch(setFilters({ [key]: value })); dispatch(setPage(1)); };
  const handleResetFilters = () => { dispatch(resetFilters()); dispatch(setPage(1)); };

  if (loading && earthquakes.length === 0) return <Loader />;

  const stats = [
    { label: 'Total Records',       value: total,               icon: <TerrainIcon />, color: '#8b5cf6' },
    { label: 'Critical (M6+)',      value: globalStats.highMag, icon: <WarningIcon />, color: '#ef4444' },
    { label: 'Deep Source (300km+)',value: globalStats.deep,    icon: <LayersIcon />,  color: '#f59e0b' },
    { label: 'Verified Reports',    value: globalStats.reviewed,icon: <VerifiedIcon />,color: '#10b981' },
  ];

  return (
    <Box sx={{ p: 0 }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 3.5 }}>
        <Box>
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: { xs: '1.5rem', sm: '1.8rem' }, letterSpacing: '-0.03em', color: 'text.primary', lineHeight: 1.1 }}>
            Earthquake Records
          </Typography>
          <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.82rem', color: 'text.secondary', fontWeight: 700, mt: 0.4 }}>
            Monitor and manage global seismic events
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, width: { xs: '100%', sm: 'auto' } }}>
          {user?.role === 'admin' && (
            <Button
              variant="outlined"
              startIcon={syncing ? <CircularProgress size={14} color="inherit" /> : <SyncIcon />}
              onClick={handleSync}
              disabled={syncing}
              sx={{
                borderRadius: '14px', px: 2.5, py: 1, fontSize: '0.82rem', fontWeight: 800,
                fontFamily: '"Fredoka", sans-serif',
                textTransform: 'none', flexGrow: { xs: 1, sm: 0 },
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
                '&.Mui-disabled': {
                  borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                  color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                },
                transition: 'all 0.18s ease',
              }}
            >
              {syncing ? 'Syncing...' : 'Sync USGS'}
            </Button>
          )}
          {['admin', 'moderator'].includes(user?.role?.trim()) && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/earthquakes/create')}
              sx={{
                borderRadius: '14px', px: 2.5, py: 1, fontSize: '0.82rem', fontWeight: 800,
                fontFamily: '"Fredoka", sans-serif',
                textTransform: 'none', flexGrow: { xs: 1, sm: 0 },
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
                transition: 'all 0.18s ease',
              }}
            >
              Add Event
            </Button>
          )}
        </Box>
      </Box>

      {/* ── Stat cards ──────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 3.5 }}>
        {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <MiniStat {...s} loading={statsLoading && !total} />
          </Grid>
        ))}
      </Grid>

      {/* ── Filters + Table ─────────────────────────────────── */}
      <EarthquakeFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
      <EarthquakeTable
        earthquakes={earthquakes} page={pagination.page} limit={localLimit} total={total}
        onPageChange={handlePageChange} onLimitChange={handleLimitChange}
        onView={(id) => navigate('/earthquakes/' + id)} onEdit={(id) => navigate('/earthquakes/' + id + '/edit')}
        onDelete={(id) => setDeleteId(id)} loading={loading}
      />
      <ConfirmDialog open={!!deleteId} title="Delete Earthquake" message="Are you sure? This cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </Box>
  );
};

export default EarthquakeList;
