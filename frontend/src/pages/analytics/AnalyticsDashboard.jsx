import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { fetchCountryAnalysis, fetchMagnitudeAnalysis, fetchDepthAnalysis, fetchMonthlyAnalysis, fetchHighestMagnitude, fetchDeepest } from '../../features/analytics/analyticsSlice';
import Loader from '../../components/common/Loader';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
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
    <Box sx={{ p: 1 }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ color: 'text.primary', letterSpacing: '-0.02em', mb: 0.5 }}>Global Seismic Insights</Typography>
          <Typography variant="subtitle1" sx={{ color: '#475569', fontWeight: 500 }}>Real-time earthquake data aggregation and trend analysis</Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 150, width: { xs: '100%', sm: 'auto' } }}>
          <InputLabel>Analytics Year</InputLabel>
          <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} label="Analytics Year" sx={{ borderRadius: 2 }}>
            <MenuItem value="">All Years</MenuItem>
            {availableYears.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" variant="overline" fontWeight="700" sx={{ letterSpacing: '0.05em' }}>Highest Magnitude</Typography>
              <Typography variant="h3" fontWeight="900" sx={{ color: '#f87171', my: 1 }}>{highestMagnitude?.data?.mag || 'N/A'}</Typography>
              <Typography variant="body2" color="textSecondary" noWrap sx={{ mt: 0.5 }}>{highestMagnitude?.data?.place}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" variant="overline" fontWeight="700" sx={{ letterSpacing: '0.05em' }}>Deepest Event</Typography>
              <Typography variant="h3" fontWeight="900" sx={{ color: '#818cf8', my: 1 }}>{(Array.isArray(deepest?.data) ? deepest?.data[0]?.depth : deepest?.data?.depth) || 'N/A'} <span style={{ fontSize: '1rem', fontWeight: '500' }}>km</span></Typography>
              <Typography variant="body2" color="textSecondary" noWrap sx={{ mt: 0.5 }}>{(Array.isArray(deepest?.data) ? deepest?.data[0]?.place : deepest?.data?.place) || 'Unknown Location'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" variant="overline" fontWeight="700" sx={{ letterSpacing: '0.05em' }}>Affected Countries</Typography>
              <Typography variant="h3" fontWeight="900" sx={{ color: '#34d399', my: 1 }}>{countryAnalysis?.data?.length || 0}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>Mapped across global seismic networks</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: 'text.primary' }}>Monthly Seismic Activity Trend</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyAnalysis?.data || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.06)" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Event Count" />
                <Line yAxisId="right" type="monotone" dataKey="avgMagnitude" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Avg Magnitude" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: 'text.primary' }}>Magnitude Categories</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={formattedMagnitudeData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="count" nameKey="name">
                  {formattedMagnitudeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: 'text.primary' }}>Top 10 High Activity Zones</Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={countryAnalysis?.data?.slice(0, 10) || []} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148, 163, 184, 0.06)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis type="category" dataKey="_id" axisLine={false} tickLine={false} width={80} tick={{ fill: '#475569', fontSize: 10 }} />
                <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.04)' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: 'text.primary' }}>Depth Profile Analysis</Typography>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedDepthData}>
                <PolarGrid stroke="rgba(148, 163, 184, 0.08)" />
                <PolarAngleAxis dataKey="label" tick={{ fill: '#475569', fontSize: 9 }} />
                <PolarRadiusAxis tick={{ fill: '#475569', fontSize: 8 }} />
                <Radar name="Count" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
