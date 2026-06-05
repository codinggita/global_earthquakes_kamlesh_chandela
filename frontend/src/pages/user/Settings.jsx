import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Alert, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import authService from '../../services/auth.service';

const Settings = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await authService.changePassword(passwordData);
      setMessage('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
    }
    setLoading(false);
  };

  const cardSx = {
    p: 3,
    borderRadius: '20px',
    background: isDark ? '#161a2b' : '#ffffff',
    border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
    boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
  };

  return (
    <Box sx={{ p: 0.5 }}>
      {/* ── Page Header ─────────────────────────────── */}
      <Box sx={{ mb: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <SecurityIcon sx={{ fontSize: 16, color: '#ff5e7e' }} />
          <Typography
            sx={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.72rem', fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#ff5e7e',
            }}
          >
            Security Settings
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
          Security & Access
        </Typography>
      </Box>

      {message && <Alert severity="success" sx={{ mb: 2.5, borderRadius: '14px', fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}>{message}</Alert>}
      {error   && <Alert severity="error"   sx={{ mb: 2.5, borderRadius: '14px', fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ maxWidth: 960 }}>
        {/* ── Left: Info panel ── */}
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
              gap: 2,
              position: 'relative',
              overflow: 'hidden',
              background: isDark ? '#2e1b23' : '#ffecf0',
            }}
          >
            {/* Floating doodle */}
            <Box sx={{ position: 'absolute', top: 12, right: 16, pointerEvents: 'none' }} className="float-medium">
              <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
                <path d="M5 25C15 25 15 5 20 15C25 25 25 5 28 10" stroke="#ff5e7e" strokeWidth="3.2" strokeLinecap="round" />
              </svg>
            </Box>

            {/* Icon box */}
            <Box
              sx={{
                width: 64, height: 64, borderRadius: '16px',
                background: isDark ? '#161a2b' : '#ffffff',
                color: '#ff5e7e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
                boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
              }}
            >
              <SecurityIcon sx={{ fontSize: 30 }} />
            </Box>

            <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.1rem', color: isDark ? '#ffffff' : '#0f172a' }}>
              Secure Credentials
            </Typography>
            <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.75rem', color: isDark ? '#9ca3af' : '#475569', fontWeight: 700, lineHeight: 1.5 }}>
              Update your password regularly to keep your account protected. Use a strong, unique password.
            </Typography>
          </Box>
        </Grid>

        {/* ── Right: Password form ── */}
        <Grid item xs={12} md={8}>
          <Box sx={cardSx}>
            <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.05rem', color: isDark ? '#ffffff' : '#0f172a', mb: 0.5 }}>
              Change Password
            </Typography>
            <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#9ca3af' : '#475569', mb: 2.5 }}>
              Enter your current password and a new one to update your credentials.
            </Typography>
            <Divider sx={{ mb: 2.5 }} />

            <form onSubmit={handlePasswordChange}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth label="Current Password"
                    name="currentPassword" type="password"
                    value={passwordData.currentPassword}
                    onChange={handleChange} required size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth label="New Password"
                    name="newPassword" type="password"
                    value={passwordData.newPassword}
                    onChange={handleChange} required size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit" variant="contained"
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
                      {loading ? 'Changing...' : 'Change Password'}
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

export default Settings;
