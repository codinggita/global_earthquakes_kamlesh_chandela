import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Button,
  Avatar, useTheme, CircularProgress
} from '@mui/material';
import {
  XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip,
  ResponsiveContainer, AreaChart, Area, BarChart, Bar
} from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShieldIcon from '@mui/icons-material/Shield';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import api from '../../services/api';
import { useToast } from '../../components/common/Toast';

/* ── Action styles ───────────────────────────────────── */
const getActionStyles = (action) => {
  switch (action?.toUpperCase()) {
    case 'LOGIN':   return { bg: '#e6f9f3', border: '#10b981', text: '#10b981', darkBg: '#0d2e22' };
    case 'DELETE':  return { bg: '#ffecf0', border: '#ff5e7e', text: '#ff5e7e', darkBg: '#2e1b23' };
    case 'UPDATE':  return { bg: '#fff4d2', border: '#fbbf24', text: '#b45309', darkBg: '#2e2a1e' };
    case 'CREATE':
    case 'SYNC':    return { bg: '#e6f0ff', border: '#3b82f6', text: '#3b82f6', darkBg: '#1a233b' };
    default:        return { bg: '#f1f5f9', border: '#94a3b8', text: '#475569', darkBg: '#1e2332' };
  }
};

/* ── Hero stat card ──────────────────────────────────── */
const StatCard = ({ title, value, icon, accentColor, cardBg, darkCardBg, sub, emoji }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        p: 2, height: '100%', borderRadius: '20px',
        background: isDark ? (darkCardBg || '#2e1b23') : (cardBg || '#ffe6eb'),
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        '&:hover': {
          transform: 'translate(-3px, -3px)',
          boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
        },
        cursor: 'default',
      }}
    >
      {/* Decorative emoji */}
      <Typography sx={{
        position: 'absolute', right: 12, top: 8,
        fontSize: '2.6rem', opacity: 0.1, lineHeight: 1, userSelect: 'none',
        fontFamily: 'serif',
      }}>{emoji}</Typography>

      {/* Icon box + pulse */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.8 }}>
        <Box sx={{
          p: 0.9, borderRadius: '11px', background: '#ffffff',
          color: accentColor, border: `2px solid ${accentColor}`,
          boxShadow: `2px 2px 0px 0px ${accentColor}`,
          display: 'flex', alignItems: 'center',
          '& .MuiSvgIcon-root': { fontSize: '17px !important' },
        }}>
          {icon}
        </Box>
        {/* live pulse dot */}
        <Box sx={{ position: 'relative', width: 8, height: 8 }}>
          <Box sx={{
            width: 8, height: 8, borderRadius: '50%',
            background: accentColor,
            animation: 'adminPulse 2s ease-in-out infinite',
          }} />
          <Box sx={{
            position: 'absolute', inset: -3, borderRadius: '50%',
            background: accentColor, opacity: 0.25,
            animation: 'adminPulseRing 2s ease-in-out infinite',
          }} />
        </Box>
        <Typography sx={{
          fontFamily: '"Fredoka", sans-serif', fontSize: '0.65rem', fontWeight: 800,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.5)',
        }}>Live</Typography>
      </Box>

      <Typography sx={{
        fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
        fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.03em',
        color: isDark ? '#ffffff' : '#0f172a',
      }}>
        {typeof value === 'number' ? value.toLocaleString() : (value ?? '—')}
      </Typography>

      <Typography sx={{
        fontFamily: '"Fredoka", sans-serif', fontSize: '0.72rem', fontWeight: 800,
        letterSpacing: '0.02em', textTransform: 'uppercase',
        color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)', mt: 0.6, mb: 1,
      }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <TrendingUpIcon sx={{ fontSize: 12, color: accentColor }} />
        <Typography sx={{
          fontFamily: '"Quicksand", sans-serif', fontSize: '0.68rem', fontWeight: 800,
          color: isDark ? '#9ca3af' : '#64748b',
        }}>{sub}</Typography>
      </Box>

      <style>{`
        @keyframes adminPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        @keyframes adminPulseRing {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </Box>
  );
};

/* ── Notification card ───────────────────────────────── */
const AlertCard = ({ alert, isDark }) => {
  const colorMap = {
    error:   { color: '#ff5e7e', bg: '#ffecf0', darkBg: '#2e1b23', icon: <ErrorOutlineIcon sx={{ fontSize: 18 }} /> },
    warning: { color: '#f59e0b', bg: '#fff4d2', darkBg: '#2e2a1e', icon: <WarningAmberIcon sx={{ fontSize: 18 }} /> },
    info:    { color: '#3b82f6', bg: '#e6f0ff', darkBg: '#1a233b', icon: <InfoOutlinedIcon sx={{ fontSize: 18 }} /> },
  };
  const c = colorMap[alert.type] || colorMap.info;
  return (
    <Box sx={{
      display: 'flex', alignItems: 'flex-start', gap: 1.5,
      p: 1.5, borderRadius: '14px',
      background: isDark ? c.darkBg : c.bg,
      border: isDark ? `2px solid ${c.color}` : `2px solid ${c.color}`,
      boxShadow: `2px 2px 0px 0px ${c.color}`,
      transition: 'all 0.15s ease',
      '&:hover': { transform: 'translate(-1px,-1px)', boxShadow: `3px 3px 0px 0px ${c.color}` },
    }}>
      <Box sx={{
        color: c.color, mt: 0.2, flexShrink: 0,
        background: isDark ? 'rgba(255,255,255,0.08)' : '#ffffff',
        p: 0.5, borderRadius: '8px', display: 'flex',
        border: `1.5px solid ${c.color}`,
      }}>
        {c.icon}
      </Box>
      <Box>
        <Typography sx={{
          fontFamily: '"Fredoka", sans-serif', fontSize: '0.82rem',
          fontWeight: 800, color: c.color, lineHeight: 1.35,
        }}>
          {alert.message}
        </Typography>
        <Typography sx={{
          fontFamily: '"Quicksand", sans-serif', fontSize: '0.68rem',
          fontWeight: 700, color: isDark ? '#9ca3af' : '#64748b', mt: 0.3,
        }}>
          Just now • Seismic Alert
        </Typography>
      </Box>
    </Box>
  );
};

/* ═══════════════════════════════════════════════════════ */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { showToast } = useToast();
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState({
    users: 0, earthquakes: 0,
    logs: [], userTrend: [], earthquakeTrend: [], alerts: []
  });

  const fetchData = async () => {
    try {
      const [statsRes, logsRes] = await Promise.all([
        api.get('/admin/dashboard-stats'),
        api.get('/admin/audit-logs?limit=6'),
      ]);
      const d = statsRes.data.data;
      setStats(prev => ({
        ...prev,
        users: d.totalUsers,
        earthquakes: d.totalEarthquakes,
        userTrend: d.userTrend,
        earthquakeTrend: d.earthquakeTrend,
        alerts: d.alerts,
        logs: logsRes.data.data || []
      }));
    } catch (err) { console.error('Admin fetch error:', err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await api.post('/admin/sync-usgs', {});
      showToast(res.data.message, 'success');
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Sync failed', 'error');
    } finally { setSyncing(false); }
  };

  const chartData = stats.earthquakeTrend.map((item, i) => ({
    ...item,
    users: stats.userTrend[i]?.users || 0,
  }));

  const border = isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a';
  const shadow = isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a';
  const panelBg = isDark ? '#161a2b' : '#ffffff';

  return (
    <Box sx={{ p: 0.5 }}>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <Box sx={{
        display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2.5, mb: 4,
        p: 3, borderRadius: '24px',
        background: isDark
          ? 'linear-gradient(135deg, #1e1228 0%, #161a2b 100%)'
          : 'linear-gradient(135deg, #ffecf0 0%, #fdfbf7 100%)',
        border, boxShadow: shadow,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative doodle shapes */}
        <Box sx={{ position: 'absolute', right: 32, top: -20, width: 80, height: 80, borderRadius: '50%', border: '3px dashed #ff5e7e', opacity: 0.15, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', right: 100, bottom: -25, width: 60, height: 60, borderRadius: '50%', border: '2px dashed #3b82f6', opacity: 0.12, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', left: '40%', top: 10, opacity: 0.07, fontSize: '4rem', pointerEvents: 'none', userSelect: 'none' }}>⚙</Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            p: 1.5, borderRadius: '16px',
            background: '#ff5e7e', color: '#ffffff',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
            display: 'flex', alignItems: 'center',
          }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 26 }} />
          </Box>
          <Box>
            <Typography sx={{
              fontFamily: '"Fredoka", sans-serif', fontSize: '0.7rem', fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff5e7e', mb: 0.3,
            }}>
              🛡️ System Command
            </Typography>
            <Typography sx={{
              fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem' },
              letterSpacing: '-0.03em', color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1,
            }}>
              Admin Control Center
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={syncing ? <CircularProgress size={16} color="inherit" /> : <SyncIcon />}
          onClick={handleSync}
          disabled={syncing}
          sx={{
            borderRadius: '14px', px: 3, py: 1.4,
            fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.9rem',
            textTransform: 'none', background: '#ff5e7e', color: '#ffffff',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              background: '#e03f60', transform: 'translate(-2px,-2px)',
              boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
            },
            '&.Mui-disabled': {
              background: 'rgba(255,94,126,0.5)', color: 'rgba(255,255,255,0.9) !important', boxShadow: 'none',
            },
            transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {syncing ? 'Syncing USGS...' : 'Sync USGS Data'}
        </Button>
      </Box>

      {/* ── STAT CARDS ──────────────────────────────────────── */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Active Users"
            value={stats.users}
            icon={<PeopleIcon />}
            accentColor="#ff5e7e"
            cardBg="#ffe6eb" darkCardBg="#2e1b23"
            sub="Registered accounts"
            emoji="👤"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Seismic Records"
            value={stats.earthquakes}
            icon={<PublicIcon />}
            accentColor="#fbbf24"
            cardBg="#fff4d2" darkCardBg="#2e2a1e"
            sub="Total catalogued events"
            emoji="🌍"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="System Health"
            value="100%"
            icon={<ShieldIcon />}
            accentColor="#10b981"
            cardBg="#e6f9f3" darkCardBg="#162a26"
            sub="All services operational"
            emoji="✅"
          />
        </Grid>
      </Grid>

      {/* ── CHART + NOTIFICATIONS ────────────────────────────── */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 3, height: '100%', background: panelBg, border, borderRadius: '24px', boxShadow: shadow }}>

            {/* Chart header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography sx={{
                  fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.15rem',
                  color: isDark ? '#ffffff' : '#0f172a', letterSpacing: '-0.01em',
                }}>
                  📊 System Growth & Activity
                </Typography>
                <Typography sx={{
                  fontFamily: '"Quicksand", sans-serif', fontWeight: 700, fontSize: '0.72rem',
                  color: isDark ? '#9ca3af' : '#64748b', mt: 0.3,
                }}>
                  7-day trend of seismic events & user registrations
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {[
                  { color: '#ff5e7e', label: 'Earthquakes' },
                  { color: '#3b82f6', label: 'Users' },
                ].map(l => (
                  <Box key={l.label} sx={{
                    display: 'flex', alignItems: 'center', gap: 0.7,
                    px: 1.2, py: 0.4, borderRadius: '8px',
                    background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                    border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid rgba(15,23,42,0.1)',
                  }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: l.color }} />
                    <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.7rem', fontWeight: 800, color: isDark ? '#9ca3af' : '#475569' }}>{l.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gEq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ff5e7e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff5e7e" stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="gUs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 700, fontFamily: '"Quicksand", sans-serif' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 700, fontFamily: '"Quicksand", sans-serif' }} />
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.06)'} />
                <ChartTooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1e2338' : '#ffffff',
                    border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
                    borderRadius: '14px', fontSize: '11px', fontWeight: 'bold',
                    boxShadow: isDark ? '3px 3px 0px #ffffff' : '3px 3px 0px #0f172a',
                    fontFamily: '"Quicksand", sans-serif', color: isDark ? '#ffffff' : '#0f172a',
                  }}
                />
                <Area type="monotone" name="Earthquakes" dataKey="records" stroke="#ff5e7e" strokeWidth={3} dot={{ r: 4, fill: '#ff5e7e', strokeWidth: 2, stroke: isDark ? '#ffffff' : '#0f172a' }} fillOpacity={1} fill="url(#gEq)" />
                <Area type="monotone" name="Users" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: isDark ? '#ffffff' : '#0f172a' }} fillOpacity={1} fill="url(#gUs)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, height: '100%', background: panelBg, border, borderRadius: '24px', boxShadow: shadow, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Box sx={{
                p: 0.8, borderRadius: '10px', background: '#ffecf0',
                color: '#ff5e7e', border: '1.5px solid #ff5e7e', display: 'flex',
              }}>
                <NotificationsActiveIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1rem', color: isDark ? '#ffffff' : '#0f172a' }}>
                  Live Alerts
                </Typography>
                <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.68rem', fontWeight: 700, color: isDark ? '#9ca3af' : '#64748b' }}>
                  {stats.alerts.length} active notification{stats.alerts.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
              {/* red dot badge */}
              {stats.alerts.length > 0 && (
                <Box sx={{ ml: 'auto', px: 1.2, py: 0.3, borderRadius: '999px', background: '#ff5e7e', border: '1.5px solid #0f172a' }}>
                  <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.7rem', fontWeight: 800, color: '#ffffff' }}>
                    {stats.alerts.length}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
              {stats.alerts.slice(0, 3).map((alert, i) => (
                <AlertCard key={i} alert={alert} isDark={isDark} />
              ))}
              {stats.alerts.length === 0 && (
                <Box sx={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', py: 3,
                  borderRadius: '16px',
                  background: isDark ? 'rgba(16,185,129,0.06)' : '#e6f9f3',
                  border: '2px dashed #10b981',
                }}>
                  <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🟢</Typography>
                  <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.9rem', fontWeight: 800, color: '#10b981' }}>
                    All Systems Stable
                  </Typography>
                  <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.72rem', fontWeight: 700, color: isDark ? '#6ee7b7' : '#047857', mt: 0.4 }}>
                    No active alerts
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* ── AUDIT LOGS TABLE ─────────────────────────────────── */}
      <Box sx={{ borderRadius: '24px', overflow: 'hidden', background: panelBg, border, boxShadow: shadow }}>

        {/* Table header bar */}
        <Box sx={{
          px: 3, py: 2,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7',
          borderBottom: isDark ? '2px solid rgba(255,255,255,0.15)' : '2px solid rgba(15,23,42,0.15)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              p: 0.8, borderRadius: '10px', background: isDark ? '#2e1b23' : '#ffecf0',
              color: '#ff5e7e', border: '1.5px solid #ff5e7e', display: 'flex',
            }}>
              <ShieldIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.05rem', color: isDark ? '#ffffff' : '#0f172a' }}>
                Recent Audit Trail
              </Typography>
              <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.68rem', fontWeight: 700, color: isDark ? '#9ca3af' : '#64748b' }}>
                Last 6 system events
              </Typography>
            </Box>
          </Box>

          <Button
            size="small"
            variant="outlined"
            endIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            onClick={() => navigate('/admin/audit-logs')}
            sx={{
              borderRadius: '10px',
              fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.78rem',
              textTransform: 'none', color: '#ff5e7e',
              borderColor: '#ff5e7e', borderWidth: '2px !important',
              px: 1.8, py: 0.5,
              boxShadow: '2px 2px 0px 0px #ff5e7e',
              '&:hover': {
                background: isDark ? '#2e1b23' : '#ffecf0',
                boxShadow: '3px 3px 0px 0px #ff5e7e',
                transform: 'translate(-1px,-1px)',
              },
              transition: 'all 0.15s ease',
            }}
          >
            View All
          </Button>
        </Box>

        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                {['ACTION', 'RESOURCE', 'USER', 'TIME'].map((h, i) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
                      fontSize: '0.7rem', letterSpacing: '0.08em', py: 1.5,
                      color: isDark ? '#9ca3af' : '#475569',
                      display: (h === 'USER') ? { xs: 'none', sm: 'table-cell' } : 'table-cell',
                    }}
                  >{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.logs.map((log, i) => {
                const s = getActionStyles(log.action);
                return (
                  <TableRow key={i} hover sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { background: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7' },
                  }}>
                    {/* Action chip */}
                    <TableCell sx={{ py: 1.8 }}>
                      <Chip
                        label={log.action}
                        size="small"
                        sx={{
                          height: 24,
                          fontFamily: '"Fredoka", sans-serif', fontSize: '0.68rem', fontWeight: 800,
                          bgcolor: isDark ? s.darkBg : s.bg,
                          color: s.text,
                          border: `2px solid ${s.border}`,
                          boxShadow: `2px 2px 0px 0px ${s.border}`,
                          '& .MuiChip-label': { px: 1.2 },
                        }}
                      />
                    </TableCell>

                    {/* Resource */}
                    <TableCell sx={{ py: 1.8 }}>
                      <Typography sx={{
                        fontFamily: '"Quicksand", sans-serif', fontSize: '0.82rem',
                        fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a',
                      }}>{log.resource}</Typography>
                    </TableCell>

                    {/* User */}
                    <TableCell sx={{ py: 1.8, display: { xs: 'none', sm: 'table-cell' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{
                          width: 26, height: 26, fontSize: '0.68rem', fontWeight: 800,
                          fontFamily: '"Fredoka", sans-serif',
                          bgcolor: '#ff5e7e',
                          border: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a',
                        }}>
                          {log.userId?.name?.[0]?.toUpperCase() || 'S'}
                        </Avatar>
                        <Typography sx={{
                          fontFamily: '"Quicksand", sans-serif', fontSize: '0.8rem',
                          fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a',
                        }}>{log.userId?.name || 'System'}</Typography>
                      </Box>
                    </TableCell>

                    {/* Time */}
                    <TableCell sx={{ py: 1.8 }}>
                      <Box sx={{
                        display: 'inline-block', px: 1.2, py: 0.3, borderRadius: '8px',
                        background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(15,23,42,0.1)',
                      }}>
                        <Typography sx={{
                          fontFamily: '"Quicksand", sans-serif', fontSize: '0.72rem',
                          fontWeight: 700, color: isDark ? '#9ca3af' : '#475569',
                          whiteSpace: 'nowrap',
                        }}>
                          {new Date(log.timestamp).toLocaleString([], {
                            hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short'
                          })}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
