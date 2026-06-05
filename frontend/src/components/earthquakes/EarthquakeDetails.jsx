import React from 'react';
import { Box, Grid, Typography, Chip, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon      from '@mui/icons-material/Speed';
import PublicIcon     from '@mui/icons-material/Public';
import LanguageIcon   from '@mui/icons-material/Language';
import InfoIcon       from '@mui/icons-material/Info';
import { formatDate } from '../../utils/helpers';

/* ── Detail row item ─────────────────────────────────────────── */
const DetailItem = ({ icon, label, value, isDark, accentColor = '#8b5cf6' }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.2 }}>
    {icon && (
      <Box sx={{
        p: 0.7, borderRadius: '8px',
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.05)',
        color: accentColor, display: 'flex', alignItems: 'center',
        border: `1px solid ${accentColor}30`,
      }}>
        {icon}
      </Box>
    )}
    <Box>
      <Typography sx={{
        display: 'block', fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.68rem', color: 'text.secondary', fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.2,
      }}>
        {label}
      </Typography>
      <Typography sx={{
        fontSize: '0.92rem', fontWeight: 700,
        fontFamily: '"Quicksand", sans-serif', color: 'text.primary',
      }}>
        {value !== undefined && value !== null && value !== '' ? value : '—'}
      </Typography>
    </Box>
  </Box>
);

/* ── Magnitude pastel colour ──────────────────────────────────── */
const getMagStyle = (m) => {
  if (m >= 7) return { bg: '#ffe0e0', border: '#ff5e7e', text: '#c0152e', label: 'Extreme' };
  if (m >= 6) return { bg: '#fff0e0', border: '#f97316', text: '#c05a00', label: 'Strong'  };
  if (m >= 5) return { bg: '#fff4d2', border: '#fbbf24', text: '#92680a', label: 'Moderate' };
  if (m >= 4) return { bg: '#fefce8', border: '#eab308', text: '#7a6000', label: 'Light'   };
  return         { bg: '#e6f9f3', border: '#10b981', text: '#065f46', label: 'Minor'    };
};

/* ── Card wrapper ─────────────────────────────────────────────── */
const NeuCard = ({ children, isDark, sx = {} }) => {
  const borderColor = isDark ? '#ffffff' : '#0f172a';
  const shadowColor = isDark ? '#ffffff' : '#0f172a';
  return (
    <Box sx={{
      p: 3, borderRadius: '20px',
      background: isDark ? '#161a2b' : '#ffffff',
      border: `2.5px solid ${borderColor}`,
      boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      height: '100%',
      ...sx,
    }}>
      {children}
    </Box>
  );
};

