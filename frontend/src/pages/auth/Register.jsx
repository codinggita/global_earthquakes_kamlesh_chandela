import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Alert, CircularProgress, InputAdornment } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TerrainIcon from '@mui/icons-material/Terrain';
import { register, clearError } from '../../features/auth/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => { e.preventDefault(); await dispatch(register(formData)); };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0f1a',
        backgroundImage: `
          radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.08) 0%, transparent 55%)
        `,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148,163,184,0.09)',
          borderRadius: '20px',
          p: { xs: 3, sm: 4 },
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.05)',
          animation: 'fadeSlideUp 0.4s cubic-bezier(0.4,0,0.2,1) both',
          '@keyframes fadeSlideUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to:   { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3.5 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #34d399 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
              mb: 2,
            }}
          >
            <TerrainIcon sx={{ color: '#fff', fontSize: 26 }} />
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.025em', color: '#f1f5f9', lineHeight: 1.2 }}>
            Create account
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: '#475569', mt: 0.5, fontWeight: 500 }}>
            Join the Earthquake Analytics Platform
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.82rem' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Full name" name="name" value={formData.name} onChange={handleChange} required sx={{ mb: 2 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ fontSize: 18, color: '#475569' }} /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} required sx={{ mb: 2 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ fontSize: 18, color: '#475569' }} /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required sx={{ mb: 3 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 18, color: '#475569' }} /></InputAdornment> }}
          />
          <Button
            fullWidth type="submit" variant="contained" size="large" disabled={loading}
            sx={{
              py: 1.4, fontSize: '0.9rem', fontWeight: 800, borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
              '&:hover': { boxShadow: '0 6px 28px rgba(99,102,241,0.55)', transform: 'translateY(-1px)' },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account'}
          </Button>
        </form>

        <Box sx={{ mt: 2.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.8rem', color: '#475569' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#818cf8', fontWeight: 700, textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
