import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StarDoodle = () => (
  <Box sx={{ position: 'absolute', right: 20, bottom: 12, opacity: 0.85, pointerEvents: 'none' }} className="float-slow">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#ff5e7e" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    </svg>
  </Box>
);

const LoopDoodle = () => (
  <Box sx={{ position: 'absolute', right: 20, bottom: 12, opacity: 0.85, pointerEvents: 'none' }} className="float-medium">
    <svg width="25" height="25" viewBox="0 0 30 30" fill="none">
      <path d="M5 25C15 25 15 5 20 15C25 25 25 5 28 10" stroke="#10b981" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  </Box>
);

const SquiggleDoodle = () => (
  <Box sx={{ position: 'absolute', right: 20, bottom: 12, opacity: 0.85, pointerEvents: 'none' }} className="float-fast">
    <svg width="25" height="25" viewBox="0 0 30 30" fill="none">
      <path d="M5 15C10 10 15 20 20 10C25 5 25 25 28 15" stroke="#fbbf24" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  </Box>
);

const StripesDoodle = () => (
  <Box sx={{ position: 'absolute', right: 20, bottom: 12, opacity: 0.85, pointerEvents: 'none' }} className="float-medium">
    <svg width="25" height="25" viewBox="0 0 30 30" fill="none">
      <path d="M5 22L18 8M12 24L25 10M20 26L28 18" stroke="#3b82f6" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  </Box>
);

const StatCard = ({ title, value, icon, color = '#ff5e7e', subtitle, loading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Playful Neubrutal colors mapping based on title
  let cardBg = isDark ? '#2e1b23' : '#ffe6eb'; // default Pink
  let accentColor = '#ff5e7e';
  let doodle = <StarDoodle />;

  if (title.toLowerCase().includes('critical')) {
    cardBg = isDark ? '#162a26' : '#e6f9f3'; // Green
    accentColor = '#10b981';
    doodle = <LoopDoodle />;
  } else if (title.toLowerCase().includes('deep')) {
    cardBg = isDark ? '#2e2a1e' : '#fff4d2'; // Yellow
    accentColor = '#fbbf24';
    doodle = <SquiggleDoodle />;
  } else if (title.toLowerCase().includes('verified')) {
    cardBg = isDark ? '#1a233b' : '#e6f0ff'; // Blue
    accentColor = '#3b82f6';
    doodle = <StripesDoodle />;
  }

  return (
    <Box
      sx={{
        height: '100%',
        p: 2.5,
        borderRadius: '20px',
        background: cardBg,
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
        '&:hover': {
          transform: 'translate(-3px, -3px)',
          boxShadow: isDark
            ? '6px 6px 0px 0px #ffffff'
            : '6px 6px 0px 0px #0f172a',
        },
      }}
    >
      {/* Floating hand-drawn doodle decorations */}
      {doodle}

      {/* Top row: label + icon */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          sx={{
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.74rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: isDark ? '#ffffff' : '#0f172a',
            lineHeight: 1.4,
            maxWidth: '75%',
          }}
        >
          {title}
        </Typography>

        {icon && (
          <Box
            sx={{
              p: 0.8,
              borderRadius: '10px',
              flexShrink: 0,
              background: '#ffffff',
              color: accentColor,
              border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
              boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
              display: 'flex',
              alignItems: 'center',
              '& .MuiSvgIcon-root': { fontSize: '18px !important' },
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      {/* Value */}
      {loading ? (
        <Box
          sx={{
            width: 90,
            height: 36,
            borderRadius: '8px',
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            mb: 1.5,
            animation: 'shimmer 1.6s ease-in-out infinite',
          }}
        />
      ) : (
        <Typography
          sx={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 800,
            fontSize: '2.3rem',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: isDark ? '#ffffff' : '#0f172a',
            mb: 1.5,
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : (value ?? '—')}
        </Typography>
      )}

      {/* Bottom: breathing pulsing live telemetry dot */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: accentColor,
            border: isDark ? '1px solid #ffffff' : '1px solid #0f172a',
            animation: 'statPulse 1.8s ease-in-out infinite',
            '@keyframes statPulse': {
              '0%': { boxShadow: `0 0 0 0 ${accentColor}77` },
              '70%': { boxShadow: `0 0 0 6px ${accentColor}00` },
              '100%': { boxShadow: `0 0 0 0 ${accentColor}00` },
            }
          }}
        />
        <Typography
          sx={{
            fontFamily: '"Quicksand", sans-serif',
            fontSize: '0.74rem',
            fontWeight: 800,
            color: isDark ? '#9ca3af' : '#475569',
            letterSpacing: '0.01em',
          }}
        >
          {subtitle || 'Real-time telemetry'}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatCard;
