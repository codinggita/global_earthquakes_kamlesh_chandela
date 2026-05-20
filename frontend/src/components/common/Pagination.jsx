import React from 'react';
import { Box, Pagination as MuiPagination, Typography } from '@mui/material';

const Pagination = ({ page, count, onChange, showTotal = true, totalItems }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      {showTotal && totalItems !== undefined && (
        <Typography variant="body2" color="text.secondary">
          Total: {totalItems} records
        </Typography>
      )}
      <MuiPagination
        count={count}
        page={page}
        onChange={(e, p) => onChange(p)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
