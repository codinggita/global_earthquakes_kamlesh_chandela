import React from 'react';
import { Card, CardContent, CardHeader, Box } from '@mui/material';

const ChartCard = ({ title, subtitle, action, children, height = 400 }) => {
  return (
    <Card>
      <CardHeader title={title} subheader={subtitle} action={action} />
      <CardContent>
        <Box sx={{ width: '100%', height }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
