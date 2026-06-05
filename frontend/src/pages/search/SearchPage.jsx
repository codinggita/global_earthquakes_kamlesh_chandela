import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Chip, TablePagination, useTheme,
} from '@mui/material';
import SearchIcon  from '@mui/icons-material/Search';
import TerrainIcon from '@mui/icons-material/Terrain';
import { useDebounce }     from '../../hooks/useDebounce';
import api                 from '../../services/api';
import Loader              from '../../components/common/Loader';

/* ── Magnitude badge — solid pastel Neubrutalist ───────────── */
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
        borderRadius: '8px', minWidth: 44,
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
        border: isReviewed ? '1.5px solid #10b981' : '1.5px solid #fbbf24',
        borderRadius: '8px',
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
};

/* ── Main page ──────────────────────────────────────────────── */
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
  const debouncedQuery        = useDebounce(query, 500);

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

  const borderColor = isDark ? '#ffffff' : '#0f172a';
  const shadowColor = isDark ? '#ffffff' : '#0f172a';

  return (
    <Box sx={{ p: 0 }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{
            p: 0.6, borderRadius: '8px',
            background: isDark ? '#2e1b23' : '#ffecf0',
            color: '#ff5e7e',
            border: '1.5px solid #ff5e7e',
            display: 'flex', alignItems: 'center',
          }}>
            <SearchIcon sx={{ fontSize: 14 }} />
          </Box>
          <Typography sx={{
            fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
            fontSize: '0.72rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#ff5e7e',
          }}>
            DATABASE SEARCH
          </Typography>
        </Box>

        <Typography sx={{
          fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
          fontSize: { xs: '1.5rem', sm: '1.8rem' },
          letterSpacing: '-0.02em', color: 'text.primary', lineHeight: 1.1,
        }}>
          Find Seismic Events
        </Typography>
        <Typography sx={{
          fontSize: '0.82rem', color: 'text.secondary',
          fontWeight: 700, fontFamily: '"Quicksand", sans-serif', mt: 0.4,
        }}>
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
              <SearchIcon sx={{ color: '#ff5e7e', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            fontSize: '0.95rem',
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 700,
            background: isDark ? '#161a2b' : '#ffffff',
            '& fieldset': {
              borderColor: borderColor,
              borderWidth: '2.5px',
            },
            '&:hover fieldset': {
              borderColor: '#ff5e7e',
              borderWidth: '2.5px',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff5e7e',
              borderWidth: '2.5px',
              boxShadow: `3px 3px 0px 0px #ff5e7e`,
            },
            transition: 'all 0.18s ease',
          },
        }}
      />

      {/* ── Loading ─────────────────────────────────────────── */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <Loader />
        </Box>
      )}

      {/* ── Results table ───────────────────────────────────── */}
      {!loading && results.length > 0 && (
        <>
          {/* Results header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{
              fontSize: '0.88rem', fontWeight: 800,
              fontFamily: '"Quicksand", sans-serif', color: 'text.primary',
            }}>
              {debouncedQuery
                ? <><span>Results for </span><Box component="span" sx={{ color: '#ff5e7e' }}>"{debouncedQuery}"</Box></>
                : 'All Earthquakes — Latest First'}
            </Typography>
            <Chip
              label={`${total.toLocaleString()} records`}
              size="small"
              sx={{
                height: 24, fontSize: '0.72rem', fontWeight: 800,
                fontFamily: '"Fredoka", sans-serif',
                bgcolor: isDark ? '#2e1b23' : '#ffecf0',
                color: '#ff5e7e',
                border: '1.5px solid #ff5e7e',
                borderRadius: '8px',
                '& .MuiChip-label': { px: 1.2 },
              }}
            />
          </Box>

          {/* Neubrutalist table container */}
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: '20px',
              border: `2.5px solid ${borderColor}`,
              boxShadow: `4px 4px 0px 0px ${shadowColor}`,
              background: isDark ? '#161a2b' : '#ffffff',
            }}
          >
            <TableContainer
              sx={{
                '&::-webkit-scrollbar': { width: '4px', height: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                  borderRadius: '4px',
                },
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      { label: 'Date & Time', hide: false },
                      { label: 'Location',    hide: false },
                      { label: 'Magnitude',   hide: false },
                      { label: 'Depth',       hide: { xs: true, sm: false } },
                      { label: 'Status',      hide: { xs: true, md: false } },
                    ].map(({ label, hide }) => (
                      <TableCell
                        key={label}
                        sx={{
                          fontWeight: 800, py: 1.6, fontSize: '0.7rem',
                          letterSpacing: '0.07em', textTransform: 'uppercase',
                          fontFamily: '"Fredoka", sans-serif',
                          bgcolor: isDark ? '#1a1f35' : '#fff4d2',
                          backgroundImage: 'none',
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
                  {results.map((eq) => (
                    <TableRow
                      key={eq._id}
                      hover
                      onClick={() => navigate('/earthquakes/' + eq._id)}
                      sx={{
                        cursor: 'pointer',
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
                      <TableCell sx={{ py: 1.6, maxWidth: { xs: 120, sm: 220, md: 320 }, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <TerrainIcon sx={{ fontSize: 14, color: '#ff5e7e', flexShrink: 0 }} />
                          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {eq.place}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Magnitude */}
                      <TableCell sx={{ py: 1.6, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                        <MagBadge mag={eq.mag} />
                      </TableCell>

                      {/* Depth */}
                      <TableCell sx={{ py: 1.6, display: { xs: 'none', sm: 'table-cell' }, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', color: 'text.secondary' }}>
                          {eq.depth} <Box component="span" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>km</Box>
                        </Typography>
                      </TableCell>

                      {/* Status */}
                      <TableCell sx={{ py: 1.6, display: { xs: 'none', md: 'table-cell' }, borderBottom: isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.07)' }}>
                        <StatusChip status={eq.status} isDark={isDark} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Neubrutal pagination */}
            <TablePagination
              component="div"
              count={total}
              page={page - 1}
              onPageChange={(e, p) => setPage(p + 1)}
              rowsPerPage={limit}
              rowsPerPageOptions={[limit]}
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
                  fontWeight: 700, fontSize: '0.82rem',
                  fontFamily: '"Quicksand", sans-serif',
                },
                '& .MuiIconButton-root': {
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: '8px', mx: 0.3, p: 0.5,
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
        </>
      )}

      {/* ── Empty / initial state ────────────────────────────── */}
      {!loading && results.length === 0 && (
        <Box
          sx={{
            textAlign: 'center', py: 10, px: 4,
            borderRadius: '20px',
            background: isDark ? '#161a2b' : '#fffbf0',
            border: `2.5px solid ${borderColor}`,
            boxShadow: `4px 4px 0px 0px ${shadowColor}`,
          }}
        >
          <Typography sx={{ fontSize: '3rem', mb: 1.5, lineHeight: 1 }}>
            🔍
          </Typography>
          <Typography sx={{
            fontFamily: '"Fredoka", sans-serif', fontWeight: 800,
            fontSize: '1.2rem', color: 'text.primary', mb: 0.5,
          }}>
            {debouncedQuery ? `No results for "${debouncedQuery}"` : 'Start searching!'}
          </Typography>
          <Typography sx={{
            fontSize: '0.85rem', color: 'text.secondary',
            fontWeight: 700, fontFamily: '"Quicksand", sans-serif',
          }}>
            {debouncedQuery
              ? 'Try a different keyword, place name, or region'
              : 'Type a location, country, or event name above'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
