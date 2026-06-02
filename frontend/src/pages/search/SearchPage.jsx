import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, InputAdornment, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Chip, TablePagination, useTheme,
} from '@mui/material';
import SearchIcon    from '@mui/icons-material/Search';
import TerrainIcon   from '@mui/icons-material/Terrain';
import { useDebounce }       from '../../hooks/useDebounce';
import api                   from '../../services/api';
import { getMagnitudeColor, formatDate } from '../../utils/helpers';
import Loader                from '../../components/common/Loader';

/* Magnitude badge with colour-coded background (no MUI colour prop) */
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

const SearchPage = () => {
  const navigate = useNavigate();
  const theme    = useTheme();
  const isDark   = theme.palette.mode === 'dark';

  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [limit]               = useState(20);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const res = await api.get('/search/earthquakes', { params: { q: debouncedQuery, page, limit } });
        setResults(res.data.data || []);
        setTotal(res.data.pagination?.total || 0);
      } catch (err) {
        console.error('Search failed:', err);
        setResults([]);
      }
      setLoading(false);
    };
    search();
  }, [debouncedQuery, page, limit]);

  return (
    <Box sx={{ p: 0 }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <SearchIcon color="primary" sx={{ fontSize: 16 }} />
          <Typography variant="overline" fontWeight="900" color="primary" sx={{ letterSpacing: 1.5, lineHeight: 1 }}>
            DATABASE SEARCH
          </Typography>
        </Box>
        <Typography
          sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: { xs: '1.5rem', sm: '1.8rem' }, letterSpacing: '-0.03em', color: 'text.primary', lineHeight: 1.1 }}
        >
          Find Seismic Events
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500, mt: 0.4 }}>
          Search by location, country, network, or magnitude type
        </Typography>
      </Box>

      {/* ── Search field ────────────────────────────────────── */}
      <TextField
        fullWidth
        placeholder="e.g. Japan, Pacific, M 6.5, Indonesia…"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: isDark ? '#475569' : '#94a3b8', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            fontSize: '0.92rem',
            background: isDark ? 'rgba(10,16,30,0.94)' : 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(12px)',
            '& fieldset': {
              borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
            },
            '&:hover fieldset': {
              borderColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.16)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ef4444',
              borderWidth: '1.5px',
            },
          },
        }}
      />

      {/* ── Loading ─────────────────────────────────────────── */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <Loader />
        </Box>
      )}

      {/* ── Results header ──────────────────────────────────── */}
      {!loading && results.length > 0 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.primary' }}>
              {debouncedQuery
                ? <>Results for <Box component="span" sx={{ color: '#ef4444' }}>"{debouncedQuery}"</Box></>
                : 'All Earthquakes — Latest First'}
            </Typography>
            <Chip
              label={`${total.toLocaleString()} records`}
              size="small"
              sx={{ height: 22, fontSize: '0.68rem', fontWeight: 800, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', color: 'text.secondary', '& .MuiChip-label': { px: 1 } }}
            />
          </Box>

          {/* ── Table ───────────────────────────────────────── */}
          <Paper
            sx={{
              overflow: 'hidden',
              background: isDark ? 'rgba(17,24,39,0.65)' : 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(20px)',
              border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(148,163,184,0.12)',
              borderRadius: '16px',
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
                    {[
                      { label: 'Date & Time',  hide: false },
                      { label: 'Location',     hide: false },
                      { label: 'Magnitude',    hide: false },
                      { label: 'Depth',        hide: { xs: true, sm: false } },
                      { label: 'Status',       hide: { xs: true, md: false } },
                    ].map(({ label, hide }) => (
                      <TableCell
                        key={label}
                        sx={{
                          fontWeight: 800, py: 2, fontSize: '0.7rem', letterSpacing: '0.06em',
                          textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif',
                          bgcolor: isDark ? '#08101f' : '#f8fafc', backgroundImage: 'none',
                          display: hide === true ? 'none' : hide ? { xs: 'none', ...Object.fromEntries(Object.entries(hide).filter(([k]) => k !== 'xs')) } : 'table-cell',
                        }}
                      >
                        {label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((eq) => (
                    <TableRow
                      key={eq._id}
                      hover
                      onClick={() => navigate('/earthquakes/' + eq._id)}
                      sx={{
                        cursor: 'pointer',
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
                      <TableCell sx={{ py: 1.6, maxWidth: { xs: 120, sm: 220, md: 320 }, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <TerrainIcon sx={{ fontSize: 14, color: isDark ? '#3f5068' : '#9ca3af', flexShrink: 0 }} />
                          <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {eq.place}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Magnitude */}
                      <TableCell sx={{ py: 1.6, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                        <MagBadge mag={eq.mag} />
                      </TableCell>

                      {/* Depth */}
                      <TableCell sx={{ py: 1.6, display: { xs: 'none', sm: 'table-cell' }, borderBottom: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'text.secondary', fontFamily: '"Outfit", sans-serif' }}>
                          {eq.depth} <Box component="span" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>km</Box>
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
                            bgcolor: eq.status === 'reviewed'
                              ? 'rgba(16,185,129,0.10)' : 'rgba(245,158,11,0.10)',
                            color: eq.status === 'reviewed'
                              ? (isDark ? '#34d399' : '#059669') : (isDark ? '#fbbf24' : '#d97706'),
                            border: eq.status === 'reviewed'
                              ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(245,158,11,0.25)',
                            '& .MuiChip-label': { px: 1 },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
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
        </>
      )}

      {/* ── Empty state ─────────────────────────────────────── */}
      {debouncedQuery && !loading && results.length === 0 && (
        <Box
          sx={{
            textAlign: 'center', py: 10, px: 4,
            borderRadius: '16px',
            background: isDark ? 'rgba(10,16,30,0.5)' : 'rgba(248,250,252,0.8)',
            border: isDark ? '1px dashed rgba(255,255,255,0.07)' : '1px dashed rgba(0,0,0,0.1)',
          }}
        >
          <SearchIcon sx={{ fontSize: 40, color: isDark ? '#2d3f55' : '#cbd5e1', mb: 2 }} />
          <Typography sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
            No results for "{debouncedQuery}"
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', fontWeight: 500 }}>
            Try a different keyword, place name, or region
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
