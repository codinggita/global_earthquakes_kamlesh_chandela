import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, name, value, onChange, error, helperText, type = 'text', fullWidth = true, size = 'small', multiline, rows, required, disabled, placeholder, sx, ...props }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      type={type}
      fullWidth={fullWidth}
      size={size}
      multiline={multiline}
      rows={rows}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      sx={sx}
      {...props}
    />
  );
};

export default Input;
