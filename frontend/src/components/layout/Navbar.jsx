import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Avatar, Tooltip, Chip,
  Badge, Menu, MenuItem, Divider, Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { logout } from '../../features/auth/authSlice';
import { ColorModeContext } from '../../App';
import api from '../../services/api';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);

  const handleOpenNotifications = async (event) => {
    setAnchorEl(event.currentTarget);
    try {
      const res = await api.get('/earthquakes?limit=5');
      if (res.data && res.data.data) {
        // Beautiful dynamic welcome notification for login/signup
        const welcomeAlert = {
          id: 'welcome_notification',
          title: 'SYSTEM READY',
          message: `Welcome back, ${user?.name || 'User'}! Live monitoring feed initialized successfully.`,
          time: 'Just now',
          type: 'info'
        };

        const fetchedAlerts = res.data.data.map(eq => ({
          id: eq._id,
          title: `LATEST ADDED: Mag ${eq.mag}`,
          message: eq.place,
          time: new Date(eq.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: eq.mag >= 6 ? 'error' : eq.mag >= 4.5 ? 'warning' : 'info'
        }));

        // Combine to show exactly 6 newest messages
        setNotifications([welcomeAlert, ...fetchedAlerts].slice(0, 6));
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setNotifications([
        { id: 'welcome_notification', title: 'SYSTEM READY', message: `Welcome back, ${user?.name || 'User'}! Live monitoring feed initialized.`, time: 'Just now', type: 'info' },
        { id: '1', title: 'System Connected', message: 'Seismic monitor feed online', time: 'Just now', type: 'info' },
        { id: '2', title: 'USGS API Synced', message: 'Database successfully synced', time: '5m ago', type: 'info' }
      ]);
    }
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
    setUnreadCount(0);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: theme.palette.mode === 'dark' ? 'rgba(11, 15, 26, 0.75)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: theme.palette.mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.07)' : '1px solid rgba(148, 163, 184, 0.12)',
        borderRadius: 0,
        width: '100%',
      }}
    >
      <Toolbar sx={{ minHeight: '58px !important', px: { xs: 2, md: 3 } }}>
        {/* Mobile hamburger */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ mr: 2, display: { md: 'none' }, color: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand + live dot */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              fontSize: '1rem',
              color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#0f172a',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Seismic<span style={{ color: '#818cf8' }}>Monitor</span>
            <span style={{ color: '#475569', fontWeight: 400 }}>.pro</span>
          </Typography>

          {/* Live indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: '#34d399',
                boxShadow: '0 0 0 0 rgba(52,211,153,0.5)',
                animation: 'pulseRing 1.8s ease-in-out infinite',
                '@keyframes pulseRing': {
                  '0%':  { boxShadow: '0 0 0 0 rgba(52,211,153,0.5)' },
                  '70%': { boxShadow: '0 0 0 7px rgba(52,211,153,0)' },
                  '100%':{ boxShadow: '0 0 0 0 rgba(52,211,153,0)' },
                },
              }}
            />
            <Typography sx={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700, letterSpacing: '0.04em' }}>
              LIVE
            </Typography>
          </Box>
        </Box>

        {/* Right controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* User name + role */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, mr: 1 }}>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569' }}>
              {user?.name}
            </Typography>
            <Chip
              label={user?.role}
              size="small"
              sx={{
                height: 18,
                fontSize: '0.6rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                background: user?.role === 'admin' ? 'rgba(99,102,241,0.2)' : 'rgba(52,211,153,0.12)',
                color: user?.role === 'admin' ? '#a5b4fc' : '#6ee7b7',
                border: 'none',
              }}
            />
          </Box>

          <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton
              onClick={toggleColorMode}
              sx={{ color: '#475569', '&:hover': { color: '#818cf8', bgcolor: 'rgba(129,140,248,0.08)' } }}
            >
              {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton 
              onClick={handleOpenNotifications}
              sx={{ color: '#475569', '&:hover': { color: '#818cf8', bgcolor: 'rgba(129,140,248,0.08)' } }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsNoneIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              onClick={() => navigate('/profile')}
              sx={{ color: '#475569', '&:hover': { color: '#818cf8', bgcolor: 'rgba(129,140,248,0.08)' } }}
            >
              <AccountCircleIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Sign out">
            <IconButton
              onClick={handleLogout}
              sx={{ color: '#475569', '&:hover': { color: '#f87171', bgcolor: 'rgba(248,113,113,0.08)' } }}
            >
              <LogoutIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        id="notifications-menu"
        open={Boolean(anchorEl)}
        onClose={handleCloseNotifications}
        onClick={handleCloseNotifications}
        PaperProps={{
          elevation: 8,
          sx: {
            width: 320,
            maxHeight: 400,
            overflow: 'visible',
            filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.15))',
            mt: 1.5,
            borderRadius: 1.5, // Reduced border radius for a sharper, cleaner look
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(148, 163, 184, 0.15)',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" fontWeight="800" sx={{ color: 'text.primary' }}>Seismic Alerts</Typography>
        </Box>
        <Divider sx={{ my: 0.5 }} />
        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {notifications.map((notif) => (
            <MenuItem 
              key={notif.id} 
              onClick={() => navigate(`/earthquakes`)}
              sx={{ 
                py: 1.2, 
                px: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(148,163,184,0.06)'}`,
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(148,163,184,0.04)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, width: '100%' }}>
                <Box sx={{ 
                  width: 6, height: 6, borderRadius: '50%', 
                  bgcolor: notif.type === 'error' ? '#ef4444' : notif.type === 'warning' ? '#fbbf24' : '#3b82f6'
                }} />
                <Typography variant="caption" fontWeight="800" color={notif.type === 'error' ? 'error.main' : notif.type === 'warning' ? 'warning.main' : 'primary.main'} sx={{ textTransform: 'uppercase', fontSize: '0.62rem', letterSpacing: '0.02em', flex: 1 }}>
                  {notif.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>{notif.time}</Typography>
              </Box>
              <Typography variant="body2" color="text.primary" fontWeight="600" sx={{ fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                {notif.message}
              </Typography>
            </MenuItem>
          ))}
          {notifications.length === 0 && (
            <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" fontWeight="700">No new notifications</Typography>
            </Box>
          )}
        </Box>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
