import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, 
  Chip, IconButton, Tooltip, Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, Divider,
  Grid, Avatar, useTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import api from '../../services/api';

const ActionChip = ({ action }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const getActionStyles = (action) => {
    switch (action?.toUpperCase()) {
      case 'LOGIN':   return { bg: '#e6f9f3', border: '#10b981', text: '#10b981', friendly: 'Log In' };
      case 'LOGOUT':  return { bg: '#f1f5f9', border: '#94a3b8', text: '#475569', friendly: 'Log Out' };
      case 'DELETE':  return { bg: '#ffecf0', border: '#ff5e7e', text: '#ff5e7e', friendly: 'Remove' };
      case 'UPDATE':  return { bg: '#fff4d2', border: '#fbbf24', text: '#d97706', friendly: 'Edit / Update' };
      case 'CREATE':  return { bg: '#e6f0ff', border: '#3b82f6', text: '#3b82f6', friendly: 'Create' };
      case 'SYNC':    return { bg: '#e8e5ff', border: '#8b5cf6', text: '#8b5cf6', friendly: 'USGS Sync' };
      default:        return { bg: '#f1f5f9', border: '#94a3b8', text: '#475569', friendly: action };
    }
  };

  const styles = getActionStyles(action);

  return (
    <Chip
      label={styles.friendly}
      size="small"
      sx={{
        height: 22,
        fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.65rem',
        fontWeight: 800,
        bgcolor: styles.bg,
        color: styles.text,
        border: `1.5px solid ${styles.border}`,
        letterSpacing: '0.03em',
        minWidth: 90,
        '& .MuiChip-label': { px: 1.2 },
      }}
    />
  );
};

