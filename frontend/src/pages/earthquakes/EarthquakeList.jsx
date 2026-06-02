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

/* ── Mini stat card ─────────────────────────────────────────── */
const MiniStat = ({ label, value, icon, color, loading }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        p: 2.2,
        borderRadius: '14px',
        height: '100%',
        background: isDark ? 'rgba(10,16,30,0.94)' : 'rgba(255,255,255,0.94)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        borderLeft: `3px solid ${color}`,
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        cursor: 'default',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: isDark
            ? `0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`
            : `0 10px 30px rgba(0,0,0,0.07), 0 0 0 1px ${color}18`,
        },
      }}
    >
      {/* Ambient orb */}
      <Box sx={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: color, opacity: isDark ? 0.07 : 0.05, filter: 'blur(16px)', pointerEvents: 'none' }} />

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: isDark ? '#3f5068' : '#9ca3af' }}>
          {label}
        </Typography>
        <Box sx={{ p: 0.8, borderRadius: '8px', background: `${color}14`, color, display: 'flex', alignItems: 'center', '& .MuiSvgIcon-root': { fontSize: '16px !important' } }}>
          {icon}
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ width: 80, height: 32, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'shimmer 1.6s ease-in-out infinite', '@keyframes shimmer': { '0%': { opacity: 0.4 }, '50%': { opacity: 0.8 }, '100%': { opacity: 0.4 } } }} />
      ) : (
        <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.04em', color: isDark ? '#f1f5f9' : '#0f172a' }}>
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

  useEffect(() => { fetchData(); }, [pagination.page, pagination.limit, sort, filters]);

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
    const params = { page: pagination.page, limit: pagination.limit, sort, ...filters };
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
  const handleLimitChange  = (limit) => { dispatch(setFilters({ limit })); dispatch(setPage(1)); };
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
          <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: { xs: '1.5rem', sm: '1.8rem' }, letterSpacing: '-0.03em', color: 'text.primary', lineHeight: 1.1 }}>
            Earthquake Records
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500, mt: 0.4 }}>
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
                borderRadius: 3, px: 2.5, py: 0.9, fontSize: '0.82rem', fontWeight: 700,
                textTransform: 'none', flexGrow: { xs: 1, sm: 0 },
                borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                color: 'text.secondary',
                '&:hover': { borderColor: '#8b5cf6', color: '#8b5cf6', bgcolor: 'rgba(139,92,246,0.04)' },
                '&.Mui-disabled': {
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                }
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
                borderRadius: 3, px: 2.5, py: 0.9, fontSize: '0.82rem', fontWeight: 700,
                textTransform: 'none', flexGrow: { xs: 1, sm: 0 },
                background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                boxShadow: '0 4px 16px rgba(239,68,68,0.25)',
                '&:hover': { background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)', transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(239,68,68,0.35)' },
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
