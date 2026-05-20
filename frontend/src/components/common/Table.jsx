import React from 'react';
import {
  Table as MuiTable, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, TableSortLabel, Box, Typography
} from '@mui/material';

const Table = ({
  columns, data, page, rowsPerPage, total, onPageChange, onRowsPerPageChange,
  sortBy, sortOrder, onSort, loading, emptyMessage = 'No data available',
  onRowClick, rowKey = '_id'
}) => {
  return (
    <Paper>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={col.align || 'left'}
                  sx={{ fontWeight: 'bold', minWidth: col.minWidth, ...col.sx }}
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortBy === col.field}
                      direction={sortBy === col.field ? sortOrder : 'asc'}
                      onClick={() => onSort?.(col.field)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row[rowKey]}
                hover
                onClick={() => onRowClick?.(row)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((col) => (
                  <TableCell key={col.field} align={col.align || 'left'}>
                    {col.render ? col.render(row) : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    {loading ? 'Loading...' : emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};

export default Table;
