import React from 'react';
import { Box, Grid, Typography, Chip, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import { formatDate } from '../../utils/helpers';

const DetailItem = ({ icon, label, value, isDark }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.2 }}>
    {icon && (
      <Box sx={{ p: 0.8, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
    )}
    <Box>
      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.2 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.primary' }}>
        {value !== undefined && value !== null && value !== '' ? value : '—'}
      </Typography>
    </Box>
  </Box>
);

const getMagnitudeGradient = (m) => {
  if (m >= 7)  return 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
  if (m >= 6)  return 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)';
  if (m >= 5)  return 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)';
  if (m >= 4)  return 'linear-gradient(135deg, #eab308 0%, #854d0e 100%)';
  return           'linear-gradient(135deg, #10b981 0%, #047857 100%)';
};

const getMagnitudeGlow = (m) => {
  if (m >= 7)  return '0 8px 30px rgba(239,68,68,0.4)';
  if (m >= 6)  return '0 8px 30px rgba(249,115,22,0.4)';
  if (m >= 5)  return '0 8px 30px rgba(245,158,11,0.4)';
  if (m >= 4)  return '0 8px 30px rgba(234,179,8,0.3)';
  return           '0 8px 30px rgba(16,185,129,0.3)';
};

const EarthquakeDetails = ({ earthquake }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!earthquake) return null;

  const magGlow = getMagnitudeGlow(earthquake.mag);
  const magGrad = getMagnitudeGradient(earthquake.mag);

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Hero Section Card */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              p: 3,
              height: '100%',
              borderRadius: '20px',
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.04)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Ambient background glow */}
            <Box sx={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: earthquake.mag >= 6 ? '#ef4444' : '#8b5cf6', opacity: isDark ? 0.08 : 0.05, filter: 'blur(30px)', pointerEvents: 'none' }} />

            <Box>
              <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'text.primary', mb: 2.5, letterSpacing: '-0.02em' }}>
                Seismic Event Summary
              </Typography>

              {/* Big Magnitude Display */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
                <Box
                  sx={{
                    width: 76,
                    height: 76,
                    borderRadius: '16px',
                    background: magGrad,
                    boxShadow: magGlow,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ fontSize: '0.62rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8, lineHeight: 1 }}>
                    Mag
                  </Typography>
                  <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.1 }}>
                    {earthquake.mag}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: 'text.primary', mb: 0.8, lineHeight: 1.2 }}>
                    {earthquake.place}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip
                      label={earthquake.magType}
                      size="small"
                      sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800, bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: 'text.secondary', textTransform: 'uppercase' }}
                    />
                    <Chip
                      label={earthquake.type}
                      size="small"
                      sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800, bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: 'text.secondary', textTransform: 'uppercase' }}
                    />
                    <Chip
                      label={earthquake.status}
                      size="small"
                      sx={{
                        height: 18, fontSize: '0.65rem', fontWeight: 800,
                        textTransform: 'uppercase',
                        bgcolor: earthquake.status === 'reviewed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                        color: earthquake.status === 'reviewed' ? (isDark ? '#34d399' : '#059669') : (isDark ? '#fbbf24' : '#d97706'),
                        border: `1px solid ${earthquake.status === 'reviewed' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 2.5, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />

              {/* Time display */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                <AccessTimeIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.3 }} />
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', fontWeight: 600 }}>
                    Event Occurrence Time
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, mt: 0.2 }}>
                    {formatDate(earthquake.time)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.1 }}>
                    {new Date(earthquake.time).toUTCString()}
                  </Typography>
                </Box>
              </Box>

              {/* Depth gauge display */}
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <SpeedIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.3 }} />
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
                    Depth Level: <Box component="span" sx={{ color: '#8b5cf6', fontWeight: 800 }}>{earthquake.depth} km</Box>
                  </Typography>
                  
                  {/* Gauge bar */}
                  <Box sx={{ height: 6, borderRadius: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${Math.min(100, (earthquake.depth / 700) * 100)}%`,
                        background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)',
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mt: 0.5, display: 'block', textAlign: 'right' }}>
                    Category: {earthquake.depthCategory || 'Unknown'} Depth
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Bottom ID Badge */}
            <Box sx={{ mt: 4, pt: 2, borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}>
                USGS EVENT ID
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'text.primary', fontWeight: 700, bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', px: 1, py: 0.4, borderRadius: 1 }}>
                {earthquake.id || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Technical details Section */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {/* Location & Network info */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
                  border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.04)',
                }}
              >
                <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: '#ef4444' }} /> Location & Seismic Network
                </Typography>
                
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<PublicIcon sx={{ fontSize: 16 }} />} label="Country" value={earthquake.country} isDark={isDark} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<LanguageIcon sx={{ fontSize: 16 }} />} label="Seismic Network (net)" value={earthquake.net} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Latitude" value={earthquake.latitude} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Longitude" value={earthquake.longitude} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Location Source" value={earthquake.locationSource} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Mag Source" value={earthquake.magSource} isDark={isDark} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Quality control parameters */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
                  border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.04)',
                }}
              >
                <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InfoIcon sx={{ fontSize: 18, color: '#f59e0b' }} /> Quality Factors & Metadata
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Gap (Azimuthal)" value={earthquake.gap !== undefined ? `${earthquake.gap}°` : '—'} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="RMS (Residual)" value={earthquake.rms} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Dmin (Min Dist)" value={earthquake.dmin !== undefined ? `${earthquake.dmin} km` : '—'} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="NST (Stations)" value={earthquake.nst} isDark={isDark} />
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Mag Error" value={earthquake.magError} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Mag NST" value={earthquake.magNst} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Horiz. Error" value={earthquake.horizontalError !== undefined ? `${earthquake.horizontalError} km` : '—'} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Depth Error" value={earthquake.depthError !== undefined ? `${earthquake.depthError} km` : '—'} isDark={isDark} />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Year" value={earthquake.year} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Month" value={earthquake.month} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Day" value={earthquake.day} isDark={isDark} />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Magnitude Cat" value={earthquake.magnitudeCategory} isDark={isDark} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarthquakeDetails;
