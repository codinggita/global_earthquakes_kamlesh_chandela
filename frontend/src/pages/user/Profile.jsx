import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Grid, Divider, Alert, Avatar, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import authService from '../../services/auth.service';

const Profile = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await authService.updateProfile({ name });
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
    setLoading(false);
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'US';

  const getRoleStyles = (role) => {
    const r = (role || '').trim().toLowerCase();
    if (r === 'admin') return { bg: 'rgba(239,68,68,0.12)', text: '#f87171', border: 'rgba(239,68,68,0.25)' };
    if (r === 'moderator') return { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', border: 'rgba(245,158,11,0.25)' };
    return { bg: 'rgba(59,130,246,0.12)', text: '#60a5fa', border: 'rgba(59,130,246,0.25)' };
  };

  const roleStyle = getRoleStyles(user?.role);

  return (
    <Box sx={{ p: 0.5 }}>
      {/* Page Header */}
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <PersonIcon color="primary" sx={{ fontSize: 16 }} />
          <Typography variant="overline" fontWeight="900" color="primary" sx={{ letterSpacing: 1.5, lineHeight: 1 }}>
            ACCOUNT SETTINGS
          </Typography>
        </Box>
        <Typography
          sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: { xs: '1.4rem', sm: '1.7rem' }, letterSpacing: '-0.03em', color: 'text.primary', lineHeight: 1.1 }}
        >
          My Profile
        </Typography>
      </Box>

      {message && <Alert severity="success" sx={{ mb: 2, borderRadius: '10px', fontSize: '0.82rem', py: 0.5 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px', fontSize: '0.82rem', py: 0.5 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ maxWidth: 960 }}>
        {/* Left Card: Avatar & Status */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: '20px',
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.03)',
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: '2rem',
                fontWeight: 800,
                fontFamily: '"Outfit", sans-serif',
                background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                boxShadow: '0 8px 24px rgba(239,68,68,0.2)',
                mb: 2,
              }}
            >
              {initials}
            </Avatar>
            <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'text.primary', mb: 0.5 }}>
              {user?.name || 'User Name'}
            </Typography>
            <Chip
              label={user?.role || 'user'}
              size="small"
              sx={{
                height: 18, fontSize: '0.62rem', fontWeight: 800,
                textTransform: 'uppercase',
                bgcolor: roleStyle.bg, color: roleStyle.text, border: `1px solid ${roleStyle.border}`,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          </Box>
        </Grid>

        {/* Right Card: Form Fields */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              p: 3,
              borderRadius: '20px',
              background: isDark ? 'rgba(10,16,30,0.7)' : 'rgba(255,255,255,0.7)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 8px 32px rgba(0,0,0,0.03)',
              // Override child inputs
              '& .MuiOutlinedInput-root': {
                borderRadius: '11px',
                fontSize: '0.88rem',
                background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
                transition: 'all 0.2s ease',
                '& fieldset': {
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)',
                },
                '&:hover fieldset': {
                  borderColor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.22)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ef4444',
                  borderWidth: '1.5px',
                },
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.88rem',
                '&.Mui-focused': {
                  color: '#ef4444',
                }
              }
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Display Name" value={name} onChange={(e) => setName(e.target.value)} required size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" value={user?.email || ''} disabled size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Account Access Role" value={user?.role || ''} disabled size="small" />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1.5, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1,
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                        boxShadow: '0 4px 16px rgba(239,68,68,0.25)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 6px 20px rgba(239,68,68,0.35)',
                        },
                        '&.Mui-disabled': {
                          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                          color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
