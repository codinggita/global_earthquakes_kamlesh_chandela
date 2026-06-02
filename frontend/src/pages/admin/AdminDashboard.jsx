import React, { useEffect, useState } from 'react';
import { 
  Box, Grid, Typography, Card, CardContent, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Chip, Button, IconButton, Avatar, 
  LinearProgress, Divider, Tooltip, useTheme, CircularProgress
} from '@mui/material';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import api from '../../services/api';
import { useToast } from '../../components/common/Toast';

const StatCard = ({ title, value, icon, color, gradient }) => (
  <Card sx={{ 
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    background: (theme) => theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.65)' : 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(20px)',
    border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(148, 163, 184, 0.12)',
    borderRadius: 4,
    boxShadow: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': { 
      transform: 'translateY(-4px)',
      boxShadow: (theme) => theme.palette.mode === 'dark' 
        ? '0 12px 30px rgba(0,0,0,0.35)' 
        : `0 12px 30px ${color === 'primary' ? 'rgba(239, 68, 68, 0.06)' : color === 'warning' ? 'rgba(245, 158, 11, 0.06)' : 'rgba(16, 185, 129, 0.06)'}`,
      borderColor: (theme) => theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.12)' 
        : `${color === 'primary' ? 'rgba(239, 68, 68, 0.25)' : color === 'warning' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
    }
  }}>
    <Box sx={{ 
      position: 'absolute', 
      top: -20, 
      right: -20, 
      width: '100px', 
      height: '100px', 
      background: gradient, 
      opacity: 0.12,
      borderRadius: '50%'
    }} />
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar sx={{ 
          bgcolor: color === 'primary' 
            ? 'rgba(239, 68, 68, 0.1)' 
            : color === 'warning' 
              ? 'rgba(245, 158, 11, 0.1)' 
              : 'rgba(16, 185, 129, 0.1)', 
          color: color === 'primary' 
            ? '#ef4444' 
            : color === 'warning' 
              ? '#f59e0b' 
              : '#10b981', 
          width: 44, 
          height: 44, 
          borderRadius: 2.5,
          border: '1px solid rgba(148, 163, 184, 0.08)'
        }}>
          {icon}
        </Avatar>
        <Typography color="text.secondary" variant="caption" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: '"Outfit", sans-serif' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant="h4" fontWeight="900" sx={{ color: 'text.primary', letterSpacing: '-0.03em', fontFamily: '"Outfit", sans-serif' }}>{value}</Typography>
        <Typography variant="caption" color="success.main" sx={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <TrendingUpIcon sx={{ fontSize: 12 }} /> Live
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const getActionStyles = (action, isDark) => {
  switch (action?.toUpperCase()) {
    case 'LOGIN':
      return { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)', text: isDark ? '#34d399' : '#059669' };
    case 'DELETE':
      return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)', text: isDark ? '#f87171' : '#dc2626' };
    case 'UPDATE':
      return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', text: isDark ? '#fbbf24' : '#d97706' };
    case 'CREATE':
    case 'SYNC':
      return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', text: isDark ? '#60a5fa' : '#2563eb' };
    default:
      return { bg: 'rgba(148, 163, 184, 0.1)', border: 'rgba(148, 163, 184, 0.2)', text: isDark ? '#cbd5e1' : '#475569' };
  }
};

const AdminDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { showToast } = useToast();
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState({ 
    users: 0, 
    earthquakes: 0, 
    logs: [], 
    userTrend: [],
    earthquakeTrend: [],
    alerts: []
  });

  const fetchData = async () => {
    try {
      const [statsRes, logsRes] = await Promise.all([
        api.get('/admin/dashboard-stats'), 
        api.get('/admin/audit-logs?limit=6'),
      ]);
      const dashboardData = statsRes.data.data;
      setStats(prev => ({ 
        ...prev,
        users: dashboardData.totalUsers, 
        earthquakes: dashboardData.totalEarthquakes, 
        userTrend: dashboardData.userTrend,
        earthquakeTrend: dashboardData.earthquakeTrend,
        alerts: dashboardData.alerts,
        logs: logsRes.data.data || [] 
      }));
    } catch (err) { console.error('Admin fetch error:', err); }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await api.post('/admin/sync-usgs', {});
      showToast(res.data.message, 'success');
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Sync failed', 'error');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Box sx={{ pt: 2.5, pb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2.5, mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 16 }} />
            <Typography variant="overline" fontWeight="900" color="primary" sx={{ letterSpacing: 1.5, lineHeight: 1 }}>SYSTEM COMMAND</Typography>
          </Box>
          <Typography variant="h4" fontWeight="1000" sx={{ color: 'text.primary', letterSpacing: -0.5, fontFamily: '"Outfit", sans-serif' }}>Control Center</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={syncing ? <CircularProgress size={16} color="inherit" /> : <SyncIcon />} 
          onClick={handleSync} 
          disabled={syncing}
          sx={{ 
            borderRadius: 3.5, 
            px: 3, 
            py: 1, 
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(239, 68, 68, 0.15)'
              : '0 4px 20px rgba(239, 68, 68, 0.25)',
            background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
            textTransform: 'none',
            fontWeight: '800',
            fontSize: '0.88rem',
            width: { xs: '100%', sm: 'auto' },
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 6px 24px rgba(239, 68, 68, 0.25)'
                : '0 6px 24px rgba(239, 68, 68, 0.35)',
              transform: 'translateY(-1px)',
            },
            '&.Mui-disabled': {
              background: (theme) => theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(249, 115, 22, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.5) 0%, rgba(249, 115, 22, 0.3) 100%)',
              color: 'rgba(255, 255, 255, 0.8) !important',
              boxShadow: 'none',
            }
          }}
        >
          {syncing ? 'Syncing...' : 'Sync USGS Data'}
        </Button>
      </Box>
      
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <StatCard 
            title="Active Users" 
            value={stats.users} 
            icon={<PeopleIcon />} 
            color="primary" 
            gradient="linear-gradient(135deg, #ef4444 0%, #f97316 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard 
            title="Seismic Records" 
            value={stats.earthquakes.toLocaleString()} 
            icon={<WarningIcon />} 
            color="warning" 
            gradient="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard 
            title="System Health" 
            value="100%" 
            icon={<CheckCircleIcon />} 
            color="success" 
            gradient="linear-gradient(135deg, #10b981 0%, #3b82f6 100%)"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: (theme) => theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.65)' : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(148, 163, 184, 0.12)',
            borderRadius: 4,
            boxShadow: 'none'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: 'text.primary', fontFamily: '"Outfit", sans-serif' }}>System Growth & Activity</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#ef4444' }} />
                  <Typography variant="caption" fontWeight="700" sx={{ color: 'text.secondary' }}>Earthquakes</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#3b82f6' }} />
                  <Typography variant="caption" fontWeight="700" sx={{ color: 'text.secondary' }}>Users</Typography>
                </Box>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={stats.earthquakeTrend.map((item, index) => ({
                ...item,
                users: stats.userTrend[index]?.users || 0
              }))}>
                <defs>
                  <linearGradient id="colorRecords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 600 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(148, 163, 184, 0.12)'} />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', color: theme.palette.text.primary, fontSize: '11px', fontWeight: 'bold', boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)' }} 
                />
                <Area type="monotone" name="Earthquakes" dataKey="records" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRecords)" />
                <Area type="monotone" name="Users" dataKey="users" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: (theme) => theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.65)' : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(148, 163, 184, 0.12)',
            borderRadius: 4,
            boxShadow: 'none'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <NotificationsActiveIcon color="error" sx={{ fontSize: 18 }} />
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: 'text.primary' }}>Live Notifications</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {stats.alerts.slice(0, 3).map((alert, index) => (
                <Box key={index} sx={{ 
                  p: 1.8, 
                  borderRadius: '10px', 
                  bgcolor: (theme) => alert.type === 'error' 
                    ? (theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)')
                    : alert.type === 'warning' 
                      ? (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)')
                      : (theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'),
                  border: '1px solid',
                  borderColor: (theme) => alert.type === 'error' 
                    ? (theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)')
                    : alert.type === 'warning' 
                      ? (theme.palette.mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)')
                      : (theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)'),
                }}>
                  <Typography 
                    variant="caption" 
                    fontWeight="700" 
                    sx={{ 
                      display: 'block', 
                      mb: 0.4, 
                      color: (theme) => alert.type === 'error' 
                        ? (theme.palette.mode === 'dark' ? '#f87171' : '#dc2626')
                        : alert.type === 'warning' 
                          ? (theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706')
                          : (theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb'),
                      fontSize: '0.78rem'
                    }}
                  >
                    {alert.message}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', fontWeight: 500 }}>Just now</Typography>
                </Box>
              ))}
              {stats.alerts.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="caption" color="textSecondary">System stable</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ 
        p: 0, 
        overflow: 'hidden',
        background: (theme) => theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.65)' : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(20px)',
        border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(148, 163, 184, 0.12)',
        borderRadius: 4,
        boxShadow: 'none'
      }}>
        <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.3)' : 'rgba(241, 245, 249, 0.4)' }}>
          <Typography variant="subtitle1" fontWeight="800" sx={{ color: 'text.primary' }}>Recent Audit Logs</Typography>
          <Button size="small" variant="text" sx={{ textTransform: 'none', fontWeight: '900', fontSize: '0.75rem' }}>View All</Button>
        </Box>
        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.08)' }} />
        <TableContainer sx={{ overflowX: 'auto', width: '100%' }}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: '800', py: 1.5, fontSize: '0.75rem' }}>ACTION</TableCell>
                <TableCell sx={{ fontWeight: '800', py: 1.5, fontSize: '0.75rem' }}>RESOURCE</TableCell>
                <TableCell sx={{ fontWeight: '800', py: 1.5, fontSize: '0.75rem', display: { xs: 'none', sm: 'table-cell' } }}>USER</TableCell>
                <TableCell sx={{ fontWeight: '800', py: 1.5, fontSize: '0.75rem' }}>TIME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.logs.map((log, i) => {
                const styles = getActionStyles(log.action, isDark);
                return (
                  <TableRow key={i} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip 
                        label={log.action} 
                        size="small" 
                        sx={{ 
                          height: 20,
                          fontSize: '0.65rem',
                          fontWeight: '800', 
                          bgcolor: styles.bg,
                          color: styles.text,
                          border: '1px solid',
                          borderColor: styles.border
                        }} 
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography variant="caption" fontWeight="700" sx={{ color: 'text.primary' }}>{log.resource}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5, display: { xs: 'none', sm: 'table-cell' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 22, height: 22, fontSize: '0.65rem', bgcolor: 'primary.main', fontWeight: 'bold' }}>
                          {log.userId?.name?.[0] || 'S'}
                        </Avatar>
                        <Typography variant="caption" fontWeight="700" sx={{ color: 'text.primary' }}>{log.userId?.name || 'System'}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{new Date(log.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
