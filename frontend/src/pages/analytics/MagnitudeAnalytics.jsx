import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMagnitudeAnalysis } from '../../features/analytics/analyticsSlice';
import Loader from '../../components/common/Loader';

const MagnitudeAnalytics = () => {
  const dispatch = useDispatch();
  const { magnitudeAnalysis, loading } = useSelector((state) => state.analytics);

  useEffect(() => { dispatch(fetchMagnitudeAnalysis()); }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" fontWeight="900" sx={{ color: '#f1f5f9', mb: 3 }}>Magnitude Analysis</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: '#e2e8f0' }}>Magnitude Distribution</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={magnitudeAnalysis?.data || []}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.06)" />
            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
            <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.04)' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={16} name="Count" />
            <Bar dataKey="avgDepth" fill="#34d399" radius={[4, 4, 0, 0]} barSize={16} name="Avg Depth" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default MagnitudeAnalytics;
