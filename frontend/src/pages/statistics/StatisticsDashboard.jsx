import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, FormControl, InputLabel, Select, MenuItem,
  useTheme, Divider, Chip,
} from '@mui/material';
import PublicIcon       from '@mui/icons-material/Public';
import TrendingUpIcon   from '@mui/icons-material/TrendingUp';
import LayersIcon       from '@mui/icons-material/Layers';
import SpeedIcon        from '@mui/icons-material/Speed';
import VerifiedIcon     from '@mui/icons-material/Verified';
import WarningIcon      from '@mui/icons-material/Warning';
import statsService     from '../../services/stats.service';
import Loader           from '../../components/common/Loader';
import api              from '../../services/api';

/* ── Neubrutalist stat card ───────────────────────────────── */
const StatBlock = ({ label, value, icon, color, cardBg, sub }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        p: 2.5, borderRadius: '20px', height: '100%',
        background: cardBg || (isDark ? '#2e1b23' : '#ffecf0'),
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
        '&:hover': {
          transform: 'translate(-3px, -3px)',
          boxShadow: isDark ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDark ? '#ffffff' : '#0f172a' }}>
          {label}
        </Typography>
        <Box sx={{ p: 0.8, borderRadius: '10px', background: '#ffffff', color, display: 'flex', border: isDark ? '2px solid #ffffff' : '2px solid #0f172a', boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a', '& .MuiSvgIcon-root': { fontSize: '16px !important' } }}>
          {icon}
        </Box>
      </Box>
      <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.04em', color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1, mb: 0.5 }}>
        {value ?? '—'}
      </Typography>
      {sub && (
        <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.68rem', color: isDark ? '#9ca3af' : '#475569', fontWeight: 700 }}>
          {sub}
        </Typography>
      )}
    </Box>
  );
};

