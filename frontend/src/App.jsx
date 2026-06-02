import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { store } from './store/store';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import UserDashboard from './pages/user/UserDashboard';
import EarthquakeList from './pages/earthquakes/EarthquakeList';
import EarthquakeDetails from './pages/earthquakes/EarthquakeDetails';
import CreateEarthquake from './pages/earthquakes/CreateEarthquake';
import EditEarthquake from './pages/earthquakes/EditEarthquake';
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard';
import StatisticsDashboard from './pages/statistics/StatisticsDashboard';
import SearchPage from './pages/search/SearchPage';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import UserManagement from './pages/admin/UserManagement';
import AdminDashboard from './pages/admin/AdminDashboard';
import AuditLogs from './pages/admin/AuditLogs';
import { ToastProvider } from './components/common/Toast';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'light' });

const getCustomTheme = (mode) => createTheme({
  palette: {
    mode,
    /* ── Seismic Red as brand primary ── */
    primary:   { main: '#ef4444', light: '#f87171', dark: '#dc2626', contrastText: '#fff' },
    secondary: { main: '#3b82f6', light: '#60a5fa', dark: '#2563eb', contrastText: '#fff' },
    error:     { main: '#dc2626', light: '#ef4444', dark: '#b91c1c' },
    warning:   { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
    info:      { main: '#3b82f6', light: '#60a5fa', dark: '#1d4ed8' },
    success:   { main: '#10b981', light: '#34d399', dark: '#059669' },
    background: {
      default: mode === 'dark' ? '#050912' : '#f3f6fc',
      paper:   mode === 'dark' ? '#08101f' : '#ffffff',
    },
    text: {
      primary:  mode === 'dark' ? '#f1f5f9' : '#0f172a',
      secondary:mode === 'dark' ? '#8b9ab8' : '#4b5563',
      disabled: mode === 'dark' ? '#3f4d61' : '#9ca3af',
    },
    divider: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 800, letterSpacing: '-0.025em' },
    h3: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 600 },
    subtitle1: { fontWeight: 600, letterSpacing: '-0.005em' },
    subtitle2: { fontWeight: 600, letterSpacing: '-0.005em' },
    body1: { lineHeight: 1.7, letterSpacing: '-0.003em' },
    body2: { lineHeight: 1.6, letterSpacing: '-0.003em' },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: '0.005em' },
    overline: { fontWeight: 800, letterSpacing: '0.12em' },
    caption: { lineHeight: 1.5 },
  },

  shape: { borderRadius: 12 },

  shadows: mode === 'dark' ? [
    'none',
    '0 1px 3px rgba(0,0,0,0.5)',
    '0 2px 6px rgba(0,0,0,0.5)',
    '0 4px 12px rgba(0,0,0,0.55)',
    '0 6px 18px rgba(0,0,0,0.55)',
    '0 8px 24px rgba(0,0,0,0.6)',
    '0 10px 30px rgba(0,0,0,0.6)',
    '0 12px 36px rgba(0,0,0,0.65)',
    '0 14px 42px rgba(0,0,0,0.65)',
    '0 16px 48px rgba(0,0,0,0.7)',
    '0 18px 54px rgba(0,0,0,0.7)',
    '0 20px 60px rgba(0,0,0,0.7)',
    '0 22px 66px rgba(0,0,0,0.7)',
    '0 24px 72px rgba(0,0,0,0.7)',
    '0 26px 78px rgba(0,0,0,0.7)',
    '0 28px 84px rgba(0,0,0,0.7)',
    '0 30px 90px rgba(0,0,0,0.7)',
    '0 32px 96px rgba(0,0,0,0.7)',
    '0 34px 102px rgba(0,0,0,0.7)',
    '0 36px 108px rgba(0,0,0,0.7)',
    '0 38px 114px rgba(0,0,0,0.7)',
    '0 40px 120px rgba(0,0,0,0.7)',
    '0 42px 126px rgba(0,0,0,0.7)',
    '0 44px 132px rgba(0,0,0,0.7)',
    '0 46px 138px rgba(0,0,0,0.7)',
  ] : [
    'none',
    '0 1px 3px rgba(15,23,42,0.04)',
    '0 2px 6px rgba(15,23,42,0.04)',
    '0 4px 12px rgba(15,23,42,0.05)',
    '0 6px 18px rgba(15,23,42,0.05)',
    '0 8px 24px rgba(15,23,42,0.06)',
    '0 10px 30px rgba(15,23,42,0.06)',
    '0 12px 36px rgba(15,23,42,0.07)',
    '0 14px 42px rgba(15,23,42,0.07)',
    '0 16px 48px rgba(15,23,42,0.08)',
    '0 18px 54px rgba(15,23,42,0.08)',
    '0 20px 60px rgba(15,23,42,0.09)',
    '0 22px 66px rgba(15,23,42,0.09)',
    '0 24px 72px rgba(15,23,42,0.10)',
    '0 26px 78px rgba(15,23,42,0.10)',
    '0 28px 84px rgba(15,23,42,0.11)',
    '0 30px 90px rgba(15,23,42,0.11)',
    '0 32px 96px rgba(15,23,42,0.11)',
    '0 34px 102px rgba(15,23,42,0.11)',
    '0 36px 108px rgba(15,23,42,0.12)',
    '0 38px 114px rgba(15,23,42,0.12)',
    '0 40px 120px rgba(15,23,42,0.12)',
    '0 42px 126px rgba(15,23,42,0.12)',
    '0 44px 132px rgba(15,23,42,0.13)',
    '0 46px 138px rgba(15,23,42,0.13)',
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'dark'
            ? 'radial-gradient(ellipse at 8% 0%, rgba(239,68,68,0.07) 0%, transparent 45%), radial-gradient(ellipse at 92% 95%, rgba(59,130,246,0.05) 0%, transparent 45%)'
            : 'radial-gradient(ellipse at 8% 0%, rgba(239,68,68,0.04) 0%, transparent 45%), radial-gradient(ellipse at 92% 95%, rgba(59,130,246,0.03) 0%, transparent 45%)',
          backgroundAttachment: 'fixed',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: mode === 'dark' ? 'rgba(10, 16, 30, 0.94)' : 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          border: mode === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
          borderRadius: 16,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: mode === 'dark' ? 'rgba(239,68,68,0.20)' : 'rgba(239,68,68,0.15)',
            boxShadow: mode === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(239,68,68,0.06)'
              : '0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(239,68,68,0.04)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: mode === 'dark' ? 'rgba(10, 16, 30, 0.94)' : 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          border: mode === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
          borderRadius: 16,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          textTransform: 'none',
          padding: '8px 18px',
          fontSize: '0.85rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
          boxShadow: '0 4px 14px rgba(239,68,68,0.28)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            boxShadow: '0 6px 20px rgba(239,68,68,0.45)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.12)',
          '&:hover': {
            borderColor: '#ef4444',
            backgroundColor: mode === 'dark' ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.04)',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.02em' },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: mode === 'dark' ? 'rgba(5, 9, 18, 0.6)' : 'rgba(240,244,250,0.7)',
            '& fieldset': { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)' },
            '&:hover fieldset': { borderColor: 'rgba(239,68,68,0.40)' },
            '&.Mui-focused fieldset': { borderColor: '#ef4444', borderWidth: '1.5px' },
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: mode === 'dark' ? 'rgba(5, 9, 18, 0.6)' : 'rgba(240,244,250,0.7)',
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: mode === 'dark' ? '#050912' : '#f8fafc',
            fontWeight: 800,
            fontSize: '0.68rem',
            letterSpacing: '0.08em',
            color: mode === 'dark' ? '#3f4d61' : '#9ca3af',
            textTransform: 'uppercase',
            borderBottom: mode === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.07)',
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: mode === 'dark' ? 'rgba(239,68,68,0.02)' : 'rgba(239,68,68,0.02)' },
          '& .MuiTableCell-root': { borderBottom: mode === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.06)' },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 100, backgroundColor: 'rgba(239,68,68,0.10)' },
        bar:  { borderRadius: 100, background: 'linear-gradient(90deg, #ef4444, #f97316)' },
      },
    },

    MuiAvatar: {
      styleOverrides: { root: { fontWeight: 800, fontFamily: '"Outfit", sans-serif' } },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)' },
      },
    },

    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          fontSize: '0.62rem',
          fontWeight: 800,
          letterSpacing: '0.10em',
          color: mode === 'dark' ? '#3f4d61' : '#9ca3af',
          lineHeight: '24px',
          marginTop: '8px',
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          background: mode === 'dark' ? '#08101f' : '#ffffff',
          border: mode === 'dark' ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'dark' ? '#0d1828' : '#ffffff',
          border: mode === 'dark' ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.10)',
          borderRadius: 8,
          fontSize: '0.73rem',
          fontWeight: 600,
          color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12, border: '1px solid' },
        standardError:   { borderColor: 'rgba(239,68,68,0.25)',  backgroundColor: 'rgba(239,68,68,0.08)',  color: mode === 'dark' ? '#fca5a5' : '#991b1b' },
        standardSuccess: { borderColor: 'rgba(16,185,129,0.25)', backgroundColor: 'rgba(16,185,129,0.08)', color: mode === 'dark' ? '#a7f3d0' : '#065f46' },
        standardWarning: { borderColor: 'rgba(245,158,11,0.25)', backgroundColor: 'rgba(245,158,11,0.08)', color: mode === 'dark' ? '#fde68a' : '#92400e' },
        standardInfo:    { borderColor: 'rgba(59,130,246,0.25)',  backgroundColor: 'rgba(59,130,246,0.08)',  color: mode === 'dark' ? '#bfdbfe' : '#1e40af' },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          background: mode === 'dark' ? 'rgba(8, 16, 31, 0.97)' : 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(24px)',
          border: mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: mode === 'dark' ? '0 24px 80px rgba(0,0,0,0.7)' : '0 24px 80px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#050912',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, border: '3px solid rgba(239,68,68,0.2)',
          borderTopColor: '#ef4444', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 12px',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#3f4d61', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          LOADING
        </p>
      </div>
    </div>
  );
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role?.trim())) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const DashboardRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return user?.role?.trim() === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />;
};

