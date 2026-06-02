import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LockResetIcon from '@mui/icons-material/LockReset';
import authService from '../../services/auth.service';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.resetPassword({ token: searchParams.get('token'), newPassword: password });
      setMessage('Password reset successful');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark ? '#090c15' : '#f5f7fb',
        backgroundImage: isDark
          ? `radial-gradient(ellipse at 20% 20%, rgba(239,68,68,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(249,115,22,0.08) 0%, transparent 55%)`
          : `radial-gradient(ellipse at 20% 20%, rgba(239,68,68,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(249,115,22,0.03) 0%, transparent 55%)`,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          background: isDark ? 'rgba(15, 19, 34, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
          borderRadius: '24px',
          p: { xs: 3, sm: 4 },
          boxShadow: isDark
            ? '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(239,68,68,0.05)'
            : '0 24px 80px rgba(239,68,68,0.06), 0 0 0 1px rgba(239,68,68,0.02)',
          animation: 'fadeSlideUp 0.4s cubic-bezier(0.4,0,0.2,1) both',
          '@keyframes fadeSlideUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to:   { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* Title */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3.5 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(239,68,68,0.25)',
              mb: 2,
            }}
          >
            <LockResetIcon sx={{ color: '#fff', fontSize: 26 }} />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 900,
              fontSize: '1.4rem',
              letterSpacing: '-0.025em',
              color: 'text.primary',
              lineHeight: 1.2,
            }}
          >
            Reset Password
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', mt: 0.5, fontWeight: 500, textAlign: 'center' }}>
            Choose a new, secure password for your account
          </Typography>
        </Box>

        {message && <Alert severity="success" sx={{ mb: 2.5, borderRadius: '12px', fontSize: '0.82rem' }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px', fontSize: '0.82rem' }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '11px',
                '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)' },
                '&:hover fieldset': { borderColor: 'rgba(239,68,68,0.40)' },
                '&.Mui-focused fieldset': { borderColor: '#ef4444' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' }
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.4,
              fontSize: '0.9rem',
              fontWeight: 800,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
              boxShadow: '0 4px 20px rgba(239,68,68,0.25)',
              color: '#ffffff',
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
                boxShadow: '0 6px 28px rgba(239,68,68,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
