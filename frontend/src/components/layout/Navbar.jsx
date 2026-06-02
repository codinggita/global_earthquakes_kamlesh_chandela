import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Typography, IconButton, Avatar, Tooltip,
  Badge, Menu, MenuItem, Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon               from '@mui/icons-material/Menu';
import LogoutIcon             from '@mui/icons-material/Logout';
import NotificationsNoneIcon  from '@mui/icons-material/NotificationsNone';
import LightModeIcon          from '@mui/icons-material/LightMode';
import DarkModeIcon           from '@mui/icons-material/DarkMode';
import AccountCircleIcon      from '@mui/icons-material/AccountCircle';
import TerrainIcon            from '@mui/icons-material/Terrain';
import { logout } from '../../features/auth/authSlice';
import { ColorModeContext } from '../../App';
import api from '../../services/api';

/* ── Page title map ─────────────────────────────────────────── */
const PAGE_TITLES = {
  '/dashboard':         { title: 'Overview',        sub: 'Real-time seismic monitoring' },
  '/earthquakes':       { title: 'Events',           sub: 'Global earthquake database' },
  '/analytics':         { title: 'Analytics',        sub: 'Trends & visualizations' },
  '/statistics':        { title: 'Statistics',       sub: 'Aggregated seismic data' },
  '/search':            { title: 'Search',           sub: 'Find specific events' },
  '/profile':           { title: 'My Profile',       sub: 'Account details' },
  '/settings':          { title: 'Settings',         sub: 'Preferences & configuration' },
  '/admin/dashboard':   { title: 'Admin Center',     sub: 'System administration' },
  '/admin/users':       { title: 'User Management',  sub: 'Manage accounts & roles' },
  '/admin/audit-logs':  { title: 'Audit Logs',       sub: 'Activity history' },
};

