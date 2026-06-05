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

  const getRoleColor = (role) => {
    const r = (role || '').trim().toLowerCase();
    if (r === 'admin') return { bg: '#ffecf0', text: '#ff5e7e', border: '#ff5e7e' };
    if (r === 'moderator') return { bg: '#fff4d2', text: '#fbbf24', border: '#fbbf24' };
    return { bg: '#e6f0ff', text: '#3b82f6', border: '#3b82f6' };
  };

  const roleColor = getRoleColor(user?.role);

  /* shared card style */
  const cardSx = {
    p: 3,
    borderRadius: '20px',
    background: isDark ? '#161a2b' : '#ffffff',
    border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
    boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
  };

  return (
    <Box sx={{ p: 0.5 }}>
      {/* ── Page Header ───────────────────────────────── */}
      <Box sx={{ mb: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <PersonIcon sx={{ fontSize: 16, color: '#ff5e7e' }} />
          <Typography
            sx={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.72rem', fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#ff5e7e',
            }}
          >
            Account Settings
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 800, fontSize: { xs: '1.6rem', sm: '2rem' },
            letterSpacing: '-0.03em', color: isDark ? '#ffffff' : '#0f172a',
            lineHeight: 1.1,
          }}
        >
          My Profile
        </Typography>
      </Box>

      {message && <Alert severity="success" sx={{ mb: 2.5, borderRadius: '14px', fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}>{message}</Alert>}
      {error   && <Alert severity="error"   sx={{ mb: 2.5, borderRadius: '14px', fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ maxWidth: 960 }}>
        {/* ── Left: Avatar card ── */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              ...cardSx,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: 1.5,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Floating doodle */}
            <Box sx={{ position: 'absolute', top: 12, right: 16, pointerEvents: 'none' }} className="float-slow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#fbbf24" stroke={isDark ? '#ffffff' : '#0f172a'} strokeWidth="2.5" strokeLinejoin="round" />
              </svg>
            </Box>

            <Avatar
              sx={{
                width: 80, height: 80,
                fontSize: '2rem', fontWeight: 800,
                fontFamily: '"Fredoka", sans-serif',
                background: user?.role === 'admin'
                  ? 'linear-gradient(135deg, #ff5e7e, #fbbf24)'
                  : 'linear-gradient(135deg, #3b82f6, #10b981)',
                border: isDark ? '3px solid #ffffff' : '3px solid #0f172a',
                boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
              }}
            >
              {initials}
            </Avatar>

            <Box>
              <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.2rem', color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1.2 }}>
                {user?.name || 'User Name'}
              </Typography>
              <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#9ca3af' : '#475569', mt: 0.3 }}>
                {user?.email}
              </Typography>
            </Box>

            <Chip
              label={user?.role || 'user'}
              size="small"
              sx={{
                height: 22, fontSize: '0.65rem', fontWeight: 800,
                textTransform: 'uppercase',
                bgcolor: roleColor.bg, color: roleColor.text,
                border: `1.5px solid ${roleColor.border}`,
                fontFamily: '"Fredoka", sans-serif',
                '& .MuiChip-label': { px: 1.2 },
              }}
            />

            {/* Online dot */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', border: isDark ? '1px solid #ffffff' : '1px solid #0f172a', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
              <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.72rem', fontWeight: 800, color: '#10b981' }}>
                Online
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* ── Right: Form card ── */}
        <Grid item xs={12} md={8}>
          <Box sx={cardSx}>
            <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.05rem', color: isDark ? '#ffffff' : '#0f172a', mb: 0.5 }}>
              Edit Information
            </Typography>
            <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#9ca3af' : '#475569', mb: 2.5 }}>
              Update your display name and review account details.
            </Typography>
            <Divider sx={{ mb: 2.5 }} />

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Display Name" value={name} onChange={(e) => setName(e.target.value)} required size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" value={user?.email || ''} disabled size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Account Role" value={user?.role || ''} disabled size="small" />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 0.5 }} />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        borderRadius: '14px',
                        px: 4, py: 1.1,
                        fontSize: '0.88rem',
                        fontFamily: '"Fredoka", sans-serif',
                        fontWeight: 800,
                        textTransform: 'none',
                        background: '#ff5e7e',
                        color: '#ffffff',
                        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
                        boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
                        '&:hover': {
                          background: '#e03f60',
                          transform: 'translate(-2px, -2px)',
                          boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
                        },
                        '&.Mui-disabled': {
                          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                          color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                          border: 'none', boxShadow: 'none',
                        },
                        transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      {loading ? 'Updating...' : 'Save Changes'}
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
