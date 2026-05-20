import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions, Box } from '@mui/material';

const Card = ({ title, subtitle, action, children, footer, sx, ...props }) => {
  return (
    <MuiCard sx={{ height: '100%', ...sx }} {...props}>
      {title && (
        <CardHeader
          title={title}
          subheader={subtitle}
          action={action}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          {footer}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;
