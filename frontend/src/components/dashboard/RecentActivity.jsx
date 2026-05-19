import React from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TerrainIcon from '@mui/icons-material/Terrain';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const getMagColor = (mag) => {
  if (mag >= 7)  return { color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.25)' };
  if (mag >= 6)  return { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.25)' };
  if (mag >= 5)  return { color: '#818cf8', bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.25)' };
  return          { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.25)' };
};

const RecentActivity = ({ activities = [], loading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              height: 56,
              borderRadius: '10px',
              background: 'rgba(148,163,184,0.06)',
              animation: 'shimmer 1.5s infinite',
              '@keyframes shimmer': {
                '0%': { opacity: 0.4 }, '50%': { opacity: 0.8 }, '100%': { opacity: 0.4 },
              },
            }}
          />
        ))}
      </Box>
    );
  }

  if (activities.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography sx={{ color: '#334155', fontWeight: 600, fontSize: '0.85rem' }}>
          No recent seismic activity
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {activities.map((activity, index) => {
        const { color, bg, border } = getMagColor(activity.mag);
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: '10px',
              background: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.6)',
              border: `1px solid rgba(148,163,184,0.07)`,
              transition: 'all 0.2s',
              '&:hover': {
                background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(241, 245, 249, 0.9)',
                borderColor: border,
              },
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: bg,
                color,
                borderRadius: '9px',
                flexShrink: 0,
                border: `1px solid ${border}`,
              }}
            >
              {activity.mag >= 6
                ? <WarningAmberIcon sx={{ fontSize: 18 }} />
                : <TerrainIcon sx={{ fontSize: 18 }} />}
            </Avatar>

            {/* Info */}
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography
                noWrap
                sx={{ fontSize: '0.83rem', fontWeight: 600, color: isDark ? '#e2e8f0' : '#0f172a', lineHeight: 1.3 }}
              >
                {activity.place}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#475569', fontWeight: 500, mt: 0.2 }}>
                {new Date(activity.time).toLocaleString([], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                {' · '}Depth: {activity.depth} km
              </Typography>
            </Box>

            {/* Magnitude badge */}
            <Chip
              label={`M ${activity.mag}`}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: '0.7rem',
                letterSpacing: '0.02em',
                height: 22,
                background: bg,
                color,
                border: `1px solid ${border}`,
                flexShrink: 0,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default RecentActivity;
