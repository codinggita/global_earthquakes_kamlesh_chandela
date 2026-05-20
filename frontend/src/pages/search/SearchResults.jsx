import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { getMagnitudeColor, formatDate } from '../../utils/helpers';

const SearchResults = ({ results = [], query = '' }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Results for: "{query}"</Typography>
      {results.length === 0 ? <Typography>No results found</Typography> : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead><TableRow><TableCell>Time</TableCell><TableCell>Place</TableCell><TableCell align="right">Mag</TableCell><TableCell align="right">Depth</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
            <TableBody>{results.map((eq) => (
              <TableRow key={eq._id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate('/earthquakes/' + eq._id)}>
                <TableCell>{formatDate(eq.time)}</TableCell><TableCell>{eq.place}</TableCell>
                <TableCell align="right"><Chip label={eq.mag} color={getMagnitudeColor(eq.mag)} size="small" /></TableCell>
                <TableCell align="right">{eq.depth} km</TableCell>
                <TableCell><Chip label={eq.status} size="small" color={eq.status === 'reviewed' ? 'success' : 'warning'} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SearchResults;