/* ── Section heading ─────────────────────────────────────────── */
const SectionHeading = ({ icon, label, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
    <Box sx={{
      p: 0.6, borderRadius: '8px',
      background: `${color}20`,
      color, border: `1.5px solid ${color}`,
      display: 'flex', alignItems: 'center',
    }}>
      {icon}
    </Box>
    <Typography sx={{
      fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
      fontSize: '1rem', color: 'text.primary',
      letterSpacing: '-0.01em',
    }}>
      {label}
    </Typography>
  </Box>
);

/* ── Main component ──────────────────────────────────────────── */
const EarthquakeDetails = ({ earthquake }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!earthquake) return null;

  const mag     = earthquake.mag;
  const magSty  = getMagStyle(mag);
  const border  = isDark ? '#ffffff' : '#0f172a';
  const shadow  = isDark ? '#ffffff' : '#0f172a';

  return (
    <Box>
      <Grid container spacing={3}>

        {/* ── Hero card ──────────────────────────────────────── */}
        <Grid item xs={12} md={5}>
          <NeuCard isDark={isDark} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            {/* Floating doodle blob */}
            <Box sx={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: magSty.bg, border: `2px solid ${magSty.border}`, opacity: 0.6, pointerEvents: 'none', animation: 'float-slow 5s ease-in-out infinite' }} />

            <Box>
              <Typography sx={{
                fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
                fontSize: '1rem', color: 'text.primary', mb: 2.5,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                Seismic Event Summary
              </Typography>

              {/* Big magnitude badge */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
                <Box sx={{
                  width: 80, height: 80, borderRadius: '16px',
                  background: magSty.bg,
                  border: `2.5px solid ${magSty.border}`,
                  boxShadow: `4px 4px 0px 0px ${magSty.border}`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  color: magSty.text, flexShrink: 0,
                }}>
                  <Typography sx={{ fontSize: '0.58rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1, fontFamily: '"Fredoka", sans-serif' }}>
                    MAG
                  </Typography>
                  <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.1, color: magSty.text }}>
                    {mag}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: '"Quicksand", sans-serif', color: 'text.primary', mb: 1, lineHeight: 1.2 }}>
                    {earthquake.place}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {/* Mag level chip */}
                    <Chip label={magSty.label} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, fontFamily: '"Fredoka", sans-serif', bgcolor: magSty.bg, color: magSty.text, border: `1.5px solid ${magSty.border}`, borderRadius: '6px', '& .MuiChip-label': { px: 0.8 } }} />
                    {/* Type chip */}
                    <Chip label={earthquake.magType} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, fontFamily: '"Fredoka", sans-serif', bgcolor: isDark ? '#1a1f35' : '#e6f0ff', color: '#3b82f6', border: '1.5px solid #3b82f6', borderRadius: '6px', textTransform: 'uppercase', '& .MuiChip-label': { px: 0.8 } }} />
                    {/* Status chip */}
                    <Chip
                      label={earthquake.status} size="small"
                      sx={{
                        height: 20, fontSize: '0.65rem', fontWeight: 800, fontFamily: '"Fredoka", sans-serif',
                        textTransform: 'capitalize', borderRadius: '6px',
                        bgcolor: earthquake.status === 'reviewed' ? (isDark ? '#162a26' : '#e6f9f3') : (isDark ? '#2e2a1e' : '#fff4d2'),
                        color: earthquake.status === 'reviewed' ? '#10b981' : '#fbbf24',
                        border: earthquake.status === 'reviewed' ? '1.5px solid #10b981' : '1.5px solid #fbbf24',
                        '& .MuiChip-label': { px: 0.8 },
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 2.5, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', borderWidth: '1.5px' }} />

              {/* Time */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                <Box sx={{ p: 0.7, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.06)' : '#ffecf0', color: '#ff5e7e', border: '1.5px solid #ff5e7e', display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 800, fontFamily: '"Fredoka", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Event Time
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', mt: 0.2 }}>
                    {formatDate(earthquake.time)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', fontFamily: '"Quicksand", sans-serif', fontWeight: 600, mt: 0.1 }}>
                    {new Date(earthquake.time).toUTCString()}
                  </Typography>
                </Box>
              </Box>

              {/* Depth gauge */}
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Box sx={{ p: 0.7, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.06)' : '#e8e5ff', color: '#8b5cf6', border: '1.5px solid #8b5cf6', display: 'flex', alignItems: 'center' }}>
                  <SpeedIcon sx={{ fontSize: 16 }} />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 800, fontFamily: '"Fredoka", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.6 }}>
                    Depth — <Box component="span" sx={{ color: '#8b5cf6' }}>{earthquake.depth} km</Box>
                  </Typography>
                  <Box sx={{ height: 8, borderRadius: '6px', bgcolor: isDark ? 'rgba(255,255,255,0.08)' : '#e8e5ff', border: '1.5px solid #8b5cf640', overflow: 'hidden' }}>
                    <Box sx={{
                      height: '100%',
                      width: `${Math.min(100, (earthquake.depth / 700) * 100)}%`,
                      background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)',
                      borderRadius: '6px',
                      transition: 'width 1s ease',
                    }} />
                  </Box>
                  <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', fontFamily: '"Quicksand", sans-serif', fontWeight: 600, mt: 0.5 }}>
                    Category: {earthquake.depthCategory || 'Unknown'} Depth
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* USGS Event ID footer */}
            <Box sx={{ mt: 3, pt: 2, borderTop: isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', fontWeight: 800, fontFamily: '"Fredoka", sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                USGS Event ID
              </Typography>
              <Box sx={{
                px: 1.2, py: 0.4, borderRadius: '8px',
                bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                border: `1.5px solid ${border}`,
              }}>
                <Typography sx={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'text.primary', fontWeight: 700 }}>
                  {earthquake.id || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </NeuCard>
        </Grid>

        {/* ── Technical details ──────────────────────────────── */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>

            {/* Location & Network */}
            <Grid item xs={12}>
              <NeuCard isDark={isDark}>
                <SectionHeading icon={<LocationOnIcon sx={{ fontSize: 16 }} />} label="Location & Seismic Network" color="#ff5e7e" />
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<PublicIcon sx={{ fontSize: 16 }} />} label="Country" value={earthquake.country} isDark={isDark} accentColor="#ff5e7e" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem icon={<LanguageIcon sx={{ fontSize: 16 }} />} label="Seismic Network (net)" value={earthquake.net} isDark={isDark} accentColor="#ff5e7e" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Latitude"  value={earthquake.latitude}  isDark={isDark} accentColor="#3b82f6" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Longitude" value={earthquake.longitude} isDark={isDark} accentColor="#3b82f6" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Location Source" value={earthquake.locationSource} isDark={isDark} accentColor="#3b82f6" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Mag Source" value={earthquake.magSource} isDark={isDark} accentColor="#3b82f6" />
                  </Grid>
                </Grid>
              </NeuCard>
            </Grid>

            {/* Quality Factors */}
            <Grid item xs={12}>
              <NeuCard isDark={isDark}>
                <SectionHeading icon={<InfoIcon sx={{ fontSize: 16 }} />} label="Quality Factors & Metadata" color="#fbbf24" />
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Gap (Azimuthal)"  value={earthquake.gap !== undefined ? `${earthquake.gap}°` : '—'}                isDark={isDark} accentColor="#fbbf24" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="RMS (Residual)"   value={earthquake.rms}                                                            isDark={isDark} accentColor="#fbbf24" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Dmin (Min Dist)"  value={earthquake.dmin !== undefined ? `${earthquake.dmin} km` : '—'}             isDark={isDark} accentColor="#fbbf24" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="NST (Stations)"   value={earthquake.nst}                                                            isDark={isDark} accentColor="#fbbf24" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Mag Error"        value={earthquake.magError}                                                        isDark={isDark} accentColor="#10b981" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Mag NST"          value={earthquake.magNst}                                                          isDark={isDark} accentColor="#10b981" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Horiz. Error"     value={earthquake.horizontalError !== undefined ? `${earthquake.horizontalError} km` : '—'} isDark={isDark} accentColor="#10b981" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Depth Error"      value={earthquake.depthError !== undefined ? `${earthquake.depthError} km` : '—'} isDark={isDark} accentColor="#10b981" />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', borderWidth: '1.5px' }} />
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Year"             value={earthquake.year}               isDark={isDark} accentColor="#8b5cf6" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Month"            value={earthquake.month}              isDark={isDark} accentColor="#8b5cf6" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Day"              value={earthquake.day}                isDark={isDark} accentColor="#8b5cf6" />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <DetailItem label="Magnitude Cat"    value={earthquake.magnitudeCategory}  isDark={isDark} accentColor="#8b5cf6" />
                  </Grid>
                </Grid>
              </NeuCard>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
};

export default EarthquakeDetails;
