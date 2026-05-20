import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

const Select = ({ label, name, value, onChange, options, error, helperText, fullWidth = true, size = 'small', required, disabled, ...props }) => {
  return (
    <FormControl fullWidth={fullWidth} size={size} error={!!error} required={required} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange} {...props}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
