import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, variant = 'contained', color = 'primary', size = 'medium', onClick, disabled, loading, startIcon, endIcon, fullWidth, type, sx, ...props }) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      type={type}
      sx={sx}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};

export default Button;
