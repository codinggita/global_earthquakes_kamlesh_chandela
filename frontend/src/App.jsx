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
    /* ── Seismic Coral Pink brand primary ── */
    primary:   { main: '#ff5e7e', light: '#ffa3b5', dark: '#e03f60', contrastText: '#fff' },
    secondary: { main: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8', contrastText: '#fff' },
    error:     { main: '#ff5e7e', light: '#ffa3b5', dark: '#e03f60' },
    warning:   { main: '#fbbf24', light: '#fde68a', dark: '#ea580c' },
    info:      { main: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8' },
    success:   { main: '#10b981', light: '#6ee7b7', dark: '#047857' },
    background: {
      default: mode === 'dark' ? '#0e111d' : '#fdfbf7',
      paper:   mode === 'dark' ? '#161a2b' : '#ffffff',
    },
    text: {
      primary:  mode === 'dark' ? '#ffffff' : '#0f172a',
      secondary:mode === 'dark' ? '#9ca3af' : '#475569',
      disabled: mode === 'dark' ? '#6b7280' : '#94a3b8',
    },
    divider: mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.15)',
  },

  typography: {
    fontFamily: '"Fredoka", "Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Fredoka", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontFamily: '"Fredoka", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Fredoka", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Fredoka", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontFamily: '"Fredoka", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Fredoka", sans-serif', fontWeight: 700 },
    subtitle1: { fontFamily: '"Quicksand", sans-serif', fontWeight: 700 },
    subtitle2: { fontFamily: '"Quicksand", sans-serif', fontWeight: 700 },
    body1: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600, lineHeight: 1.6 },
    body2: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600, lineHeight: 1.5 },
    button: { fontFamily: '"Fredoka", sans-serif', fontWeight: 700, textTransform: 'none' },
    overline: { fontFamily: '"Quicksand", sans-serif', fontWeight: 800 },
    caption: { fontFamily: '"Quicksand", sans-serif', fontWeight: 600 },
  },

  shape: { borderRadius: 16 },

  shadows: Array(25).fill(mode === 'dark' ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a'),

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'dark'
            ? 'radial-gradient(circle at 10% 10%, #2e1b23 0%, transparent 40%), radial-gradient(circle at 90% 90%, #1a233b 0%, transparent 40%)'
            : 'radial-gradient(circle at 10% 10%, #ffecf0 0%, transparent 40%), radial-gradient(circle at 90% 90%, #e6f0ff 0%, transparent 40%)',
          backgroundAttachment: 'fixed',
          transition: 'background-color 0.2s ease, color 0.2s ease',
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: mode === 'dark' ? '#161a2b' : '#ffffff',
          border: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          borderRadius: 20,
          boxShadow: mode === 'dark' ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
          transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            borderColor: mode === 'dark' ? '#ffffff' : '#0f172a',
            boxShadow: mode === 'dark' ? '6px 6px 0px 0px #ffffff' : '6px 6px 0px 0px #0f172a',
            transform: 'translate(-2px, -2px)',
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: mode === 'dark' ? '#161a2b' : '#ffffff',
          border: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          borderRadius: 20,
          boxShadow: mode === 'dark' ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontWeight: 700,
          textTransform: 'none',
          padding: '8px 20px',
          fontSize: '0.85rem',
          border: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          transition: 'all 0.15s ease',
          '&:hover': {
            transform: 'translate(-2px, -2px)',
            boxShadow: mode === 'dark' ? '3px 3px 0px 0px #ffffff' : '3px 3px 0px 0px #0f172a',
          },
        },
        contained: {
          background: '#ff5e7e',
          color: '#ffffff',
          '&:hover': {
            background: '#e03f60',
            border: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          },
        },
        outlined: {
          background: '#ffffff',
          color: '#0f172a',
          '&:hover': {
            background: '#ffecf0',
            borderColor: mode === 'dark' ? '#ffffff' : '#0f172a',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { 
          fontWeight: 800, 
          fontSize: '0.72rem', 
          border: mode === 'dark' ? '1.5px solid #ffffff' : '1.5px solid #0f172a',
          borderRadius: 8
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: mode === 'dark' ? '#0f1322' : '#ffffff',
          transition: 'all 0.15s ease',
          '& fieldset': {
            border: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
            borderRadius: 12,
            transition: 'all 0.15s ease',
          },
          '&:hover fieldset': {
            borderColor: '#ff5e7e',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ff5e7e',
            borderWidth: '2.5px',
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Quicksand", sans-serif',
          fontWeight: 700,
          '&.Mui-focused': {
            color: '#ff5e7e',
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: mode === 'dark' ? '#0f1322' : '#fdfbf7',
            fontWeight: 800,
            fontSize: '0.72rem',
            color: mode === 'dark' ? '#9ca3af' : '#475569',
            borderBottom: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: '#ffecf0 !important' },
          '& .MuiTableCell-root': { borderBottom: mode === 'dark' ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid rgba(15,23,42,0.1)' },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 100, border: mode === 'dark' ? '1.5px solid #ffffff' : '1.5px solid #0f172a', height: 10 },
        bar:  { borderRadius: 100, background: '#ff5e7e' },
      },
    },

    MuiAvatar: {
      styleOverrides: { 
        root: { 
          fontWeight: 800, 
          fontFamily: '"Fredoka", sans-serif',
          border: mode === 'dark' ? '2px solid #ffffff' : '2px solid #0f172a',
        } 
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.15)', borderWidth: '1px' },
      },
    },

    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          fontSize: '0.7rem',
          fontWeight: 800,
          color: mode === 'dark' ? '#9ca3af' : '#475569',
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          background: mode === 'dark' ? '#161a2b' : '#ffffff',
          border: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          borderRadius: 14,
          boxShadow: mode === 'dark' ? '4px 4px 0px 0px #ffffff' : '4px 4px 0px 0px #0f172a',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'dark' ? '#1d2238' : '#ffffff',
          border: mode === 'dark' ? '2px solid #ffffff' : '2px solid #0f172a',
          borderRadius: 8,
          fontSize: '0.75rem',
          fontWeight: 700,
          color: mode === 'dark' ? '#ffffff' : '#0f172a',
          boxShadow: '2px 2px 0px 0px #0f172a',
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 14, border: '2.5px solid #0f172a', boxShadow: '3px 3px 0px 0px #0f172a' },
        standardError:   { borderColor: '#0f172a',  backgroundColor: '#ffecf0',  color: '#e03f60' },
        standardSuccess: { borderColor: '#0f172a', backgroundColor: '#e6f9f3', color: '#10b981' },
        standardWarning: { borderColor: '#0f172a', backgroundColor: '#fff4d2', color: '#fbbf24' },
        standardInfo:    { borderColor: '#0f172a',  backgroundColor: '#e6f0ff',  color: '#3b82f6' },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          background: mode === 'dark' ? '#161a2b' : '#ffffff',
          border: mode === 'dark' ? '2.5px solid #ffffff' : '2.5px solid #0f172a',
          boxShadow: mode === 'dark' ? '8px 8px 0px 0px #ffffff' : '8px 8px 0px 0px #0f172a',
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
