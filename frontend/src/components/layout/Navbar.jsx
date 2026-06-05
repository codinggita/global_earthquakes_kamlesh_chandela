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
    width: 36, height: 36, borderRadius: '12px',
    color: isDark ? '#ffffff' : '#0f172a',
    border: '2px solid transparent',
    transition: 'all 0.15s ease',
    '&:hover': {
      color: '#ff5e7e',
      border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
      background: isDark ? '#2e1b23' : '#ffecf0',
      transform: 'translateY(-1px)',
      boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
    },
  };

  /* Notif color */
  const notifColor = (type) => ({ error: '#ff5e7e', warning: '#fbbf24', info: '#3b82f6' }[type] || '#3b82f6');

  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 60, px: 3,
        borderRadius: '20px',
        background: isDark ? '#161a2b' : '#ffffff',
        border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
        boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
        position: 'relative',
      }}
    >
      {/* Floating decoration in the navbar */}
      <Box sx={{ position: 'absolute', right: 230, top: -14, zIndex: 10, pointerEvents: 'none' }} className="float-slow">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={isDark ? '#ffffff' : '#0f172a'} strokeWidth="2.5" strokeLinejoin="round" fill="#fbbf24" />
        </svg>
      </Box>

      {/* ── Left ─────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* Mobile menu toggle */}
        <IconButton onClick={onToggleSidebar} sx={{ ...iconBtnSx, display: { md: 'none' } }}>
          <MenuIcon sx={{ fontSize: 19 }} />
        </IconButton>

        {/* Page title */}
        <Typography
          sx={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em',
            color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1,
          }}
        >
          {pageTitle}
        </Typography>

        {/* Live badge */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5,
            px: 1.2, py: 0.4, borderRadius: '8px',
            background: isDark ? '#162a26' : '#e6f9f3',
            border: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a',
            boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
          }}
        >
          <Box
            sx={{
              width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981',
              animation: 'liveBlink 2s ease-in-out infinite',
              '@keyframes liveBlink': {
                '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.25 },
              },
            }}
          />
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.65rem', fontWeight: 800, color: '#10b981', letterSpacing: '0.07em' }}>
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
            px: 1.2, py: 0.5, mr: 0.5, borderRadius: '12px', cursor: 'pointer',
            border: '2px solid transparent',
            transition: 'all 0.15s ease',
            '&:hover': {
              background: isDark ? '#2e1b23' : '#ffecf0',
              border: isDark ? '2px solid #ffffff' : '2px solid #0f172a',
              transform: 'translateY(-1px)',
              boxShadow: isDark ? '2px 2px 0px 0px #ffffff' : '2px 2px 0px 0px #0f172a',
            },
          }}
        >
          <Avatar
            sx={{
              width: 28, height: 28, fontSize: '0.74rem', fontWeight: 800,
              background: user?.role === 'admin'
                ? 'linear-gradient(135deg, #ff5e7e, #fbbf24)'
                : 'linear-gradient(135deg, #3b82f6, #10b981)',
              border: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a',
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <Box>
            <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.8rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1.2 }}>
              {user?.name?.split(' ')[0] || 'User'}
            </Typography>
            <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.62rem', fontWeight: 800, color: '#ff5e7e', lineHeight: 1, textTransform: 'capitalize' }}>
              {user?.role}
            </Typography>
          </Box>
        </Box>

        {/* Separator */}
        <Box sx={{ width: 2, height: 20, bgcolor: isDark ? '#ffffff' : '#0f172a', display: { xs: 'none', sm: 'block' }, mx: 0.8 }} />

        {/* Theme toggle */}
        <Tooltip title={isDark ? 'Light mode' : 'Dark mode'} arrow>
          <IconButton onClick={toggleColorMode} sx={iconBtnSx}>
            {isDark ? <LightModeIcon sx={{ fontSize: 18 }} /> : <DarkModeIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Alerts" arrow>
          <IconButton onClick={handleOpenNotifications} sx={iconBtnSx}>
            <Badge
              badgeContent={unreadCount}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.6rem', fontWeight: 900, minWidth: 16, height: 16,
                  bgcolor: '#ff5e7e', color: '#fff', top: 2, right: 2,
                  border: isDark ? '1.5px solid #ffffff' : '1.5px solid #0f172a',
                },
              }}
            >
              <NotificationsNoneIcon sx={{ fontSize: 18 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Logout */}
        <Tooltip title="Sign out" arrow>
          <IconButton
            onClick={handleLogout}
            sx={{ ...iconBtnSx, '&:hover': { color: '#ff5e7e', background: isDark ? '#2e1b23' : '#ffecf0' } }}
          >
            <LogoutIcon sx={{ fontSize: 18 }} />
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
            bgcolor: isDark ? '#161a2b' : '#fff',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Header */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.88rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
            Seismic Alerts
          </Typography>
          {unreadCount > 0 && (
            <Box sx={{ px: 1, py: 0.3, borderRadius: '6px', bgcolor: '#ffecf0', border: '1.5px solid #ff5e7e' }}>
              <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.62rem', fontWeight: 800, color: '#ff5e7e' }}>
                {unreadCount} new
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: isDark ? '#ffffff' : '#0f172a', borderWidth: '1px' }} />

        {/* Items */}
        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {notifications.map((n) => {
            const c = notifColor(n.type);
            return (
              <MenuItem
                key={n.id}
                onClick={() => { navigate('/earthquakes'); handleCloseNotifications(); }}
                sx={{
                  py: 1.5, px: 2, flexDirection: 'column', alignItems: 'flex-start', gap: 0.3,
                  borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  '&:hover': { bgcolor: isDark ? '#2e1b23' : '#ffecf0' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, width: '100%' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c, border: isDark ? '1px solid #ffffff' : '1px solid #0f172a', flexShrink: 0 }} />
                  <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.78rem', fontWeight: 800, color: c, flex: 1 }} noWrap>
                    {n.title}
                  </Typography>
                  <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.62rem', fontWeight: 700, color: isDark ? '#9ca3af' : '#475569' }}>
                    {n.time}
                  </Typography>
                </Box>
                <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.74rem', color: isDark ? '#9ca3af' : '#475569', pl: 1.7 }} noWrap>
                  {n.message}
                </Typography>
              </MenuItem>
            );
          })}
          {notifications.length === 0 && (
            <Box sx={{ py: 3.5, textAlign: 'center' }}>
              <Typography sx={{ fontFamily: '"Quicksand", sans-serif', fontSize: '0.78rem', color: isDark ? '#9ca3af' : '#475569', fontWeight: 700 }}>
                No new alerts
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: isDark ? '#ffffff' : '#0f172a', borderWidth: '1px' }} />
        <Box
          onClick={() => { navigate('/earthquakes'); handleCloseNotifications(); }}
          sx={{ py: 1.5, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: isDark ? '#2e1b23' : '#ffecf0' } }}
        >
          <Typography sx={{ fontFamily: '"Fredoka", sans-serif', fontSize: '0.78rem', fontWeight: 800, color: '#ff5e7e' }}>
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
            bgcolor: isDark ? '#161a2b' : '#fff',
            border: isDark ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            boxShadow: isDark ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => { navigate('/profile'); setUserAnchor(null); }}
          sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.85rem', gap: 1.2, py: 1.2, color: isDark ? '#ffffff' : '#0f172a', '&:hover': { bgcolor: isDark ? '#2e1b23' : '#ffecf0' } }}
        >
          <AccountCircleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          My Profile
        </MenuItem>
        <Divider sx={{ borderColor: isDark ? '#ffffff' : '#0f172a', borderWidth: '1px', my: 0.5 }} />
        <MenuItem
          onClick={handleLogout}
          sx={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 800, fontSize: '0.85rem', gap: 1.2, py: 1.2, color: '#ff5e7e', '&:hover': { bgcolor: isDark ? '#2e1b23' : '#ffecf0' } }}
        >
          <LogoutIcon sx={{ fontSize: 18 }} />
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
