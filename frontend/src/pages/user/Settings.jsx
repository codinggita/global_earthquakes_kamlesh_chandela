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

  return (
    <Box sx={{ p: 0.5 }}>
      {/* Page Header */}
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <SecurityIcon color="primary" sx={{ fontSize: 16 }} />
          <Typography variant="overline" fontWeight="900" color="primary" sx={{ letterSpacing: 1.5, lineHeight: 1 }}>
            SECURITY SETTINGS
          </Typography>
        </Box>
        <Typography
          sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: { xs: '1.4rem', sm: '1.7rem' }, letterSpacing: '-0.03em', color: 'text.primary', lineHeight: 1.1 }}
        >
          Security & Access
        </Typography>
      </Box>

      {message && <Alert severity="success" sx={{ mb: 2, borderRadius: '10px', fontSize: '0.82rem', py: 0.5 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px', fontSize: '0.82rem', py: 0.5 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ maxWidth: 960 }}>
        {/* Left Column: Security Info */}
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
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.1)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(239,68,68,0.1)',
                mb: 2,
              }}
            >
              <SecurityIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', mb: 1 }}>
              Secure Credentials
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 500, lineHeight: 1.4 }}>
              Updating your password regularly keeps your account secure. Ensure your new password is hard to guess.
            </Typography>
          </Box>
        </Grid>

        {/* Right Column: Password Form */}
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
            <form onSubmit={handlePasswordChange}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    required
                    size="small"
                  />
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
