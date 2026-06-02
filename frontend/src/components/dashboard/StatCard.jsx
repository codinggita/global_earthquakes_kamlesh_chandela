import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StatCard = ({ title, value, icon, color = '#ef4444', subtitle, trend, loading }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        height: '100%',
        p: 2.5,
        borderRadius: '16px',
        background: isDark ? 'rgba(10, 16, 30, 0.94)' : 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(12px)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        /* The distinctive left-edge accent — marks the severity/category */
        borderLeft: `3px solid ${color}`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: isDark
            ? `0 12px 36px rgba(0,0,0,0.45), 0 0 0 1px ${color}22`
            : `0 12px 36px rgba(0,0,0,0.08), 0 0 0 1px ${color}18`,
          borderColor: `${color}55`,
          borderLeftColor: color,
        },
      }}
    >
      {/* Ambient glow orb */}
      <Box
        sx={{
          position: 'absolute', top: -24, right: -24,
          width: 88, height: 88, borderRadius: '50%',
          background: color, opacity: isDark ? 0.07 : 0.05,
          filter: 'blur(18px)', pointerEvents: 'none',
        }}
      />

      {/* Top row: label + icon */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
        <Typography
          sx={{
            fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: isDark ? '#3f5068' : '#9ca3af',
            lineHeight: 1.4, maxWidth: '65%',
          }}
        >
          {title}
        </Typography>

        {icon && (
          <Box
            sx={{
              p: 0.9, borderRadius: '9px', flexShrink: 0,
              background: `${color}14`,
              color, display: 'flex', alignItems: 'center',
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
            width: 90, height: 36, borderRadius: '8px',
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            mb: 1.5, animation: 'shimmer 1.6s ease-in-out infinite',
            '@keyframes shimmer': { '0%': { opacity: 0.4 }, '50%': { opacity: 0.8 }, '100%': { opacity: 0.4 } },
          }}
        />
      ) : (
        <Typography
          sx={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800, fontSize: '2.3rem', lineHeight: 1,
            letterSpacing: '-0.04em',
            color: isDark ? '#f1f5f9' : '#0f172a',
            mb: 1.5,
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : (value ?? '—')}
        </Typography>
      )}

      {/* Bottom: trend / subtitle */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {trend === 'down' ? (
          <TrendingDownIcon sx={{ fontSize: 13, color: '#f87171' }} />
        ) : (
          <TrendingUpIcon sx={{ fontSize: 13, color: '#34d399' }} />
        )}
        <Typography
          sx={{
            fontSize: '0.69rem', fontWeight: 600,
            color: trend === 'down' ? '#f87171' : '#34d399',
          }}
        >
          {subtitle || 'Live data'}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatCard;
