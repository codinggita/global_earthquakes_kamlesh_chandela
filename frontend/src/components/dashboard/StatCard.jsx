import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StatCard = ({ title, value, icon, color = '#818cf8', subtitle, loading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        height: '100%',
        p: 2.5,
        borderRadius: '16px',
        background: isDark ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        border: isDark ? '1px solid rgba(148, 163, 184, 0.08)' : '1px solid rgba(148, 163, 184, 0.12)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        '&:hover': {
          borderColor: `${color}33`,
          transform: 'translateY(-3px)',
          boxShadow: isDark
            ? `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${color}22`
            : `0 12px 40px rgba(148, 163, 184, 0.1), 0 0 0 1px ${color}22`,
        },
      }}
    >
      {/* Background glow orb */}
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: color,
          opacity: 0.07,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* Accent top bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${color}00 0%, ${color} 50%, ${color}00 100%)`,
          opacity: 0.6,
        }}
      />

      {/* Header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography
          sx={{
            fontSize: '0.7rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#475569',
          }}
        >
          {title}
        </Typography>

        {icon && (
          <Box
            sx={{
              color,
              opacity: 0.85,
              p: 0.8,
              borderRadius: '10px',
              background: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& .MuiSvgIcon-root': { fontSize: '20px !important' },
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      {/* Value */}
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: '2rem',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: isDark ? '#f1f5f9' : '#0f172a',
          mb: 1,
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: 80,
              height: 32,
              borderRadius: 6,
              background: 'rgba(148,163,184,0.08)',
              animation: 'shimmer 1.5s infinite',
              '@keyframes shimmer': {
                '0%':   { opacity: 0.5 },
                '50%':  { opacity: 1 },
                '100%': { opacity: 0.5 },
              },
            }}
          />
        ) : (typeof value === 'number' ? value.toLocaleString() : value)}
      </Typography>

      {/* Subtitle / trend */}
      {subtitle ? (
        <Typography sx={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>
          {subtitle}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
          <TrendingUpIcon sx={{ fontSize: 13, color: '#34d399' }} />
          <Typography sx={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700 }}>
            Live data
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StatCard;
