import React, { useState, useEffect, useRef } from 'react';
import { Grid, Paper, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Input from '../common/Input';
import Select from '../common/Select';

const STATUS_OPTIONS = [{ value: '', label: 'All' }, { value: 'reviewed', label: 'Reviewed' }, { value: 'automatic', label: 'Automatic' }];
const MAG_TYPE_OPTIONS = [{ value: '', label: 'All' }, ...['mb', 'ml', 'ms', 'mw'].map(v => ({ value: v, label: v }))];

const EarthquakeFilters = ({ filters, onFilterChange, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const onFilterChangeRef = useRef(onFilterChange);
  useEffect(() => { onFilterChangeRef.current = onFilterChange; });

  // Sync local state when Redux filters change (e.g. Reset button)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Debounce: fire only when localFilters actually differs from Redux state
  useEffect(() => {
    const timer = setTimeout(() => {
      Object.keys(localFilters).forEach(key => {
        if (localFilters[key] !== filters[key]) {
          onFilterChangeRef.current(key, localFilters[key]);
        }
      });
    }, 700);
    return () => clearTimeout(timer);
  }, [localFilters, filters]);

  const handleChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Country" name="country" value={localFilters.country || ''} onChange={(e) => handleChange('country', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select label="Mag Type" name="magType" value={localFilters.magType || ''} onChange={(e) => handleChange('magType', e.target.value)} options={MAG_TYPE_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select label="Status" name="status" value={localFilters.status || ''} onChange={(e) => handleChange('status', e.target.value)} options={STATUS_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Network" name="net" value={localFilters.net || ''} onChange={(e) => handleChange('net', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Min Magnitude" name="minMagnitude" type="number" value={localFilters.minMagnitude || ''} onChange={(e) => handleChange('minMagnitude', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Max Magnitude" name="maxMagnitude" type="number" value={localFilters.maxMagnitude || ''} onChange={(e) => handleChange('maxMagnitude', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Min Depth" name="minDepth" type="number" value={localFilters.minDepth || ''} onChange={(e) => handleChange('minDepth', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Max Depth" name="maxDepth" type="number" value={localFilters.maxDepth || ''} onChange={(e) => handleChange('maxDepth', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button startIcon={<ClearIcon />} onClick={onReset} variant="outlined" color="secondary" size="small">Reset Filters</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EarthquakeFilters;
