import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  TablePagination, Avatar, Tooltip, useTheme,
} from '@mui/material';
import BlockIcon        from '@mui/icons-material/Block';
import CheckCircleIcon  from '@mui/icons-material/CheckCircle';
import PeopleIcon       from '@mui/icons-material/People';
import api from '../../services/api';
import { useToast } from '../../components/common/Toast';

/* Role colour map */
const ROLE_STYLES = {
  admin:     { bg: 'rgba(239,68,68,0.10)',   border: 'rgba(239,68,68,0.22)',   text: { dark: '#f87171', light: '#dc2626' } },
  moderator: { bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.22)',  text: { dark: '#fbbf24', light: '#d97706' } },
  user:      { bg: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.22)',  text: { dark: '#60a5fa', light: '#2563eb' } },
};

const UserManagement = () => {
  const theme    = useTheme();
  const isDark   = theme.palette.mode === 'dark';
  const { showToast } = useToast();
  const [users,   setUsers]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [limit]               = useState(20);
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
    <Box sx={{ pt: 2.5, pb: 2 }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <PeopleIcon color="primary" sx={{ fontSize: 16 }} />
          <Typography variant="overline" fontWeight="900" color="primary" sx={{ letterSpacing: 1.5, lineHeight: 1 }}>
            ADMINISTRATION
          </Typography>
        </Box>
        <Typography
          sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: { xs: '1.5rem', sm: '1.8rem' }, letterSpacing: '-0.03em', color: 'text.primary', lineHeight: 1.1 }}
        >
          User Management
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500, mt: 0.4 }}>
          {total} registered account{total !== 1 ? 's' : ''} on the platform
        </Typography>
      </Box>

      {/* ── Table ───────────────────────────────────────────── */}
      <Paper
        sx={{
          overflow: 'hidden',
          background: isDark ? 'rgba(17,24,39,0.65)' : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(148,163,184,0.12)',
          borderRadius: 4,
          boxShadow: 'none',
        }}
      >
        <TableContainer
          sx={{
            '&::-webkit-scrollbar': { width: '4px', height: '4px' },
            '&::-webkit-scrollbar-thumb': { background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: '4px' },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {['User', 'Email', 'Role', 'Status', 'Joined', 'Action'].map((h, i) => (
                  <TableCell
                    key={h}
                    align={i === 5 ? 'center' : 'left'}
                    sx={{
                      fontWeight: 800, py: 2, fontSize: '0.72rem', letterSpacing: '0.06em',
                      textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif',
                      bgcolor: isDark ? '#08101f' : '#f8fafc', backgroundImage: 'none',
                      display: i === 1 ? { xs: 'none', md: 'table-cell' } : i === 4 ? { xs: 'none', sm: 'table-cell' } : 'table-cell',
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => {
                const roleStyle = ROLE_STYLES[user.role] || ROLE_STYLES.user;
                const roleColor = isDark ? roleStyle.text.dark : roleStyle.text.light;
                return (
                  <TableRow key={user._id} hover sx={{ '&:last-child td': { border: 0 } }}>

                    {/* User */}
                    <TableCell sx={{ py: 1.8 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <Avatar
                          sx={{
                            width: 32, height: 32, fontSize: '0.8rem', fontWeight: 800, flexShrink: 0,
                            background: user.role === 'admin'
                              ? 'linear-gradient(135deg, #ef4444, #f97316)'
                              : user.role === 'moderator'
                              ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                              : 'linear-gradient(135deg, #3b82f6, #10b981)',
                          }}
                        >
                          {user.name?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.primary' }}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Email */}
                    <TableCell sx={{ py: 1.8, display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500 }}>
                        {user.email}
                      </Typography>
                    </TableCell>

                    {/* Role */}
                    <TableCell sx={{ py: 1.8 }}>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          height: 22, fontSize: '0.68rem', fontWeight: 800,
                          bgcolor: roleStyle.bg, color: roleColor,
                          border: `1px solid ${roleStyle.border}`,
                          textTransform: 'capitalize', letterSpacing: '0.03em',
                          '& .MuiChip-label': { px: 1 },
                        }}
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{ py: 1.8 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        <Box
                          sx={{
                            width: 6, height: 6, borderRadius: '50%',
                            bgcolor: user.isActive ? '#10b981' : '#4b5563',
                            boxShadow: user.isActive ? '0 0 6px rgba(16,185,129,0.5)' : 'none',
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.78rem', fontWeight: 700,
                            color: user.isActive
                              ? (isDark ? '#34d399' : '#059669')
                              : (isDark ? '#6b7280' : '#9ca3af'),
                          }}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Joined */}
                    <TableCell sx={{ py: 1.8, display: { xs: 'none', sm: 'table-cell' } }}>
                      <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography sx={{ fontSize: '0.66rem', color: 'text.secondary', lineHeight: 1 }}>
                        {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </TableCell>

                    {/* Action */}
                    <TableCell align="center" sx={{ py: 1.8 }}>
                      <Tooltip title={user.isActive ? 'Block User' : 'Unblock User'} arrow>
                        <IconButton
                          size="small"
                          onClick={() => toggleUserStatus(user._id, user.isActive)}
                          sx={{
                            width: 30, height: 30, borderRadius: '8px',
                            bgcolor: user.isActive ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                            color:   user.isActive ? '#10b981' : '#ef4444',
                            border:  user.isActive ? '1px solid rgba(16,185,129,0.20)' : '1px solid rgba(239,68,68,0.20)',
                            transition: 'all 0.15s ease',
                            '&:hover': {
                              bgcolor: user.isActive ? 'rgba(16,185,129,0.16)' : 'rgba(239,68,68,0.16)',
                              transform: 'scale(1.08)',
                            },
                          }}
                        >
                          {user.isActive ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <BlockIcon sx={{ fontSize: 16 }} />}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}

              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8, color: 'text.secondary', fontSize: '0.85rem' }}>
                    {loading ? 'Loading users…' : 'No users found'}
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
          sx={{
            borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': { fontWeight: 600 },
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserManagement;
