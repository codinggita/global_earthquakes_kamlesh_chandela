import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, TablePagination } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from '../../services/api';
import { useToast } from '../../components/common/Toast';

const UserManagement = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users', { params: { page, limit } });
      setUsers(res.data.data || []);
      setTotal(res.data.pagination?.total || 0);
    } catch { showToast('Failed to load users', 'error'); }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await api.patch('/admin/users/' + userId, { isActive: !currentStatus });
      showToast('User status updated', 'success');
      fetchUsers();
    } catch { showToast('Failed to update user', 'error'); }
  };

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.02em', color: 'text.primary' }}>
        User Management
      </Typography>
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'admin' ? 'error' : user.role === 'moderator' ? 'warning' : 'primary'} 
                      size="small" 
                      sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.isActive ? 'Active' : 'Inactive'} 
                      color={user.isActive ? 'success' : 'default'} 
                      size="small" 
                      sx={{ fontWeight: 'bold' }} 
                    />
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      size="small" 
                      color={user.isActive ? 'success' : 'error'} 
                      onClick={() => toggleUserStatus(user._id, user.isActive)}
                      className="hover:scale-110 transition-transform"
                      title={user.isActive ? "Block User" : "Unblock User"}
                    >
                      {user.isActive ? <CheckCircleIcon /> : <BlockIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    {loading ? 'Loading...' : 'No users found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
          component="div" 
          count={total} 
          page={page - 1} 
          onPageChange={(e, p) => setPage(p + 1)} 
          rowsPerPage={limit} 
          rowsPerPageOptions={[limit]} 
          sx={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        />
      </Paper>
    </Box>
  );
};

export default UserManagement;
