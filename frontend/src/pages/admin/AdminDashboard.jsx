import React, { useEffect, useState } from 'react';
import { 
  Box, Grid, Typography, Card, CardContent, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Chip, Button, IconButton, Avatar, 
  LinearProgress, Divider, Tooltip 
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
      boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 12px 30px rgba(0,0,0,0.35)' : '0 12px 30px rgba(99, 102, 241, 0.08)',
      borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(99, 102, 241, 0.25)',
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
          bgcolor: color === 'primary' ? 'rgba(99, 102, 241, 0.12)' : color === 'warning' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)', 
          color: color === 'primary' ? '#818cf8' : color === 'warning' ? '#f59e0b' : '#10b981', 
          width: 44, 
          height: 44, 
          borderRadius: 2.5,
          border: '1px solid rgba(148, 163, 184, 0.08)'
        }}>
          {icon}
        </Avatar>
        <Typography color="text.secondary" variant="caption" fontWeight="800" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant="h4" fontWeight="900" sx={{ color: 'text.primary', letterSpacing: '-0.03em' }}>{value}</Typography>
        <Typography variant="caption" color="success.main" sx={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <TrendingUpIcon sx={{ fontSize: 12 }} /> Live
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
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
    <Box sx={{ py: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2.5, mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 16 }} />
            <Typography variant="overline" fontWeight="900" color="primary" sx={{ letterSpacing: 1.5, lineHeight: 1 }}>SYSTEM COMMAND</Typography>
          </Box>
          <Typography variant="h4" fontWeight="1000" sx={{ color: 'text.primary', letterSpacing: -0.5 }}>Control Center</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={syncing ? null : <SyncIcon />} 
          onClick={handleSync} 
          disabled={syncing}
          sx={{ 
            borderRadius: 3, 
            px: 3, 
            py: 1, 
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
            textTransform: 'none',
            fontWeight: '800',
            fontSize: '0.85rem',
            width: { xs: '100%', sm: 'auto' }
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
            gradient="linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
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
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: 'text.primary' }}>System Growth & Activity</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
                  <Typography variant="caption" fontWeight="700" sx={{ color: 'text.secondary' }}>Earthquakes</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#6366f1' }} />
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
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(148, 163, 184, 0.1)', borderRadius: '12px', color: '#f1f5f9', fontSize: '11px', fontWeight: 'bold' }} 
                />
                <Area type="monotone" name="Earthquakes" dataKey="records" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRecords)" />
                <Area type="monotone" name="Users" dataKey="users" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUsers)" />
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
                  p: 1.5, 
                  borderRadius: 1.5, // Reduced border radius for a sharper, cleaner look
                  bgcolor: alert.type === 'error' ? 'rgba(239, 68, 68, 0.08)' : alert.type === 'warning' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid',
                  borderColor: alert.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : alert.type === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)'
                }}>
                  <Typography variant="caption" fontWeight="800" sx={{ display: 'block', mb: 0.2, color: alert.type === 'error' ? '#f87171' : alert.type === 'warning' ? '#fbbf24' : '#60a5fa' }}>
                    {alert.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">Just now</Typography>
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
              {stats.logs.map((log, i) => (
                <TableRow key={i} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ py: 1.5 }}>
                    <Chip 
                      label={log.action} 
                      size="small" 
                      sx={{ 
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: '800', 
                        bgcolor: log.action === 'LOGIN' ? 'rgba(52, 211, 153, 0.12)' : log.action === 'DELETE' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(148, 163, 184, 0.12)',
                        color: log.action === 'LOGIN' ? '#34d399' : log.action === 'DELETE' ? '#f87171' : '#94a3b8',
                        border: '1px solid',
                        borderColor: log.action === 'LOGIN' ? 'rgba(52, 211, 153, 0.2)' : log.action === 'DELETE' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(148, 163, 184, 0.2)'
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
