import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchDepthAnalysis } from '../../features/analytics/analyticsSlice';
import Loader from '../../components/common/Loader';

const DepthAnalytics = () => {
  const dispatch = useDispatch();
  const { depthAnalysis, loading } = useSelector((state) => state.analytics);

  useEffect(() => { dispatch(fetchDepthAnalysis()); }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" fontWeight="900" sx={{ color: '#f1f5f9', mb: 3 }}>Depth Analysis</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: '#e2e8f0' }}>Depth Distribution</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={depthAnalysis?.data || []}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.06)" />
            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
            <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.04)' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
            <Bar dataKey="count" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={20} name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default DepthAnalytics;