function App() {
  const [mode, setMode] = React.useState(localStorage.getItem('themeMode') || 'light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', next);
          return next;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(() => getCustomTheme(mode), [mode]);

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <Router>
              <Routes>
                <Route path="/login"            element={<Login />} />
                <Route path="/register"         element={<Register />} />
                <Route path="/forgot-password"  element={<ForgotPassword />} />
                <Route path="/reset-password"   element={<ResetPassword />} />

                <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                  <Route index element={<DashboardRedirect />} />
                  <Route path="dashboard"   element={<UserDashboard />} />

                  <Route path="earthquakes"             element={<EarthquakeList />} />
                  <Route path="earthquakes/create"      element={<PrivateRoute allowedRoles={['admin','moderator']}><CreateEarthquake /></PrivateRoute>} />
                  <Route path="earthquakes/:id"         element={<EarthquakeDetails />} />
                  <Route path="earthquakes/:id/edit"    element={<PrivateRoute allowedRoles={['admin','moderator']}><EditEarthquake /></PrivateRoute>} />
                  <Route path="analytics"   element={<AnalyticsDashboard />} />
                  <Route path="statistics"  element={<StatisticsDashboard />} />
                  <Route path="search"      element={<SearchPage />} />
                  <Route path="profile"     element={<Profile />} />
                  <Route path="settings"    element={<Settings />} />

                  <Route path="admin/dashboard"  element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
                  <Route path="admin/users"      element={<PrivateRoute allowedRoles={['admin']}><UserManagement /></PrivateRoute>} />
                  <Route path="admin/audit-logs" element={<PrivateRoute allowedRoles={['admin']}><AuditLogs /></PrivateRoute>} />
                </Route>
              </Routes>
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
