import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Chip, Tooltip, TablePagination, Typography, Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import TerrainIcon from '@mui/icons-material/Terrain';
import { useTheme } from '@mui/material/styles';

/* ── Magnitude badge — solid pastel (Neubrutalist) ─────────── */
const MagBadge = ({ mag }) => {
  const getStyle = (m) => {
    if (m >= 7)  return { bg: '#ffe0e0', border: '#ff5e7e', text: '#c0152e' };
    if (m >= 6)  return { bg: '#fff0e0', border: '#f97316', text: '#c05a00' };
    if (m >= 5)  return { bg: '#fff4d2', border: '#fbbf24', text: '#92680a' };
    if (m >= 4)  return { bg: '#fefce8', border: '#eab308', text: '#7a6000' };
    return         { bg: '#e6f9f3', border: '#10b981', text: '#065f46' };
  };
  const s = getStyle(mag);
  return (
    <Chip
      label={mag ?? '—'}
      size="small"
      sx={{
        height: 22, fontSize: '0.75rem', fontWeight: 900,
        fontFamily: '"Fredoka", sans-serif',
        bgcolor: s.bg, color: s.text,
        border: `1.5px solid ${s.border}`,
        minWidth: 44, borderRadius: '8px',
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
};

/* ── Status chip ─────────────────────────────────────────────── */
const StatusChip = ({ status, isDark }) => {
  const isReviewed = status === 'reviewed';
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        height: 22, fontSize: '0.68rem', fontWeight: 800,
        fontFamily: '"Fredoka", sans-serif',
        textTransform: 'capitalize', letterSpacing: '0.02em',
        bgcolor: isReviewed
          ? (isDark ? '#162a26' : '#e6f9f3')
          : (isDark ? '#2e2a1e' : '#fff4d2'),
        color: isReviewed
          ? (isDark ? '#34d399' : '#065f46')
          : (isDark ? '#fbbf24' : '#92680a'),
        border: isReviewed
          ? `1.5px solid ${isDark ? '#10b981' : '#10b981'}`
          : `1.5px solid ${isDark ? '#fbbf24' : '#fbbf24'}`,
        borderRadius: '8px',
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
};

/* ── Main table ─────────────────────────────────────────────── */
const EarthquakeTable = ({
  earthquakes, page, limit, total, onPageChange, onLimitChange,
  onView, onEdit, onDelete, loading,
}) => {
  const user   = useSelector((state) => state.auth.user);
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const canEdit = ['admin', 'moderator'].includes(user?.role?.trim());

  const borderColor = isDark ? '#ffffff' : '#0f172a';
  const shadowColor = isDark ? '#ffffff' : '#0f172a';
  const headBg      = isDark ? '#1a1f35' : '#fff4d2';

  return (
    <Box
      sx={{
        overflow: 'hidden',
        borderRadius: '20px',
        border: `2.5px solid ${borderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
        background: isDark ? '#161a2b' : '#ffffff',
        width: '100%',
      }}
    >
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          '&::-webkit-scrollbar': { width: '4px', height: '4px' },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
            borderRadius: '4px',
          },
        }}
      >
        <Table sx={{ minWidth: { xs: '100%', md: 650 } }}>
          <TableHead>
            <TableRow>
              {[
                { label: 'Date & Time', hide: false,                  align: 'left'   },
                { label: 'Location',    hide: false,                  align: 'left'   },
                { label: 'Magnitude',   hide: false,                  align: 'right'  },
                { label: 'Depth',       hide: { xs: true, sm: false }, align: 'right' },
                { label: 'Type',        hide: { xs: true, md: false }, align: 'left'  },
                { label: 'Status',      hide: { xs: true, md: false }, align: 'left'  },
                { label: 'Actions',     hide: false,                  align: 'center' },
              ].map(({ label, hide, align }) => (
                <TableCell
                  key={label}
                  align={align}
                  sx={{
                    fontWeight: 800, py: 1.6, fontSize: '0.7rem', letterSpacing: '0.07em',
                    textTransform: 'uppercase', fontFamily: '"Fredoka", sans-serif',
                    bgcolor: headBg, backgroundImage: 'none',
                    color: isDark ? '#ffffff' : '#0f172a',
                    borderBottom: `2px solid ${borderColor}`,
                    display: hide === true ? 'none'
                      : hide ? { xs: 'none', ...Object.fromEntries(Object.entries(hide).filter(([k]) => k !== 'xs')) }
                      : 'table-cell',
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
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fffbf0',
                  },
                }}
              >
                {/* Date & Time */}
                <TableCell sx={{ py: 1.6, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', color: 'text.primary', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                    {new Date(eq.time).toLocaleDateString()}
                  </Typography>
                  <Typography sx={{ fontSize: '0.68rem', fontFamily: '"Quicksand", sans-serif', color: 'text.secondary', lineHeight: 1, whiteSpace: 'nowrap', fontWeight: 600 }}>
                    {new Date(eq.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </TableCell>

                {/* Location */}
                <TableCell sx={{ py: 1.6, maxWidth: { xs: 120, sm: 200, md: 300 }, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <TerrainIcon sx={{ fontSize: 14, color: '#ff5e7e', flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {eq.place}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Magnitude */}
                <TableCell align="right" sx={{ py: 1.6, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                  <MagBadge mag={eq.mag} />
                </TableCell>

                {/* Depth */}
                <TableCell align="right" sx={{ py: 1.6, display: { xs: 'none', sm: 'table-cell' }, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', color: 'text.secondary' }}>
                    {eq.depth} <Box component="span" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>km</Box>
                  </Typography>
                </TableCell>

                {/* Type */}
                <TableCell sx={{ py: 1.6, display: { xs: 'none', md: 'table-cell' }, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', color: 'text.secondary', textTransform: 'capitalize' }}>
                    {eq.type}
                  </Typography>
                </TableCell>

                {/* Status */}
                <TableCell sx={{ py: 1.6, display: { xs: 'none', md: 'table-cell' }, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                  <StatusChip status={eq.status} isDark={isDark} />
                </TableCell>

                {/* Actions */}
                <TableCell align="center" sx={{ py: 1.6, whiteSpace: 'nowrap', borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      onClick={() => onView(eq._id)}
                      sx={{
                        color: '#3b82f6',
                        border: '1.5px solid #3b82f6',
                        borderRadius: '8px',
                        p: 0.5,
                        mr: 0.5,
                        '&:hover': { bgcolor: '#e6f0ff', transform: 'translate(-1px,-1px)' },
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <ViewIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                  {canEdit && (
                    <>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(eq._id)}
                          sx={{
                            color: '#f59e0b',
                            border: '1.5px solid #f59e0b',
                            borderRadius: '8px',
                            p: 0.5,
                            mr: 0.5,
                            '&:hover': { bgcolor: '#fff4d2', transform: 'translate(-1px,-1px)' },
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <EditIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(eq._id)}
                          sx={{
                            color: '#ff5e7e',
                            border: '1.5px solid #ff5e7e',
                            borderRadius: '8px',
                            p: 0.5,
                            '&:hover': { bgcolor: '#ffecf0', transform: 'translate(-1px,-1px)' },
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {earthquakes.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography sx={{
                    fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
                    fontSize: '1rem', color: 'text.secondary',
                  }}>
                    {loading ? '🔄 Loading earthquakes…' : '🔍 No earthquakes found'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Pagination ─────────────────────────────────────────── */}
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        onPageChange={(e, p) => onPageChange(p + 1)}
        rowsPerPage={limit}
        onRowsPerPageChange={(e) => onLimitChange(parseInt(e.target.value))}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          borderTop: `2px solid ${borderColor}`,
          fontFamily: '"Quicksand", sans-serif',
          '& .MuiTablePagination-toolbar': { px: { xs: 1, sm: 2 } },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': {
            display: { xs: 'none', sm: 'inline-flex' },
            fontWeight: 700,
            fontFamily: '"Quicksand", sans-serif',
          },
          '& .MuiTablePagination-displayedRows': {
            fontWeight: 700,
            fontSize: '0.82rem',
            fontFamily: '"Quicksand", sans-serif',
          },
          '& .MuiSelect-select': {
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 700,
          },
          '& .MuiIconButton-root': {
            border: `1.5px solid ${borderColor}`,
            borderRadius: '8px',
            mx: 0.3,
            p: 0.5,
            '&:hover': {
              bgcolor: isDark ? '#2e1b23' : '#ffecf0',
              transform: 'translate(-1px,-1px)',
            },
            '&.Mui-disabled': {
              border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
            },
            transition: 'all 0.15s ease',
          },
        }}
      />
    </Box>
  );
};

export default EarthquakeTable;
