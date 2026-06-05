import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const BulkUpload = ({ onUpload, loading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid JSON file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const earthquakes = Array.isArray(data) ? data : [data];
        await onUpload(earthquakes);
        setFile(null);
      } catch {
        setError('Invalid JSON format');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: '20px',
        background: isDark ? '#161a2b' : '#ffffff',
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, color: 'text.primary', mb: 1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
        Bulk Upload Earthquakes
      </Typography>
      <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', mb: 3 }}>
        Select a structured JSON database file to batch-import seismic events
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{
            borderRadius: '12px',
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 800,
            borderColor: isDark ? '#ffffff' : '#0f172a',
            borderWidth: '2.5px !important',
            color: isDark ? '#ffffff' : '#0f172a',
            backgroundColor: isDark ? '#161a2b' : '#ffffff',
            boxShadow: isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
            '&:hover': {
              borderColor: '#ff5e7e',
              color: '#ff5e7e',
              boxShadow: '3px 3px 0px 0px #ff5e7e',
              transform: 'translate(-2px, -2px)',
            },
            transition: 'all 0.15s ease',
          }}
        >
          Select JSON File
          <input type="file" hidden accept=".json" onChange={handleFileChange} />
        </Button>
        <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontWeight: 700, fontSize: '0.88rem', color: 'text.secondary' }}>
          {file ? `Selected file: ${file.name}` : 'No file selected'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || loading}
          sx={{
            borderRadius: '14px',
            px: 4,
            py: 1.2,
            fontSize: '0.85rem',
            fontWeight: 800,
            fontFamily: '"Fredoka", sans-serif',
            textTransform: 'none',
            background: '#ff5e7e',
            color: '#ffffff',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
            '&:hover': {
              background: '#e03f60',
              transform: 'translate(-2px, -2px)',
              boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
            },
            '&.Mui-disabled': {
              background: isDark ? '#1f253d' : '#e2e8f0',
              color: isDark ? '#475569' : '#94a3b8',
              borderColor: isDark ? '#334155' : '#cbd5e1',
              boxShadow: 'none',
              transform: 'none',
            },
            transition: 'all 0.15s ease',
          }}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </Box>
    </Paper>
  );
};

export default BulkUpload;

