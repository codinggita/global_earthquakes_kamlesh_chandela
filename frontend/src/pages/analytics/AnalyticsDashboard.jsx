import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import WarningIcon from '@mui/icons-material/Warning';
import LayersIcon from '@mui/icons-material/Layers';
import PublicIcon from '@mui/icons-material/Public';
import { fetchCountryAnalysis, fetchMagnitudeAnalysis, fetchDepthAnalysis, fetchMonthlyAnalysis, fetchHighestMagnitude, fetchDeepest } from '../../features/analytics/analyticsSlice';
import Loader from '../../components/common/Loader';

const COLORS = ['#6366f1', '#10b981', '#fbbf24', '#ef4444', '#8b5cf6', '#0ea5e9', '#ec4899'];

const AnalyticsStatCard = ({ title, value, subtitle, icon, color, isDark }) => {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: '14px',
        height: '100%',
        background: isDark ? 'rgba(10,16,30,0.94)' : 'rgba(255,255,255,0.94)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        borderLeft: `3.5px solid ${color}`,
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
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
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: isDark ? '#475569' : '#94a3b8' }}>
          {title}
        </Typography>
        <Box sx={{ p: 0.8, borderRadius: '8px', background: `${color}14`, color, display: 'flex', alignItems: 'center', '& .MuiSvgIcon-root': { fontSize: '16px !important' } }}>
          {icon}
        </Box>
      </Box>

      <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '2rem', lineHeight: 1.1, letterSpacing: '-0.04em', color: 'text.primary', mb: 1 }}>
        {value}
      </Typography>

      <Typography variant="body2" sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { countryAnalysis, magnitudeAnalysis, depthAnalysis, monthlyAnalysis, highestMagnitude, deepest, loading } = useSelector((state) => state.analytics);
  const [selectedYear, setSelectedYear] = useState('');
  const [availableYears, setAvailableYears] = useState([]);

  // Format magnitude data for better Pie Chart labels
  const formattedMagnitudeData = (magnitudeAnalysis?.data || []).map(item => ({
    ...item,
    name: item._id === 'Other' ? 'Other' : `Mag ${item._id} - ${item._id + 1}`
  }));

  // Format depth data for better Radar Chart labels
  const formattedDepthData = (depthAnalysis?.data || []).map(item => {
    let label = item._id === 'Deepest' ? '> 700 km' : `${item._id} km+`;
    if (item._id === 0) label = '0-50 km';
    else if (item._id === 50) label = '50-100 km';
    else if (item._id === 100) label = '100-150 km';
    else if (item._id === 150) label = '150-200 km';
    else if (item._id === 200) label = '200-250 km';
    else if (item._id === 250) label = '250-300 km';
    else if (item._id === 300) label = '300-400 km';
    else if (item._id === 400) label = '400-500 km';
    else if (item._id === 500) label = '500-700 km';
    return { ...item, label };
  });

  useEffect(() => {
    import('../../services/api').then(m => {
      m.default.get('/analytics/earthquakes/available-years').then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setAvailableYears(res.data.data);
          setSelectedYear(res.data.data[0]); // Default to most recent year
        }
      }).catch(err => console.error('Error fetching available years:', err));
    });
  }, []);

  useEffect(() => {
    if (selectedYear === null) return;
    console.log('AnalyticsDashboard fetching data for year:', selectedYear || 'All Years');
    dispatch(fetchCountryAnalysis(selectedYear));
    dispatch(fetchMagnitudeAnalysis(selectedYear));
    dispatch(fetchDepthAnalysis(selectedYear));
    dispatch(fetchMonthlyAnalysis(selectedYear));
    dispatch(fetchHighestMagnitude(selectedYear));
    dispatch(fetchDeepest(selectedYear));
  }, [dispatch, selectedYear]);

  if (loading || !selectedYear) return <Loader />;

  return (
    <Box sx={{ p: 0 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box sx={{ width: 12, height: 2, bgcolor: '#ef4444', borderRadius: 1 }} />
            <Typography variant="overline" fontWeight="900" color="primary" sx={{ letterSpacing: 1.5, lineHeight: 1 }}>
              Analytics Portal
            </Typography>
          </Box>
          <Typography
            sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: { xs: '1.5rem', sm: '1.8rem' }, letterSpacing: '-0.03em', color: 'text.primary', lineHeight: 1.1 }}
          >
            Global Seismic Insights
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500, mt: 0.4 }}>
            Real-time aggregation of earthquake indicators and trend patterns
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 160, width: { xs: '100%', sm: 'auto' } }}>
          <InputLabel sx={{ fontSize: '0.85rem' }}>Analytics Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Analytics Year"
            sx={{
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(10px)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.22)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ef4444',
              }
            }}
          >
            <MenuItem value="">All Years</MenuItem>
            {availableYears.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} md={4}>
          <AnalyticsStatCard
            title="Highest Magnitude"
            value={highestMagnitude?.data?.mag ? `M ${highestMagnitude.data.mag}` : 'N/A'}
            subtitle={highestMagnitude?.data?.place || 'No details available'}
            icon={<WarningIcon />}
            color="#ef4444"
            isDark={isDark}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalyticsStatCard
            title="Deepest Event"
            value={
              (Array.isArray(deepest?.data) ? deepest?.data[0]?.depth : deepest?.data?.depth)
                ? `${(Array.isArray(deepest?.data) ? deepest?.data[0]?.depth : deepest?.data?.depth)} km`
                : 'N/A'
            }
            subtitle={
              (Array.isArray(deepest?.data) ? deepest?.data[0]?.place : deepest?.data?.place) || 'Unknown Location'
            }
            icon={<LayersIcon />}
            color="#818cf8"
            isDark={isDark}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalyticsStatCard
            title="Affected Countries"
            value={countryAnalysis?.data?.length || 0}
            subtitle="Registered across standard zones"
            icon={<PublicIcon />}
            color="#10b981"
            isDark={isDark}
          />
        </Grid>
      </Grid>

      {/* Chart Panels */}
      <Grid container spacing={3.5}>
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.03)',
            }}
          >
            <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.05rem', mb: 3, color: 'text.primary', letterSpacing: '-0.01em' }}>
              Monthly Seismic Activity Trend
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyAnalysis?.data || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(148, 163, 184, 0.12)'} />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 600 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 600 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 600 }} />
                <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', color: theme.palette.text.primary, fontSize: '12px', fontWeight: 600, boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Event Count" />
                <Line yAxisId="right" type="monotone" dataKey="avgMagnitude" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Avg Magnitude" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.03)',
            }}
          >
            <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.05rem', mb: 3, color: 'text.primary', letterSpacing: '-0.01em' }}>
              Magnitude Categories
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={formattedMagnitudeData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="count" nameKey="name">
                  {formattedMagnitudeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', color: theme.palette.text.primary, fontSize: '12px', fontWeight: 600, boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.03)',
            }}
          >
            <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.05rem', mb: 3, color: 'text.primary', letterSpacing: '-0.01em' }}>
              Top 10 High Activity Zones
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={countryAnalysis?.data?.slice(0, 10) || []} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(148, 163, 184, 0.12)'} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 600 }} />
                <YAxis type="category" dataKey="_id" axisLine={false} tickLine={false} width={80} tick={{ fill: theme.palette.text.secondary, fontSize: 10, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)' }} contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', color: theme.palette.text.primary, fontSize: '12px', fontWeight: 600, boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.03)',
            }}
          >
            <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.05rem', mb: 3, color: 'text.primary', letterSpacing: '-0.01em' }}>
              Depth Profile Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedDepthData}>
                <PolarGrid stroke={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(148, 163, 184, 0.15)'} />
                <PolarAngleAxis dataKey="label" tick={{ fill: theme.palette.text.secondary, fontSize: 9, fontWeight: 600 }} />
                <PolarRadiusAxis tick={{ fill: theme.palette.text.secondary, fontSize: 8, fontWeight: 600 }} />
                <Radar name="Count" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', color: theme.palette.text.primary, fontSize: '12px', fontWeight: 600, boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
