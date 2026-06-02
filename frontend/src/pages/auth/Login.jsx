import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Alert, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import TerrainIcon from '@mui/icons-material/Terrain';
import { login, clearError } from '../../features/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => { if (isAuthenticated) navigate('/dashboard'); }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  useEffect(() => { return () => dispatch(clearError()); }, [dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => { e.preventDefault(); await dispatch(login(formData)); };

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
      {/* Card */}
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
            Welcome back
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', mt: 0.5, fontWeight: 500 }}>
            Sign in to Earthquake Analytics Platform
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2.5, borderRadius: '12px', fontSize: '0.82rem' }}
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPass ? 'text' : 'password'}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPass(!showPass)} sx={{ color: 'text.secondary' }}>
                    {showPass ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                  </IconButton>
                </InputAdornment>
              ),
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
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
          </Button>
        </form>

        {/* Links */}
        <Box sx={{ mt: 2.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#ef4444', fontWeight: 700, textDecoration: 'none' }}>
              Register
            </Link>
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', mt: 0.8 }}>
            <Link to="/forgot-password" style={{ color: '#64748b', fontWeight: 600, textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
