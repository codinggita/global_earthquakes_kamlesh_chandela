import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Alert, CircularProgress, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TerrainIcon from '@mui/icons-material/Terrain';
import { register, clearError } from '../../features/auth/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
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
        {/* Logo */}
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
            <TerrainIcon sx={{ color: '#fff', fontSize: 26 }} />
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
            Create account
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', mt: 0.5, fontWeight: 500 }}>
            Join the Earthquake Analytics Platform
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px', fontSize: '0.82rem' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '11px',
                '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)' },
                '&:hover fieldset': { borderColor: 'rgba(239,68,68,0.40)' },
                '&.Mui-focused fieldset': { borderColor: '#ef4444' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' }
            }}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
          />
          <TextField
            fullWidth
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '11px',
                '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)' },
                '&:hover fieldset': { borderColor: 'rgba(239,68,68,0.40)' },
                '&.Mui-focused fieldset': { borderColor: '#ef4444' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ef4444' }
            }}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
            InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
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
                transform: 'translateY(-1px)'
              },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account'}
          </Button>
        </form>

        <Box sx={{ mt: 2.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#ef4444', fontWeight: 700, textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
