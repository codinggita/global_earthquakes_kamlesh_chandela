import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import Input from '../common/Input';
import Select from '../common/Select';

const STATUS_OPTIONS  = [{ value: '', label: 'All' }, { value: 'reviewed', label: 'Reviewed' }, { value: 'automatic', label: 'Automatic' }];
const MAG_TYPE_OPTIONS = [{ value: '', label: 'All' }, ...['mb', 'ml', 'ms', 'mw'].map(v => ({ value: v, label: v }))];

const EarthquakeFilters = ({ filters, onFilterChange, onReset }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [localFilters, setLocalFilters]   = useState(filters);
  const onFilterChangeRef                 = useRef(onFilterChange);

  useEffect(() => { onFilterChangeRef.current = onFilterChange; });

  // Sync local state when Redux filters change (e.g. Reset button)
  useEffect(() => { setLocalFilters(filters); }, [filters]);

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

  const borderColor = isDark ? '#ffffff' : '#0f172a';
  const shadowColor = isDark ? '#ffffff' : '#0f172a';

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontSize: '0.88rem',
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 700,
      background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
      '& fieldset': {
        borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.35)',
        borderWidth: '1.8px',
      },
      '&:hover fieldset': {
        borderColor: '#ff5e7e',
        borderWidth: '2px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff5e7e',
        borderWidth: '2px',
        boxShadow: '2px 2px 0px 0px #ff5e7e',
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 700,
      fontSize: '0.88rem',
      '&.Mui-focused': { color: '#ff5e7e' },
    },
  };

  return (
    <Box
      sx={{
        p: 3,
        mb: 3.5,
        borderRadius: '20px',
        background: isDark ? '#161a2b' : '#fffbf0',
        border: `2.5px solid ${borderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              p: 0.8, borderRadius: '10px',
              background: isDark ? '#2e1b23' : '#ffecf0',
              color: '#ff5e7e',
              border: isDark ? '1.5px solid #ff5e7e' : '1.5px solid #ff5e7e',
              display: 'flex', alignItems: 'center',
            }}
          >
            <FilterListIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box>
            <Typography sx={{
              fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
              fontSize: '0.95rem', color: 'text.primary', lineHeight: 1.2,
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>
              Filter Records
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 700, fontFamily: '"Quicksand", sans-serif' }}>
              Refine the seismic database by specific metrics
            </Typography>
          </Box>
        </Box>

        {/* Reset button */}
        <Button
          startIcon={<ClearIcon />}
          onClick={onReset}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800,
            fontFamily: '"Fredoka", sans-serif',
            px: 2, py: 0.7, textTransform: 'none',
            borderColor: isDark ? '#ffffff' : '#0f172a',
            borderWidth: '2px !important',
            color: isDark ? '#ffffff' : '#0f172a',
            backgroundColor: isDark ? '#161a2b' : '#ffffff',
            boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
            '&:hover': {
              borderColor: '#ff5e7e',
              color: '#ff5e7e',
              boxShadow: '2px 2px 0px 0px #ff5e7e',
              transform: 'translate(-1px,-1px)',
            },
            transition: 'all 0.18s ease',
          }}
        >
          Reset Filters
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Country" name="country" value={localFilters.country || ''}
            onChange={(e) => handleChange('country', e.target.value)} sx={fieldSx} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select label="Mag Type" name="magType" value={localFilters.magType || ''}
            onChange={(e) => handleChange('magType', e.target.value)} options={MAG_TYPE_OPTIONS} sx={fieldSx} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select label="Status" name="status" value={localFilters.status || ''}
            onChange={(e) => handleChange('status', e.target.value)} options={STATUS_OPTIONS} sx={fieldSx} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Network" name="net" value={localFilters.net || ''}
            onChange={(e) => handleChange('net', e.target.value)} sx={fieldSx} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Min Magnitude" name="minMagnitude" type="number" value={localFilters.minMagnitude || ''}
            onChange={(e) => handleChange('minMagnitude', e.target.value)} sx={fieldSx} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Max Magnitude" name="maxMagnitude" type="number" value={localFilters.maxMagnitude || ''}
            onChange={(e) => handleChange('maxMagnitude', e.target.value)} sx={fieldSx} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Min Depth" name="minDepth" type="number" value={localFilters.minDepth || ''}
            onChange={(e) => handleChange('minDepth', e.target.value)} sx={fieldSx} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input label="Max Depth" name="maxDepth" type="number" value={localFilters.maxDepth || ''}
            onChange={(e) => handleChange('maxDepth', e.target.value)} sx={fieldSx} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarthquakeFilters;
