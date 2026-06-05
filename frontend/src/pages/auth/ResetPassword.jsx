import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LockResetIcon  from '@mui/icons-material/LockReset';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authService from '../../services/auth.service';

const ResetPassword = () => {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();
  const theme          = useTheme();
  const isDark         = theme.palette.mode === 'dark';
  const [password, setPassword] = useState('');
  const [message,  setMessage]  = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await authService.resetPassword({ token: searchParams.get('token'), newPassword: password });
      setMessage('Password reset successful — redirecting…');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
    setLoading(false);
  };

  const borderColor = isDark ? '#ffffff' : '#0f172a';
  const shadowColor = isDark ? '#ffffff' : '#0f172a';

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isDark ? '#0b0e1a' : '#fdfbf7', p: 2, position: 'relative', overflow: 'hidden',
    }}>
      {/* Floating blobs */}
      <Box sx={{ position: 'absolute', top: '12%', left: '10%', width: 70, height: 70, borderRadius: '50%', background: '#e6f9f3', border: '3px solid #10b981', opacity: 0.5, animation: 'float-slow 5s ease-in-out infinite' }} />
      <Box sx={{ position: 'absolute', bottom: '18%', right: '8%', width: 55, height: 55, borderRadius: '50%', background: '#ffecf0', border: '3px solid #ff5e7e', opacity: 0.5, animation: 'float-medium 4s ease-in-out infinite' }} />

      <Box sx={{
        width: '100%', maxWidth: 420,
        background: isDark ? '#161a2b' : '#ffffff',
        border: `2.5px solid ${borderColor}`,
        borderRadius: '24px',
        p: { xs: 3, sm: 4 },
        boxShadow: `6px 6px 0px 0px ${shadowColor}`,
        position: 'relative', zIndex: 1,
        animation: 'fadeSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        '@keyframes fadeSlideUp': {
          from: { opacity: 0, transform: 'translateY(24px) scale(0.97)' },
          to:   { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      }}>
        {/* Icon + Title */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3.5 }}>
          <Box sx={{
            width: 56, height: 56, borderRadius: '16px',
            background: '#10b981',
            border: `2.5px solid ${borderColor}`,
            boxShadow: `3px 3px 0px 0px ${shadowColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
          }}>
            <LockResetIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography sx={{
            fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
            fontSize: '1.6rem', letterSpacing: '-0.02em', color: 'text.primary', lineHeight: 1.1,
          }}>
            Reset Password
          </Typography>
          <Typography sx={{
            fontSize: '0.82rem', color: 'text.secondary', mt: 0.5,
            fontWeight: 700, fontFamily: '"Quicksand", sans-serif', textAlign: 'center',
          }}>
            Choose a new, secure password for your account
          </Typography>
        </Box>

        {message && <Alert severity="success" sx={{ mb: 2.5, borderRadius: '12px', border: '2px solid #10b981', fontFamily: '"Quicksand", sans-serif', fontWeight: 700, fontSize: '0.82rem' }}>{message}</Alert>}
        {error   && <Alert severity="error"   sx={{ mb: 2.5, borderRadius: '12px', border: '2px solid #ff5e7e', fontFamily: '"Quicksand", sans-serif', fontWeight: 700, fontSize: '0.82rem' }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="New Password" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)} required
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px', fontFamily: '"Quicksand", sans-serif', fontWeight: 700,
                background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.35)', borderWidth: '2px' },
                '&:hover fieldset': { borderColor: '#10b981', borderWidth: '2px' },
                '&.Mui-focused fieldset': { borderColor: '#10b981', borderWidth: '2px', boxShadow: '2px 2px 0px 0px #10b981' },
              },
              '& .MuiInputLabel-root': { fontFamily: '"Quicksand", sans-serif', fontWeight: 700, '&.Mui-focused': { color: '#10b981' } },
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 18, color: '#10b981' }} /></InputAdornment>,
            }}
          />
          <Button
            fullWidth type="submit" variant="contained" size="large" disabled={loading}
            sx={{
              py: 1.4, fontSize: '1rem', fontWeight: 800,
              fontFamily: '"Fredoka", sans-serif', borderRadius: '14px', textTransform: 'none',
              background: '#10b981', color: '#ffffff',
              border: `2.5px solid ${borderColor}`,
              boxShadow: `3px 3px 0px 0px ${shadowColor}`,
              '&:hover': { background: '#059669', transform: 'translate(-2px,-2px)', boxShadow: `5px 5px 0px 0px ${shadowColor}` },
              '&.Mui-disabled': { opacity: 0.6 },
              transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {loading ? 'Resetting…' : 'Reset Password ✅'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
