import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const StatsCards = ({ stats, loading }) => {
  const items = [
    { title: 'Total Earthquakes', value: stats?.count || 0, color: 'primary.main' },
    { title: 'Highest Magnitude', value: stats?.highestMag?.mag || 'N/A', color: 'error.main' },
    { title: 'Average Depth', value: (parseFloat(stats?.avgDepth) || 0).toFixed(1) + ' km', color: 'info.main' },
    { title: 'Reviewed', value: stats?.reviewed || 0, color: 'success.main' },
  ];

  return (
    <Grid container spacing={3}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card><CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">{item.title}</Typography>
            <Typography variant="h4" sx={{ color: item.color, fontWeight: 'bold' }}>{loading ? '...' : item.value}</Typography>
          </CardContent></Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
