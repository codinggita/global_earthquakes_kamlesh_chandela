import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Tooltip, TablePagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { getMagnitudeColor, formatDate } from '../../utils/helpers';

const EarthquakeTable = ({ earthquakes, page, limit, total, onPageChange, onLimitChange, onView, onEdit, onDelete, loading }) => {
  const user = useSelector((state) => state.auth.user);
  const canEdit = ['admin', 'moderator'].includes(user?.role?.trim());

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: { xs: '100%', md: 650 } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Time</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Place</TableCell>
              <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Mag</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Depth</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Type</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Status</TableCell>
              <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {earthquakes.map((eq) => (
              <TableRow key={eq._id} hover>
                <TableCell sx={{ py: 1.5, fontSize: { xs: '0.7rem', sm: '0.8rem' }, whiteSpace: 'nowrap' }}>{formatDate(eq.time)}</TableCell>
                <TableCell sx={{ maxWidth: { xs: 120, sm: 200, md: 300 }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{eq.place}</TableCell>
                <TableCell align="right"><Chip label={eq.mag} color={getMagnitudeColor(eq.mag)} size="small" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 'bold' }} /></TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' }, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{eq.depth} km</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' }, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{eq.type}</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}><Chip label={eq.status} color={eq.status === 'reviewed' ? 'success' : 'warning'} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 'bold' }} /></TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap', py: 0.5 }}>
                  <Tooltip title="View"><IconButton size="small" onClick={() => onView(eq._id)}><ViewIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                  {canEdit && (
                    <>
                      <Tooltip title="Edit"><IconButton size="small" onClick={() => onEdit(eq._id)}><EditIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => onDelete(eq._id)}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {earthquakes.length === 0 && (
              <TableRow><TableCell colSpan={7} align="center">{loading ? 'Loading...' : 'No earthquakes found'}</TableCell></TableRow>
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
          '& .MuiTablePagination-toolbar': {
            px: { xs: 1, sm: 2 },
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input': {
            display: { xs: 'none', sm: 'inline-block' }
          }
        }}
      />
    </Paper>
  );
};

export default EarthquakeTable;
