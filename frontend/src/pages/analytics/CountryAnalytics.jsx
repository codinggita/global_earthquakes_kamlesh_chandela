import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchCountryAnalysis } from '../../features/analytics/analyticsSlice';
import Loader from '../../components/common/Loader';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#4ECDC4', '#45B7D1'];

const CountryAnalytics = () => {
  const dispatch = useDispatch();
  const { countryAnalysis, loading } = useSelector((state) => state.analytics);

  useEffect(() => { dispatch(fetchCountryAnalysis(20)); }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" fontWeight="900" sx={{ color: '#f1f5f9', mb: 3 }}>Country Analysis</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: '#e2e8f0' }}>Earthquakes by Country</Typography>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie data={countryAnalysis?.data || []} cx="50%" cy="50%" labelLine={false} label={({ _id, count }) => `${_id || 'Unknown'}: ${count}`} outerRadius={180} dataKey="count">
              {(countryAnalysis?.data || []).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default CountryAnalytics;
