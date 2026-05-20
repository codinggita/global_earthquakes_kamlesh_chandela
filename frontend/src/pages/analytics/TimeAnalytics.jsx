import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchMonthlyAnalysis } from '../../features/analytics/analyticsSlice';
import Loader from '../../components/common/Loader';

const TimeAnalytics = () => {
  const dispatch = useDispatch();
  const { monthlyAnalysis, loading } = useSelector((state) => state.analytics);
  const [year, setYear] = useState(2015);

  useEffect(() => { dispatch(fetchMonthlyAnalysis(year)); }, [dispatch, year]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="900" sx={{ color: '#f1f5f9' }}>Time-Based Analysis</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
            <MenuItem value={2015}>2015</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: '#e2e8f0' }}>Monthly Earthquake Trends ({year})</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyAnalysis?.data || []}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.06)" />
            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.08)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '10px' }} />
            <Line yAxisId="left" type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2.5} name="Count" />
            <Line yAxisId="right" type="monotone" dataKey="avgMagnitude" stroke="#34d399" name="Avg Mag" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default TimeAnalytics;
