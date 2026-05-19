import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        borderTop: isDark ? '1px solid rgba(148, 163, 184, 0.06)' : '1px solid rgba(148, 163, 184, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.02em' }}
      >
        © {new Date().getFullYear()}{' '}
        <span style={{ color: isDark ? '#475569' : '#64748b' }}>Earthquake Analytics Platform</span>
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: '#34d399',
            boxShadow: '0 0 6px rgba(52,211,153,0.6)',
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.05em' }}
        >
          ALL SYSTEMS OPERATIONAL
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
