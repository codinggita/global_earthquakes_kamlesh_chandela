import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TerrainIcon      from '@mui/icons-material/Terrain';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon        from '@mui/icons-material/Error';

/* ── Magnitude → colour palette ─────────────────────────── */
const getMagStyle = (mag) => {
  if (mag >= 7)  return { color: '#f87171', bg: 'rgba(248,113,113,0.10)', border: 'rgba(248,113,113,0.25)', label: 'MAJOR' };
  if (mag >= 6)  return { color: '#fbbf24', bg: 'rgba(251,191,36,0.10)',  border: 'rgba(251,191,36,0.25)',  label: 'STRONG' };
  if (mag >= 5)  return { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.25)', label: 'MODERATE' };
  if (mag >= 4)  return { color: '#60a5fa', bg: 'rgba(96,165,250,0.10)',  border: 'rgba(96,165,250,0.25)',  label: 'LIGHT' };
  return           { color: '#34d399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.25)',  label: 'MINOR' };
};

const getMagIcon = (mag) => {
  if (mag >= 7) return <ErrorIcon        sx={{ fontSize: 16 }} />;
  if (mag >= 6) return <WarningAmberIcon sx={{ fontSize: 16 }} />;
  return           <TerrainIcon        sx={{ fontSize: 16 }} />;
};

/* ── Skeleton row ───────────────────────────────────────── */
const SkeletonRow = ({ isDark }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.4 }}>
    <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'shimmer 1.6s ease-in-out infinite', '@keyframes shimmer': { '0%': { opacity: 0.4 }, '50%': { opacity: 0.8 }, '100%': { opacity: 0.4 } } }} />
    <Box sx={{ flex: 1 }}>
      <Box sx={{ width: '60%', height: 12, borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', mb: 0.8, animation: 'shimmer 1.6s ease-in-out infinite' }} />
      <Box sx={{ width: '40%', height: 10, borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', animation: 'shimmer 1.6s ease-in-out infinite' }} />
    </Box>
    <Box sx={{ width: 44, height: 22, borderRadius: 6, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', animation: 'shimmer 1.6s ease-in-out infinite' }} />
  </Box>
);

/* ── Component ──────────────────────────────────────────── */
const RecentActivity = ({ activities = [], loading }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {[...Array(5)].map((_, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Box sx={{ height: '1px', bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)', mx: 0.5 }} />}
            <SkeletonRow isDark={isDark} />
          </React.Fragment>
        ))}
      </Box>
    );
  }

  if (!activities.length) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <TerrainIcon sx={{ fontSize: 28, color: isDark ? '#1e2d3d' : '#d1d5db', mb: 1 }} />
        <Typography sx={{ color: isDark ? '#3f5068' : '#9ca3af', fontWeight: 600, fontSize: '0.85rem' }}>
          No recent seismic events
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {activities.map((event, idx) => {
        const { color, bg, border, label } = getMagStyle(event.mag);

        return (
          <React.Fragment key={event._id || idx}>
            {/* Divider between rows */}
            {idx > 0 && (
              <Box sx={{ height: '1px', bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)', mx: 0.5 }} />
            )}

            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                py: 1.4, px: 0.5, borderRadius: '10px',
                transition: 'background 0.15s ease', cursor: 'default',
                '&:hover': {
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                },
              }}
            >
              {/* Mag icon box */}
              <Box
                sx={{
                  width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: bg, color, border: `1px solid ${border}`,
                }}
              >
                {getMagIcon(event.mag)}
              </Box>

              {/* Info */}
              <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: '0.84rem', fontWeight: 600, lineHeight: 1.35,
                    color: isDark ? '#e2e8f0' : '#111827',
                  }}
                >
                  {event.place}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.7rem', color: isDark ? '#3f5068' : '#9ca3af',
                    fontWeight: 500, mt: 0.2, lineHeight: 1,
                  }}
                >
                  {new Date(event.time).toLocaleString([], {
                    day: '2-digit', month: 'short',
                    hour: '2-digit', minute: '2-digit',
                  })}
                  {' · '}
                  <span style={{ color: isDark ? '#4b5e74' : '#6b7280' }}>
                    {event.depth} km depth
                  </span>
                </Typography>
              </Box>

              {/* Magnitude chip */}
              <Box
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                  gap: 0.4, flexShrink: 0,
                }}
              >
                <Chip
                  label={`M ${event.mag}`}
                  size="small"
                  sx={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.02em',
                    height: 22, background: bg, color, border: `1px solid ${border}`,
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.06em',
                    color, textTransform: 'uppercase',
                  }}
                >
                  {label}
                </Typography>
              </Box>
            </Box>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default RecentActivity;
