import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import Input from '../common/Input';
import Select from '../common/Select';

const STATUS_OPTIONS = [{ value: '', label: 'All' }, { value: 'reviewed', label: 'Reviewed' }, { value: 'automatic', label: 'Automatic' }];
const MAG_TYPE_OPTIONS = [{ value: '', label: 'All' }, ...['mb', 'ml', 'ms', 'mw'].map(v => ({ value: v, label: v }))];

const EarthquakeFilters = ({ filters, onFilterChange, onReset }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
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
    <Box
      sx={{
        p: 3,
        mb: 3.5,
        borderRadius: '16px',
        background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
        backdropFilter: 'blur(16px)',
        boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.03)',
        // Override child inputs for premium unified look
        '& .MuiOutlinedInput-root': {
          borderRadius: '11px',
          fontSize: '0.88rem',
          background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
          transition: 'all 0.2s ease',
          '& fieldset': {
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)',
          },
          '&:hover fieldset': {
            borderColor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.22)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ef4444',
            borderWidth: '1.5px',
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.88rem',
          '&.Mui-focused': {
            color: '#ef4444',
          }
        }
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
        <Box sx={{ p: 0.8, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', color: isDark ? '#a78bfa' : '#6d28d9', display: 'flex', alignItems: 'center' }}>
          <FilterListIcon sx={{ fontSize: 18 }} />
        </Box>
        <Box>
          <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'text.primary', lineHeight: 1.2 }}>
            Filter Records
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500 }}>
            Refine the seismic database by specific metrics
          </Typography>
        </Box>
      </Box>

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
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
          <Button
            startIcon={<ClearIcon />}
            onClick={onReset}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '10px',
              fontSize: '0.78rem',
              fontWeight: 700,
              px: 2,
              py: 0.7,
              textTransform: 'none',
              borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
              color: 'text.secondary',
              '&:hover': {
                borderColor: '#ef4444',
                color: '#ef4444',
                bgcolor: 'rgba(239,68,68,0.04)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarthquakeFilters;
