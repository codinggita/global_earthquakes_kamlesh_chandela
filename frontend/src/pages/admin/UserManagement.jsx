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

/* Role colour map — Neubrutalist pastels */
const ROLE_STYLES = {
  admin:     { bg: '#ffecf0', border: '#ff5e7e', text: { dark: '#ff5e7e', light: '#e03f60' } },
  moderator: { bg: '#fff4d2', border: '#fbbf24', text: { dark: '#fbbf24', light: '#d97706' } },
  user:      { bg: '#e6f0ff', border: '#3b82f6', text: { dark: '#3b82f6', light: '#2563eb' } },
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

      {/* ── Rich Banner Header ──────────────────────────── */}
      <Box sx={{
        mb: 4, p: 3, borderRadius: '24px',
        background: isDark
          ? 'linear-gradient(135deg, #1a233b 0%, #161a2b 100%)'
          : 'linear-gradient(135deg, #e6f0ff 0%, #fdfbf7 100%)',
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '5px 5px 0px 0px #ffffff' : '5px 5px 0px 0px #0f172a',
        display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between',
        gap: 2, position: 'relative', overflow: 'hidden',
      }}>
        {/* deco circles */}
        <Box sx={{ position: 'absolute', right: 20, top: -20, width: 70, height: 70, borderRadius: '50%', border: '3px dashed #3b82f6', opacity: 0.15, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', right: 70, bottom: -25, width: 50, height: 50, borderRadius: '50%', border: '2px dashed #ff5e7e', opacity: 0.12, pointerEvents: 'none' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            p: 1.5, borderRadius: '16px', background: '#3b82f6', color: '#ffffff',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
            display: 'flex', alignItems: 'center', flexShrink: 0,
          }}>
            <PeopleIcon sx={{ fontSize: 26 }} />
          </Box>
          <Box>
            <Typography sx={{
              fontFamily: '"Fredoka", sans-serif', fontSize: '0.7rem', fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3b82f6', mb: 0.3,
            }}>Administration</Typography>
            <Typography sx={{
              fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem' },
              letterSpacing: '-0.03em', color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1,
            }}>User Management</Typography>
            <Typography sx={{
              fontFamily: '"Quicksand", sans-serif', fontSize: '0.78rem', fontWeight: 700,
              color: isDark ? '#9ca3af' : '#64748b', mt: 0.4,
            }}>View, activate, and block platform accounts</Typography>
          </Box>
        </Box>

        {/* User count badge */}
        <Box sx={{
          px: 2.5, py: 1.5, borderRadius: '16px', textAlign: 'center', flexShrink: 0,
          background: isDark ? '#1a233b' : '#e6f0ff',
          border: '2px solid #3b82f6',
          boxShadow: '3px 3px 0px 0px #3b82f6',
        }}>
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#3b82f6', lineHeight: 1 }}>
            {total.toLocaleString()}
          </Typography>
          <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.7rem', fontWeight: 800, color: isDark ? '#93c5fd' : '#2563eb', textTransform: 'uppercase', letterSpacing: '0.06em', mt: 0.3 }}>
            Registered Users
          </Typography>
        </Box>
      </Box>

      {/* ── Table ─────────────────────────────────── */}
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: '24px',
          background: isDark ? '#161a2b' : '#ffffff',
          border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          boxShadow: isDark ? '5px 5px 0px 0px #ffffff' : '5px 5px 0px 0px #0f172a',
        }}
      >
        {/* Table section header */}
        <Box sx={{
          px: 3, py: 1.8, display: 'flex', alignItems: 'center', gap: 1.5,
          background: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7',
          borderBottom: isDark ? '2px solid rgba(255,255,255,0.15)' : '2px solid rgba(15,23,42,0.15)',
        }}>
          <Box sx={{ p: 0.7, borderRadius: '9px', background: isDark ? '#1a233b' : '#e6f0ff', color: '#3b82f6', border: '1.5px solid #3b82f6', display: 'flex' }}>
            <PeopleIcon sx={{ fontSize: 15 }} />
          </Box>
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.95rem', color: isDark ? '#ffffff' : '#0f172a' }}>
            All Accounts
          </Typography>
          <Box sx={{ ml: 'auto', px: 1.2, py: 0.3, borderRadius: '999px', background: '#3b82f6', border: '1.5px solid #0f172a' }}>
            <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.7rem', fontWeight: 800, color: '#ffffff' }}>
              {users.length} shown
            </Typography>
          </Box>
        </Box>
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
                      fontFamily: '"Fredoka", sans-serif',
                      fontWeight: 800, py: 2, fontSize: '0.72rem', letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7',
                      backgroundImage: 'none',
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
                            fontFamily: '"Fredoka", sans-serif',
                            background: user.role === 'admin'
                              ? 'linear-gradient(135deg, #ff5e7e, #fbbf24)'
                              : user.role === 'moderator'
                              ? 'linear-gradient(135deg, #fbbf24, #ff5e7e)'
                              : 'linear-gradient(135deg, #3b82f6, #10b981)',
                            border: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a',
                          }}
                        >
                          {user.name?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                        <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.85rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
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
                          height: 22, fontSize: '0.65rem', fontWeight: 800,
                          fontFamily: '"Fredoka", sans-serif',
                          bgcolor: roleStyle.bg, color: roleColor,
                          border: `1.5px solid ${roleStyle.border}`,
                          textTransform: 'capitalize', letterSpacing: '0.03em',
                          '& .MuiChip-label': { px: 1.2 },
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
                            width: 32, height: 32, borderRadius: '10px',
                            bgcolor: user.isActive ? '#e6f9f3' : '#ffecf0',
                            color:   user.isActive ? '#10b981' : '#ff5e7e',
                            border:  isDark
                              ? '1.5px solid #ffffff'
                              : user.isActive ? '1.5px solid #10b981' : '1.5px solid #ff5e7e',
                            transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            '&:hover': {
                              transform: 'translate(-1px, -1px)',
                              boxShadow: isDark
                                ? '2px 2px 0px 0px #ffffff'
                                : user.isActive ? '2px 2px 0px 0px #10b981' : '2px 2px 0px 0px #ff5e7e',
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
            borderTop: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 700,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': { fontWeight: 800, fontFamily: '"Quicksand", sans-serif' },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserManagement;
