import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider, ListSubheader, Chip, Avatar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EarthquakeIcon from '@mui/icons-material/Terrain';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const SIDEBAR_WIDTH = 240;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'admin';
  const isDark = theme.palette.mode === 'dark';

  const userItems = [
    { text: 'Dashboard',  icon: <DashboardIcon  sx={{ fontSize: 19 }} />, path: '/dashboard' },
    { text: 'Earthquakes', icon: <EarthquakeIcon sx={{ fontSize: 19 }} />, path: '/earthquakes' },
    { text: 'Analytics',  icon: <AnalyticsIcon  sx={{ fontSize: 19 }} />, path: '/analytics' },
    { text: 'Statistics', icon: <BarChartIcon   sx={{ fontSize: 19 }} />, path: '/statistics' },
    { text: 'Search',     icon: <SearchIcon     sx={{ fontSize: 19 }} />, path: '/search' },
  ];

  const adminItems = [
    { text: 'Admin Center',    icon: <AdminIcon         sx={{ fontSize: 19 }} />, path: '/admin/dashboard' },
    { text: 'User Management', icon: <PeopleIcon        sx={{ fontSize: 19 }} />, path: '/admin/users' },
    { text: 'Audit Logs',      icon: <HistoryIcon       sx={{ fontSize: 19 }} />, path: '/admin/audit-logs' },
  ];

  const profileItems = [
    { text: 'My Profile', icon: <AccountCircleIcon sx={{ fontSize: 19 }} />, path: '/profile' },
    { text: 'Settings',   icon: <SettingsIcon      sx={{ fontSize: 19 }} />, path: '/settings' },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const renderList = (items, header) => (
    <List
      disablePadding
      subheader={
        <ListSubheader
          component="div"
          disableGutters
          sx={{ px: 2.5, py: 0.5 }}
        >
          {header}
        </ListSubheader>
      }
    >
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <ListItem key={item.text} disablePadding sx={{ px: 1.5, mb: 0.5 }}>
            <ListItemButton
              selected={active}
              onClick={() => { navigate(item.path); onClose?.(); }}
              sx={{
                borderRadius: '10px',
                py: 1,
                px: 1.5,
                gap: 0,
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                '&.Mui-selected': {
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(129,140,248,0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(129,140,248,0.04) 100%)',
                  borderLeft: '2px solid #818cf8',
                  paddingLeft: '10px',
                  '& .MuiListItemIcon-root': { color: '#818cf8' },
                  '& .MuiListItemText-primary': { color: active ? (isDark ? '#a5b4fc' : '#4f46e5') : (isDark ? '#94a3b8' : '#475569'), fontWeight: 700 },
                  boxShadow: isDark ? 'inset 0 0 20px rgba(99,102,241,0.08)' : 'inset 0 0 20px rgba(99,102,241,0.02)',
                },
                '&:not(.Mui-selected):hover': {
                  background: 'rgba(148,163,184,0.06)',
                  borderLeft: '2px solid rgba(148,163,184,0.2)',
                  paddingLeft: '10px',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 34,
                  color: active ? '#818cf8' : '#475569',
                  transition: 'color 0.2s',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.85rem',
                  color: active ? (isDark ? '#a5b4fc' : '#4f46e5') : (isDark ? '#94a3b8' : '#475569'),
                }}
              />
              {active && (
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#818cf8',
                    boxShadow: '0 0 8px rgba(129,140,248,0.8)',
                    flexShrink: 0,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ── Logo ────────────────────────────────── */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: '12px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.08) 100%)'
              : 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(16,185,129,0.03) 100%)',
            border: isDark ? '1px solid rgba(129,140,248,0.15)' : '1px solid rgba(129,140,248,0.18)',
            boxShadow: isDark ? '0 4px 20px rgba(99,102,241,0.12)' : '0 4px 20px rgba(99,102,241,0.05)',
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
              flexShrink: 0,
            }}
          >
            <EarthquakeIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: '0.88rem',
                letterSpacing: '-0.01em',
                color: isDark ? '#e2e8f0' : '#0f172a',
                lineHeight: 1.2,
              }}
            >
              SEISMIC<span style={{ color: '#818cf8' }}>PRO</span>
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6rem',
                color: isDark ? '#475569' : '#94a3b8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Monitor System
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: isDark ? 'rgba(148,163,184,0.06)' : 'rgba(148,163,184,0.12)', mx: 2, mb: 1 }} />

      {/* ── Navigation ──────────────────────────── */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', pb: 2 }}>
        {isAdmin && renderList(adminItems, 'ADMINISTRATION')}
        {renderList(userItems, 'MONITORING')}
        <Divider sx={{ borderColor: isDark ? 'rgba(148,163,184,0.06)' : 'rgba(148,163,184,0.12)', mx: 2, my: 1 }} />
        {renderList(profileItems, 'ACCOUNT')}
      </Box>

      {/* ── User Badge ──────────────────────────── */}
      <Box sx={{ px: 2, pb: 2.5 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: '12px',
            background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.8)',
            border: isDark ? '1px solid rgba(148, 163, 184, 0.08)' : '1px solid rgba(148, 163, 184, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '0.8rem',
              background: 'linear-gradient(135deg, #6366f1, #34d399)',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ overflow: 'hidden', flex: 1 }}>
            <Typography
              noWrap
              sx={{ fontSize: '0.8rem', fontWeight: 700, color: isDark ? '#e2e8f0' : '#0f172a', lineHeight: 1.3 }}
            >
              {user?.name || 'User'}
            </Typography>
            <Chip
              label={user?.role}
              size="small"
              sx={{
                height: 16,
                mt: 0.3,
                fontSize: '0.58rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: user?.role === 'admin'
                  ? 'rgba(99,102,241,0.2)'
                  : 'rgba(52,211,153,0.15)',
                color: user?.role === 'admin' ? '#a5b4fc' : '#6ee7b7',
                border: 'none',
                '& .MuiChip-label': { px: 1 },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer (Temporary) */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            background: isDark ? 'rgba(11, 15, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRight: isDark ? '1px solid rgba(148, 163, 184, 0.07)' : '1px solid rgba(148, 163, 184, 0.12)',
            height: '100vh',
            backgroundImage: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer (Permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            background: isDark ? 'rgba(11, 15, 26, 0.97)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: isDark ? '1px solid rgba(148, 163, 184, 0.07)' : '1px solid rgba(148, 163, 184, 0.12)',
            position: 'relative',
            height: '100vh',
            overflowX: 'hidden',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
