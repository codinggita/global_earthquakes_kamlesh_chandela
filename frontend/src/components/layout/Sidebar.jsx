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
    background: isDark ? '#040810' : '#ffffff',
    borderRight: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.07)',
    height: '100vh',
    overflowX: 'hidden',
    backgroundImage: 'none',
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ── Logo ─────────────────────────────────────────────── */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          {/* Icon */}
          <Box
            sx={{
              width: 34, height: 34, borderRadius: '8px', flexShrink: 0,
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(239,68,68,0.3)',
            }}
          >
            <TerrainIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>

          {/* Brand name */}
          <Box>
            <Typography
              sx={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800, fontSize: '0.94rem', letterSpacing: '-0.02em',
                color: isDark ? '#f1f5f9' : '#0f172a', lineHeight: 1.1,
              }}
            >
              Seismic<span style={{ color: '#ef4444' }}>Pro</span>
            </Typography>
            <Typography
              sx={{
                fontSize: '0.55rem', letterSpacing: '0.1rem', textTransform: 'uppercase',
                color: isDark ? '#475569' : '#9ca3af', fontWeight: 700, mt: 0.1,
              }}
            >
              Monitor System
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Top divider ─────────────────────────────────────── */}
      <Box sx={{ mx: 2, height: '1px', bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', mb: 0.5 }} />

      {/* ── Navigation ──────────────────────────────────────── */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden', 
          pb: 0.5,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          },
        }}
      >
        {sections.map((section, sIdx) => (
          <Box key={sIdx} sx={{ mb: 0.2 }}>
            {/* Section label */}
            <Typography
              sx={{
                fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', px: 2.5,
                pt: sIdx === 0 ? 0.8 : 1.5, pb: 0.4,
                color: isDark ? '#334155' : '#94a3b8',
              }}
            >
              {section.label}
            </Typography>

            {/* Items */}
            {section.items.map((item) => {
              const active = isActive(item.path);
              const Icon   = item.icon;
              return (
                <Box key={item.path} sx={{ px: 1.5, mb: 0.2 }}>
                  <Box
                    onClick={() => { navigate(item.path); onClose?.(); }}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 0,
                      borderRadius: '10px', py: 1.2, px: 1.4,
                      cursor: 'pointer', position: 'relative', overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      background: active
                        ? (isDark ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(249, 115, 22, 0.02) 100%)' : 'linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, rgba(249, 115, 22, 0.01) 100%)')
                        : 'transparent',
                      borderLeft: active ? '3px solid #ef4444' : '3px solid transparent',
                      '&:hover': {
                        background: active
                          ? (isDark ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(249, 115, 22, 0.04) 100%)' : 'linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(249, 115, 22, 0.02) 100%)')
                          : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                      },
                      '&:hover .nav-icon': {
                        transform: 'translateX(2px)',
                        color: active ? '#ef4444' : (isDark ? '#e2e8f0' : '#0f172a'),
                      },
                      '&:hover .nav-text': {
                        color: active ? (isDark ? '#fff' : '#000') : (isDark ? '#cbd5e1' : '#1e293b'),
                      }
                    }}
                  >
                    {/* Icon */}
                    <Box
                      className="nav-icon"
                      sx={{
                        minWidth: 32, display: 'flex', alignItems: 'center',
                        color: active
                          ? '#ef4444'
                          : (isDark ? '#475569' : '#94a3b8'),
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>

                    {/* Label */}
                    <Typography
                      className="nav-text"
                      sx={{
                        fontSize: '0.94rem', letterSpacing: '-0.015em',
                        fontWeight: active ? 600 : 500,
                        color: active
                          ? (isDark ? '#f8fafc' : '#0f172a')
                          : (isDark ? '#64748b' : '#64748b'),
                        transition: 'all 0.2s ease', lineHeight: 1.2,
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
      <Box sx={{ mx: 2.5, height: '1px', bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />

      {/* ── User Card ───────────────────────────────────────── */}
      <Box sx={{ px: 2, pb: 2, pt: 1.5 }}>
        <Box
          onClick={() => navigate('/profile')}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            p: 1, borderRadius: '12px', cursor: 'pointer',
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            border: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderColor: isDark ? 'rgba(239,68,68,0.20)' : 'rgba(239,68,68,0.15)',
            },
          }}
        >
          <Avatar
            sx={{
              width: 30, height: 30, fontSize: '0.74rem', fontWeight: 800, flexShrink: 0,
              background: user?.role === 'admin'
                ? 'linear-gradient(135deg, #ef4444, #f97316)'
                : 'linear-gradient(135deg, #3b82f6, #10b981)',
            }}
          >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography noWrap sx={{ fontSize: '0.78rem', fontWeight: 600, lineHeight: 1.3, color: isDark ? '#e2e8f0' : '#111827' }}>
              {user?.name || 'User'}
            </Typography>
            <Typography noWrap sx={{ fontSize: '0.62rem', lineHeight: 1, color: isDark ? '#475569' : '#9ca3af', fontWeight: 500, mt: 0.1, textTransform: 'capitalize' }}>
              {user?.role || 'Member'}
            </Typography>
          </Box>
          {/* Online dot */}
          <Box
            sx={{
              width: 7, height: 7, borderRadius: '50%', bgcolor: '#10b981',
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
          '& .MuiDrawer-paper': paperStyles,
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          width: SIDEBAR_WIDTH, flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { ...paperStyles, position: 'relative' },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
