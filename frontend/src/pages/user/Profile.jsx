import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Typography, TextField, Button, Grid, Divider, Alert } from '@mui/material';
import authService from '../../services/auth.service';

const Profile = () => {
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} required /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Email" value={user?.email || ''} disabled /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Role" value={user?.role || ''} disabled /></Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Saving...' : 'Update Profile'}</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;
