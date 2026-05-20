import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Divider, Alert } from '@mui/material';
import authService from '../../services/auth.service';

const Settings = () => {
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
    <Box>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>Change Password</Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handlePasswordChange}>
          <TextField fullWidth label="Current Password" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="New Password" name="newPassword" type="password" value={passwordData.newPassword} onChange={handleChange} sx={{ mb: 3 }} required />
          <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Changing...' : 'Change Password'}</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Settings;