/* ── Table section wrapper ─────────────────────────────────── */
const TableSection = ({ title, data, col1, col2, color }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        overflow: 'hidden',
        borderRadius: '20px',
        background: isDark ? '#161a2b' : '#ffffff',
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
        height: '100%',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', gap: 1, background: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7', borderBottom: isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid #0f172a' }}>
        <Box sx={{ width: 5, height: 18, borderRadius: '3px', bgcolor: color, border: isDark ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid #0f172a' }} />
        <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.95rem', color: isDark ? '#ffffff' : '#0f172a' }}>
          {title}
        </Typography>
        <Chip
          label={`${data.length} entries`}
          size="small"
          sx={{
            ml: 'auto', height: 22, fontSize: '0.62rem', fontWeight: 800,
            fontFamily: '"Fredoka", sans-serif',
            bgcolor: color === '#ff5e7e' ? '#ffecf0' : color === '#10b981' ? '#e6f9f3' : '#e6f0ff',
            color,
            border: `1.5px solid ${color}`,
            '& .MuiChip-label': { px: 1.2 }
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 360, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: '4px' } }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7', backgroundImage: 'none' }}>{col1}</TableCell>
              <TableCell align="right" sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fdfbf7', backgroundImage: 'none' }}>{col2}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} hover sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell sx={{ py: 1.2, fontSize: '0.8rem', fontWeight: 700, fontFamily: '"Quicksand", sans-serif', color: isDark ? '#ffffff' : '#0f172a', borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Rank badge */}
                    {i < 3 && (
                      <Box sx={{ width: 20, height: 20, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900, fontFamily: '"Fredoka", sans-serif', background: i === 0 ? '#fff4d2' : i === 1 ? '#f1f5f9' : '#fdf3e8', color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#b47c3c', border: i === 0 ? '1.5px solid #fbbf24' : i === 1 ? '1.5px solid #94a3b8' : '1.5px solid #b47c3c', flexShrink: 0 }}>
                        {i + 1}
                      </Box>
                    )}
                    {row._id || 'Unknown'}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ py: 1.2, borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)' }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, fontFamily: '"Fredoka", sans-serif', color }}>
                    {(row.count || 0).toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 5, color: 'text.secondary', fontSize: '0.8rem' }}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

/* ── Main page ──────────────────────────────────────────────── */
const StatisticsDashboard = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [stats,   setStats]   = useState(null);
  const [countries, setCountries] = useState([]);
  const [types,   setTypes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear,  setSelectedYear]  = useState('');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    api.get('/analytics/earthquakes/available-years').then(res => {
      if (res.data.success && res.data.data.length > 0) {
        setAvailableYears(res.data.data);
        setSelectedYear(res.data.data[0]);
      }
    }).catch(err => console.error('Error fetching available years:', err));
  }, []);

  useEffect(() => {
    if (selectedYear === null) return;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [count, highMag, deepest, avgDepth, avgMag, countryData, typeData, reviewed] = await Promise.all([
          statsService.getCount(selectedYear),
          statsService.getHighestMagnitude(selectedYear),
          statsService.getDeepest(selectedYear),
          statsService.getAverageDepth(selectedYear),
          statsService.getAverageMagnitude(selectedYear),
          statsService.getCountryCount(selectedYear),
          statsService.getTypeCount(selectedYear),
          statsService.getReviewedCount(selectedYear),
        ]);
        setStats({
          count:      count.data.total,
          highestMag: highMag.data,
          deepest:    deepest.data,
          avgDepth:   avgDepth.data.averageDepth,
          avgMag:     avgMag.data.averageMagnitude,
          reviewed:   reviewed.data.reviewedCount,
        });
        setCountries(countryData.data || []);
        setTypes(typeData.data || []);
      } catch (error) { console.error('Failed to fetch stats:', error); }
      setLoading(false);
    };
    fetchStats();
  }, [selectedYear]);

  if (loading || selectedYear === null) return <Loader />;

  const statBlocks = [
    { label: 'Total Earthquakes',   value: (stats?.count || 0).toLocaleString(),               icon: <TrendingUpIcon />, color: '#8b5cf6',  cardBg: isDark ? '#241f3b' : '#e8e5ff',  sub: `Year ${selectedYear || 'All'}` },
    { label: 'Highest Magnitude',   value: stats?.highestMag?.mag ?? 'N/A',                     icon: <WarningIcon />,    color: '#ff5e7e',  cardBg: isDark ? '#2e1b23' : '#ffecf0',  sub: stats?.highestMag?.place?.split(',').pop()?.trim() || 'Global' },
    { label: 'Average Magnitude',   value: parseFloat(stats?.avgMag || 0).toFixed(2),           icon: <SpeedIcon />,      color: '#fbbf24',  cardBg: isDark ? '#2e2a1e' : '#fff4d2',  sub: 'Mean across all events' },
    { label: 'Average Depth',       value: `${parseFloat(stats?.avgDepth || 0).toFixed(1)} km`, icon: <LayersIcon />,     color: '#3b82f6',  cardBg: isDark ? '#1e263b' : '#e6f0ff',  sub: 'Hypocentral depth' },
    { label: 'Deepest Event',       value: `${stats?.deepest?.depth ?? 0} km`,                  icon: <LayersIcon />,     color: '#0ea5e9',  cardBg: isDark ? '#162230' : '#e0f4ff',  sub: stats?.deepest?.place?.split(',').pop()?.trim() || 'Unknown' },
    { label: 'Verified Reports',    value: (stats?.reviewed || 0).toLocaleString(),             icon: <VerifiedIcon />,   color: '#10b981',  cardBg: isDark ? '#162a26' : '#e6f9f3',  sub: 'Expert-reviewed status' },
  ];

  return (
    <Box sx={{ p: 0 }}>

      {/* ── Header ──────────────────────────────────────────── */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: { xs: '1.6rem', sm: '2rem' }, letterSpacing: '-0.03em', color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1.1 }}>
            Statistics
          </Typography>
          <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.8rem', color: isDark ? '#9ca3af' : '#475569', fontWeight: 700, mt: 0.4 }}>
            Aggregated seismic metrics for {selectedYear || 'all years'}
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 150, width: { xs: '100%', sm: 'auto' } }}>
          <InputLabel sx={{ fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}>Filter by Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Filter by Year"
            sx={{ borderRadius: '12px', fontSize: '0.85rem', fontFamily: '"Quicksand", sans-serif', fontWeight: 700 }}
          >
            <MenuItem value="">All Years</MenuItem>
            {availableYears.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* ── Stat blocks ─────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 3.5 }}>
        {statBlocks.map((s, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <StatBlock {...s} />
          </Grid>
        ))}
      </Grid>

      {/* ── Tables ──────────────────────────────────────────── */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <TableSection
            title="Earthquake Activity by Region"
            data={countries}
            col1="Country / Region"
            col2="Events"
            color="#ff5e7e"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TableSection
            title="Event Type Breakdown"
            data={types}
            col1="Type"
            col2="Count"
            color="#10b981"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsDashboard;
