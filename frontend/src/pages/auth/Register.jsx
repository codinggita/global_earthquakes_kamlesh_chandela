import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, TextField, Button, Alert,
  CircularProgress, InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon  from '@mui/icons-material/LockOutlined';
import TerrainIcon       from '@mui/icons-material/Terrain';
import { register, clearError } from '../../features/auth/authSlice';

const Register = () => {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const theme      = useTheme();
  const isDark     = theme.palette.mode === 'dark';
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => { e.preventDefault(); await dispatch(register(formData)); };

  const borderColor = isDark ? '#ffffff' : '#0f172a';
  const shadowColor = isDark ? '#ffffff' : '#0f172a';

  const fieldSx = (mb = 2) => ({
    mb,
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 700,
      background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
      '& fieldset': {
        borderColor: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.35)',
        borderWidth: '2px',
      },
      '&:hover fieldset': { borderColor: '#ff5e7e', borderWidth: '2px' },
      '&.Mui-focused fieldset': {
        borderColor: '#ff5e7e',
        borderWidth: '2px',
        boxShadow: '2px 2px 0px 0px #ff5e7e',
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 700,
      '&.Mui-focused': { color: '#ff5e7e' },
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark ? '#0b0e1a' : '#fdfbf7',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating doodle blobs */}
      <Box sx={{ position: 'absolute', top: '10%', left: '8%', width: 90, height: 90, borderRadius: '50%', background: '#ffecf0', border: '3px solid #ff5e7e', opacity: 0.5, animation: 'float-slow 5s ease-in-out infinite' }} />
      <Box sx={{ position: 'absolute', bottom: '12%', right: '10%', width: 60, height: 60, borderRadius: '50%', background: '#fff4d2', border: '3px solid #fbbf24', opacity: 0.5, animation: 'float-medium 4s ease-in-out infinite' }} />
      <Box sx={{ position: 'absolute', top: '50%', right: '5%', width: 45, height: 45, borderRadius: '50%', background: '#e6f9f3', border: '3px solid #10b981', opacity: 0.5, animation: 'float-slow 6s ease-in-out infinite' }} />

      <Box
        sx={{
          width: '100%',
          maxWidth: 440,
          background: isDark ? '#161a2b' : '#ffffff',
          border: `2.5px solid ${borderColor}`,
          borderRadius: '24px',
          p: { xs: 3, sm: 4 },
          boxShadow: `6px 6px 0px 0px ${shadowColor}`,
          position: 'relative',
          zIndex: 1,
          animation: 'fadeSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
          '@keyframes fadeSlideUp': {
            from: { opacity: 0, transform: 'translateY(24px) scale(0.97)' },
            to:   { opacity: 1, transform: 'translateY(0) scale(1)' },
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3.5 }}>
          <Box
            sx={{
              width: 56, height: 56,
              borderRadius: '16px',
              background: '#ff5e7e',
              border: `2.5px solid ${borderColor}`,
              boxShadow: `3px 3px 0px 0px ${shadowColor}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mb: 2,
            }}
          >
            <TerrainIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography sx={{
            fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
            fontSize: '1.6rem', letterSpacing: '-0.02em',
            color: 'text.primary', lineHeight: 1.1,
          }}>
            Create Account
          </Typography>
          <Typography sx={{
            fontSize: '0.82rem', color: 'text.secondary', mt: 0.5,
            fontWeight: 700, fontFamily: '"Quicksand", sans-serif',
          }}>
            Join the Earthquake Analytics Platform
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5, borderRadius: '12px', fontSize: '0.82rem',
              border: '2px solid #ff5e7e',
              fontFamily: '"Quicksand", sans-serif', fontWeight: 700,
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Full name" name="name"
            value={formData.name} onChange={handleChange} required
            sx={fieldSx(2)}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ fontSize: 18, color: '#ff5e7e' }} /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Email address" name="email" type="email"
            value={formData.email} onChange={handleChange} required
            sx={fieldSx(2)}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ fontSize: 18, color: '#ff5e7e' }} /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Password" name="password" type="password"
            value={formData.password} onChange={handleChange} required
            sx={fieldSx(3)}
            InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 18, color: '#ff5e7e' }} /></InputAdornment> }}
          />
          <Button
            fullWidth type="submit" variant="contained" size="large"
            disabled={loading}
            sx={{
              py: 1.4, fontSize: '1rem', fontWeight: 800,
              fontFamily: '"Fredoka", sans-serif',
              borderRadius: '14px', textTransform: 'none',
              background: '#ff5e7e', color: '#ffffff',
              border: `2.5px solid ${borderColor}`,
              boxShadow: `3px 3px 0px 0px ${shadowColor}`,
              '&:hover': {
                background: '#e0436a',
                transform: 'translate(-2px,-2px)',
                boxShadow: `5px 5px 0px 0px ${shadowColor}`,
              },
              '&.Mui-disabled': { opacity: 0.6 },
              transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account ✨'}
          </Button>
        </form>

        <Box sx={{ mt: 2.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#ff5e7e', fontWeight: 800, textDecoration: 'none' }}>
              Sign in →
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