const Navbar = ({ onToggleSidebar }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();
  const theme     = useTheme();
  const user      = useSelector((s) => s.auth.user);
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const isDark    = mode === 'dark';

  const [notifAnchor, setNotifAnchor] = useState(null);
  const [userAnchor,  setUserAnchor]  = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);

  /* Current page info */
  const pageKey = Object.keys(PAGE_TITLES).find(k =>
    location.pathname === k || location.pathname.startsWith(k + '/')
  );
  const { title: pageTitle = 'Dashboard' } = PAGE_TITLES[pageKey] || {};

  /* Fetch notifications */
  const handleOpenNotifications = async (e) => {
    setNotifAnchor(e.currentTarget);
    try {
      const res = await api.get('/earthquakes?limit=4');
      if (res.data?.data) {
        setNotifications([
          {
            id: 'sys', type: 'info',
            title: 'System Ready',
            message: `Welcome back, ${user?.name || 'User'}`,
            time: 'just now',
          },
          ...res.data.data.map(eq => ({
            id: eq._id,
            type: eq.mag >= 6 ? 'error' : eq.mag >= 4.5 ? 'warning' : 'info',
            title: `M ${eq.mag} — ${eq.place?.split(',').pop()?.trim() || 'Unknown region'}`,
            message: eq.place,
            time: new Date(eq.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          })),
        ].slice(0, 5));
      }
    } catch {
      setNotifications([
        { id: '1', type: 'info', title: 'All feeds active', message: 'Seismic monitor online', time: 'now' },
      ]);
    }
  };

  const handleCloseNotifications = () => { setNotifAnchor(null); setUnreadCount(0); };
  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  /* Shared icon button style */
  const iconBtnSx = {
    width: 34, height: 34, borderRadius: '9px',
    color: isDark ? '#4b5e74' : '#9ca3af',
    transition: 'all 0.15s ease',
    '&:hover': {
      color: isDark ? '#f1f5f9' : '#111827',
      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    },
  };

  /* Notif color */
  const notifColor = (type) => ({ error: '#f87171', warning: '#fbbf24', info: '#60a5fa' }[type] || '#60a5fa');

  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 54, px: 2,
        borderRadius: '14px',
        background: isDark ? 'rgba(6, 10, 22, 0.90)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: isDark ? '0 4px 28px rgba(0,0,0,0.55)' : '0 4px 28px rgba(0,0,0,0.07)',
      }}
    >
      {/* ── Left ─────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* Mobile menu toggle */}
        <IconButton onClick={onToggleSidebar} sx={{ ...iconBtnSx, display: { md: 'none' } }}>
          <MenuIcon sx={{ fontSize: 19 }} />
        </IconButton>

        {/* Page title */}
        <Typography
          sx={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em',
            color: isDark ? '#f1f5f9' : '#0f172a', lineHeight: 1,
          }}
        >
          {pageTitle}
        </Typography>

        {/* Live badge */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5,
            px: 0.9, py: 0.3, borderRadius: '6px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.18)',
          }}
        >
          <Box
            sx={{
              width: 5, height: 5, borderRadius: '50%', bgcolor: '#10b981',
              animation: 'liveBlink 2s ease-in-out infinite',
              '@keyframes liveBlink': {
                '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.25 },
              },
            }}
          />
          <Typography sx={{ fontSize: '0.57rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.07em' }}>
            LIVE
          </Typography>
        </Box>
      </Box>

      {/* ── Right ────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>

        {/* User pill (desktop) */}
        <Box
          onClick={(e) => setUserAnchor(e.currentTarget)}
          sx={{
            display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.8,
            px: 0.9, py: 0.4, mr: 0.5, borderRadius: '10px', cursor: 'pointer',
            transition: 'background 0.15s ease',
            '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
          }}
        >
          <Avatar
            sx={{
              width: 26, height: 26, fontSize: '0.67rem', fontWeight: 800,
              background: user?.role === 'admin'
                ? 'linear-gradient(135deg, #ef4444, #f97316)'
                : 'linear-gradient(135deg, #3b82f6, #10b981)',
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: '0.76rem', fontWeight: 600, color: isDark ? '#e2e8f0' : '#111827', lineHeight: 1.2 }}>
              {user?.name?.split(' ')[0] || 'User'}
            </Typography>
            <Typography sx={{ fontSize: '0.58rem', fontWeight: 600, color: user?.role === 'admin' ? '#f87171' : '#34d399', lineHeight: 1, textTransform: 'capitalize' }}>
              {user?.role}
            </Typography>
          </Box>
        </Box>

        {/* Separator */}
        <Box sx={{ width: 1, height: 20, bgcolor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)', display: { xs: 'none', sm: 'block' }, mx: 0.3 }} />

        {/* Theme toggle */}
        <Tooltip title={isDark ? 'Light mode' : 'Dark mode'} arrow>
          <IconButton onClick={toggleColorMode} sx={iconBtnSx}>
            {isDark ? <LightModeIcon sx={{ fontSize: 17 }} /> : <DarkModeIcon sx={{ fontSize: 17 }} />}
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Alerts" arrow>
          <IconButton onClick={handleOpenNotifications} sx={iconBtnSx}>
            <Badge
              badgeContent={unreadCount}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.55rem', fontWeight: 800, minWidth: 14, height: 14,
                  bgcolor: '#ef4444', color: '#fff', top: 1, right: 1,
                },
              }}
            >
              <NotificationsNoneIcon sx={{ fontSize: 17 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Logout */}
        <Tooltip title="Sign out" arrow>
          <IconButton
            onClick={handleLogout}
            sx={{ ...iconBtnSx, '&:hover': { color: '#ef4444', background: 'rgba(239,68,68,0.08)' } }}
          >
            <LogoutIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Notifications panel ──────────────────────────────── */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleCloseNotifications}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 320, mt: 1.2, borderRadius: '14px', overflow: 'hidden',
            bgcolor: isDark ? '#08101f' : '#fff',
            border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: isDark ? '0 16px 52px rgba(0,0,0,0.65)' : '0 16px 52px rgba(0,0,0,0.10)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Header */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#111827' }}>
            Seismic Alerts
          </Typography>
          {unreadCount > 0 && (
            <Box sx={{ px: 0.8, py: 0.2, borderRadius: '5px', bgcolor: 'rgba(239,68,68,0.10)' }}>
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#f87171' }}>
                {unreadCount} new
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />

        {/* Items */}
        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {notifications.map((n) => {
            const c = notifColor(n.type);
            return (
              <MenuItem
                key={n.id}
                onClick={() => { navigate('/earthquakes'); handleCloseNotifications(); }}
                sx={{
                  py: 1.2, px: 2, flexDirection: 'column', alignItems: 'flex-start', gap: 0.3,
                  borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, width: '100%' }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: c, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: c, flex: 1 }} noWrap>
                    {n.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 500, color: isDark ? '#3f5068' : '#9ca3af' }}>
                    {n.time}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.75rem', color: isDark ? '#7a8ea6' : '#4b5563', pl: 1.7 }} noWrap>
                  {n.message}
                </Typography>
              </MenuItem>
            );
          })}
          {notifications.length === 0 && (
            <Box sx={{ py: 3.5, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.78rem', color: isDark ? '#3f5068' : '#9ca3af', fontWeight: 500 }}>
                No new alerts
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
        <Box
          onClick={() => { navigate('/earthquakes'); handleCloseNotifications(); }}
          sx={{ py: 1.1, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' } }}
        >
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#ef4444' }}>
            View all activity →
          </Typography>
        </Box>
      </Menu>

      {/* ── User mini-menu ───────────────────────────────────── */}
      <Menu
        anchorEl={userAnchor}
        open={Boolean(userAnchor)}
        onClose={() => setUserAnchor(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 180, mt: 1.2, borderRadius: '12px', overflow: 'hidden',
            bgcolor: isDark ? '#08101f' : '#fff',
            border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: isDark ? '0 8px 36px rgba(0,0,0,0.55)' : '0 8px 36px rgba(0,0,0,0.08)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => { navigate('/profile'); setUserAnchor(null); }}
          sx={{ fontSize: '0.82rem', gap: 1.2, py: 1, color: isDark ? '#e2e8f0' : '#111827' }}
        >
          <AccountCircleIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
          My Profile
        </MenuItem>
        <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)', my: 0.5 }} />
        <MenuItem
          onClick={handleLogout}
          sx={{ fontSize: '0.82rem', gap: 1.2, py: 1, color: '#ef4444', '&:hover': { bgcolor: 'rgba(239,68,68,0.06)' } }}
        >
          <LogoutIcon sx={{ fontSize: 17 }} />
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
