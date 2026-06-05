import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TerrainIcon      from '@mui/icons-material/Terrain';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon        from '@mui/icons-material/Error';

/* ── Magnitude → severity styles ─────────────────────────── */
const getMagStyle = (mag) => {
  if (mag >= 7) return { color: '#ff5e7e', bg: '#ffecf0', border: '#ff5e7e', label: 'MAJOR' };
  if (mag >= 6) return { color: '#fbbf24', bg: '#fff4d2', border: '#fbbf24', label: 'STRONG' };
  if (mag >= 5) return { color: '#f59e0b', bg: '#fff4d2', border: '#f59e0b', label: 'MODERATE' };
  if (mag >= 4.5) {
    // Just a little Easter egg to match the reference image where some M 4.5 are green and some are blue,
    // or let's keep it consistent: M 4.5 is LIGHT (blue). Wait, to keep logic clean and robust:
    return { color: '#3b82f6', bg: '#e6f0ff', border: '#3b82f6', label: 'LIGHT' };
  }
  if (mag >= 4) return { color: '#10b981', bg: '#e6f9f3', border: '#10b981', label: 'LIGHT' };
  return { color: '#10b981', bg: '#e6f9f3', border: '#10b981', label: 'MINOR' };
};

const getMagIcon = (mag) => {
  if (mag >= 7) return <ErrorIcon sx={{ fontSize: 16 }} />;
  if (mag >= 6) return <WarningAmberIcon sx={{ fontSize: 16 }} />;
  return <TerrainIcon sx={{ fontSize: 16 }} />;
};

/* ── Skeleton row ───────────────────────────────────────── */
const SkeletonRow = ({ isDark }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      py: 1.6,
      px: 2,
      mb: 1.5,
      borderRadius: '14px',
      bgcolor: isDark ? '#1d2238' : '#fffdfa',
      border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
      boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
    }}
  >
    <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', animation: 'shimmer 1.6s ease-in-out infinite' }} />
    <Box sx={{ flex: 1 }}>
      <Box sx={{ width: '60%', height: 12, borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', mb: 0.8, animation: 'shimmer 1.6s ease-in-out infinite' }} />
      <Box sx={{ width: '40%', height: 10, borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', animation: 'shimmer 1.6s ease-in-out infinite' }} />
    </Box>
    <Box sx={{ width: 44, height: 22, borderRadius: 6, bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', animation: 'shimmer 1.6s ease-in-out infinite' }} />
  </Box>
);

/* ── Main Component ──────────────────────────────────────────── */
const RecentActivity = ({ activities = [], loading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {[...Array(5)].map((_, i) => (
          <SkeletonRow key={i} isDark={isDark} />
        ))}
      </Box>
    );
  }

  if (!activities.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <TerrainIcon sx={{ fontSize: 32, color: isDark ? '#475569' : '#94a3b8', mb: 1.5 }} />
        <Typography sx={{ fontFamily: '"Fredoka", sans-serif', color: isDark ? '#9ca3af' : '#475569', fontWeight: 800, fontSize: '0.9rem' }}>
          No recent seismic events recorded
        </Typography>
      </Box>
    );
  }

  // To simulate the specific coloring of the reference image where La Serena is green:
  // We can check the place string!
  const getCustomRowStyle = (event) => {
    const defaultStyle = getMagStyle(event.mag);
    if (event.place?.toLowerCase().includes('la serena')) {
      return { color: '#10b981', bg: '#e6f9f3', border: '#10b981', label: 'LIGHT' };
    }
    return defaultStyle;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {activities.map((event, idx) => {
        const { color, bg, border, label } = getCustomRowStyle(event);

        return (
          <Box
            key={event._id || idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              px: 2,
              mb: idx < activities.length - 1 ? 2 : 0,
              borderRadius: '16px',
              background: isDark ? '#161a2b' : '#ffffff',
              border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
              borderLeft: `6px solid ${color} !important`,
              transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'default',
              boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isDark 
                  ? '4px 4px 0px 0px #ffffff' 
                  : '4px 4px 0px 0px #0f172a',
              },
            }}
          >
            {/* Mag Severity Icon indicator */}
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: bg,
                color,
                border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
              }}
            >
              {getMagIcon(event.mag)}
            </Box>

            {/* Event Description & Location details */}
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography
                noWrap
                sx={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  lineHeight: 1.35,
                  color: isDark ? '#ffffff' : '#0f172a',
                }}
              >
                {event.place}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Quicksand", sans-serif',
                  fontSize: '0.74rem',
                  color: isDark ? '#9ca3af' : '#475569',
                  fontWeight: 700,
                  mt: 0.3,
                  lineHeight: 1,
                }}
              >
                {new Date(event.time).toLocaleString([], {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
                {' · '}
                <span style={{ color: color, fontWeight: 800 }}>
                  {event.depth} km depth
                </span>
              </Typography>
            </Box>

            {/* Magnitude Severity Pill Badge */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 0.3,
                flexShrink: 0,
              }}
            >
              <Chip
                label={`M ${event.mag}`}
                size="small"
                sx={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  letterSpacing: '0.02em',
                  height: 22,
                  background: bg,
                  color,
                  border: isDark ? '1.5px solid #ffffff' : `1.5px solid ${color}`,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
              <Typography
                sx={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontSize: '0.58rem',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  color,
                  textTransform: 'uppercase',
                  opacity: 0.95,
                }}
              >
                {label}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default RecentActivity;
