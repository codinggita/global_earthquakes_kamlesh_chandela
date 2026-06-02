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

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: '20px',
        background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
        backdropFilter: 'blur(16px)',
        boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.04)',
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
      <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, color: 'text.primary', mb: 1, letterSpacing: '-0.02em' }}>
        {initialData ? 'Edit Earthquake Event' : 'Record New Seismic Event'}
      </Typography>
      <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500, mb: 3.5 }}>
        Enter official USGS parameters to register or update the seismic event
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2.5}>

          {/* Required Fields Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <LocationOnIcon color="primary" sx={{ fontSize: 18 }} />
              <Typography variant="subtitle2" color="primary" fontWeight="700" sx={{ letterSpacing: '0.02em' }}>
                Required Parameters
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Date & Time *" name="time" type="datetime-local" value={formData.time} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Input label="Place / Location *" name="place" value={formData.place} onChange={handleChange} required helperText="Format: 'City, Country' — country auto-detected from comma" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} helperText="Optional — auto-detected from Place" />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Latitude *" name="latitude" type="number" inputProps={{ step: 'any', min: -90, max: 90 }} value={formData.latitude} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Longitude *" name="longitude" type="number" inputProps={{ step: 'any', min: -180, max: 180 }} value={formData.longitude} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Depth (km) *" name="depth" type="number" inputProps={{ step: 'any', min: 0 }} value={formData.depth} onChange={handleChange} required />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Magnitude *" name="mag" type="number" inputProps={{ step: '0.1', min: 0, max: 10 }} value={formData.mag} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select label="Mag Type" name="magType" value={formData.magType} onChange={handleChange} options={MAGNITUDE_TYPES} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select label="Type" name="type" value={formData.type} onChange={handleChange} options={TYPE_OPTIONS} />
          </Grid>

          {/* Optional Fields Section */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <SettingsIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
              <Typography variant="subtitle2" color="text.secondary" fontWeight="700" sx={{ letterSpacing: '0.02em' }}>
                Optional Technical Metadata
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input label="Network (net)" name="net" value={formData.net} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select label="Status" name="status" value={formData.status} onChange={handleChange} options={STATUS_OPTIONS} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Gap" name="gap" type="number" inputProps={{ step: 'any' }} value={formData.gap} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="RMS" name="rms" type="number" inputProps={{ step: 'any' }} value={formData.rms} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Mag Error" name="magError" type="number" inputProps={{ step: 'any' }} value={formData.magError} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="NST" name="nst" value={formData.nst} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Dmin" name="dmin" type="number" inputProps={{ step: 'any' }} value={formData.dmin} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Horizontal Error" name="horizontalError" type="number" inputProps={{ step: 'any' }} value={formData.horizontalError} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input label="Depth Error" name="depthError" type="number" inputProps={{ step: 'any' }} value={formData.depthError} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Location Source" name="locationSource" value={formData.locationSource} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input label="Mag Source" name="magSource" value={formData.magSource} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1.5, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  borderRadius: 3,
                  px: 5,
                  py: 1.2,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                  boxShadow: '0 4px 16px rgba(239,68,68,0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(239,68,68,0.35)',
                  },
                  '&.Mui-disabled': {
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                    color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.2s ease',
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