const parseUserAgent = (ua) => {
  if (!ua) return 'Automated Server Engine';
  
  let browser = '';
  let os = '';
  
  // OS Detection
  if (ua.includes('Windows')) os = 'Windows PC';
  else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'Macbook / iMac';
  else if (ua.includes('iPhone')) os = 'iPhone Mobile';
  else if (ua.includes('iPad')) os = 'iPad Tablet';
  else if (ua.includes('Android')) os = 'Android Mobile';
  else if (ua.includes('Linux')) os = 'Linux Server';
  else os = 'Device';
  
  // Browser Detection
  if (ua.includes('Edg/')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome') && ua.includes('Safari')) browser = 'Google Chrome';
  else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Apple Safari';
  else browser = 'Web Browser';
  
  return `${browser} (${os})`;
};

const getNaturalSummary = (log) => {
  const userName = log.userId?.name || 'The Automated System';
  const action = log.action?.toUpperCase();
  const resource = log.resource;
  
  switch (action) {
    case 'LOGIN':
      return `${userName} successfully logged into the platform.`;
    case 'LOGOUT':
      return `${userName} logged out of the platform.`;
    case 'CREATE':
      return `${userName} created a new ${resource === 'Earthquake' ? 'Earthquake Event' : resource === 'User' ? 'User Account' : resource} entry.`;
    case 'UPDATE':
      return `${userName} modified and updated a ${resource === 'Earthquake' ? 'Earthquake Event' : resource === 'User' ? 'User Account' : resource} record.`;
    case 'DELETE':
      return `${userName} permanently deleted a ${resource === 'Earthquake' ? 'Earthquake Event' : resource === 'User' ? 'User Account' : resource} entry.`;
    case 'EXPORT':
      return `${userName} downloaded/exported ${resource} records to a file.`;
    case 'SYNC':
      return `The background engine synchronized the platform with the USGS Government earthquake database.`;
    default:
      return `${userName} performed a ${action?.toLowerCase()} operation on ${resource}.`;
  }
};

const formatCamelCase = (str) => {
  if (!str) return '';
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

/* Check if a string looks like an ISO date */
const isISODate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(s);

/* Format a payload value into something readable */
const formatPayloadValue = (val) => {
  if (val === null || val === undefined) return null;
  // Object — look for range-like structures
  if (typeof val === 'object' && !Array.isArray(val)) {
    const keys = Object.keys(val);
    // Date range: { start, end }
    if (keys.includes('start') && keys.includes('end') && isISODate(val.start) && isISODate(val.end)) {
      const fmt = (d) => new Date(d).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
      return `${fmt(val.start)}  →  ${fmt(val.end)}`;
    }
    // Generic object — compact JSON
    return JSON.stringify(val);
  }
  // Plain ISO date string
  if (isISODate(val)) {
    return new Date(val).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  }
  return String(val);
};

/* Decide whether a payload entry has meaningful data worth showing */
const isRealValue = (val) => {
  if (val === null || val === undefined || val === '') return false;
  if (val === 0 || val === '0') return false;   // skip zero counts
  if (typeof val === 'object' && Object.keys(val).length === 0) return false;
  return true;
};

const AuditLogs = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedLog, setSelectedLog] = useState(null);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/admin/audit-logs', { params: { page, limit } });
      setLogs(res.data.data || []);
      setTotal(res.data.pagination?.total || 0);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, limit]);

  return (
    <Box sx={{ pt: 2.5, pb: 2 }}>

      {/* ── Rich Banner Header ──────────────────────────── */}
      <Box sx={{
        mb: 4, p: 3, borderRadius: '24px',
        background: isDark
          ? 'linear-gradient(135deg, #1e1228 0%, #161a2b 100%)'
          : 'linear-gradient(135deg, #e8e5ff 0%, #fdfbf7 100%)',
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '5px 5px 0px 0px #ffffff' : '5px 5px 0px 0px #0f172a',
        display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between',
        gap: 2, position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <Box sx={{ position: 'absolute', right: 20, top: -20, width: 70, height: 70, borderRadius: '50%', border: '3px dashed #8b5cf6', opacity: 0.15, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', right: 70, bottom: -25, width: 50, height: 50, borderRadius: '50%', border: '2px dashed #ff5e7e', opacity: 0.12, pointerEvents: 'none' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            p: 1.5, borderRadius: '16px', background: '#8b5cf6', color: '#ffffff',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
            display: 'flex', alignItems: 'center', flexShrink: 0,
          }}>
            <HistoryIcon sx={{ fontSize: 26 }} />
          </Box>
          <Box>
            <Typography sx={{
              fontFamily: '"Fredoka", sans-serif', fontSize: '0.7rem', fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b5cf6', mb: 0.3,
            }}>📋 System Logs</Typography>
            <Typography sx={{
              fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem' },
              letterSpacing: '-0.03em', color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1,
            }}>Audit Trail</Typography>
            <Typography sx={{
              fontFamily: '"Quicksand", sans-serif', fontSize: '0.78rem', fontWeight: 700,
              color: isDark ? '#9ca3af' : '#64748b', mt: 0.4,
            }}>Every action on the platform — fully traceable</Typography>
          </Box>
        </Box>

        {/* Total badge */}
        <Box sx={{
          px: 2.5, py: 1.5, borderRadius: '16px', textAlign: 'center', flexShrink: 0,
          background: isDark ? '#1e1a33' : '#e8e5ff',
          border: '2px solid #8b5cf6',
          boxShadow: '3px 3px 0px 0px #8b5cf6',
        }}>
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#8b5cf6', lineHeight: 1 }}>
            {total.toLocaleString()}
          </Typography>
          <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.7rem', fontWeight: 800, color: isDark ? '#a78bfa' : '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', mt: 0.3 }}>
            Total Logs
          </Typography>
        </Box>
      </Box>

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
          <Box sx={{ p: 0.7, borderRadius: '9px', background: isDark ? '#1e1a33' : '#e8e5ff', color: '#8b5cf6', border: '1.5px solid #8b5cf6', display: 'flex' }}>
            <HistoryIcon sx={{ fontSize: 15 }} />
          </Box>
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.95rem', color: isDark ? '#ffffff' : '#0f172a' }}>
            Activity Log — Page {page}
          </Typography>
          <Box sx={{ ml: 'auto', px: 1.2, py: 0.3, borderRadius: '999px', background: '#8b5cf6', border: '1.5px solid #0f172a' }}>
            <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.7rem', fontWeight: 800, color: '#ffffff' }}>
              {logs.length} entries
            </Typography>
          </Box>
        </Box>

        <TableContainer
          sx={{ 
            maxHeight: '65vh',
            '&::-webkit-scrollbar': {
              width: '4px',
              height: '4px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            },
          }}
        >
          <Table stickyHeader sx={{ '& .MuiTableCell-stickyHeader': { bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7', backgroundImage: 'none' } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, py: 2, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>ACTION</TableCell>
                <TableCell sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, py: 2, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>RESOURCE</TableCell>
                <TableCell sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, py: 2, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>PERFORMED BY</TableCell>
                <TableCell sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, py: 2, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>TIMESTAMP</TableCell>
                <TableCell align="center" sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, py: 2, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>DETAILS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ py: 1.8 }}><ActionChip action={log.action} /></TableCell>
                  <TableCell sx={{ py: 1.8 }}>
                    <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary' }}>{log.resource}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>ID: {log.resourceId || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.8 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: log.userId ? 'primary.main' : 'secondary.main', fontWeight: 'bold' }}>
                        {log.userId?.name?.[0] || 'S'}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary', lineHeight: 1.2 }}>{log.userId?.name || 'System Scheduler'}</Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '0.68rem', lineHeight: 1 }}>{log.userId?.email || 'system@seismicpro.local'}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.8 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>{new Date(log.timestamp).toLocaleDateString()}</Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '0.68rem', lineHeight: 1 }}>{new Date(log.timestamp).toLocaleTimeString()}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ py: 1.8 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedLog(log)}
                        sx={{
                          width: 30, height: 30, borderRadius: '8px',
                          bgcolor: isDark ? '#2e1b23' : '#ffecf0',
                          color: '#ff5e7e',
                          border: isDark ? '1.5px solid #ffffff' : '1.5px solid #ff5e7e',
                          transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          '&:hover': {
                            transform: 'translate(-1px,-1px)',
                            boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #ff5e7e',
                          },
                        }}
                      >
                        <InfoIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography color="textSecondary">No activity logs found</Typography>
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
          onRowsPerPageChange={(e) => {
            setLimit(parseInt(e.target.value, 10));
            setPage(1);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            borderTop: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 700,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': { fontWeight: 800, fontFamily: '"Quicksand", sans-serif' },
          }}
        />
      </Box>

      <Dialog
        open={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: isDark ? '#161a2b' : '#ffffff',
            backgroundImage: 'none',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '8px 8px 0px 0px #ffffff' : '8px 8px 0px 0px #0f172a',
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1, color: isDark ? '#ffffff' : '#0f172a', pt: 2.5, pb: 1.5 }}>
          <InfoIcon sx={{ color: '#ff5e7e', fontSize: 20 }} /> Log Activity Details
        </DialogTitle>
        <Divider sx={{ borderColor: isDark ? '#ffffff' : '#0f172a', borderWidth: '1px' }} />
        <DialogContent sx={{ px: 3, py: 2 }}>
          {selectedLog && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              
              {/* Natural language summary box */}
              <Box sx={{ p: 1.8, borderRadius: '12px', bgcolor: isDark ? '#2e1b23' : '#ffecf0', border: isDark ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #ff5e7e' }}>
                <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, color: '#ff5e7e', mb: 0.5, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Activity Summary</Typography>
                <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1.5, fontSize: '0.85rem' }}>
                  {getNaturalSummary(selectedLog)}
                </Typography>
              </Box>

              {/* User/Actor section */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase', mb: 1, fontSize: '0.68rem' }}>Performed By</Typography>
                {selectedLog.userId ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2.5, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)', border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)' }}>
                    <Avatar sx={{ width: 36, height: 36, fontSize: '0.9rem', bgcolor: 'primary.main', fontWeight: 'bold' }}>
                      {selectedLog.userId.name?.[0] || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{selectedLog.userId.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{selectedLog.userId.email}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2.5, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)', border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)' }}>
                    <Avatar sx={{ width: 36, height: 36, fontSize: '0.9rem', bgcolor: 'secondary.main', fontWeight: 'bold' }}>
                      S
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>Automated Platform Service</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>system-scheduler@seismicpro.local</Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Action details grid */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase', mb: 1.2, fontSize: '0.68rem' }}>Operation Context</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2 }}>Action Type</Typography>
                    <ActionChip action={selectedLog.action} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2 }}>Target Resource</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', textTransform: 'capitalize' }}>{selectedLog.resource}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2 }}>Resource ID Reference</Typography>
                    <Chip label={selectedLog.resourceId || 'Not Applicable'} size="small" variant="outlined" sx={{ fontSize: '0.72rem', height: 20, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2 }}>Logged Timestamp</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{new Date(selectedLog.timestamp).toLocaleString()}</Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Network context */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase', mb: 1.2, fontSize: '0.68rem' }}>Network Context</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2 }}>IP Address</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary' }}>
                      {selectedLog.ipAddress || 'Internal Network'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2 }}>Device / Platform</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.8rem' }}>
                      {parseUserAgent(selectedLog.userAgent)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Details Key-Value Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase', mb: 1, fontSize: '0.68rem' }}>Operation Payload</Typography>
                {(() => {
                  const realEntries = selectedLog.details
                    ? Object.entries(selectedLog.details).filter(([, v]) => isRealValue(v))
                    : [];
                  if (realEntries.length === 0) {
                    return (
                      <Box sx={{ py: 2.2, px: 2, textAlign: 'center', borderRadius: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)', border: '1px dashed', borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)' }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>No payload data for this operation.</Typography>
                      </Box>
                    );
                  }
                  return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {realEntries.map(([key, val]) => {
                        const display = formatPayloadValue(val);
                        /* A "range" value is long — show it stacked rather than inline */
                        const isRange = key === 'range' || (typeof val === 'object' && val !== null && 'start' in val && 'end' in val);
                        return (
                          <Box
                            key={key}
                            sx={{
                              py: 1.2, px: 1.5, borderRadius: '10px',
                              bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.018)',
                              border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                              display: 'flex',
                              flexDirection: isRange ? 'column' : 'row',
                              justifyContent: isRange ? 'flex-start' : 'space-between',
                              alignItems: isRange ? 'flex-start' : 'center',
                              gap: isRange ? 0.4 : 0,
                            }}
                          >
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'capitalize', letterSpacing: '0.03em' }}>
                              {formatCamelCase(key)}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                fontFamily: isRange ? 'inherit' : 'monospace',
                                fontSize: isRange ? '0.78rem' : '0.74rem',
                                wordBreak: 'break-all',
                              }}
                            >
                              {display}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })()}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, px: 3, borderTop: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a' }}>
          <Button
            onClick={() => setSelectedLog(null)}
            variant="contained"
            sx={{
              borderRadius: '12px', px: 3.5,
              textTransform: 'none',
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 800, fontSize: '0.85rem',
              background: '#ff5e7e', color: '#ffffff',
              border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
              boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
              '&:hover': {
                background: '#e03f60',
                transform: 'translate(-1px,-1px)',
                boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
              },
            }}
          >Close Details</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuditLogs;
