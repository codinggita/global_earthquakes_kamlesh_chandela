import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SecurityIcon   from '@mui/icons-material/Security';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import authService from '../../services/auth.service';

const ForgotPassword = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      await authService.forgotPassword(email);
      setMessage('Password reset link sent to your email');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
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
      <Box sx={{ position: 'absolute', top: '15%', right: '10%', width: 80, height: 80, borderRadius: '50%', background: '#e8e5ff', border: '3px solid #8b5cf6', opacity: 0.5, animation: 'float-slow 5s ease-in-out infinite' }} />
      <Box sx={{ position: 'absolute', bottom: '20%', left: '8%', width: 55, height: 55, borderRadius: '50%', background: '#fff4d2', border: '3px solid #fbbf24', opacity: 0.5, animation: 'float-medium 4s ease-in-out infinite' }} />

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
            background: '#8b5cf6',
            border: `2.5px solid ${borderColor}`,
            boxShadow: `3px 3px 0px 0px ${shadowColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
          }}>
            <SecurityIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography sx={{
            fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
            fontSize: '1.6rem', letterSpacing: '-0.02em', color: 'text.primary', lineHeight: 1.1,
          }}>
            Forgot Password?
          </Typography>
          <Typography sx={{
            fontSize: '0.82rem', color: 'text.secondary', mt: 0.5,
            fontWeight: 700, fontFamily: '"Quicksand", sans-serif', textAlign: 'center',
          }}>
            We'll send a secure reset link to your email
          </Typography>
        </Box>

        {message && <Alert severity="success" sx={{ mb: 2.5, borderRadius: '12px', border: '2px solid #10b981', fontFamily: '"Quicksand", sans-serif', fontWeight: 700, fontSize: '0.82rem' }}>{message}</Alert>}
        {error   && <Alert severity="error"   sx={{ mb: 2.5, borderRadius: '12px', border: '2px solid #ff5e7e', fontFamily: '"Quicksand", sans-serif', fontWeight: 700, fontSize: '0.82rem' }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Email address" type="email"
            value={email} onChange={(e) => setEmail(e.target.value)} required
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '14px', fontFamily: '"Quicksand", sans-serif', fontWeight: 700,
                background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.35)', borderWidth: '2px' },
                '&:hover fieldset': { borderColor: '#8b5cf6', borderWidth: '2px' },
                '&.Mui-focused fieldset': { borderColor: '#8b5cf6', borderWidth: '2px', boxShadow: '2px 2px 0px 0px #8b5cf6' },
              },
              '& .MuiInputLabel-root': { fontFamily: '"Quicksand", sans-serif', fontWeight: 700, '&.Mui-focused': { color: '#8b5cf6' } },
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ fontSize: 18, color: '#8b5cf6' }} /></InputAdornment>,
            }}
          />
          <Button
            fullWidth type="submit" variant="contained" size="large" disabled={loading}
            sx={{
              py: 1.4, fontSize: '1rem', fontWeight: 800,
              fontFamily: '"Fredoka", sans-serif', borderRadius: '14px', textTransform: 'none',
              background: '#8b5cf6', color: '#ffffff',
              border: `2.5px solid ${borderColor}`,
              boxShadow: `3px 3px 0px 0px ${shadowColor}`,
              '&:hover': { background: '#7c3aed', transform: 'translate(-2px,-2px)', boxShadow: `5px 5px 0px 0px ${shadowColor}` },
              '&.Mui-disabled': { opacity: 0.6 },
              transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {loading ? 'Sending…' : 'Send Reset Link 🔐'}
          </Button>
        </form>

        <Box sx={{ mt: 2.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}>
            <Link to="/login" style={{ color: '#8b5cf6', fontWeight: 800, textDecoration: 'none' }}>
              ← Back to Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
