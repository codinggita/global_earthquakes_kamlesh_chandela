import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TablePagination, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../hooks/useDebounce';
import api from '../../services/api';
import { getMagnitudeColor, formatDate } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // We now fetch even if debouncedQuery is empty to show "all data"
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800">Search Earthquakes</Typography>
        <Typography variant="body2" color="textSecondary">Search through the entire seismic database by any keyword</Typography>
      </Box>

      <TextField 
        fullWidth 
        placeholder="Type to search (place, country, network, mag type...)" 
        value={query} 
        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
        InputProps={{ 
          startAdornment: <InputAdornment position="start"><SearchIcon color="primary" /></InputAdornment> 
        }} 
        sx={{ 
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: 'background.paper',
          }
        }} 
      />

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><Loader /></Box>}
      
      {!loading && results.length > 0 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="600">
              {debouncedQuery ? `Results for "${debouncedQuery}"` : 'All Earthquakes (Latest First)'}
            </Typography>
            <Typography variant="body2" color="text.secondary">Found {total} records</Typography>
          </Box>
          
          <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid rgba(148, 163, 184, 0.08)', width: '100%', overflowX: 'auto' }}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '700', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Time (Latest First)</TableCell>
                  <TableCell sx={{ fontWeight: '700', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Place</TableCell>
                  <TableCell align="right" sx={{ fontWeight: '700', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Mag</TableCell>
                  <TableCell align="right" sx={{ fontWeight: '700', display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Depth</TableCell>
                  <TableCell sx={{ fontWeight: '700', display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((eq) => (
                  <TableRow key={eq._id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate('/earthquakes/' + eq._id)}>
                    <TableCell sx={{ py: 1.5, fontSize: { xs: '0.7rem', sm: '0.8rem' }, whiteSpace: 'nowrap' }}>{formatDate(eq.time)}</TableCell>
                    <TableCell sx={{ fontWeight: '500', maxWidth: { xs: 120, sm: 200, md: 300 }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{eq.place}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={eq.mag} 
                        color={getMagnitudeColor(eq.mag)} 
                        size="small" 
                        sx={{ fontWeight: 'bold', width: 42, height: 20, fontSize: '0.7rem' }} 
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' }, color: 'text.secondary', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{eq.depth} km</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Chip 
                        label={eq.status} 
                        size="small" 
                        variant="outlined"
                        color={eq.status === 'reviewed' ? 'success' : 'warning'} 
                        sx={{ textTransform: 'capitalize', height: 18, fontSize: '0.65rem' }}
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
            sx={{ mt: 1 }}
          />
        </>
      )}

      {debouncedQuery && !loading && results.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="textSecondary">No results found for "{debouncedQuery}"</Typography>
          <Typography variant="body2" color="textSecondary">Try a different keyword or location</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
