import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import statsService from '../../services/stats.service';
import Loader from '../../components/common/Loader';
import api from '../../services/api';

const StatisticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    api.get('/analytics/earthquakes/available-years').then(res => {
      if (res.data.success && res.data.data.length > 0) {
        setAvailableYears(res.data.data);
        setSelectedYear(res.data.data[0]);
      }
    }).catch(err => console.error('Error fetching available years:', err));
  }, []);

  useEffect(() => {
    if (selectedYear === null) return;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [count, highMag, deepest, avgDepth, avgMag, countryData, typeData, monthlyData, reviewed] = await Promise.all([
          statsService.getCount(selectedYear), statsService.getHighestMagnitude(selectedYear), statsService.getDeepest(selectedYear),
          statsService.getAverageDepth(selectedYear), statsService.getAverageMagnitude(selectedYear), statsService.getCountryCount(selectedYear),
          statsService.getTypeCount(selectedYear), statsService.getMonthlyCount(selectedYear), statsService.getReviewedCount(selectedYear),
        ]);
        setStats({ count: count.data.total, highestMag: highMag.data, deepest: deepest.data, avgDepth: avgDepth.data.averageDepth, avgMag: avgMag.data.averageMagnitude, reviewed: reviewed.data.reviewedCount });
        setCountries(countryData.data || []);
        setTypes(typeData.data || []);
        setMonthly(monthlyData.data || []);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
      setLoading(false);
    };
    fetchStats();
  }, [selectedYear]);

  if (loading || selectedYear === null) return <Loader />;

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Typography variant="h4" fontWeight="800" sx={{ mb: 0 }}>Statistics</Typography>
        <FormControl size="small" sx={{ minWidth: 150, width: { xs: '100%', sm: 'auto' } }}>
          <InputLabel>Filter by Year</InputLabel>
          <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} label="Filter by Year" sx={{ borderRadius: 2 }}>
            <MenuItem value="">All Years</MenuItem>
            {availableYears.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary">Total Earthquakes</Typography><Typography variant="h4">{stats?.count || 0}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary">Highest Magnitude</Typography><Typography variant="h4" color="error">{stats?.highestMag?.mag || 'N/A'}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary">Average Magnitude</Typography><Typography variant="h4">{parseFloat(stats?.avgMag || 0).toFixed(2)}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary">Average Depth</Typography><Typography variant="h4">{parseFloat(stats?.avgDepth || 0).toFixed(1)} km</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary">Deepest</Typography><Typography variant="h4">{stats?.deepest?.depth || 0} km</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="textSecondary">Reviewed</Typography><Typography variant="h4" color="success.main">{stats?.reviewed || 0}</Typography></CardContent></Card></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px', overflowY: 'auto' }}><Typography variant="h6" gutterBottom>Countries</Typography>
            <TableContainer><Table size="small" stickyHeader><TableHead><TableRow><TableCell>Country</TableCell><TableCell align="right">Count</TableCell></TableRow></TableHead>
              <TableBody>{countries.map((c, i) => <TableRow key={i}><TableCell>{c._id || 'Unknown'}</TableCell><TableCell align="right">{c.count}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px', overflowY: 'auto' }}><Typography variant="h6" gutterBottom>Types</Typography>
            <TableContainer><Table size="small" stickyHeader><TableHead><TableRow><TableCell>Type</TableCell><TableCell align="right">Count</TableCell></TableRow></TableHead>
              <TableBody>{types.map((t, i) => <TableRow key={i}><TableCell>{t._id || 'Unknown'}</TableCell><TableCell align="right">{t.count}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsDashboard;
