import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Tooltip, TablePagination, Typography, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import TerrainIcon from '@mui/icons-material/Terrain';
import { useTheme } from '@mui/material/styles';

const MagBadge = ({ mag }) => {
  const getStyle = (m) => {
    if (m >= 7)  return { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.30)',  text: '#f87171' };
    if (m >= 6)  return { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.30)', text: '#fb923c' };
    if (m >= 5)  return { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.30)', text: '#fbbf24' };
    if (m >= 4)  return { bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.30)',  text: '#facc15' };
    return           { bg: 'rgba(16,185,129,0.10)',    border: 'rgba(16,185,129,0.25)', text: '#34d399' };
  };
  const s = getStyle(mag);
  return (
    <Chip
      label={mag ?? '—'}
      size="small"
      sx={{
        height: 22, fontSize: '0.72rem', fontWeight: 900,
        bgcolor: s.bg, color: s.text, border: `1px solid ${s.border}`,
        fontFamily: '"Outfit", sans-serif', minWidth: 42,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
};

const EarthquakeTable = ({ earthquakes, page, limit, total, onPageChange, onLimitChange, onView, onEdit, onDelete, loading }) => {
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const canEdit = ['admin', 'moderator'].includes(user?.role?.trim());

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        background: isDark ? 'rgba(17,24,39,0.65)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)',
        border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(148,163,184,0.12)',
        borderRadius: '16px',
        boxShadow: 'none',
        width: '100%',
      }}
    >
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          '&::-webkit-scrollbar': { width: '4px', height: '4px' },
          '&::-webkit-scrollbar-thumb': { background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: '4px' },
        }}
      >
        <Table sx={{ minWidth: { xs: '100%', md: 650 } }}>
          <TableHead>
            <TableRow>
              {[
                { label: 'Date & Time',  hide: false, align: 'left' },
                { label: 'Location',     hide: false, align: 'left' },
                { label: 'Magnitude',    hide: false, align: 'right' },
                { label: 'Depth',        hide: { xs: true, sm: false }, align: 'right' },
                { label: 'Type',         hide: { xs: true, md: false }, align: 'left' },
                { label: 'Status',       hide: { xs: true, md: false }, align: 'left' },
                { label: 'Actions',      hide: false, align: 'center' },
              ].map(({ label, hide, align }) => (
                <TableCell
                  key={label}
                  align={align}
                  sx={{
                    fontWeight: 800, py: 2, fontSize: '0.7rem', letterSpacing: '0.06em',
                    textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif',
                    bgcolor: isDark ? '#08101f' : '#f8fafc', backgroundImage: 'none',
                    display: hide === true ? 'none' : hide ? { xs: 'none', ...Object.fromEntries(Object.entries(hide).filter(([k]) => k !== 'xs')) } : 'table-cell',
                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {earthquakes.map((eq) => (
              <TableRow
                key={eq._id}
                hover
                sx={{
                  transition: 'background 0.12s ease',
                  '&:last-child td': { border: 0 },
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' },
                }}
              >
                {/* Date & Time */}
                <TableCell sx={{ py: 1.6, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                    {new Date(eq.time).toLocaleDateString()}
                  </Typography>
                  <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', lineHeight: 1, whiteSpace: 'nowrap' }}>
                    {new Date(eq.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </TableCell>

                {/* Location */}
                <TableCell sx={{ py: 1.6, maxWidth: { xs: 120, sm: 200, md: 300 }, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <TerrainIcon sx={{ fontSize: 14, color: isDark ? '#3f5068' : '#9ca3af', flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {eq.place}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Magnitude */}
                <TableCell align="right" sx={{ py: 1.6, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                  <MagBadge mag={eq.mag} />
                </TableCell>

                {/* Depth */}
                <TableCell align="right" sx={{ py: 1.6, display: { xs: 'none', sm: 'table-cell' }, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'text.secondary', fontFamily: '"Outfit", sans-serif' }}>
                    {eq.depth} <Box component="span" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>km</Box>
                  </Typography>
                </TableCell>

                {/* Type */}
                <TableCell sx={{ py: 1.6, display: { xs: 'none', md: 'table-cell' }, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'text.secondary', textTransform: 'capitalize' }}>
                    {eq.type}
                  </Typography>
                </TableCell>

                {/* Status */}
                <TableCell sx={{ py: 1.6, display: { xs: 'none', md: 'table-cell' }, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                  <Chip
                    label={eq.status}
                    size="small"
                    sx={{
                      height: 20, fontSize: '0.65rem', fontWeight: 800,
                      textTransform: 'capitalize', letterSpacing: '0.02em',
                      bgcolor: eq.status === 'reviewed' ? 'rgba(16,185,129,0.10)' : 'rgba(245,158,11,0.10)',
                      color: eq.status === 'reviewed' ? (isDark ? '#34d399' : '#059669') : (isDark ? '#fbbf24' : '#d97706'),
                      border: eq.status === 'reviewed' ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(245,158,11,0.25)',
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell align="center" sx={{ py: 1.6, whiteSpace: 'nowrap', borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                  <Tooltip title="View">
                    <IconButton size="small" onClick={() => onView(eq._id)} sx={{ color: isDark ? '#60a5fa' : '#3b82f6', '&:hover': { bgcolor: isDark ? 'rgba(96,165,250,0.08)' : 'rgba(59,130,246,0.08)' } }}>
                      <ViewIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  {canEdit && (
                    <>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => onEdit(eq._id)} sx={{ color: isDark ? '#fb923c' : '#ea580c', mx: 0.5, '&:hover': { bgcolor: isDark ? 'rgba(251,146,60,0.08)' : 'rgba(234,88,12,0.08)' } }}>
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => onDelete(eq._id)} sx={{ color: isDark ? '#f87171' : '#dc2626', '&:hover': { bgcolor: isDark ? 'rgba(248,113,113,0.08)' : 'rgba(220,38,38,0.08)' } }}>
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {earthquakes.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  {loading ? 'Loading...' : 'No earthquakes found'}
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
        onPageChange={(e, p) => onPageChange(p + 1)}
        rowsPerPage={limit}
        onRowsPerPageChange={(e) => onLimitChange(parseInt(e.target.value))}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
          '& .MuiTablePagination-toolbar': {
            px: { xs: 1, sm: 2 },
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': {
            display: { xs: 'none', sm: 'inline-block' },
            fontWeight: 600,
          },
          '& .MuiTablePagination-displayedRows': {
            fontWeight: 600,
            fontSize: '0.8rem',
          }
        }}
      />
    </Paper>
  );
};

export default EarthquakeTable;
