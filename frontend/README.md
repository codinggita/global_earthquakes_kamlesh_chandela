<div align="center">

# 🌍 Earthquake Analytics Platform — Frontend

### Enterprise-Grade React Dashboard for Seismic Data Visualization & Management

<br>

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5.14-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.8-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.5-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-2.4-2563EB?style=for-the-badge&logo=formik&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-1.3-A855F7?style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Router](https://img.shields.io/badge/React%20Router-6.15-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

<br>

**Built with 💜 for the global seismic research community — interactive, real-time, data-driven.**

</div>

---

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

1. [Project Introduction](#-project-introduction)
2. [Problem Statement](#-problem-statement)
3. [Project Goals](#-project-goals)
4. [Features](#-features)
5. [Industry Features](#-industry-features)
6. [Tech Stack](#-tech-stack)
7. [System Architecture](#-system-architecture)
8. [Frontend Architecture](#-frontend-architecture)
9. [Component Structure](#-component-structure)
10. [Reusable UI System](#-reusable-ui-system)
11. [Routing System](#-routing-system)
12. [Authentication Flow](#-authentication-flow)
13. [Protected Routes](#-protected-routes)
14. [State Management](#-state-management)
15. [Hooks Architecture](#-hooks-architecture)
16. [Services Layer](#-services-layer)
17. [API Integration Flow](#-api-integration-flow)
18. [Form Handling & Validation](#-form-handling--validation)
19. [Pagination System](#-pagination-system)
20. [Filtering System](#-filtering-system)
21. [Search Functionality](#-search-functionality)
22. [Dashboard Pages](#-dashboard-pages)
23. [Analytics Pages](#-analytics-pages)
24. [Chart Components](#-chart-components)
25. [Folder Structure](#-folder-structure)
26. [Environment Variables](#-environment-variables)
27. [Installation Steps](#-installation-steps)
28. [Local Development Setup](#-local-development-setup)
29. [Running the Application](#-running-the-application)
30. [Building for Production](#-building-for-production)
31. [Responsive UI Strategy](#-responsive-ui-strategy)
32. [Performance Optimization](#-performance-optimization)
33. [Scalability Structure](#-scalability-structure)
34. [Deployment Setup](#-deployment-setup)
35. [Development Timeline](#-development-timeline)
36. [Industry Best Practices](#-industry-best-practices)
37. [Future Improvements](#-future-improvements)
38. [Final Conclusion](#-final-conclusion)
39. [Author & Developer](#-author--developer)

</details>

---

## 🌟 Project Introduction

**Earthquake Analytics Platform Frontend** is a production-grade, enterprise-level React single-page application (SPA) built with **React 18**, **Redux Toolkit**, **Material UI 5**, and **Vite**. It serves as the visual command center for seismic data — consuming the Earthquake Analytics REST API to provide real-time monitoring, advanced analytics, and comprehensive data management.

This frontend handles **40,000+ earthquake records** through the backend API and provides:

- 📊 **Real-time Dashboard** — Live seismic feed with auto-refresh
- 🔍 **Advanced Search** — Debounced full-text search across 40K+ records
- 🎯 **Dynamic Filtering** — 15+ filter parameters with debounced updates
- 📈 **Powerful Analytics** — Interactive Recharts visualizations (Line, Bar, Pie, Radar)
- 🔐 **Secure Authentication** — JWT token management with auto-redirect
- 🛡 **Role-Based UI** — Granular interfaces for user, moderator, admin roles
- 📱 **Fully Responsive** — Adaptive layout across desktop, tablet, and mobile
- ⚡ **Optimized Performance** — Code splitting, debouncing, memoization

---

## 🎯 Problem Statement

Seismic data visualization and management tools are often fragmented, outdated, or non-existent. Researchers, analysts, and administrators face critical challenges:

| Challenge | Impact |
|:----------|:-------|
| ❌ **No Unified Dashboard** | Data scattered across raw JSON, CSV exports, USGS feeds — no centralized visual interface |
| ❌ **Poor Search & Filter** | Finding specific events among 40K+ records is slow without an advanced query UI |
| ❌ **No Real-Time Monitoring** | Live seismic events require manual checking instead of automatic dashboard refresh |
| ❌ **Limited Analytics** | Trend analysis, magnitude distribution, depth analysis need external tools |
| ❌ **No Access Control** | Sensitive operations (create/edit/delete) unprotected without role-based UI |
| ❌ **Non-Responsive Design** | Monitoring on mobile/tablet is impossible with desktop-only interfaces |

**Earthquake Analytics Frontend** solves all of these by providing a unified, secure, high-performance React SPA with real-time capabilities, advanced visualization, and role-based access control.

---

## 🚩 Project Goals

| Goal | Description |
|:-----|:------------|
| 🎯 **Complete Data Management UI** | Full CRUD with forms, validation, bulk upload |
| 🔐 **Secure Authentication UI** | Login, register, password management, protected routing |
| 👥 **Role-Based Interface** | Distinct UIs for user, moderator, admin roles |
| 📊 **Powerful Analytics Dashboard** | 6+ interactive chart types for seismic insights |
| 🔍 **Advanced Query Interface** | Debounced search, dynamic filters, sort, paginate |
| 📱 **Responsive Design** | Adaptive layout — desktop, tablet, mobile |
| ⚡ **Performance First** | Debouncing, lazy loading, memoization, optimized renders |
| 🧪 **Extensible Architecture** | Clean component tree, reusable utilities, centralized state |

---

## ✨ Features

### Core Features

- [x] **React 18 SPA** — Modern functional components with hooks
- [x] **Redux Toolkit State Management** — Centralized store with slices
- [x] **Material UI 5 Design System** — Premium component library with custom theming
- [x] **JWT Authentication Flow** — Login, register, auto-token injection
- [x] **Role-Based Access Control** — User, Moderator, Admin route protection
- [x] **Protected Routes** — `PrivateRoute` wrapper with role checking
- [x] **Dynamic Filtering** — 15+ filter parameters with debounced dispatch
- [x] **Multi-Field Sorting** — Sort by magnitude, depth, time, place
- [x] **Server-Side Pagination** — Page controls with total count + metadata
- [x] **Debounced Full-Text Search** — 500ms debounce for smooth search UX
- [x] **Interactive Charts** — Recharts: Line, Bar, Pie, Radar, Area
- [x] **Statistical Summary Cards** — Count, averages, distributions
- [x] **Real-Time Dashboard** — 30-second auto-refresh with live toggle
- [x] **Earthquake CRUD Forms** — Create/edit with validation and auto-derived fields
- [x] **Bulk Upload** — JSON file upload for batch earthquake creation
- [x] **Toast Notifications** — Context-based snackbar system
- [x] **Confirm Dialogs** — Delete confirmation with role-aware UI
- [x] **MUI Theme System** — Custom palette, typography, shape
- [x] **Responsive Layout** — Drawer + AppBar with mobile drawer toggle
- [x] **Axios Interceptors** — Auto token injection + 401 redirect
- [x] **Custom Hooks** — `useAuth`, `useDebounce`, `usePagination`, `useToast`, `useLocalStorage`
- [x] **Yup Integration Ready** — Schema validation for form inputs

### Analytics Features

| Feature | Chart Type | Data Source |
|:--------|:-----------|:------------|
| Monthly Seismic Activity | Line Chart (dual axis) | `monthlyAnalysis` |
| Magnitude Distribution | Donut Pie Chart | `magnitudeAnalysis` |
| Depth Profile Analysis | Radar Chart | `depthAnalysis` |
| Country Activity Zones | Horizontal Bar Chart | `countryAnalysis` |
| System Growth Trends | Area Chart (stacked) | `earthquakeTrend` + `userTrend` |
| Real-Time Seismic Feed | Activity List | `fetchEarthquakes` (live) |

---

## 🏭 Industry Features

| Feature | Category | Enterprise Benefit |
|:--------|:---------|:-------------------|
| Vite Build System | Tooling | Sub-second HMR, optimized production builds |
| Redux DevTools | Debugging | Time-travel debugging for state changes |
| Environment Config | DevOps | `VITE_` prefixed env vars for secure API URLs |
| Axios Interceptors | Reliability | Auto token injection + 401 auto-redirect |
| React Router v6 | Navigation | Nested routing, lazy loading, role guards |
| Debounced Inputs | UX | Smooth search/filter without excessive API calls |
| Live Auto-Refresh | UX | Real-time data without manual page reload |
| Loading States | UX | Skeleton/LinearProgress for all async operations |
| Error Boundaries | Reliability | Graceful error handling with user feedback |
| Responsive Grid | UX | MUI Grid with breakpoint-aware layouts |
| Consistent Theme | Design | MUI ThemeProvider with custom palette |
| Component Composition | Maintainability | Atomic component architecture |

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| ⚛️ **Framework** | React | ^18.2.0 | UI component library |
| 🗄 **State Management** | Redux Toolkit | ^1.9.5 | Centralized state with slices |
| 🎨 **UI Library** | MUI (Material) | ^5.14.3 | Premium component system |
| 📊 **Charts** | Recharts | ^2.8.0 | Interactive data visualization |
| 🌐 **HTTP Client** | Axios | ^1.5.0 | API communication with interceptors |
| 🧭 **Router** | React Router DOM | ^6.15.0 | Client-side routing |
| 📝 **Forms** | Formik | ^2.4.3 | Form state management |
| ✅ **Validation** | Yup | ^1.3.2 | Schema-based form validation |
| ⚡ **Build Tool** | Vite | ^4.4.9 | Fast dev server + optimized builds |
| 🎭 **Styling** | Tailwind CSS | ^3.3.3 | Utility-first CSS (supplemental) |
| 🔌 **Plugin** | @vitejs/plugin-react | ^4.0.4 | React Fast Refresh in Vite |
| 🎭 **Icons** | MUI Icons | ^5.14.3 | Material Design icon set |
| 🏷 **SEO** | react-helmet-async | ^1.3.0 | Dynamic document head management |

</div>

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│                  (React SPA, Vite Build)                      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS Request
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACT APPLICATION                          │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                ROUTER (React Router v6)              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │   │
│  │  │  Public  │ │  Auth    │ │  User   │ │  Admin │ │   │
│  │  │  Routes  │ │  Routes  │ │  Routes │ │ Routes │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘ │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │              REDUX STORE (4 Slices)                   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │   │
│  │  │  Auth    │ │Earthquake│ │Analytics │ │   UI   │ │   │
│  │  │  Slice   │ │  Slice   │ │  Slice   │ │  Slice │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘ │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │              SERVICE LAYER                             │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │   │
│  │  │   API    │ │   Auth   │ │Earthquake│ │Analytics│ │   │
│  │  │  Service │ │  Service │ │ Service  │ │ Service │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘ │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │              AXIOS HTTP CLIENT                         │   │
│  │  ┌────────────────────────────────────────────────┐   │   │
│  │  │  Request Interceptor: Attach JWT Token          │   │   │
│  │  │  Response Interceptor: Handle 401 → Redirect    │   │   │
│  │  └────────────────────────────────────────────────┘   │   │
│  └──────────────────────┬───────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│               BACKEND API (Express.js)                       │
│           http://localhost:5000/api/v1                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗 Frontend Architecture

This project follows a **Feature-First SPA Architecture** — a modular React application where code is organized by features (auth, earthquakes, analytics, UI) rather than by technical concerns.

### Why Feature-First?

| Benefit | Description |
|:--------|:------------|
| 🚀 **Scalable Organization** | Features grow independently without cross-contamination |
| 🔍 **Discoverable Code** | All related files (slice, API, components) co-located |
| 🧪 **Easier Testing** | Feature boundaries make unit testing straightforward |
| 👥 **Team Friendly** | Multiple developers can work on different features |
| 📦 **Code Splitting Ready** | Each feature can be lazy-loaded independently |
| 🔄 **Reusable Patterns** | Consistent slice/api/hooks pattern across all features |

### Architecture Layers

```
┌────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                      │
│  Pages → Components → Layouts → Common UI                 │
│  (Container components, page views, reusable widgets)      │
├────────────────────────────────────────────────────────────┤
│                    STATE MANAGEMENT LAYER                    │
│  Redux Store → Slices → Async Thunks → Reducers            │
│  (Centralized state, async actions, payload handling)      │
├────────────────────────────────────────────────────────────┤
│                     SERVICE LAYER                            │
│  Service Objects → API Calls → Data Transformation         │
│  (Axios abstraction, response parsing, error handling)      │
├────────────────────────────────────────────────────────────┤
│                     INFRASTRUCTURE LAYER                     │
│  Hooks → Utils → Constants → Validators → Formatters       │
│  (Custom hooks, shared utilities, domain helpers)           │
└────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action (click, type, submit)
    │
    ▼
React Component (dispatch action)
    │
    ▼
Redux Async Thunk (createAsyncThunk)
    │
    ▼
Service Layer (API call via Axios)
    │
    ▼
Axios Instance (auto-inject JWT)
    │
    ▼
Backend API (Express + MongoDB)
    │
    ▼
Response → Axios Interceptor → Service → Thunk
    │
    ▼
Redux Reducer (update state immutably)
    │
    ▼
React Component (re-render with new data)
    │
    ▼
DOM Update (virtual DOM diffing)
```

---

## 📁 Folder Structure

```
frontend/
│
├── src/
│   ├── components/                     # Reusable UI components
│   │   ├── common/                     # Atomic shared components
│   │   │   ├── Button.jsx              # Wrapped MUI Button with loading state
│   │   │   ├── Card.jsx                # Generic card with header/content/actions
│   │   │   ├── ConfirmDialog.jsx       # Confirmation modal for destructive actions
│   │   │   ├── Input.jsx               # Wrapped MUI TextField
│   │   │   ├── Loader.jsx              # Centered spinner with message
│   │   │   ├── Modal.jsx               # Reusable dialog with title/actions
│   │   │   ├── Pagination.jsx          # MUI Pagination with total count
│   │   │   ├── Select.jsx              # Wrapped MUI Select with options
│   │   │   ├── Table.jsx               # Data table with sort/pagination/renderers
│   │   │   ├── Toast.jsx               # Context-based snackbar notification system
│   │   │   └── ConfirmDialog.jsx       # Confirm/cancel dialog for delete operations
│   │   │
│   │   ├── layout/                     # Page layout components
│   │   │   ├── Layout.jsx              # Main layout: Sidebar + Navbar + Outlet + Footer
│   │   │   ├── Navbar.jsx              # Top app bar with user menu and branding
│   │   │   ├── Sidebar.jsx             # Navigation drawer with role-based items
│   │   │   └── Footer.jsx              # Simple copyright footer
│   │   │
│   │   ├── earthquakes/                # Earthquake-specific components
│   │   │   ├── EarthquakeTable.jsx     # Paginated table with action buttons
│   │   │   ├── EarthquakeFilters.jsx   # 8-field filter panel with debounce
│   │   │   ├── EarthquakeForm.jsx      # 20-field create/edit form
│   │   │   ├── EarthquakeDetails.jsx   # 24-field detail view grid
│   │   │   └── BulkUpload.jsx          # JSON file upload for batch creation
│   │   │
│   │   ├── charts/                     # Chart visualization components
│   │   │   ├── TimeSeriesChart.jsx     # Line chart (monthly activity)
│   │   │   ├── CountryPieChart.jsx     # Pie/donut chart (country distribution)
│   │   │   ├── DepthChart.jsx          # Bar chart (depth distribution)
│   │   │   └── MagnitudeChart.jsx      # Bar chart (magnitude distribution)
│   │   │
│   │   └── dashboard/                  # Dashboard widget components
│   │       ├── StatCard.jsx            # Metric card with icon/color/value
│   │       ├── ChartCard.jsx           # Card wrapper for chart components
│   │       ├── MapView.jsx             # Placeholder for map integration
│   │       └── RecentActivity.jsx      # Live activity feed list
│   │
│   ├── features/                       # Redux feature slices + API modules
│   │   ├── auth/                       # Authentication feature
│   │   │   ├── authSlice.js            # User state, login/logout thunks
│   │   │   └── authAPI.js              # Auth-specific API functions
│   │   │
│   │   ├── earthquakes/                # Earthquake data feature
│   │   │   ├── earthquakeSlice.js      # List state, CRUD thunks, filter/sort/page
│   │   │   └── earthquakeAPI.js        # Earthquake-specific API functions
│   │   │
│   │   ├── analytics/                  # Analytics feature
│   │   │   ├── analyticsSlice.js       # Chart data state, 6 analytics thunks
│   │   │   └── analyticsAPI.js         # Analytics-specific API functions
│   │   │
│   │   └── ui/                         # UI state feature
│   │       ├── uiSlice.js              # Sidebar, toast, theme state
│   │       └── themeSlice.js           # Light/dark mode toggle
│   │
│   ├── hooks/                          # Custom React hooks
│   │   ├── useAuth.js                  # Selector hook for auth state
│   │   ├── useDebounce.js              # Generic debounce hook (500ms default)
│   │   ├── usePagination.js            # Client-side pagination logic
│   │   ├── useLocalStorage.js          # Persistent state via localStorage
│   │   └── useToast.js                 # Toast notification hook (standalone)
│   │
│   ├── pages/                          # Page-level route components
│   │   ├── auth/                       # Authentication pages
│   │   │   ├── Login.jsx               # Login form with error handling
│   │   │   ├── Register.jsx            # User registration form
│   │   │   ├── ForgotPassword.jsx      # Password reset request
│   │   │   └── ResetPassword.jsx       # Password reset with token
│   │   │
│   │   ├── user/                       # User-facing pages
│   │   │   ├── UserDashboard.jsx       # Real-time monitoring dashboard
│   │   │   ├── Profile.jsx             # User profile view/edit
│   │   │   └── Settings.jsx            # User preferences
│   │   │
│   │   ├── earthquakes/                # Earthquake management pages
│   │   │   ├── EarthquakeList.jsx      # Paginated list with filters
│   │   │   ├── EarthquakeDetails.jsx   # Single record detail view
│   │   │   ├── CreateEarthquake.jsx    # New earthquake form
│   │   │   └── EditEarthquake.jsx      # Edit existing earthquake form
│   │   │
│   │   ├── analytics/                  # Analytics pages
│   │   │   ├── AnalyticsDashboard.jsx  # Main analytics with 4 chart types
│   │   │   ├── MagnitudeAnalytics.jsx  # Magnitude-focused analysis
│   │   │   ├── DepthAnalytics.jsx      # Depth-focused analysis
│   │   │   ├── CountryAnalytics.jsx    # Country-focused analysis
│   │   │   └── TimeAnalytics.jsx       # Time-series focused analysis
│   │   │
│   │   ├── statistics/                 # Statistics pages
│   │   │   ├── StatisticsDashboard.jsx # Summary stats with year filter
│   │   │   └── StatsCards.jsx          # Stat metric card grid
│   │   │
│   │   ├── search/                     # Search pages
│   │   │   ├── SearchPage.jsx          # Debounced search with results table
│   │   │   └── SearchResults.jsx       # Search results component
│   │   │
│   │   └── admin/                      # Admin-only pages
│   │       ├── AdminDashboard.jsx      # System control center
│   │       ├── UserManagement.jsx      # User CRUD management
│   │       ├── SystemSettings.jsx      # System configuration
│   │       └── AuditLogs.jsx           # Action audit trail viewer
│   │
│   ├── services/                       # Service layer (API abstraction)
│   │   ├── api.js                      # Axios instance with interceptors
│   │   ├── auth.service.js             # 11 auth endpoint methods
│   │   ├── earthquake.service.js        # 17 earthquake endpoint methods
│   │   ├── stats.service.js            # 13 statistics endpoint methods
│   │   └── analytics.service.js        # 8 analytics endpoint methods
│   │
│   ├── store/                          # Redux store configuration
│   │   └── store.js                    # configureStore with 4 slices
│   │
│   ├── utils/                          # Shared utilities
│   │   ├── constants.js                # Colors, categories, options
│   │   ├── formatters.js               # Number, date, percentage formatters
│   │   ├── helpers.js                  # Magnitude colors, depth labels, query builder
│   │   └── validators.js               # Email, password, earthquake validators
│   │
│   ├── styles/                         # Global styles
│   │   └── globals.css                 # Tailwind directives + base resets
│   │
│   ├── App.jsx                         # Root component: providers, router, theme
│   ├── main.jsx                        # Entry point: ReactDOM.createRoot
│   └── routes.jsx                      # (Alternate) Route definitions
│
├── dist/                               # Production build output
├── .env                                # Local env vars (gitignored)
├── .env.example                        # Env template
├── index.html                          # HTML entry point (Vite)
├── vite.config.js                      # Vite config (proxy, plugins, build)
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── package.json                        # Dependencies + scripts
├── README.md                           # This file
└── package-lock.json                   # Locked dependencies
```

### Folder & File Explanations

#### `src/components/common/`

Atomic reusable UI components that wrap MUI primitives with consistent styling and behavior. Each component exposes a clean prop interface.

**`Button.jsx`** — Wraps MUI `Button` with auto-loading state. When `loading={true}`, the button displays "Loading..." and disables interaction. Accepts all MUI button props plus custom `loading` prop.

```jsx
<Button loading={isSubmitting} variant="contained" onClick={handleSubmit}>
  Submit
</Button>
```

**`Card.jsx`** — Wraps MUI `Card` with `CardHeader`, `CardContent`, and `CardActions` slots. The `title` and `subtitle` props render the header; `action` receives a component for the top-right corner; `footer` renders bottom actions.

```jsx
<Card title="Seismic Activity" subtitle="Last 30 days" action={<RefreshIcon />}>
  <ChartComponent />
</Card>
```

**`Modal.jsx`** — Wraps MUI `Dialog` with a close button in the title bar. Accepts `open`, `onClose`, `title`, `children`, `actions`, `maxWidth`. Used for forms, detail views, and confirmations.

**`Table.jsx`** — Generic data table with sortable columns, pagination, custom cell renderers, empty state, and row click handlers. Column definition format:

```jsx
const columns = [
  { field: 'mag', label: 'Magnitude', sortable: true, align: 'right',
    render: (row) => <Chip label={row.mag} color={getMagnitudeColor(row.mag)} /> }
];
```

**`Toast.jsx`** — Context-based notification system. Wraps the app in `ToastProvider`, exposes `useToast()` hook with `showToast(message, severity)` and `hideToast()`. Uses MUI `Snackbar` + `Alert` with auto-dismiss (5s) at bottom-right.

**`Loader.jsx`** — Centered `CircularProgress` with optional message. `fullPage` mode centers vertically in the viewport for initial page loads.

**`Pagination.jsx`** — MUI `Pagination` component with first/last buttons and a total records counter. Callback via `onChange(page)`.

**`ConfirmDialog.jsx`** — Confirmation dialog for destructive actions. Shows title, message, cancel/confirm buttons. Customizable button colors and text.

**`Input.jsx`** and **`Select.jsx`** — Wrapped MUI form controls with consistent error/helper text rendering.

---

#### `src/components/layout/`

**`Layout.jsx`** — Main application shell using MUI `Box` with flex layout. Contains the sidebar (permanent on desktop), navbar (sticky), main content area with an `<Outlet />` for nested routes, and footer at the bottom. Uses responsive breakpoints to toggle sidebar visibility on mobile.

**`Navbar.jsx`** — Glassmorphism-style sticky app bar (`backdropFilter: blur(12px)`, semi-transparent background). Shows the "SeismicMonitor.pro" branding, the current user's name (desktop only), profile icon button, and logout button. The hamburger menu icon toggles the sidebar drawer on mobile.

**`Sidebar.jsx`** — Navigation drawer with three sections:
- **Administration** (admin only): Admin Center, User Management, Audit Logs
- **Monitoring**: Dashboard, Earthquakes, Analytics, Statistics, Search
- **Account**: My Profile, Settings
- Has a branded gradient header, role-based item rendering, active route highlighting, and a user info footer chip.

**`Footer.jsx`** — Simple sticky footer with copyright notice.

---

#### `src/components/earthquakes/`

**`EarthquakeTable.jsx`** — Data table for earthquake records with columns: Time, Place, Mag (color-coded chip), Depth, Type, Status (reviewed/automatic chip), Actions (View, Edit, Delete). Role-aware: edit/delete buttons only appear for admin/moderator. Integrates with MUI `TablePagination`.

**`EarthquakeFilters.jsx`** — Filter panel with 8 fields in a responsive grid: Country, Mag Type (select), Status (select), Network, Min/Max Magnitude, Min/Max Depth. Uses local state with a debounced effect (700ms) that dispatches Redux actions only when values change. Includes a Reset Filters button.

**`EarthquakeForm.jsx`** — Comprehensive 20-field form with sections for Required Information (datetime, place, country, lat/lng, depth, mag, magType, type) and Optional Details (net, status, gap, RMS, magError, NST, dmin, horizontalError, depthError, locationSource, magSource). Builds a processed data object, parsing numeric fields and conditionally including optionals.

**`EarthquakeDetails.jsx`** — 24-field read-only detail view in a responsive grid using a `DetailRow` sub-component. Shows every field from the earthquake schema including derived fields (depthCategory, magnitudeCategory, year, month, day).

**`BulkUpload.jsx`** — JSON file upload component. Reads a file via `FileReader`, parses it as JSON, and sends the array to the `onUpload` callback. Validates JSON format and file type.

---

#### `src/components/charts/`

**`TimeSeriesChart.jsx`** — Dual-axis `LineChart` (Recharts) with left Y-axis for event count and right Y-axis for average magnitude. Used for monthly activity trends.

**`CountryPieChart.jsx`** — `PieChart` with colored cells for country distribution. Uses a palette of 8 distinct colors. Labels show country name + count.

**`DepthChart.jsx`** — `BarChart` for depth distribution buckets. Single dataKey (`count`) with green fill.

**`MagnitudeChart.jsx`** — `BarChart` for magnitude categories. Single dataKey (`count`) with purple fill.

---

#### `src/components/dashboard/`

**`StatCard.jsx`** — Metric summary card with title, large value, icon with color, and optional subtitle. Loading state shows "..." instead of value.

**`ChartCard.jsx`** — `Card` wrapper with title/subtitle header and a height-controlled content area for chart components.

**`MapView.jsx`** — Placeholder component for future map integration. Displays earthquake count and a note about Leaflet/Google Maps integration readiness.

**`RecentActivity.jsx`** — Vertical activity feed list showing recent earthquakes with magnitude-coded avatar backgrounds, place name, magnitude chip, timestamp, and depth.

---

#### `src/features/`

**`auth/authSlice.js`** — Manages authentication state:
- Initial state reads from `localStorage` (persists across sessions)
- `login` thunk: calls `authService.login()`, stores token + user in `localStorage`
- `register` thunk: similar to login but creates new user
- `logout` thunk: clears `localStorage`, resets state
- Handles pending/fulfilled/rejected states for loading and error UX

```javascript
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};
```

**`earthquakes/earthquakeSlice.js`** — Manages earthquake list state:
- `fetchEarthquakes` — async thunk with params (page, limit, sort, filters)
- `fetchEarthquakeById`, `createEarthquake`, `updateEarthquake`, `deleteEarthquake` — CRUD thunks
- Reducers: `setFilters`, `resetFilters`, `setSort`, `setPage`
- Optimistic updates on create/update/delete (prepends to list, updates in-place, removes)

```javascript
const initialState = {
  earthquakes: [],
  currentEarthquake: null,
  total: 0,
  pagination: { page: 1, limit: 10, totalPages: 0, hasNext: false, hasPrev: false },
  loading: false,
  error: null,
  filters: { country: '', magType: '', status: '', minMagnitude: '', maxMagnitude: '', minDepth: '', maxDepth: '', net: '', year: '', month: '' },
  sort: '-time',
};
```

**`analytics/analyticsSlice.js`** — Manages analytics chart data:
- 6 async thunks: `fetchCountryAnalysis`, `fetchMagnitudeAnalysis`, `fetchDepthAnalysis`, `fetchMonthlyAnalysis`, `fetchHighestMagnitude`, `fetchDeepest`
- Keeps separate state for each analysis type
- Simple pending/fulfilled/rejected handling

**`ui/uiSlice.js`** — UI state: sidebar toggle, theme, toast notifications.

**`ui/themeSlice.js`** — Light/dark mode toggle via `toggleTheme` and `setThemeMode`.

---

#### `src/hooks/`

**`useAuth.js`** — Simple selector hook that extracts `{ user, token, isAuthenticated, loading, error }` from `state.auth`. Used throughout the app for conditional rendering.

**`useDebounce.js`** — Generic debounce hook. Returns a debounced version of the input value after the specified delay (default 500ms). Used by `SearchPage` to avoid API calls on every keystroke.

```javascript
const debouncedQuery = useDebounce(query, 500);
// API call triggers only when debouncedQuery changes
```

**`usePagination.js`** — Client-side pagination calculator. Takes `totalItems` and `itemsPerPage`, returns `currentPage`, `totalPages`, `goToPage`, `nextPage`, `prevPage`, `hasNext`, `hasPrev`, `startIndex`, `endIndex`.

**`useLocalStorage.js`** — Persists state to `localStorage`. Initializes from stored value or defaults. Updates `localStorage` on every state change via `useEffect`.

**`useToast.js`** — Standalone toast hook (separate from context-based Toast). Manages local toast state with 3-second auto-dismiss.

---

#### `src/services/`

**`api.js`** — Axios instance configured with `baseURL` from `VITE_API_URL` env var. Two interceptors:
- **Request interceptor**: Reads token from `localStorage` and attaches `Authorization: Bearer <token>` header
- **Response interceptor**: If a response returns 401 and the current page is not `/login`, clears stored token/user and redirects to `/login`

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});
```

**`auth.service.js`** — 11 methods: `login`, `register`, `logout`, `getProfile`, `updateProfile`, `changePassword`, `forgotPassword`, `resetPassword`, `verifyEmail`, `verifyToken`, `refreshToken`, `revokeToken`.

**`earthquake.service.js`** — 17 methods: `getAll`, `getById`, `create`, `update`, `delete`, `checkExists`, `bulkCreate`, `bulkUpdate`, `bulkDelete`, `getByCountry`, `getByPlace`, `getHighMagnitude`, `getDeep`, `getRecent`, `getCritical`, `getFiltered`, `getRandom`.

**`stats.service.js`** — 13 methods: `getCount`, `getHighestMagnitude`, `getDeepest`, `getAverageDepth`, `getAverageMagnitude`, `getCountryCount`, `getTypeCount`, `getReviewedCount`, `getMonthlyCount`, `getNetworkCount`, `getHighMagnitudeCount`, `getDeepCount`.

**`analytics.service.js`** — 8 methods: `getHighestMagnitude`, `getDeepest`, `getRecentActivity`, `getCountryAnalysis`, `getMagnitudeAnalysis`, `getDepthAnalysis`, `getMonthlyAnalysis`, `getErrorAnalysis`.

---

#### `src/utils/`

**`constants.js`** — Centralized constants: `API_URL`, `MAGNITUDE_COLORS` (minor→great), `DEPTH_CATEGORIES` (shallow/intermediate/deep), `ITEMS_PER_PAGE`, `MAGNITUDE_TYPES`, `STATUS_OPTIONS`.

**`formatters.js`** — Formatting utilities: `numberFormatter` (1K, 1M), `decimalFormatter` (fixed decimals), `percentageFormatter`, `dateFormatter` (e.g., "Jan 15, 2024"), `timeFormatter` (e.g., "10:30 AM"), `dateTimeFormatter`.

**`helpers.js`** — Domain helpers: `formatDate`, `getMagnitudeColor` (returns MUI color string based on mag value), `getDepthLabel`, `getMagnitudeLabel`, `truncateText`, `buildQueryString`.

**`validators.js`** — Domain validators: `validateEmail` (regex), `validatePassword` (min 6 chars), `validateEarthquake` (returns errors object or null).

---

#### `src/pages/`

**`auth/Login.jsx`** — Login form with email/password fields, loading spinner, error alerts (auto-clear after 5s), redirect on successful auth. Links to Register and Forgot Password.

**`auth/Register.jsx`** — Registration form with name/email/password. Auto-logs in on success.

**`auth/ForgotPassword.jsx`** — Email input to request password reset token.

**`auth/ResetPassword.jsx`** — Token + new password form for password reset.

**`user/UserDashboard.jsx`** — Real-time monitoring dashboard with:
- Live toggle (30-second auto-refresh interval)
- 4 stat cards (Total Events, Critical Events, Deep Events, Verified Reports)
- Real-time Seismic Feed (latest 5 earthquakes via `RecentActivity`)
- System Dynamics panel (connection status, sync mode, data size)
- Manual refresh button
- Loading indicator via `LinearProgress`

**`user/Profile.jsx`** — User profile view/edit page.

**`user/Settings.jsx`** — User preferences page.

**`earthquakes/EarthquakeList.jsx`** — Main earthquake management page with:
- 4 summary stat cards (Total, High Mag, Deep, Per Page)
- Filter panel (`EarthquakeFilters`)
- Data table (`EarthquakeTable`)
- Add New Event button (admin/moderator)
- Sync USGS button (admin only)
- Delete confirmation dialog
- Toast notifications for CRUD operations
- Pagination controls

**`earthquakes/CreateEarthquake.jsx`** and **`EditEarthquake.jsx`** — Form pages wrapping `EarthquakeForm` component.

**`analytics/AnalyticsDashboard.jsx`** — Comprehensive analytics page with:
- Year selector filter (fetches available years from backend)
- 3 highlight cards (Highest Magnitude, Deepest Event, Affected Countries)
- Monthly Seismic Activity Trend (dual-axis `LineChart`)
- Magnitude Categories (donut `PieChart`)
- Top 10 High Activity Zones (horizontal `BarChart`)
- Depth Profile Analysis (`RadarChart`)

**`analytics/MagnitudeAnalytics.jsx`**, **`DepthAnalytics.jsx`**, **`CountryAnalytics.jsx`**, **`TimeAnalytics.jsx`** — Dedicated pages for each analysis dimension.

**`statistics/StatisticsDashboard.jsx`** — Statistical summaries with year filtering. Shows total count, highest magnitude, average magnitude/depth, deepest, reviewed count. Includes Country and Type distribution tables.

**`search/SearchPage.jsx`** — Debounced full-text search (500ms). Searches across place, country, network, mag type. Shows results in a sortable table with magnitude-coded chips and status badges. Click any row to navigate to earthquake details.

**`admin/AdminDashboard.jsx`** — System control center with:
- Stat cards (Active Users, Seismic Records, System Health)
- System Growth Area Chart (dual: earthquakes + users)
- Live Notifications panel
- Recent Audit Logs table
- Sync USGS Data button

**`admin/UserManagement.jsx`** — Admin interface for managing users.

**`admin/AuditLogs.jsx`** — Audit trail viewer with action/resource filtering.

**`admin/SystemSettings.jsx`** — System configuration page.

---

#### `src/store/store.js`

Configures the Redux store with 4 slices using `configureStore`:

```javascript
export const store = configureStore({
  reducer: {
    auth: authReducer,
    earthquakes: earthquakeReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
```

Disables serializable check to accommodate Date objects and other non-serializable values in analytics data.

---

#### `src/App.jsx`

Root component that orchestrates the entire application:

```jsx
<Provider store={store}>          ← Redux store
  <ThemeProvider theme={theme}>   ← MUI custom theme
    <ToastProvider>               ← Toast notification context
      <Router>                    ← React Router (BrowserRouter)
        <Routes>                  ← Route definitions with PrivateRoute guards
          ...
        </Routes>
      </Router>
    </ToastProvider>
  </ThemeProvider>
</Provider>
```

MUI Theme details:
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#10b981` (Emerald)
- **Background**: `#f8fafc` (Slate 50)
- **Typography**: Inter font, h4 weight 800, h6 weight 700
- **Border Radius**: 12px (rounded modern look)

---

## 🔐 Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  Login   │         │  Auth    │         │  Redux   │         │  Backend │
│  Page    │         │  Service │         │  Store   │         │    API   │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ Login form         │                    │                    │
     │ (email,password)   │                    │                    │
     ├───────────────────►│                    │                    │
     │                    │ dispatch(login())  │                    │
     │                    ├───────────────────►│                    │
     │                    │                    │ authService.login()│
     │                    │                    ├───────────────────►│
     │                    │                    │                    │ POST /auth/login
     │                    │                    │                    │
     │                    │                    │◄───────────────────┤
     │                    │                    │ {user, token}      │
     │                    │                    │                    │
     │                    │                    │ Save to localStorage
     │                    │                    │ Update Redux state │
     │                    │                    │                    │
     │                    │                    │ Navigate to        │
     │                    │                    │ /dashboard         │
     │                    │                    │                    │
     │                    │                    │                    │
     │ Subsequent API Calls                   │                    │
     │ (axios automatically injects token)    │                    │
     ├────────────────────────────────────────────────────────────►│
     │                    │                    │                    │ GET /earthquakes
     │                    │                    │                    │ Authorization:
     │                    │                    │                    │ Bearer <token>
     │◄────────────────────────────────────────────────────────────┤
     │                    │                    │                    │
     │ On 401 Response    │                    │                    │
     │ (axios interceptor)│                    │                    │
     ├───────────────────►│                    │                    │
     │ Redirect to /login │                    │                    │
```

### Token Storage Strategy

```
┌─────────────────────────────────────────────┐
│              localStorage                    │
│                                              │
│  token: "eyJhbGciOiJIUzI1NiIs..."           │
│  user:  '{"name":"Admin","role":"admin"}'    │
│                                              │
└─────────────────────────────────────────────┘
```

- Token persists across browser sessions
- User object cached for instant role checks
- On app load, `authSlice` initializes from `localStorage`
- Logout clears both keys

---

## 🛡 Protected Routes

### PrivateRoute Component

```jsx
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role?.trim())) 
    return <Navigate to="/dashboard" />;
  
  return children;
};
```

### Route Protection Matrix

| Route | Auth Required | Allowed Roles | Protection |
|:------|:--------------|:--------------|:-----------|
| `/login`, `/register`, `/forgot-password`, `/reset-password` | ❌ | — | Public |
| `/dashboard` | ✅ | All | Auth check |
| `/earthquakes` | ✅ | All | Auth check |
| `/earthquakes/:id` | ✅ | All | Auth check |
| `/earthquakes/create` | ✅ | Admin, Moderator | Role check |
| `/earthquakes/:id/edit` | ✅ | Admin, Moderator | Role check |
| `/analytics` | ✅ | All | Auth check |
| `/statistics` | ✅ | All | Auth check |
| `/search` | ✅ | All | Auth check |
| `/profile`, `/settings` | ✅ | All | Auth check |
| `/admin/dashboard` | ✅ | Admin | Role check |
| `/admin/users` | ✅ | Admin | Role check |
| `/admin/audit-logs` | ✅ | Admin | Role check |

### DashboardRedirect Logic

```javascript
const DashboardRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return user?.role?.trim() === 'admin' 
    ? <Navigate to="/admin/dashboard" /> 
    : <Navigate to="/dashboard" />;
};
```

Role-based root redirect: admin users go to Control Center, others go to monitoring dashboard.

---

## 🗄 State Management

### Redux Store Structure

```
Store
├── auth
│   ├── user: { name, email, role, ... }
│   ├── token: "eyJ..."
│   ├── isAuthenticated: boolean
│   ├── loading: boolean
│   └── error: string | null
│
├── earthquakes
│   ├── earthquakes: [{ ... }, ...]
│   ├── currentEarthquake: { ... }
│   ├── total: 41523
│   ├── pagination: { page, limit, totalPages, hasNext, hasPrev }
│   ├── loading: boolean
│   ├── error: string | null
│   ├── filters: { country, magType, status, ... }
│   └── sort: "-time"
│
├── analytics
│   ├── countryAnalysis: { data: [...], ... }
│   ├── magnitudeAnalysis: { data: [...], ... }
│   ├── depthAnalysis: { data: [...], ... }
│   ├── monthlyAnalysis: { data: [...], ... }
│   ├── highestMagnitude: { data: {...}, ... }
│   ├── deepest: { data: {...}, ... }
│   ├── loading: boolean
│   └── error: string | null
│
└── ui
    ├── sidebarOpen: boolean
    ├── theme: "light"
    └── toast: { message, type } | null
```

### Async Thunk Pattern

```javascript
export const fetchEarthquakes = createAsyncThunk(
  'earthquakes/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await earthquakeService.getAll(params);
      return response;    // { success, data, pagination, total }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch earthquakes'
      );
    }
  }
);
```

### Reducer Pattern

```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchEarthquakes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchEarthquakes.fulfilled, (state, action) => {
      state.loading = false;
      state.earthquakes = action.payload.data;
      state.total = action.payload.total;
      state.pagination = action.payload.pagination;
    })
    .addCase(fetchEarthquakes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
```

---

## 🔗 API Integration Flow

```
Component (e.g., EarthquakeList)
    │
    │ useEffect() watches: page, limit, sort, filters
    │
    ▼
dispatch(fetchEarthquakes(params))
    │
    ▼
earthquakeSlice — createAsyncThunk
    │
    │ Calls service layer
    ▼
earthquakeService.getAll(params)
    │
    │ Calls Axios instance
    ▼
api.get('/earthquakes', { params })
    │
    │ Request Interceptor: Attaches Bearer token
    ▼
Axios → HTTP GET → Backend API
    │
    │ Response Interceptor: Checks for 401
    ▼
Backend responds with JSON
    │
    ▼
Service returns response.data
    │
    ▼
Async Thunk returns payload
    │
    ▼
Redux Reducer updates state
    │
    ▼
React re-renders with new data
    │
    ▼
DOM updates via Virtual DOM diff
```

### Axios Configuration (api.js)

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Request: Auto-inject JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

// Response: Auto-handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && 
        !window.location.pathname.includes('/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 📝 Form Handling & Validation

### Form Architecture

The app uses two form approaches:

1. **Custom forms with local state** — `EarthquakeForm.jsx` manages 20+ fields via `useState`. Each field change triggers `handleChange` which spreads the previous state. On submit, a `processedData` object is built with proper type coercion.

2. **Formik + Yup ready** — Formik and Yup are in the dependency tree for future migration to schema-based form management.

### Form Data Processing

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  const processedData = {
    time: formData.time,
    place: formData.place,
    latitude: parseFloat(formData.latitude),
    longitude: parseFloat(formData.longitude),
    depth: parseFloat(formData.depth),
    mag: parseFloat(formData.mag),
    magType: formData.magType || undefined,
    type: formData.type || undefined,
    status: formData.status || 'reviewed',
    net: formData.net || undefined,
  };
  if (formData.country) processedData.country = formData.country;
  // Only include optional numeric fields if non-empty
  if (formData.gap !== '') processedData.gap = parseFloat(formData.gap);
  if (formData.rms !== '') processedData.rms = parseFloat(formData.rms);
  // ... more optional fields
  onSubmit(processedData);
};
```

### Validation Layers

| Layer | Tool | Scope |
|:------|:-----|:------|
| **Client (MUI)** | `required`, `type`, `inputProps` | Required fields, number step/min/max |
| **Client (Custom)** | `validators.js` | Email regex, password length, earthquake logic |
| **API (Joi)** | Backend validation | Server-side schema enforcement |
| **API (Mongoose)** | Schema validation | Database-level constraints |

---

## 📄 Pagination System

### Server-Side Pagination (Primary)

The app uses backend-driven pagination for earthquake lists:

```javascript
// Redux state
pagination: { page: 1, limit: 10, totalPages: 0, hasNext: false, hasPrev: false }

// Dispatch with params
dispatch(fetchEarthquakes({ page: 2, limit: 25, sort: '-mag' }))
```

### Pagination Response Structure

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 3,
    "limit": 10,
    "totalPages": 42,
    "hasNext": true,
    "hasPrev": true
  },
  "total": 415
}
```

### Client-Side Pagination (usePagination hook)

For local data:

```javascript
const { currentPage, totalPages, goToPage, nextPage, prevPage, 
        hasNext, hasPrev, startIndex, endIndex } = usePagination(415, 10);
```

### EarthquakeTable Pagination

```jsx
<TablePagination
  component="div"
  count={total}
  page={page - 1}
  onPageChange={(e, p) => onPageChange(p + 1)}
  rowsPerPage={limit}
  onRowsPerPageChange={(e) => onLimitChange(parseInt(e.target.value))}
  rowsPerPageOptions={[5, 10, 25, 50]}
/>
```

---

## 🔍 Filtering System

### How Filters Work

The earthquake list page provides 8 filter fields that are debounced before dispatching Redux actions:

```
User changes filter field
    │
    ▼
Local state updates immediately (for responsive UI)
    │
    ▼
Debounce timer starts (700ms)
    │
    ▼
After 700ms, Redux action dispatched: dispatch(setFilters({ key: value }))
    │
    ▼
Page resets to 1
    │
    ▼
useEffect triggers fetchEarthquakes with new params
```

### Filter Fields

| Filter | Type | Default | Operator |
|:-------|:-----|:--------|:---------|
| Country | Text | "" | Exact match |
| Mag Type | Select | "" | Exact match |
| Status | Select | "" | Exact match |
| Network | Text | "" | Exact match |
| Min Magnitude | Number | "" | `>=` |
| Max Magnitude | Number | "" | `<=` |
| Min Depth | Number | "" | `>=` |
| Max Depth | Number | "" | `<=` |

### URL Query String Building

```javascript
export const buildQueryString = (params) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== undefined && value !== null)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
    .join('&');
  return query ? '?' + query : '';
};
```

---

## 🔎 Search Functionality

### Debounced Search

The search page uses a debounced input to prevent excessive API calls:

```javascript
const SearchPage = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // 500ms delay
  
  useEffect(() => {
    const search = async () => {
      const res = await api.get('/search/earthquakes', { 
        params: { q: debouncedQuery, page, limit } 
      });
      setResults(res.data.data || []);
    };
    search();
  }, [debouncedQuery, page, limit]);
```

### Searchable Fields

| Field | Search Type | Backend Query |
|:------|:------------|:--------------|
| `place` | Regex (case-insensitive) | `{ place: { $regex: "tokyo", $options: "i" } }` |
| `country` | Regex (case-insensitive) | `{ country: { $regex: "japan", $options: "i" } }` |
| `net` | Regex (case-insensitive) | `{ net: { $regex: "US", $options: "i" } }` |
| `magType` | Regex (case-insensitive) | `{ magType: { $regex: "mb", $options: "i" } }` |
| `type` | Regex (case-insensitive) | `{ type: { $regex: "explosion", $options: "i" } }` |
| `status` | Regex (case-insensitive) | `{ status: { $regex: "reviewed", $options: "i" } }` |

---

## 📊 Dashboard Pages

### User Dashboard (UserDashboard.jsx)

The real-time monitoring hub:

```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard                          [Refresh] [● LIVE]      │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│ │Total     │ │Critical  │ │Deep      │ │Verified  │       │
│ │41,523    │ │ 1,247    │ │ 8,902    │ │ 32,156   │       │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
│ ┌─────────────────────────────────┐ ┌──────────────────┐   │
│ │ Real-time Seismic Feed          │ │ System Dynamics  │   │
│ │ - Mag 5.2, Tokyo        [5.2]  │ │ MongoDB: Stable  │   │
│ │ - Mag 4.8, Lima         [4.8]  │ │ Sync: Live       │   │
│ │ - Mag 6.1, San Francisco[6.1]  │ │ Records: 41,523  │   │
│ │ - Mag 3.9, Auckland     [3.9]  │ │                  │   │
│ │ - Mag 5.7, Sumatra      [5.7]  │ │                  │   │
│ └─────────────────────────────────┘ └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Live toggle with 30-second auto-refresh interval
- Visual indicators (LinearProgress) during loading
- Real-time last-updated timestamp
- Manual refresh button

### Admin Dashboard (AdminDashboard.jsx)

System command center with administrative oversight:

```
┌─────────────────────────────────────────────────────────────┐
│  CONTROL CENTER                            [Sync USGS Data] │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│ │Active    │ │Seismic   │ │System    │                    │
│ │Users 128 │ │42K Recs  │ │Health 100%│                   │
│ └──────────┘ └──────────┘ └──────────┘                    │
│                                                             │
│ ┌─────────────────────────────────┐ ┌──────────────────┐   │
│ │ System Growth & Activity        │ │ Live Notifications│   │
│ │  [Area Chart: Records + Users]  │ │ ⚠ Sync completed │   │
│ │                                 │ │ ℹ New user joined│   │
│ │                                 │ │ ✓ System stable  │   │
│ └─────────────────────────────────┘ └──────────────────┘   │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ Recent Audit Logs                                    │    │
│ │ LOGIN  | Users    | Admin     | 02:30 PM             │    │
│ │ CREATE | Earthq.  | Moderator | 02:15 PM             │    │
│ │ DELETE | Earthq.  | Admin     | 01:45 PM             │    │
│ └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Analytics Pages

### Analytics Dashboard (AnalyticsDashboard.jsx)

Features 4 interactive chart types in a single page:

| Section | Chart Type | Data Source | Insights |
|:--------|:-----------|:------------|:---------|
| Highlight Cards | Metric cards | highestMagnitude, deepest, countryAnalysis | Quick stats at a glance |
| Monthly Seismic Activity | Dual-axis Line Chart | monthlyAnalysis | Event count + avg magnitude over time |
| Magnitude Categories | Donut Pie Chart | magnitudeAnalysis | Distribution across magnitude ranges |
| Top 10 High Activity Zones | Horizontal Bar Chart | countryAnalysis | Most seismically active countries |
| Depth Profile Analysis | Radar Chart | depthAnalysis | Depth distribution by range |

```jsx
// Example: Monthly Activity Line Chart
<LineChart data={monthlyAnalysis?.data || []}>
  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
  <XAxis dataKey="_id" axisLine={false} tickLine={false} />
  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px...' }} />
  <Legend iconType="circle" />
  <Line yAxisId="left" type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} />
  <Line yAxisId="right" type="monotone" dataKey="avgMagnitude" stroke="#10b981" strokeWidth={3} />
</LineChart>
```

---

## 📱 Responsive UI Strategy

### Breakpoint System

| Breakpoint | Width | Layout Behavior |
|:-----------|:------|:----------------|
| **xs** | < 600px | Single column, drawer as overlay, compact cards |
| **sm** | 600-900px | 2-column grids, sidebar hidden, hamburger menu |
| **md** | 900-1200px | 3-column grids, sidebar visible, normal layout |
| **lg** | > 1200px | 4-column grids, full sidebar, wide content area |

### Responsive Implementation

```jsx
// Sidebar: permanent on desktop, temporary drawer on mobile
<Drawer
  variant="permanent"
  sx={{
    display: { xs: open ? 'block' : 'none', md: 'block' },
    '& .MuiDrawer-paper': { 
      width: 230,
      position: { md: 'relative' },
    },
  }}
/>

// Grid: adaptive column count
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={3}>
    {/* Stat card fills full width on mobile, 4-column on desktop */}
  </Grid>
</Grid>

// Navbar: user name hidden on small screens
<Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
  {user?.name}
</Typography>

// Content padding: less on mobile
<Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
```

---

## ⚡ Performance Optimization

| Technique | Implementation | Impact |
|:----------|:---------------|:-------|
| **Debounced API Calls** | `useDebounce` (500ms search, 700ms filters) | Prevents N API calls per keystroke |
| **Server-Side Pagination** | Backend `skip()` + `limit()` | Only fetches 10-25 records per page |
| **Memoized Components** | `useMemo` in pagination, `React.memo`-ready composition | Prevents unnecessary re-renders |
| **Conditional Rendering** | Role-based buttons, loading spinners | Reduces DOM nodes |
| **Fade Transitions** | MUI `<Fade>` for activity feed | Smooth UI without layout thrashing |
| **Token Caching** | `localStorage` persistence | No re-login on page refresh |
| **Vite HMR** | Hot module replacement | Sub-second dev server reload |
| **Production Build** | Vite build with dead code elimination | Minified, tree-shaken bundles |
| **Lazy Loading Ready** | Dynamic imports supported by Vite | Route-level code splitting |
| **State Normalization** | Redux slices keep minimal state | Predictable state updates |

---

## 📈 Scalability Structure

### Vertical Scaling

```
┌──────────────────────────────┐
│    Single Vite/React Build   │
│    ↑ Optimize bundle size    │
│    ↑ Lazy load routes        │
│    ↑ Tree-shake dependencies │
│    ↑ CDN for static assets   │
└──────────────────────────────┘
```

### Horizontal Scaling

```
┌─────────┐    ┌─────────┐    ┌─────────┐
│  CDN    │───►│  S3 /   │───►│  Nginx  │
│ (Cloud- │    │  Static │    │ Reverse │
│  flare)  │    │  Host   │    │  Proxy   │
└─────────┘    └─────────┘    └────┬────┘
                                   │
                          ┌────────▼────────┐
                          │  Backend API    │
                          │  (Scaled)       │
                          └─────────────────┘
```

### Scaling Strategies

| Strategy | Implementation | When to Use |
|:---------|:---------------|:------------|
| **Code Splitting** | Route-level dynamic imports | Large feature sets |
| **CDN Caching** | Vite build → CDN | Static asset distribution |
| **API Caching** | Redux state persistence | Reduce redundant API calls |
| **Debounce** | Input delay optimization | High-frequency user input |
| **Memoization** | `useMemo`, `useCallback` | Expensive computations |

---

## 🚀 Deployment Setup

### Production Build

```bash
# Build optimized production bundle
npm run build

# Output in dist/
```

### Vite Build Configuration (vite.config.js)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,    // Disable sourcemaps in production
  },
});
```

### Deployment Options

| Platform | Config | Notes |
|:---------|:-------|:------|
| **Vercel** | Default Vite preset | Auto-detect, zero config |
| **Netlify** | Publish `dist/`, add redirects | SPA routing: `/* → /index.html` |
| **AWS S3 + CloudFront** | Static hosting + CDN | Enterprise-grade distribution |
| **Docker + Nginx** | Multi-stage build | Containerized deployment |
| **GitHub Pages** | `gh-pages` branch | Free hosting for open source |

---

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|:---------|:---------|:--------|:------------|
| `VITE_API_URL` | ❌ | `http://localhost:5000/api/v1` | Backend API base URL |

### `.env.example`

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api/v1
```

### How VITE_ Variables Work

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
```

- Only variables prefixed with `VITE_` are exposed to the client
- Vite replaces `import.meta.env.VITE_*` at build time
- Never store secrets in frontend env vars (they are public at runtime)

---

## 📦 Installation Steps

```bash
# Step 1: Navigate to frontend directory
cd global_earthquakes/frontend

# Step 2: Install all dependencies
npm install

# Step 3: Create environment file
cp .env.example .env

# Step 4: Edit .env if your backend runs on a different URL
# VITE_API_URL=http://localhost:5000/api/v1

# Step 5: Start the development server
npm run dev
```

---

## 💻 Local Development Setup

### Prerequisites Checklist

- [ ] Node.js >= 18.0.0 installed (`node --version`)
- [ ] npm >= 9.0.0 installed (`npm --version`)
- [ ] Backend API running on port 5000 (or update `.env`)
- [ ] Code editor (VS Code recommended)

### Verify Setup

```bash
node --version   # v18.x.x
npm --version    # v9.x.x
```

### Common Issues

| Issue | Solution |
|:------|:---------|
| Backend not running | Start backend: `cd ../backend && npm run dev` |
| CORS errors | Ensure backend `.env` has correct `FRONTEND_URL` |
| Proxy not working | Vite proxy forwards `/api` to `localhost:5000` |
| Port 5173 in use | Vite auto-picks next available port |

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Uses Vite dev server with Hot Module Replacement (HMR) — instant updates on file changes.

### Preview Production Build

```bash
npm run build
npm run preview
```

### Expected Output

```
  VITE v4.4.9  ready in 320ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  Proxy:   /api → http://localhost:5000
```

---

## 📦 Building for Production

```bash
# Production build
npm run build

# Output is in dist/
# Structure:
# dist/
# ├── index.html
# └── assets/
#     ├── index-<hash>.js
#     └── index-<hash>.css

# Preview production build locally
npm run preview
```

---

## 📅 Development Timeline

### Phase 1: Foundation (Days 1-2)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 1 | Project Setup | Vite + React init, folder structure, MUI theming, store setup |
| 2 | Core Infrastructure | Axios instance, service layer, auth slice, PrivateRoute |

### Phase 2: Layout & Navigation (Days 3-4)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 3 | Layout System | Layout, Navbar, Sidebar, Footer, routing structure |
| 4 | Common Components | Button, Card, Input, Select, Modal, Toast, Loader, Pagination |

### Phase 3: Authentication (Days 5-6)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 5 | Auth Pages | Login, Register, ForgotPassword, ResetPassword |
| 6 | Auth Integration | JWT flow, token persistence, auto-redirect, role-based guards |

### Phase 4: Earthquake Management (Days 7-9)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 7 | Earthquake List | EarthquakeTable with pagination + EarthquakeFilters with debounce |
| 8 | Earthquakes CRUD | Create/Edit form, detail view, delete with confirmation |
| 9 | Advanced Features | Bulk upload, sync USGS, specialized queries |

### Phase 5: Analytics & Dashboards (Days 10-12)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 10 | User Dashboard | StatCards, RecentActivity, live toggle, auto-refresh |
| 11 | Analytics Dashboard | 4 Recharts visualizations, year selector, highlight cards |
| 12 | Statistics Page | Year filter, stat cards, country/type distribution tables |

### Phase 6: Search & Admin (Days 13-14)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 13 | Search Page | Debounced full-text search, results table, pagination |
| 14 | Admin Pages | AdminDashboard, UserManagement, AuditLogs, SystemSettings |

### Phase 7: Finalization (Day 15)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 15 | Polish & Documentation | Responsive fixes, loading states, README, code cleanup |

---

## 🧠 Industry Best Practices

### Code Style

```jsx
// ✅ Good: Feature-First folder structure
import { fetchEarthquakes, setFilters } from '../../features/earthquakes/earthquakeSlice';

// ✅ Good: Custom hooks for reusable logic
const { user, isAuthenticated } = useAuth();
const debouncedValue = useDebounce(value, 500);

// ✅ Good: Redux Toolkit createAsyncThunk for API calls
export const fetchData = createAsyncThunk('slice/fetch', async (params) => {
  const response = await service.method(params);
  return response;
});

// ✅ Good: Centralized Axios instance with interceptors
const response = await api.get('/earthquakes', { params });

// ❌ Bad: Raw fetch calls in components
// ❌ Bad: Business logic in JSX
// ❌ Bad: Direct localStorage access in components
```

### Component Design

```jsx
// ✅ Good: Atomic component with clear props
<Button loading={isLoading} variant="contained" onClick={handleSubmit}>
  Save
</Button>

// ✅ Good: Composition over configuration
<Card title="Analytics" subtitle="Monthly trends">
  <ChartComponent data={data} />
</Card>

// ✅ Good: Container/Presenter pattern
const EarthquakeList = () => {
  const dispatch = useDispatch();
  const { earthquakes, total, pagination, loading } = useSelector(...);
  // Container logic here
  return <EarthquakeTable earthquakes={earthquakes} loading={loading} ... />;
};
```

### State Management

```javascript
// ✅ Good: Normalized Redux state
{ earthquakes: [], pagination: { page, limit, totalPages } }

// ✅ Good: Async thunks with error handling
createAsyncThunk('slice/action', async (data, { rejectWithValue }) => {
  try { return await service.call(data); }
  catch (err) { return rejectWithValue(err.message); }
});

// ✅ Good: Immutable updates with Redux Toolkit
state.earthquakes = state.earthquakes.filter(e => e._id !== action.payload);
```

### API Integration

```javascript
// ✅ Good: Service layer abstraction
const earthquakeService = {
  getAll: async (params) => {
    const response = await api.get('/earthquakes', { params });
    return response.data;
  }
};

// ✅ Good: Axios interceptors for cross-cutting concerns
api.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  return config;
});
```

---

## 🔮 Future Improvements

| Feature | Description | Priority |
|:--------|:------------|:---------|
| **Map Integration** | Interactive Leaflet/Google Maps for earthquake locations | High |
| **Dark Mode** | Complete dark theme variant via MUI ThemeProvider | Medium |
| **Internationalization** | i18n support for multi-language interface | Low |
| **PDF Export** | Export charts and tables as PDF reports | Medium |
| **Real-Time WebSockets** | Socket.io integration for instant data push | High |
| **Unit Tests** | Jest + React Testing Library for components | High |
| **Storybook** | Component library documentation and visual testing | Medium |
| **PWA Support** | Service worker, offline capability, install prompt | Low |
| **Advanced Filters** | Date range picker, multi-select, saved presets | Medium |
| **Accessibility** | ARIA labels, keyboard navigation, screen reader support | High |

---

## 🏁 Final Conclusion

**Earthquake Analytics Platform Frontend** is a production-ready, enterprise-grade React SPA that demonstrates:

- ✅ **Clean Feature-First Architecture** with strict separation of concerns
- ✅ **Premium Material UI Design** with custom theming and responsive layout
- ✅ **Secure Authentication UI** with JWT flow, protected routes, and role-based access
- ✅ **Advanced Data Visualization** with 6+ interactive Recharts chart types
- ✅ **Powerful Query Interface** with debounced search, dynamic filters, server pagination
- ✅ **Real-Time Capabilities** with live dashboard auto-refresh and activity feed
- ✅ **Comprehensive Form Management** with validation and bulk operations
- ✅ **Optimized Performance** with debouncing, memoization, and efficient state management
- ✅ **Scalable Structure** with feature-first folder organization and code-splitting readiness

This frontend is ready to serve as the visual interface for seismic monitoring dashboards, research platforms, early warning systems, and educational applications.

---

## 👨‍💻 Author & Developer

<div align="center">

<br>

<img src="https://img.shields.io/badge/Full--Stack%20Developer-000000?style=for-the-badge&logo=code&logoColor=white" alt="Full-Stack Developer" />
<img src="https://img.shields.io/badge/MERN%20Stack-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MERN Stack" />
<img src="https://img.shields.io/badge/Generative%20AI-FF6B6B?style=for-the-badge&logo=openai&logoColor=white" alt="Generative AI" />
<img src="https://img.shields.io/badge/React%20Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Frontend" />

<br>
<br>

### Kamlesh Chandela

**Full-Stack Developer** · **MERN Stack & Generative AI**

🎓 Student at **Swaminarayan University, Kalol**

<br>

---

This frontend was **fully designed and developed independently** by me — from React architecture and component design to Redux state management, API integration, data visualization, responsive UI, and comprehensive documentation.

<br>

| Area | Details |
|:-----|:--------|
| 🎨 **Frontend Architecture** | Designed and implemented the full feature-first SPA structure |
| ⚛️ **React Components** | Built 30+ reusable components with MUI 5 design system |
| 🗄 **State Management** | Redux Toolkit with 4 slices + async thunks for API integration |
| 🔐 **Authentication UI** | JWT-based login, register, protected routes, role-based access |
| 📊 **Data Visualization** | 6+ interactive Recharts chart types for seismic analytics |
| 🌐 **API Integration** | Axios service layer with request/response interceptors |
| 📱 **Responsive Design** | Mobile-first responsive layout with adaptive breakpoints |
| ✨ **UX & Performance** | Debounced inputs, loading states, live refresh, toast notifications |
| 📖 **Documentation** | Comprehensive developer-friendly frontend documentation |

<br>

---

### 🔗 Connect with Me

<br>

<a href="https://github.com/KamleshChandela" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>
<a href="https://kamleshchandela-portfolio.netlify.app/" target="_blank">
  <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" />
</a>
<a href="https://www.linkedin.com/in/kamlesh-chandela" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://x.com/Kamlesh__cg" target="_blank">
  <img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X / Twitter" />
</a>
<a href="https://leetcode.com/u/KamleshChandela/" target="_blank">
  <img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode" />
</a>
<a href="mailto:kamlesh.b.chandela.cg@gmail.com">
  <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
</a>

<br>
<br>

📧 **Email:** [kamlesh.b.chandela.cg@gmail.com](mailto:kamlesh.b.chandela.cg@gmail.com)  
🌐 **Portfolio:** [kamleshchandela-portfolio.netlify.app](https://kamleshchandela-portfolio.netlify.app/)  
💼 **LinkedIn:** [linkedin.com/in/kamlesh-chandela](https://www.linkedin.com/in/kamlesh-chandela)  
🐱 **GitHub:** [github.com/KamleshChandela](https://github.com/KamleshChandela)  

</div>
