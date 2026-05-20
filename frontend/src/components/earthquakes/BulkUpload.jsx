import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const BulkUpload = ({ onUpload, loading }) => {
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
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Bulk Upload Earthquakes</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
          Select JSON File
          <input type="file" hidden accept=".json" onChange={handleFileChange} />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {file ? file.name : 'No file selected'}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleUpload} disabled={!file || loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </Box>
    </Paper>
  );
};

export default BulkUpload;
