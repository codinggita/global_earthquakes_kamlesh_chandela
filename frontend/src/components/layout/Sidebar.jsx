import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Drawer, Box, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DashboardIcon      from '@mui/icons-material/Dashboard';
import TerrainIcon        from '@mui/icons-material/Terrain';
import AnalyticsIcon      from '@mui/icons-material/Analytics';
import BarChartIcon       from '@mui/icons-material/BarChart';
import SearchIcon         from '@mui/icons-material/Search';
import PeopleIcon         from '@mui/icons-material/People';
import AdminIcon          from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon        from '@mui/icons-material/History';
import PersonIcon         from '@mui/icons-material/Person';
import TuneIcon           from '@mui/icons-material/Tune';

const SIDEBAR_WIDTH = 256;

const NAV_SECTIONS = [
  {
    label: 'Monitoring',
    items: [
      { text: 'Dashboard',   icon: DashboardIcon,  path: '/dashboard' },
      { text: 'Earthquakes', icon: TerrainIcon,     path: '/earthquakes' },
      { text: 'Analytics',   icon: AnalyticsIcon,   path: '/analytics' },
      { text: 'Statistics',  icon: BarChartIcon,    path: '/statistics' },
      { text: 'Search',      icon: SearchIcon,      path: '/search' },
    ],
  },
  {
    label: 'Account',
    items: [
      { text: 'My Profile', icon: PersonIcon, path: '/profile' },
      { text: 'Settings',   icon: TuneIcon,   path: '/settings' },
    ],
  },
];

const ADMIN_SECTION = {
  label: 'Administration',
  items: [
    { text: 'Admin Center',    icon: AdminIcon,   path: '/admin/dashboard' },
    { text: 'User Management', icon: PeopleIcon,  path: '/admin/users' },
    { text: 'Audit Logs',      icon: HistoryIcon, path: '/admin/audit-logs' },
  ],
};

