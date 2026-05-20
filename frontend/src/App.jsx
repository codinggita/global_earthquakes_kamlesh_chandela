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

export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'dark' });

const getCustomTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: '#818cf8', light: '#a5b4fc', dark: '#6366f1', contrastText: '#fff' },
    secondary: { main: '#34d399', light: '#6ee7b7', dark: '#10b981', contrastText: '#fff' },
    error: { main: '#f87171', light: '#fca5a5', dark: '#ef4444' },
    warning: { main: '#fbbf24', light: '#fcd34d', dark: '#f59e0b' },
    info: { main: '#38bdf8', light: '#7dd3fc', dark: '#0ea5e9' },
    success: { main: '#34d399', light: '#6ee7b7', dark: '#10b981' },
    background: {
      default: mode === 'dark' ? '#0b0f1a' : '#f8fafc',
      paper: mode === 'dark' ? '#111827' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f1f5f9' : '#0f172a',
      secondary: mode === 'dark' ? '#94a3b8' : '#475569',
      disabled: mode === 'dark' ? '#475569' : '#94a3b8',
    },
    divider: mode === 'dark' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(148, 163, 184, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 800, letterSpacing: '-0.025em' },
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    h4: { fontWeight: 800, letterSpacing: '-0.015em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: '0.01em' },
    overline: { fontWeight: 700, letterSpacing: '0.1em' },
    caption: { lineHeight: 1.5 },
  },
  shape: { borderRadius: 14 },
  shadows: mode === 'dark' ? [
    'none',
    '0 1px 3px rgba(0,0,0,0.4)',
    '0 2px 6px rgba(0,0,0,0.4)',
    '0 4px 12px rgba(0,0,0,0.4)',
    '0 6px 18px rgba(0,0,0,0.45)',
    '0 8px 24px rgba(0,0,0,0.5)',
    '0 10px 30px rgba(0,0,0,0.5)',
    '0 12px 36px rgba(0,0,0,0.55)',
    '0 14px 42px rgba(0,0,0,0.55)',
    '0 16px 48px rgba(0,0,0,0.6)',
    '0 18px 54px rgba(0,0,0,0.6)',
    '0 20px 60px rgba(0,0,0,0.65)',
    '0 22px 66px rgba(0,0,0,0.65)',
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
    '0 1px 3px rgba(0,0,0,0.04)',
    '0 2px 6px rgba(0,0,0,0.04)',
    '0 4px 12px rgba(0,0,0,0.05)',
    '0 6px 18px rgba(0,0,0,0.05)',
    '0 8px 24px rgba(0,0,0,0.06)',
    '0 10px 30px rgba(0,0,0,0.06)',
    '0 12px 36px rgba(0,0,0,0.07)',
    '0 14px 42px rgba(0,0,0,0.07)',
    '0 16px 48px rgba(0,0,0,0.08)',
    '0 18px 54px rgba(0,0,0,0.08)',
    '0 20px 60px rgba(0,0,0,0.09)',
    '0 22px 66px rgba(0,0,0,0.09)',
    '0 24px 72px rgba(0,0,0,0.1)',
    '0 26px 78px rgba(0,0,0,0.1)',
    '0 28px 84px rgba(0,0,0,0.11)',
    '0 30px 90px rgba(0,0,0,0.11)',
    '0 32px 96px rgba(0,0,0,0.12)',
    '0 34px 102px rgba(0,0,0,0.12)',
    '0 36px 108px rgba(0,0,0,0.13)',
    '0 38px 114px rgba(0,0,0,0.13)',
    '0 40px 120px rgba(0,0,0,0.14)',
    '0 42px 126px rgba(0,0,0,0.14)',
    '0 44px 132px rgba(0,0,0,0.15)',
    '0 46px 138px rgba(0,0,0,0.15)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'dark'
            ? 'radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.04) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.02) 0%, transparent 60%)',
          backgroundAttachment: 'fixed',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: mode === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.08)' : '1px solid rgba(148, 163, 184, 0.12)',
          borderRadius: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.3)',
            boxShadow: mode === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(129,140,248,0.1)'
              : '0 8px 32px rgba(99, 102, 241, 0.06), 0 0 0 1px rgba(99, 102, 241, 0.04)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: mode === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.08)' : '1px solid rgba(148, 163, 184, 0.12)',
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
          padding: '8px 20px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(148,163,184,0.2)',
          '&:hover': {
            borderColor: '#818cf8',
            backgroundColor: 'rgba(129,140,248,0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.02em',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(241, 245, 249, 0.5)',
            '& fieldset': { borderColor: mode === 'dark' ? 'rgba(148,163,184,0.15)' : 'rgba(148,163,184,0.2)' },
            '&:hover fieldset': { borderColor: 'rgba(129,140,248,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#818cf8', borderWidth: '1.5px' },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(241, 245, 249, 0.5)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: mode === 'dark' ? '#0f172a' : '#f1f5f9',
            fontWeight: 800,
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            color: mode === 'dark' ? '#94a3b8' : '#475569',
            textTransform: 'uppercase',
            borderBottom: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.08)' : '1px solid rgba(148, 163, 184, 0.12)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: 'rgba(129,140,248,0.04)' },
          '& .MuiTableCell-root': { borderBottom: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.06)' : '1px solid rgba(148, 163, 184, 0.1)' },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          backgroundColor: 'rgba(99,102,241,0.1)',
        },
        bar: { borderRadius: 100 },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { fontWeight: 800 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: mode === 'dark' ? 'rgba(148,163,184,0.08)' : 'rgba(148,163,184,0.12)' },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          color: mode === 'dark' ? '#475569' : '#94a3b8',
          lineHeight: '24px',
          marginTop: '8px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: mode === 'dark' ? '#1e293b' : '#ffffff',
          border: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(148, 163, 184, 0.15)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
          border: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 8,
          fontSize: '0.75rem',
          fontWeight: 600,
          color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12, border: '1px solid' },
        standardError: { borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.08)' },
        standardSuccess: { borderColor: 'rgba(16,185,129,0.2)', backgroundColor: 'rgba(16,185,129,0.08)' },
        standardWarning: { borderColor: 'rgba(245,158,11,0.2)', backgroundColor: 'rgba(245,158,11,0.08)' },
        standardInfo: { borderColor: 'rgba(14,165,233,0.2)', backgroundColor: 'rgba(14,165,233,0.08)' },
      },
    },
  },
});

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  // If allowedRoles is provided, check if user has permission
  if (allowedRoles && !allowedRoles.includes(user?.role?.trim())) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const DashboardRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return user?.role?.trim() === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />;
};

function App() {
  const [mode, setMode] = React.useState(localStorage.getItem('themeMode') || 'dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', nextMode);
          return nextMode;
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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                  <Route index element={<DashboardRedirect />} />
                  <Route path="dashboard" element={<UserDashboard />} />

                  {/* All Users/Admins can see these */}
                  <Route path="earthquakes" element={<EarthquakeList />} />
                  <Route path="earthquakes/create" element={<PrivateRoute allowedRoles={['admin', 'moderator']}><CreateEarthquake /></PrivateRoute>} />
                  <Route path="earthquakes/:id" element={<EarthquakeDetails />} />
                  <Route path="earthquakes/:id/edit" element={<PrivateRoute allowedRoles={['admin', 'moderator']}><EditEarthquake /></PrivateRoute>} />
                  <Route path="analytics" element={<AnalyticsDashboard />} />
                  <Route path="statistics" element={<StatisticsDashboard />} />
                  <Route path="search" element={<SearchPage />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />

                  {/* Admin Only Section */}
                  <Route path="admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
                  <Route path="admin/users" element={<PrivateRoute allowedRoles={['admin']}><UserManagement /></PrivateRoute>} />
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
