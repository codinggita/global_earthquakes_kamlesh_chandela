import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, 
  Chip, IconButton, Tooltip, Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, Divider 
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import api from '../../services/api';

const ActionChip = ({ action }) => {
  const colors = {
    CREATE: 'success',
    UPDATE: 'warning',
    DELETE: 'error',
    LOGIN: 'info',
    LOGOUT: 'default',
    EXPORT: 'secondary',
    READ: 'primary'
  };
  return <Chip label={action} color={colors[action] || 'default'} size="small" sx={{ fontWeight: '600', minWidth: 80 }} />;
};

const AuditLogs = () => {
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
    <Box sx={{ p: 1 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', display: 'flex' }}>
          <HistoryIcon sx={{ color: 'white' }} />
        </Box>
        <Typography variant="h4" fontWeight="800" sx={{ color: 'text.primary' }}>Audit Logs</Typography>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '70vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ACTION</TableCell>
                <TableCell>RESOURCE</TableCell>
                <TableCell>PERFORMED BY</TableCell>
                <TableCell>TIMESTAMP</TableCell>
                <TableCell align="center">DETAILS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell><ActionChip action={log.action} /></TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary' }}>{log.resource}</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>ID: {log.resourceId || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">{log.userId?.name || 'System'}</Typography>
                    <Typography variant="caption" color="textSecondary">{log.userId?.email || '-'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{new Date(log.timestamp).toLocaleDateString()}</Typography>
                    <Typography variant="caption" color="textSecondary">{new Date(log.timestamp).toLocaleTimeString()}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View JSON Details">
                      <IconButton color="primary" size="small" onClick={() => setSelectedLog(log)}>
                        <InfoIcon />
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
          sx={{ borderTop: '1px solid rgba(148, 163, 184, 0.08)' }}
        />
      </Paper>

      <Dialog open={!!selectedLog} onClose={() => setSelectedLog(null)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4, bgcolor: '#111827', border: '1px solid rgba(148, 163, 184, 0.08)' } }}>
        <DialogTitle sx={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: 1, color: '#f1f5f9' }}>
          <InfoIcon color="primary" /> Log Details
        </DialogTitle>
        <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.08)' }} />
        <DialogContent sx={{ bgcolor: '#0b0f1a' }}>
          {selectedLog && (
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">Summary</Typography>
              <Typography variant="body2" gutterBottom sx={{ color: '#e2e8f0' }}><b>Action:</b> {selectedLog.action}</Typography>
              <Typography variant="body2" gutterBottom sx={{ color: '#e2e8f0' }}><b>Resource:</b> {selectedLog.resource}</Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#94a3b8' }}><b>Time:</b> {new Date(selectedLog.timestamp).toLocaleString()}</Typography>
              
              <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">Raw Payload Data</Typography>
              <Paper sx={{ p: 2, bgcolor: '#1e293b', color: '#38bdf8', borderRadius: 2, overflowX: 'auto', border: '1px solid rgba(148, 163, 184, 0.08)' }}>
                <pre style={{ margin: 0, fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#0b0f1a' }}>
          <Button onClick={() => setSelectedLog(null)} variant="contained" sx={{ borderRadius: 2, px: 4 }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuditLogs;