const Sidebar = ({ open, onClose }) => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const theme      = useTheme();
  const user       = useSelector((s) => s.auth.user);
  const isAdmin    = user?.role === 'admin';
  const isDark     = theme.palette.mode === 'dark';

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const sections = isAdmin ? [ADMIN_SECTION, ...NAV_SECTIONS] : NAV_SECTIONS;

  const paperStyles = {
    width: SIDEBAR_WIDTH,
    background: isDark ? '#161a2b' : '#ffffff',
    border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
    borderRadius: '24px',
    boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
    height: { xs: '100vh', md: 'calc(100vh - 32px)' },
    m: { xs: 0, md: 2 },
    overflowX: 'hidden',
    backgroundImage: 'none',
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', position: 'relative' }}>

      {/* ── Logo ─────────────────────────────────────────────── */}
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          {/* Icon */}
          <Box
            sx={{
              width: 38, height: 38, borderRadius: '12px', flexShrink: 0,
              background: '#ff5e7e',
              border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
              boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <TerrainIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>

          {/* Brand name */}
          <Box>
            <Typography
              sx={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em',
                color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1.1,
              }}
            >
              Seismic<span style={{ color: '#ff5e7e' }}>Pro</span>
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Quicksand", sans-serif',
                fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                color: isDark ? '#9ca3af' : '#475569', fontWeight: 800, mt: 0.1,
              }}
            >
              Monitor System
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Top divider ─────────────────────────────────────── */}
      <Box sx={{ mx: 2, height: '2px', bgcolor: isDark ? '#ffffff' : '#0f172a', mb: 1 }} />

      {/* ── Navigation ──────────────────────────────────────── */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden', 
          pb: 0.5,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? '#ffffff' : '#0f172a',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#ff5e7e',
          },
        }}
      >
        {sections.map((section, sIdx) => (
          <Box key={sIdx} sx={{ mb: 0.5 }}>
            {/* Section label */}
            <Typography
              sx={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em',
                textTransform: 'uppercase', px: 2.5,
                pt: sIdx === 0 ? 0.8 : 1.5, pb: 0.6,
                color: isDark ? '#9ca3af' : '#475569',
              }}
            >
              {section.label}
            </Typography>

            {/* Items */}
            {section.items.map((item) => {
              const active = isActive(item.path);
              const Icon   = item.icon;
              return (
                <Box key={item.path} sx={{ px: 1.5, mb: 0.5, position: 'relative' }}>
                  {item.text === 'Audit Logs' && (
                    <Box sx={{ position: 'absolute', right: 26, top: 11, zIndex: 10, pointerEvents: 'none' }} className="float-slow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
                      </svg>
                    </Box>
                  )}
                  {item.text === 'Settings' && (
                    <Box sx={{ position: 'absolute', right: 26, top: 11, zIndex: 10, pointerEvents: 'none' }} className="float-medium">
                      <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
                        <path d="M5 25C10 20 10 10 15 15C20 20 20 5 25 10" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
                      </svg>
                    </Box>
                  )}
                  <Box
                    onClick={() => { navigate(item.path); onClose?.(); }}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 0,
                      borderRadius: '14px', py: 1.2, px: 1.4,
                      cursor: 'pointer', position: 'relative', overflow: 'hidden',
                      transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      background: active
                        ? (isDark ? '#2e1b23' : '#ffecf0')
                        : 'transparent',
                      border: active
                        ? (isDark ? '2px solid #ffffff' : '2px solid #0f172a')
                        : '2px solid transparent',
                      boxShadow: active
                        ? (isDark ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a')
                        : 'none',
                      '&:hover': {
                        background: active
                          ? (isDark ? '#2e1b23' : '#ffecf0')
                          : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'),
                        border: active
                          ? (isDark ? '2px solid #ffffff' : '2px solid #0f172a')
                          : (isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(15,23,42,0.15)'),
                        transform: 'translateY(-2px)',
                        boxShadow: active
                          ? (isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a')
                          : (isDark ? '2px 2px 0px 0px rgba(255,255,255,0.1)' : '2px 2px 0px 0px rgba(15,23,42,0.15)'),
                      },
                      '&:hover .nav-icon': {
                        transform: 'scale(1.15)',
                        color: active ? '#ff5e7e' : (isDark ? '#ffffff' : '#0f172a'),
                      },
                      '&:hover .nav-text': {
                        color: active ? '#ff5e7e' : (isDark ? '#ffffff' : '#0f172a'),
                      }
                    }}
                  >
                    {/* Icon */}
                    <Box
                      className="nav-icon"
                      sx={{
                        minWidth: 32, display: 'flex', alignItems: 'center',
                        color: active
                          ? '#ff5e7e'
                          : (isDark ? '#9ca3af' : '#475569'),
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>

                    {/* Label */}
                    <Typography
                      className="nav-text"
                      sx={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontSize: '0.94rem', letterSpacing: '-0.015em',
                        fontWeight: 800,
                        color: active
                          ? (isDark ? '#ffffff' : '#0f172a')
                          : (isDark ? '#9ca3af' : '#475569'),
                        transition: 'all 0.18s ease', lineHeight: 1.2,
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* ── Bottom divider ──────────────────────────────────── */}
      <Box sx={{ mx: 2, height: '2px', bgcolor: isDark ? '#ffffff' : '#0f172a', mt: 0.5 }} />

      {/* ── User Card ───────────────────────────────────────── */}
      <Box sx={{ px: 2, pb: 3, pt: 2, position: 'relative' }}>
        {/* Floating decoration in the background */}
        <Box sx={{ position: 'absolute', right: 20, top: -10, zIndex: 5, pointerEvents: 'none' }} className="float-fast">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="#ff5e7e" stroke="#0f172a" strokeWidth="2" />
          </svg>
        </Box>

        <Box
          onClick={() => navigate('/profile')}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            p: 1.2, borderRadius: '16px', cursor: 'pointer',
            background: isDark ? 'rgba(255,255,255,0.03)' : '#fffdf8',
            border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
            boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
            transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
            },
          }}
        >
          <Avatar
            sx={{
              width: 32, height: 32, fontSize: '0.78rem', fontWeight: 800, flexShrink: 0,
              background: user?.role === 'admin'
                ? 'linear-gradient(135deg, #ff5e7e, #fbbf24)'
                : 'linear-gradient(135deg, #3b82f6, #10b981)',
              border: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a',
            }}
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography noWrap sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.8rem', fontWeight: 800, lineHeight: 1.3, color: isDark ? '#ffffff' : '#0f172a' }}>
              {user?.name || 'User'}
            </Typography>
            <Typography noWrap sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.65rem', lineHeight: 1, color: isDark ? '#9ca3af' : '#475569', fontWeight: 700, mt: 0.1, textTransform: 'capitalize' }}>
              {user?.role || 'Member'}
            </Typography>
          </Box>
          {/* Online dot */}
          <Box
            sx={{
              width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981',
              border: isDark ? '1px solid #ffffff' : '1px solid #0f172a',
              flexShrink: 0, boxShadow: '0 0 6px rgba(16,185,129,0.5)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            ...paperStyles,
            width: SIDEBAR_WIDTH,
            m: 0,
            borderRadius: 0,
            border: 'none',
            borderRight: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            height: '100vh',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          width: SIDEBAR_WIDTH + 32, flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            ...paperStyles, 
            position: 'fixed',
            left: 0,
            top: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
