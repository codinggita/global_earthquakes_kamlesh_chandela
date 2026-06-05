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
        background: isDark ? '#0e111d' : '#fdfbf7',
        backgroundImage: isDark
          ? `radial-gradient(circle at 15% 15%, #2e1b23 0%, transparent 50%), radial-gradient(circle at 85% 85%, #1a233b 0%, transparent 50%)`
          : `radial-gradient(circle at 15% 15%, #ffecf0 0%, transparent 50%), radial-gradient(circle at 85% 85%, #e6f0ff 0%, transparent 50%)`,
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating stars */}
      <Box sx={{ position: 'absolute', left: '10%', top: '20%', zIndex: 1, pointerEvents: 'none' }} className="float-slow">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      </Box>
      <Box sx={{ position: 'absolute', right: '12%', bottom: '25%', zIndex: 1, pointerEvents: 'none' }} className="float-medium">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#ff5e7e" stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      </Box>

      {/* Card */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          background: isDark ? '#161a2b' : '#ffffff',
          border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          borderRadius: '24px',
          p: { xs: 3.5, sm: 4.5 },
          boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
          position: 'relative',
          zIndex: 2,
          animation: 'fadeSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
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
              width: 54,
              height: 54,
              borderRadius: '16px',
              background: '#ff5e7e',
              border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
              boxShadow: isDark ? '2.5px 2.5px 0px 0px #ffffff' : '2.5px 2.5px 0px 0px #0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2.5,
            }}
          >
            <TerrainIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 800,
              fontSize: '1.6rem',
              letterSpacing: '-0.02em',
              color: isDark ? '#ffffff' : '#0f172a',
              lineHeight: 1.2,
            }}
          >
            Welcome back
          </Typography>
          <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.82rem', color: isDark ? '#9ca3af' : '#475569', mt: 0.5, fontWeight: 700 }}>
            Sign in to Earthquake Analytics Platform
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2.5 }}
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
              mb: 2.5,
              '& .MuiInputLabel-root.Mui-focused': { color: '#ff5e7e' }
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
              mb: 3.5,
              '& .MuiInputLabel-root.Mui-focused': { color: '#ff5e7e' }
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
              py: 1.3,
              fontSize: '0.92rem',
              fontWeight: 800,
              fontFamily: '"Fredoka", sans-serif',
              borderRadius: '14px',
              border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
              background: '#ff5e7e',
              color: '#ffffff',
              boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
              '&:hover': {
                background: '#e03f60',
                borderColor: isDark ? '#ffffff' : '#0f172a',
                transform: 'translate(-2px, -2px)',
                boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
              },
              transition: 'all 0.18s ease',
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
          </Button>
        </form>

        {/* Links */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.84rem', color: isDark ? '#9ca3af' : '#475569', fontWeight: 700 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#ff5e7e', fontWeight: 800, textDecoration: 'none' }}>
              Register
            </Link>
          </Typography>
          <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.8rem', color: 'text.secondary', mt: 1, fontWeight: 700 }}>
            <Link to="/forgot-password" style={{ color: isDark ? '#9ca3af' : '#475569', fontWeight: 700, textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
