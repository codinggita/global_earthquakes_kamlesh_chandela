import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import Input from '../common/Input';
import Select from '../common/Select';

const MAGNITUDE_TYPES = ['mb', 'ml', 'ms', 'mw', 'md', 'mh', 'mblg', 'mb_lg', 'mc', 'mwr', 'mww', 'mwb', 'mwc', 'mi', 'mlv', 'mfa'].map(v => ({ value: v, label: v }));
const STATUS_OPTIONS = ['reviewed', 'automatic', 'deleted'].map(v => ({ value: v, label: v }));
const TYPE_OPTIONS = ['earthquake', 'quarry', 'explosion', 'landslide', 'icequake', 'other'].map(v => ({ value: v, label: v }));

const EarthquakeForm = ({ initialData, onSubmit, loading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [formData, setFormData] = useState({
    time: '', place: '', country: '',
    latitude: '', longitude: '', depth: '', mag: '',
    magType: 'mb', type: 'earthquake', status: 'reviewed', net: '',
    gap: '', rms: '', magError: '', nst: '', dmin: '',
    horizontalError: '', depthError: '', locationSource: '', magSource: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        time: initialData.time ? new Date(initialData.time).toISOString().slice(0, 16) : '',
        place: initialData.place || '',
        country: initialData.country || '',
        latitude: initialData.latitude ?? '',
        longitude: initialData.longitude ?? '',
        depth: initialData.depth ?? '',
        mag: initialData.mag ?? '',
        magType: initialData.magType || 'mb',
        type: initialData.type || 'earthquake',
        status: initialData.status || 'reviewed',
        net: initialData.net || '',
        gap: initialData.gap ?? '',
        rms: initialData.rms ?? '',
        magError: initialData.magError ?? '',
        nst: initialData.nst || '',
        dmin: initialData.dmin ?? '',
        horizontalError: initialData.horizontalError ?? '',
        depthError: initialData.depthError ?? '',
        locationSource: initialData.locationSource || '',
        magSource: initialData.magSource || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build processed data — omit empty optional numbers to avoid validation errors
    const processedData = {
      time: formData.time,
      place: formData.place,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      depth: parseFloat(formData.depth),
      mag: parseFloat(formData.mag),
      magType: formData.magType || undefined,
      type: formData.type || undefined,
      status: formData.status || 'reviewed',
      net: formData.net || undefined,
    };

    // Country: if filled, override pre-save hook extraction from place
    if (formData.country) processedData.country = formData.country;

    // Optional numeric fields — only include if filled
    if (formData.gap !== '') processedData.gap = parseFloat(formData.gap);
    if (formData.rms !== '') processedData.rms = parseFloat(formData.rms);
    if (formData.magError !== '') processedData.magError = parseFloat(formData.magError);
    if (formData.dmin !== '') processedData.dmin = parseFloat(formData.dmin);
    if (formData.horizontalError !== '') processedData.horizontalError = parseFloat(formData.horizontalError);
    if (formData.depthError !== '') processedData.depthError = parseFloat(formData.depthError);
    if (formData.nst !== '') processedData.nst = formData.nst;
    if (formData.locationSource !== '') processedData.locationSource = formData.locationSource;
    if (formData.magSource !== '') processedData.magSource = formData.magSource;

    onSubmit(processedData);
  };

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
        display: 'block !important',
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
        p: 4,
        borderRadius: '20px',
        background: isDark ? '#161a2b' : '#ffffff',
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, color: 'text.primary', mb: 1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
        {initialData ? 'Edit Earthquake Event' : 'Record New Seismic Event'}
      </Typography>
      <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', mb: 3.5 }}>
        Enter official USGS parameters to register or update the seismic event
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2.5}>

          {/* Required Fields Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5 }}>
              <Box
                sx={{
                  p: 0.8, borderRadius: '10px',
                  background: isDark ? '#2e1b23' : '#ffecf0',
                  color: '#ff5e7e',
                  border: '1.5px solid #ff5e7e',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <LocationOnIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#ff5e7e', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                Required Parameters
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Date & Time *" name="time" type="datetime-local" value={formData.time} onChange={handleChange} required InputLabelProps={{ shrink: true }} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Input label="Place / Location *" name="place" value={formData.place} onChange={handleChange} required helperText="Format: 'City, Country' — country auto-detected from comma" sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} helperText="Optional — auto-detected from Place" sx={fieldSx} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Latitude *" name="latitude" type="number" inputProps={{ step: 'any', min: -90, max: 90 }} value={formData.latitude} onChange={handleChange} required sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Longitude *" name="longitude" type="number" inputProps={{ step: 'any', min: -180, max: 180 }} value={formData.longitude} onChange={handleChange} required sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Depth (km) *" name="depth" type="number" inputProps={{ step: 'any', min: 0 }} value={formData.depth} onChange={handleChange} required sx={fieldSx} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Magnitude *" name="mag" type="number" inputProps={{ step: '0.1', min: 0, max: 10 }} value={formData.mag} onChange={handleChange} required sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select label="Mag Type" name="magType" value={formData.magType} onChange={handleChange} options={MAGNITUDE_TYPES} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select label="Type" name="type" value={formData.type} onChange={handleChange} options={TYPE_OPTIONS} sx={fieldSx} />
          </Grid>

          {/* Optional Fields Section */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5 }}>
              <Box
                sx={{
                  p: 0.8, borderRadius: '10px',
                  background: isDark ? '#1a233b' : '#e6f0ff',
                  color: '#3b82f6',
                  border: '1.5px solid #3b82f6',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <SettingsIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                Optional Technical Metadata
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Network (net)" name="net" value={formData.net} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select label="Status" name="status" value={formData.status} onChange={handleChange} options={STATUS_OPTIONS} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Gap" name="gap" type="number" inputProps={{ step: 'any' }} value={formData.gap} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="RMS" name="rms" type="number" inputProps={{ step: 'any' }} value={formData.rms} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Mag Error" name="magError" type="number" inputProps={{ step: 'any' }} value={formData.magError} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="NST" name="nst" value={formData.nst} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Dmin" name="dmin" type="number" inputProps={{ step: 'any' }} value={formData.dmin} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Horizontal Error" name="horizontalError" type="number" inputProps={{ step: 'any' }} value={formData.horizontalError} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Depth Error" name="depthError" type="number" inputProps={{ step: 'any' }} value={formData.depthError} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Location Source" name="locationSource" value={formData.locationSource} onChange={handleChange} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Mag Source" name="magSource" value={formData.magSource} onChange={handleChange} sx={fieldSx} />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1.5, borderColor: isDark ? '#ffffff' : '#0f172a', borderWidth: '1.5px' }} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  borderRadius: '14px',
                  px: 5,
                  py: 1.5,
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  fontFamily: '"Fredoka", sans-serif',
                  textTransform: 'none',
                  background: '#ff5e7e',
                  color: '#ffffff',
                  border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
                  boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
                  '&:hover': {
                    background: '#e03f60',
                    transform: 'translate(-2px, -2px)',
                    boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
                  },
                  '&.Mui-disabled': {
                    background: isDark ? '#1f253d' : '#e2e8f0',
                    color: isDark ? '#475569' : '#94a3b8',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    boxShadow: 'none',
                    transform: 'none',
                  },
                  transition: 'all 0.15s ease',
                }}
              >
                {loading ? 'Saving...' : initialData ? 'Update Event' : 'Register Event'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EarthquakeForm;
