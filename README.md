<div align="center">

# 🌍 Global Earthquakes — Analytics Platform

### Full-Stack Production-Grade Platform for Seismic Data Management, Visualization & Intelligence

<br>

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-7.5-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5.14-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Hash-3178C6?style=for-the-badge&logo=password&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.8-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.5-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![MVC](https://img.shields.io/badge/MVC-Architecture-FF6B6B?style=for-the-badge)
![RESTful](https://img.shields.io/badge/RESTful-API-6C5CE7?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

<br>

**Built with 💚 for the global seismic research community — from raw data to actionable intelligence.**

</div>

---

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

1. [Project Overview](#-project-overview)
2. [Key Capabilities](#-key-capabilities)
3. [Real-World Use Case](#-real-world-use-case)
4. [Tech Stack](#-tech-stack)
5. [Full-Stack Architecture](#-full-stack-architecture)
6. [Backend Architecture](#-backend-architecture)
7. [Frontend Architecture](#-frontend-architecture)
8. [API Communication Flow](#-api-communication-flow)
9. [Authentication Flow](#-authentication-flow)
10. [MongoDB Integration](#-mongodb-integration)
11. [Request/Response Lifecycle](#-requestresponse-lifecycle)
12. [Backend System](#-backend-system)
13. [Frontend System](#-frontend-system)
14. [Folder Structure](#-folder-structure)
15. [Environment Variables](#-environment-variables)
16. [API Documentation](#-api-documentation)
17. [Features Deep Dive](#-features-deep-dive)
18. [Charts & Data Visualization](#-charts--data-visualization)
19. [Setup & Installation](#-setup--installation)
20. [Local Development](#-local-development)
21. [Deployment Setup](#-deployment-setup)
22. [Performance Optimization](#-performance-optimization)
23. [Scalability Concepts](#-scalability-concepts)
24. [Security Best Practices](#-security-best-practices)
25. [Development Timeline](#-development-timeline)
26. [Industry Best Practices](#-industry-best-practices)
27. [Future Improvements](#-future-improvements)
28. [Final Conclusion](#-final-conclusion)
29. [Author & Developer](#-author--developer)
30. [License](#-license)

</details>

---

## 🌟 Project Overview

**Global Earthquakes Analytics Platform** is a production-ready, enterprise-grade **full-stack application** that processes, stores, analyzes, and visualizes global seismic event data. It combines a robust **Node.js + Express + MongoDB** backend with a feature-rich **React 18 + Redux Toolkit + Material UI 5** frontend to deliver a complete seismic data intelligence solution.

The platform handles **40,000+ earthquake records** from USGS and provides:

| Layer | Capability | Technologies |
|:------|:-----------|:-------------|
| 🗄 **Data Layer** | Store, index, and query 40K+ seismic records with sub-millisecond response times | MongoDB, Mongoose |
| 🔌 **API Layer** | 50+ RESTful endpoints with JWT auth, RBAC, validation, rate limiting | Express.js, Joi, JWT |
| 📊 **Analytics Engine** | 9 server-side aggregation pipelines for real-time seismic intelligence | MongoDB Aggregation |
| 🎨 **UI Layer** | Interactive dashboards, 6+ chart types, responsive design, live monitoring | React, Recharts, MUI |
| 🔐 **Auth Layer** | Full authentication system with role-based access (user, moderator, admin) | JWT, bcrypt, Redux |

---

## 🎯 Key Capabilities

| Capability | Backend | Frontend |
|:-----------|:--------|:---------|
| 📦 **Data Management** | Full CRUD + bulk operations on earthquake records | Form-based create/edit with validation |
| 🔍 **Advanced Querying** | 15+ dynamic filters, sorting, server-side pagination | Debounced filter panel with real-time updates |
| 🔎 **Full-Text Search** | Cross-field search (place, country, network, type, status) | Debounced search input with results table |
| 📊 **Analytics & Insights** | 9 MongoDB aggregation pipelines | 6 interactive chart types (Line, Bar, Pie, Radar, Area) |
| 🔐 **Authentication** | JWT auth with bcrypt password hashing | Login/register forms, token persistence, auto-redirect |
| 👥 **Role-Based Access** | User, Moderator, Admin roles with middleware guards | Protected routes with role-specific UI elements |
| 📱 **Responsive Design** | CORS, rate limiting, helmet security headers | Adaptive layout across desktop, tablet, mobile |
| ⚡ **Real-Time Monitoring** | Health check, request logging, audit trails | Live dashboard with 30-second auto-refresh |
| 📈 **Statistical Summaries** | Counts, averages, distributions | Stat cards, distribution tables, year filtering |

---

## 🌍 Real-World Use Case

Seismic data from global networks (USGS, EMSC, GEOFON) is vast, complex, and scattered across multiple formats and sources. Researchers, developers, and analysts face critical challenges:

| Challenge | Impact | Solution |
|:----------|:-------|:---------|
| ❌ **Data Scattered** | Earthquake data exists in raw JSON files and CSV exports — no unified interface | ✅ **Unified RESTful API** — 50+ endpoints with consistent JSON responses |
| ❌ **No Analytics** | Trend analysis requires external tools and manual data processing | ✅ **Built-in Analytics** — 9 aggregation pipelines + 6 interactive charts |
| ❌ **No Access Control** | Sensitive operations unprotected — anyone can modify data | ✅ **JWT Auth + RBAC** — User/Moderator/Admin roles with middleware guards |
| ❌ **Slow Queries** | Naive search over 40K+ records takes seconds without indexing | ✅ **MongoDB Indexing** — 8 indexes for sub-millisecond queries |
| ❌ **Poor UX** | Raw API responses are not human-readable | ✅ **Premium React SPA** — Interactive dashboards with real-time updates |

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| ⚡ **Runtime** | Node.js | 18.x LTS | JavaScript runtime environment |
| 🌐 **Backend Framework** | Express.js | ^4.18.2 | HTTP server & routing |
| 🗄 **Database** | MongoDB | 7.0 | Document-based NoSQL database |
| 📦 **ODM** | Mongoose | ^7.5.0 | Schema modeling & data validation |
| ⚛️ **Frontend Framework** | React | ^18.2.0 | UI component library |
| 🗃 **State Management** | Redux Toolkit | ^1.9.5 | Centralized state with slices |
| 🎨 **UI Library** | MUI (Material) | ^5.14.3 | Premium component system |
| 📊 **Charts** | Recharts | ^2.8.0 | Interactive data visualization |
| 🌐 **HTTP Client** | Axios | ^1.5.0 | API communication with interceptors |
| 🧭 **Router** | React Router DOM | ^6.15.0 | Client-side routing |
| 🔑 **Auth (Backend)** | jsonwebtoken | ^9.0.2 | Stateless JWT authentication |
| 🔒 **Password** | bcryptjs | ^2.4.3 | Password hashing (12 rounds) |
| 🛡 **Security** | helmet | ^7.0.0 | HTTP header security |
| ⏱ **Rate Limit** | express-rate-limit | ^6.10.0 | API request throttling |
| ✅ **Validation** | joi | ^17.10.1 | Schema-based request validation |
| 📝 **Logging** | winston | ^3.10.0 | Production-grade logging |
| ⚡ **Build Tool** | Vite | ^4.4.9 | Fast dev server + optimized builds |
| 📝 **Forms** | Formik + Yup | ^2.4 / ^1.3 | Form state management & validation |
| 🎭 **Styling** | Tailwind CSS | ^3.3.3 | Utility-first CSS |

</div>

---

## 🏗 Full-Stack Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                               │
│              React SPA (Vite Build, Port 5173)                       │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    REACT APPLICATION                          │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌─────────────┐ │    │
│  │  │  Router   │ │   Pages   │ │Components │ │   Hooks     │ │    │
│  │  │(React v6) │ │   (24)    │ │  (25+)    │ │   (5)       │ │    │
│  │  └───────────┘ └───────────┘ └───────────┘ └─────────────┘ │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │              REDUX STORE (4 Slices)                   │   │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │   │    │
│  │  │  │  Auth    │ │Earthquake│ │Analytics │ │   UI   │ │   │    │
│  │  │  │  Slice   │ │  Slice   │ │  Slice   │ │  Slice │ │   │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └────────┘ │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │              SERVICE LAYER (4 Services)               │   │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │   │    │
│  │  │  │   API    │ │   Auth   │ │Earthquake│ │Analytics│ │   │    │
│  │  │  │  Service │ │  Service │ │ Service  │ │ Service │ │   │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └────────┘ │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │           AXIOS HTTP CLIENT (Interceptors)             │   │    │
│  │  │  Request: Auto-inject JWT Token                        │   │    │
│  │  │  Response: 401 → Clear session → Redirect to /login   │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ HTTP (Proxy: /api → localhost:5000)
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER (Port 5000)                      │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │              MIDDLEWARE PIPELINE                               │    │
│  │  helmet → cors → json() → rateLimiter → logger → auth → ... │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                              │                                        │
│  ┌──────────────────────────▼──────────────────────────────────┐    │
│  │                 ROUTER (6 Route Modules)                     │    │
│  │  ┌──────────┐ ┌──────┐ ┌──────────┐ ┌──────┐ ┌─────────┐ │    │
│  │  │Earthquake│ │ Auth │ │Analytics │ │ Stats│ │  Admin  │ │    │
│  │  │(22+ endpts)│(8 endpts)│(9 endpts)│(10 endpts)│(5 endpts)│ │    │
│  │  └──────────┘ └──────┘ └──────────┘ └──────┘ └─────────┘ │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                              │                                        │
│  ┌──────────────────────────▼──────────────────────────────────┐    │
│  │               CONTROLLER → SERVICE → MODEL                     │    │
│  │  5 Controllers → 3 Services → 3 Models → MongoDB Collection │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    MONGODB (40K+ records)                     │    │
│  │  ┌──────────────────┐ ┌──────────┐ ┌──────────────────┐    │    │
│  │  │  Earthquakes     │ │  Users  │ │   AuditLogs      │    │    │
│  │  │  (8 indexes)     │ │(indexed)│ │(compound indexed) │    │    │
│  │  └──────────────────┘ └──────────┘ └──────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🏗 Backend Architecture

### Monolithic MVC Structure

The backend follows a **Monolithic MVC Architecture** — a single deployable unit with strict separation of concerns:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   MODEL     │────▶│   VIEW      │────▶│ CONTROLLER  │
│ (Mongoose)  │     │ (JSON Res)  │     │  (Handler)  │
└──────┬──────┘     └─────────────┘     └──────┬──────┘
       │                                       │
       ▼                                       ▼
┌──────────────────────────────────────────────────────┐
│                   SERVICE LAYER                        │
│          (Business Logic & Data Operations)            │
└──────────────────────────────────────────────────────┘
```

| Layer | Files | Responsibility |
|:------|:------|:---------------|
| **Model** | `models/*.js` | Mongoose schemas, validation, indexes, pre-save hooks |
| **View** | Controller responses | JSON serialization (standardized format) |
| **Controller** | `controllers/*.js` | Parse request, call service, send response |
| **Service** | `services/*.js` | Business logic, aggregation, data transformation |
| **Routes** | `routes/*.js` | URL mapping, middleware chaining |
| **Middleware** | `middlewares/*.js` | Auth, validation, logging, rate limiting, error handling |

### Request Flow Through MVC

```
Client → Route → Middleware Chain → Controller → Service → Model → MongoDB
                                         │
                                         ▼
Client ← JSON ← Controller ← Service ← Model
```

---

## 🏗 Frontend Architecture

### Feature-First SPA Structure

The frontend follows a **Feature-First SPA Architecture** — code is organized by features (auth, earthquakes, analytics, UI) rather than by technical concerns:

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

### Redux Store Structure

```
Store (configureStore)
├── auth
│   ├── user: { name, email, role, ... }
│   ├── token: "eyJ..."
│   ├── isAuthenticated: boolean
│   ├── loading: boolean
│   └── error: string | null
│
├── earthquakes
│   ├── earthquakes: [{ ... }, ...]
│   ├── total: 41523
│   ├── pagination: { page, limit, totalPages, hasNext, hasPrev }
│   ├── filters: { country, magType, status, minMagnitude, ... }
│   └── sort: "-time"
│
├── analytics
│   ├── countryAnalysis, magnitudeAnalysis, depthAnalysis
│   ├── monthlyAnalysis, highestMagnitude, deepest
│   ├── loading: boolean
│   └── error: string | null
│
└── ui
    ├── sidebarOpen: boolean
    ├── theme: "light"
    └── toast: { message, type } | null
```

---

## 🔗 API Communication Flow

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   React          │     │   Axios Instance  │     │   Express API    │
│   Component      │────▶│   (api.js)        │────▶│   (Port 5000)   │
│                  │     │                   │     │                  │
│  Dispatches      │     │  Request Int:     │     │  /api/v1/        │
│  Redux Thunk     │     │  Attach JWT       │     │  Middleware      │
│                  │     │                   │     │  Pipeline       │
│  Receives        │◄────│  Response Int:    │◄────│  Controller     │
│  Updated State   │     │  Handle 401       │     │  → Service      │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                                                            │
                                                            ▼
                                                  ┌──────────────────┐
                                                  │    MongoDB       │
                                                  │  (40K+ records)  │
                                                  └──────────────────┘
```

### Data Flow for a Typical Request

```
1. User interaction (e.g., clicks "Load Earthquakes")
2. React component dispatches: dispatch(fetchEarthquakes(params))
3. Redux async thunk calls: earthquakeService.getAll(params)
4. Service calls: api.get('/earthquakes', { params })
5. Axios request interceptor attaches Bearer token from localStorage
6. Express receives request, runs middleware pipeline
7. Controller extracts params, calls service method
8. Service builds MongoDB query with filters/sort/pagination
9. Mongoose executes query against indexed collection
10. MongoDB returns documents (sub-millisecond)
11. Response flows back through controller → Express → Axios → Thunk → Reducer
12. React re-renders with new data
```

---

## 🔐 Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  Login   │         │  Auth    │         │  Redux   │         │  Backend │
│  Page    │         │  Service │         │  Store   │         │    API   │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ Login (email/pass) │                    │                    │
     ├───────────────────►│                    │                    │
     │                    │ dispatch(login())  │                    │
     │                    ├───────────────────►│                    │
     │                    │                    │ authService.login()│
     │                    │                    ├───────────────────►│
     │                    │                    │                    │ POST /auth/login
     │                    │                    │                    │ bcrypt.compare()
     │                    │                    │                    │ jwt.sign(id)
     │                    │                    │◄───────────────────┤
     │                    │                    │ {user, token}      │
     │                    │                    │                    │
     │                    │                    │ Save to localStorage
     │                    │                    │ Update Redux state │
     │                    │                    │ Navigate to /dashboard
     │                    │                    │                    │
     │                    │                    │                    │
     │ Subsequent API Calls (auto-inject JWT via Axios interceptor)  │
     ├────────────────────────────────────────────────────────────►│
     │                    │                    │                    │
     │ On 401 (Expired/Invalid Token)                               │
     │◄─────────────────────────────────────────────────────────────┤
     │                    │                    │                    │
     │ Clear localStorage │                    │                    │
     │ Redirect to /login │                    │                    │
```

### JWT Token Payload

```json
{
  "id": "6655abc123def456",
  "iat": 1718456789,
  "exp": 1719061589
}
```

### Role-Based Access Control

| Role | Backend Permission | Frontend Access |
|:-----|:-------------------|:----------------|
| 👤 **User** | Read earthquake data, manage own profile | Dashboard, Earthquakes (view), Analytics, Statistics, Search, Profile, Settings |
| 🛡 **Moderator** | Create + update earthquake records | All User access + Create/Edit earthquake pages |
| ⚙️ **Admin** | Full CRUD, user management, audit logs | All access + Admin Dashboard, User Management, Audit Logs, Sync USGS |

---

## 🗄 MongoDB Integration

### Schema Design

| Schema | Key Fields | Indexes | Hooks |
|:-------|:-----------|:--------|:------|
| **Earthquake** | id, time, place, lat/lng, depth, mag, magType, net, status, country, categories | 8 indexes (compound, text, unique) | Pre-save: derive country, year, month, day, hour, depthCategory, magnitudeCategory |
| **User** | name, email, password (hashed), role, isActive, preferences | Email unique | Pre-save: bcrypt hash (12 rounds) |
| **AuditLog** | userId, action, resource, resourceId, details, ipAddress, timestamp | 2 compound indexes | — |

### Indexing Strategy

```javascript
earthquakeSchema.index({ latitude: 1, longitude: 1 });      // Geospatial queries
earthquakeSchema.index({ mag: -1 });                          // High-magnitude sorting
earthquakeSchema.index({ depth: 1 });                         // Depth range queries
earthquakeSchema.index({ time: -1 });                         // Recent-first queries
earthquakeSchema.index({ place: 'text' });                    // Full-text search
earthquakeSchema.index({ country: 1, status: 1 });            // Compound filter
earthquakeSchema.index({ magType: 1, net: 1 });               // Network analysis
earthquakeSchema.index({ id: 1 }, { unique: true });          // USGS ID lookup
```

### Pre-Save Hook (Automatic Derivation)

| Field | Derivation Rule |
|:------|:----------------|
| `country` | Last element of `place` split by comma |
| `year`, `month`, `day`, `hour` | Extracted from `time` Date object |
| `depthCategory` | `< 70 → shallow`, `< 300 → intermediate`, `≥ 300 → deep` |
| `magnitudeCategory` | `< 4 → minor`, `< 5 → light`, `< 6 → moderate`, `< 7 → strong`, `< 8 → major`, `≥ 8 → great` |

---

## 🔄 Request/Response Lifecycle

```
1. Client sends HTTP Request
    │
2. Vite dev server proxies /api to Express (port 5000)
    │
3. Express Application Middleware (global):
    │  a. helmet()         → Security headers
    │  b. cors()           → CORS whitelist check
    │  c. express.json()   → Body parsing (10MB limit)
    │  d. express.urlencoded() → URL-encoded data
    │
4. Route Middleware (per-route):
    │  a. apiLimiter       → Rate limit: 100 req / 15 min
    │  b. authLimiter      → Auth rate limit: 5 req / 1 hour
    │  c. loggerMiddleware → Custom request logging
    │  d. protect()        → JWT verification
    │  e. restrictTo()     → Role authorization
    │  f. validateEarthquake → Joi schema validation
    │
5. Controller executes:
    │  a. Extract params from req.params, req.query, req.body
    │  b. Call appropriate service method
    │
6. Service executes business logic:
    │  a. Build MongoDB filter object (filterBuilder.js)
    │  b. Apply pagination (skip, limit)
    │  c. Apply sorting
    │  d. Execute query via Mongoose
    │
7. Mongoose executes MongoDB query using indexes
    │
8. Service returns data to controller
    │
9. Controller formats JSON response:
    │  { success: true, message: "...", data: [...], pagination: {...} }
    │
10. Express sends HTTP response
    │
11. Axios response interceptor checks for 401
    │
12. Redux reducer updates state
    │
13. React re-renders UI with new data
```

---

## 📁 Folder Structure

```
global_earthquakes/
│
├── backend/                              # 🖥 Backend API Server
│   ├── server.js                         # Entry point — starts HTTP server
│   │
│   ├── src/
│   │   ├── app.js                        # Express app factory — middleware + routes
│   │   │
│   │   ├── config/                       # Application configuration
│   │   │   ├── db.config.js              # MongoDB connection with event handlers
│   │   │   └── rateLimit.config.js       # Rate limit constants
│   │   │
│   │   ├── models/                       # Mongoose data models
│   │   │   ├── Earthquake.model.js       # 30+ fields, 8 indexes, pre-save hooks
│   │   │   ├── User.model.js             # bcrypt hashing, role enum, soft-delete
│   │   │   └── AuditLog.model.js         # Audit trail with action/resource tracking
│   │   │
│   │   ├── controllers/                  # HTTP request handlers (thin layer)
│   │   │   ├── earthquake.controller.js  # 20+ CRUD, info, bulk, specialized endpoints
│   │   │   ├── auth.controller.js        # Register, login, profile, password management
│   │   │   ├── analytics.controller.js   # 9 aggregation-powered analytics endpoints
│   │   │   ├── stats.controller.js       # 10 statistical summary endpoints
│   │   │   ├── search.controller.js      # Cross-field full-text search
│   │   │   └── admin.controller.js       # User management & audit log queries
│   │   │
│   │   ├── services/                     # Business logic layer (thick services)
│   │   │   ├── earthquake.service.js     # CRUD, pagination, bulk ops, specialized queries
│   │   │   ├── analytics.service.js      # 9 MongoDB aggregation pipelines
│   │   │   └── auth.service.js           # Token generation, password reset, sanitization
│   │   │
│   │   ├── routes/                       # Route definitions with middleware chaining
│   │   │   ├── index.js                  # Route aggregator
│   │   │   └── v1/
│   │   │       ├── earthquake.routes.js  # 22+ CRUD + info + specialized endpoints
│   │   │       ├── auth.routes.js        # 8 authentication endpoints
│   │   │       ├── analytics.routes.js   # 9 analytics endpoints
│   │   │       ├── stats.routes.js       # 10 statistics endpoints
│   │   │       ├── search.routes.js      # Full-text search endpoint
│   │   │       └── admin.routes.js       # Admin-only management endpoints
│   │   │
│   │   ├── middlewares/                  # Express middleware pipeline
│   │   │   ├── auth.middleware.js        # JWT verify (protect) + role restriction
│   │   │   ├── error.middleware.js       # Global error handler
│   │   │   ├── validation.middleware.js  # Joi schema validation
│   │   │   ├── logger.middleware.js      # Custom request logging
│   │   │   ├── rateLimit.middleware.js   # Three-tier rate limiter
│   │   │   └── upload.middleware.js      # Multer file upload config
│   │   │
│   │   ├── validations/                  # Joi validation schemas
│   │   │   ├── earthquake.validation.js  # Create & update schemas
│   │   │   ├── auth.validation.js        # Register, login, password reset schemas
│   │   │   └── user.validation.js        # Profile update schemas
│   │   │
│   │   ├── utils/                        # Shared utilities
│   │   │   ├── AppError.js               # Custom operational error class
│   │   │   ├── catchAsync.js             # Async wrapper (eliminates try/catch)
│   │   │   ├── filterBuilder.js          # Fluent MongoDB filter builder
│   │   │   ├── pagination.util.js        # Pagination calculator
│   │   │   ├── validators.js             # Domain validators
│   │   │   ├── email.service.js          # SMTP-ready email abstraction
│   │   │   └── logger.js                 # Winston logger (file + console)
│   │   │
│   │   ├── scripts/                      # CLI automation
│   │   │   ├── seedDatabase.js           # Database seeder (populates 40K records)
│   │   │   └── backupData.js             # Timestamped JSON backup
│   │   │
│   │   └── data/                         # Sample datasets
│   │       └── earthquakes.json          # Sample records for seeding
│   │
│   ├── .env                              # Environment variables (gitignored)
│   ├── .env.example                      # Env template with documentation
│   ├── .gitignore                        # Git exclusion rules
│   ├── package.json                      # Dependencies + scripts
│   └── README.md                         # Backend documentation
│
├── frontend/                             # 🎨 Frontend React SPA
│   ├── index.html                        # HTML entry point (Vite)
│   ├── vite.config.js                    # Vite config (proxy, plugins, build)
│   ├── tailwind.config.js                # Tailwind CSS configuration
│   ├── postcss.config.js                 # PostCSS configuration
│   │
│   ├── public/                           # Static assets
│   │
│   ├── src/
│   │   ├── main.jsx                      # Entry point (ReactDOM.createRoot)
│   │   ├── App.jsx                       # Root component: providers, router, theme
│   │   │
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── common/                   # Atomic shared components (10 files)
│   │   │   │   ├── Button.jsx            # Loading-aware wrapped MUI Button
│   │   │   │   ├── Card.jsx              # Generic Card with header/content/actions
│   │   │   │   ├── Input.jsx             # Wrapped MUI TextField
│   │   │   │   ├── Select.jsx            # Wrapped MUI Select
│   │   │   │   ├── Modal.jsx             # Reusable Dialog with close button
│   │   │   │   ├── Table.jsx             # Data table with sort/pagination
│   │   │   │   ├── Pagination.jsx        # Pagination with total count
│   │   │   │   ├── Loader.jsx            # Centered spinner with message
│   │   │   │   ├── Toast.jsx             # Context-based snackbar system
│   │   │   │   └── ConfirmDialog.jsx     # Confirmation modal
│   │   │   │
│   │   │   ├── layout/                   # Page layout components
│   │   │   │   ├── Layout.jsx            # Main layout shell (sidebar + navbar + outlet)
│   │   │   │   ├── Navbar.jsx            # Glassmorphism app bar with user menu
│   │   │   │   ├── Sidebar.jsx           # Role-based navigation drawer
│   │   │   │   └── Footer.jsx            # Copyright footer
│   │   │   │
│   │   │   ├── earthquakes/              # Earthquake-specific components
│   │   │   │   ├── EarthquakeTable.jsx   # Paginated table with action buttons
│   │   │   │   ├── EarthquakeFilters.jsx # 8-field debounced filter panel
│   │   │   │   ├── EarthquakeForm.jsx    # 20-field create/edit form
│   │   │   │   ├── EarthquakeDetails.jsx # 24-field detail view grid
│   │   │   │   └── BulkUpload.jsx        # JSON file upload for batch creation
│   │   │   │
│   │   │   ├── charts/                   # Chart visualization components
│   │   │   │   ├── TimeSeriesChart.jsx   # Line chart (monthly activity)
│   │   │   │   ├── CountryPieChart.jsx   # Pie/donut chart (country distribution)
│   │   │   │   ├── DepthChart.jsx        # Bar chart (depth distribution)
│   │   │   │   └── MagnitudeChart.jsx    # Bar chart (magnitude distribution)
│   │   │   │
│   │   │   └── dashboard/                # Dashboard widget components
│   │   │       ├── StatCard.jsx          # Metric card with icon/value/color
│   │   │       ├── ChartCard.jsx         # Card wrapper for charts
│   │   │       ├── MapView.jsx           # Map integration placeholder
│   │   │       └── RecentActivity.jsx    # Live activity feed list
│   │   │
│   │   ├── features/                     # Redux feature slices
│   │   │   ├── auth/                     # Authentication state
│   │   │   │   ├── authSlice.js          # Login/logout thunks, localStorage persistence
│   │   │   │   └── authAPI.js            # Auth-specific API functions
│   │   │   ├── earthquakes/              # Earthquake data state
│   │   │   │   ├── earthquakeSlice.js    # CRUD thunks, filters, sort, pagination
│   │   │   │   └── earthquakeAPI.js      # Earthquake-specific API functions
│   │   │   ├── analytics/                # Analytics data state
│   │   │   │   ├── analyticsSlice.js     # 6 analytics async thunks
│   │   │   │   └── analyticsAPI.js       # Analytics-specific API functions
│   │   │   └── ui/                       # UI state
│   │   │       ├── uiSlice.js            # Sidebar, toast, theme
│   │   │       └── themeSlice.js         # Light/dark mode
│   │   │
│   │   ├── hooks/                        # Custom React hooks
│   │   │   ├── useAuth.js                # Auth state selector
│   │   │   ├── useDebounce.js            # Generic debounce (500ms default)
│   │   │   ├── usePagination.js          # Client-side pagination calculator
│   │   │   ├── useLocalStorage.js        # Persistent localStorage state
│   │   │   └── useToast.js               # Toast notification hook
│   │   │
│   │   ├── pages/                        # Page-level route components (24 pages)
│   │   │   ├── auth/                     # Login, Register, ForgotPassword, ResetPassword
│   │   │   ├── user/                     # UserDashboard, Profile, Settings
│   │   │   ├── earthquakes/              # EarthquakeList, Details, Create, Edit
│   │   │   ├── analytics/                # AnalyticsDashboard, Magnitude, Depth, Country, Time
│   │   │   ├── statistics/               # StatisticsDashboard, StatsCards
│   │   │   ├── search/                   # SearchPage, SearchResults
│   │   │   └── admin/                    # AdminDashboard, UserManagement, AuditLogs, SystemSettings
│   │   │
│   │   ├── services/                     # API service layer
│   │   │   ├── api.js                    # Axios instance with interceptors
│   │   │   ├── auth.service.js           # 11 auth endpoint methods
│   │   │   ├── earthquake.service.js     # 17 earthquake endpoint methods
│   │   │   ├── stats.service.js          # 13 statistics endpoint methods
│   │   │   └── analytics.service.js      # 8 analytics endpoint methods
│   │   │
│   │   ├── store/                        # Redux store configuration
│   │   │   └── store.js                  # configureStore with 4 slices
│   │   │
│   │   ├── utils/                        # Shared utilities
│   │   │   ├── constants.js              # Colors, categories, options
│   │   │   ├── formatters.js             # Number, date, percentage formatters
│   │   │   ├── helpers.js                # Magnitude colors, depth labels, query builder
│   │   │   └── validators.js             # Email, password, earthquake validators
│   │   │
│   │   └── styles/                       # Global styles
│   │       └── globals.css               # Tailwind directives + base resets
│   │
│   ├── .env                              # Local env vars (gitignored)
│   ├── .env.example                      # Env template (VITE_API_URL)
│   ├── package.json                      # Dependencies + scripts
│   └── README.md                         # Frontend documentation
│
├── .gitignore                            # Root git exclusion rules
└── README.md                             # 📘 This file — Full-stack platform documentation
```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Required | Default | Description |
|:---------|:---------|:--------|:------------|
| `NODE_ENV` | ✅ | `development` | Controls error verbosity and logging level |
| `PORT` | ❌ | `5000` | HTTP server listen port |
| `MONGODB_URI` | ✅ | — | MongoDB connection string (local or Atlas) |
| `JWT_SECRET` | ✅ | — | HMAC secret for signing tokens (min 32 chars) |
| `JWT_EXPIRES_IN` | ❌ | `7d` | Token lifetime (`1h`, `7d`, `30d`) |
| `FRONTEND_URL` | ❌ | `http://localhost:5173` | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS` | ❌ | `900000` | Rate limit time window (ms) |
| `RATE_LIMIT_MAX` | ❌ | `100` | Max requests per window |
| `LOG_LEVEL` | ❌ | `info` | Winston logging level |

### Frontend (.env)

| Variable | Required | Default | Description |
|:---------|:---------|:--------|:------------|
| `VITE_API_URL` | ❌ | `http://localhost:5000/api/v1` | Backend API base URL (Vite-prefixed) |

---

## 📖 API Documentation

### Base URL

```
Development:  http://localhost:5000/api/v1
Production:   https://your-domain.com/api/v1
```

### Response Format

```json
// Success (Single Item)
{
  "success": true,
  "message": "Earthquake fetched successfully",
  "data": { ... }
}

// Success (Paginated List)
{
  "success": true,
  "message": "Earthquakes fetched successfully",
  "data": [ ... ],
  "pagination": {
    "page": 1, "limit": 10, "totalPages": 42,
    "hasNext": true, "hasPrev": false
  },
  "total": 41523
}

// Error
{
  "success": false,
  "message": "Earthquake not found"
}

// Authentication
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "_id": "...", "name": "Admin User", "email": "admin@example.com", "role": "admin" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Earthquake CRUD Routes

| Method | Endpoint | Auth | Role | Description |
|:-------|:---------|:-----|:-----|:------------|
| `GET` | `/earthquakes` | — | — | List with filters, sort, pagination |
| `GET` | `/earthquakes/:id` | — | — | Get by MongoDB ID |
| `POST` | `/earthquakes` | ✅ JWT | admin, moderator | Create new record |
| `PATCH` | `/earthquakes/:id` | ✅ JWT | admin, moderator | Partial update |
| `DELETE` | `/earthquakes/:id` | ✅ JWT | admin | Permanently delete |
| `POST` | `/earthquakes/bulk-create` | ✅ JWT | admin | Insert multiple records |
| `PATCH` | `/earthquakes/bulk-update` | ✅ JWT | admin | Update by filter |
| `DELETE` | `/earthquakes/bulk-delete` | ✅ JWT | admin | Delete by IDs |

### Earthquake Specialized Routes

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/earthquakes/place/:place` | Search by place name (regex) |
| `GET` | `/earthquakes/country/:country` | Filter by country |
| `GET` | `/earthquakes/type/:type` | Filter by event type |
| `GET` | `/earthquakes/status/:status` | Filter by review status |
| `GET` | `/earthquakes/mag-type/:magType` | Filter by magnitude type |
| `GET` | `/earthquakes/network/:net` | Filter by seismic network |
| `GET` | `/earthquakes/high-magnitude` | High magnitude events (mag ≥ 6) |
| `GET` | `/earthquakes/deep` | Deep earthquakes (depth ≥ 300km) |
| `GET` | `/earthquakes/shallow` | Shallow earthquakes (depth ≤ 70km) |
| `GET` | `/earthquakes/recent` | Earthquakes from last N days |
| `GET` | `/earthquakes/critical` | Critical risk earthquakes |

### Analytics Routes

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/analytics/highest-magnitude` | Highest magnitude earthquake |
| `GET` | `/analytics/deepest` | Deepest N earthquakes |
| `GET` | `/analytics/recent-activity` | Daily activity for last N days |
| `GET` | `/analytics/location-analysis` | 10° grid cell geo grouping |
| `GET` | `/analytics/country-analysis` | Country-level stats |
| `GET` | `/analytics/network-analysis` | Network statistics |
| `GET` | `/analytics/magnitude-analysis` | Magnitude bucket distribution |
| `GET` | `/analytics/depth-analysis` | Depth bucket distribution |
| `GET` | `/analytics/monthly-analysis` | Monthly aggregation by year |

### Statistics Routes

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/stats/count` | Total earthquake count |
| `GET` | `/stats/highest-magnitude` | Highest magnitude record |
| `GET` | `/stats/deepest` | Deepest earthquake record |
| `GET` | `/stats/average-depth` | Average depth |
| `GET` | `/stats/average-magnitude` | Average magnitude |
| `GET` | `/stats/country-count` | Count per country |
| `GET` | `/stats/type-count` | Count per event type |
| `GET` | `/stats/network-count` | Count per network |
| `GET` | `/stats/reviewed-count` | Count of reviewed records |
| `GET` | `/stats/monthly-count` | Monthly counts for a year |

### Authentication Routes

| Method | Endpoint | Auth | Rate Limited | Description |
|:-------|:---------|:-----|:-------------|:------------|
| `POST` | `/auth/register` | — | ✅ | Create new user account |
| `POST` | `/auth/login` | — | ✅ (5/hr) | Authenticate and receive JWT |
| `POST` | `/auth/logout` | ✅ JWT | — | Logout |
| `GET` | `/auth/profile` | ✅ JWT | — | Get user profile |
| `PATCH` | `/auth/profile` | ✅ JWT | — | Update name and preferences |
| `POST` | `/auth/change-password` | ✅ JWT | — | Change password |
| `POST` | `/auth/forgot-password` | — | ✅ | Request reset token |
| `POST` | `/auth/reset-password` | — | ✅ | Reset password with token |

### Admin Routes

| Method | Endpoint | Role | Description |
|:-------|:---------|:-----|:------------|
| `GET` | `/admin/users` | admin | List users (paginated, filterable) |
| `GET` | `/admin/users/:id` | admin | Get specific user |
| `PATCH` | `/admin/users/:id` | admin | Update user (role, status) |
| `DELETE` | `/admin/users/:id` | admin | Delete user |
| `GET` | `/admin/audit-logs` | admin | View audit trail |

### Search Route

| Method | Endpoint | Params | Description |
|:-------|:---------|:-------|:------------|
| `GET` | `/search/earthquakes` | `q`, `page`, `limit` | Cross-field full-text search |

### Health Check

```bash
GET /health
# Response: {"status":"OK","timestamp":"2026-05-13T10:00:00.000Z"}
```

### 📬 Postman Documentation

> [!TIP]
> **Try the API live** — browse all 50+ endpoints with request/response examples directly in your browser.
>
> [![Postman](https://img.shields.io/badge/%F0%9F%9A%80%20Open%20API%20Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/50839341/2sBXwmQseq)

---

## 🔍 Features Deep Dive

### Dynamic Filtering System

**Backend:** The `GET /earthquakes` endpoint accepts 15+ query parameters dynamically converted to a MongoDB filter object using the `filterBuilder.js` fluent API.

**Frontend:** `EarthquakeFilters.jsx` provides an 8-field debounced filter panel (700ms delay). Local state updates immediately for responsive UI, then dispatches Redux actions after debounce, triggering a re-fetch.

```
User changes filter → Local state update (instant UI) → Debounce (700ms) 
→ Redux dispatch setFilters() → Page reset to 1 → fetchEarthquakes(params)
```

| Filter | Type | Frontend Component | Backend Operator |
|:-------|:-----|:-------------------|:-----------------|
| Country | Text | `Input` | Exact match |
| Mag Type | Select | `Select` | Exact match |
| Status | Select | `Select` | Exact match |
| Network | Text | `Input` | Exact match |
| Min Mag | Number | `Input` (type=number) | `>=` |
| Max Mag | Number | `Input` (type=number) | `<=` |
| Min Depth | Number | `Input` (type=number) | `>=` |
| Max Depth | Number | `Input` (type=number) | `<=` |

### Server-Side Pagination

**Backend:** `?page=3&limit=10` → `skip = (3-1)*10 = 20` → `.skip(20).limit(10)`. Returns `pagination` metadata in response.

**Frontend:** MUI `TablePagination` integrated in `EarthquakeTable.jsx`. Page changes dispatch `setPage()` → triggers `fetchEarthquakes()` with new params.

### Sorting System

**Backend:** `?sort=-mag` → descending by magnitude. `?sort=mag` → ascending. Default: `-time`.

**Frontend:** Sort state managed in Redux earthquake slice. Change triggers full re-fetch.

### Full-Text Search

**Backend:** `GET /search/earthquakes?q=japan` searches across 6 fields using case-insensitive regex.

**Frontend:** `SearchPage.jsx` with `useDebounce(query, 500)` — debounced search input (500ms delay). Results displayed in sortable table with magnitude-coded chips.

---

## 📊 Charts & Data Visualization

The frontend uses **Recharts** to render 6+ interactive chart types:

| Chart Type | Component | Data Source | Location |
|:-----------|:----------|:-------------|:---------|
| 📈 **Line Chart** (dual axis) | `TimeSeriesChart.jsx` | Monthly Analysis | Analytics Dashboard |
| 🥧 **Donut Pie Chart** | `CountryPieChart.jsx` | Magnitude Analysis | Analytics Dashboard |
| 📊 **Bar Chart** (horizontal) | Custom inline | Country Analysis | Analytics Dashboard |
| 🎯 **Radar Chart** | Custom inline | Depth Analysis | Analytics Dashboard |
| 📉 **Area Chart** (stacked) | Custom inline | Earthquake + User Trends | Admin Dashboard |
| 📋 **Activity Feed** (list) | `RecentActivity.jsx` | Recent Earthquakes | User Dashboard |

### Chart Features

- **Responsive:** All charts use `ResponsiveContainer` for fluid resizing
- **Interactive:** Tooltips with custom styling (rounded corners, shadows)
- **Dual Axis:** Line chart shows both event count and average magnitude
- **Color-coded:** Magnitude ranges mapped to distinct color palettes
- **Empty States:** Graceful handling of null/undefined data
- **Year Filtering:** All analytics pages support year-based filtering

---

## 🛡 Security Best Practices

| Practice | Backend Implementation | Frontend Implementation |
|:---------|:-----------------------|:------------------------|
| **Password Hashing** | bcryptjs (12 salt rounds) | — |
| **JWT Signing** | HMAC-SHA256 with long secret | Token stored in localStorage |
| **Token Expiry** | Configurable TTL (default: 7d) | Auto-redirect on 401 |
| **Role Authorization** | `restrictTo()` middleware | `PrivateRoute` with role checks |
| **Helmet Headers** | XSS, nosniff, frameguard, HSTS | — |
| **CORS Whitelist** | Only `FRONTEND_URL` allowed | Vite proxy for development |
| **Rate Limiting** | 3 tiers (API, Auth, Strict) | Debounced API calls |
| **Input Validation** | Joi schemas on all inputs | Form validation + Yup ready |
| **Error Sanitization** | No stack traces in production | Toast notifications |
| **Field Privacy** | `select: false` on password | — |
| **Soft Delete** | `isActive` flag on users | — |
| **Audit Logging** | All admin actions logged | Audit log viewer in admin UI |

---

## ⚡ Performance Optimization

| Technique | Backend | Frontend |
|:----------|:--------|:---------|
| **Indexing** | 8 MongoDB indexes for sub-ms queries | — |
| **Pagination** | Server-side `skip()` + `limit()` | Only fetches 10-25 records per page |
| **Debouncing** | — | 500ms search, 700ms filter debounce |
| **Caching** | Connection pooling (100 connections) | Redux state persistence |
| **Selective Fields** | Only necessary fields in responses | Conditional rendering |
| **Batch Operations** | `insertMany` for bulk inserts | JSON file bulk upload |
| **Pre-computation** | Pre-save hooks for derived fields | Memoized pagination calculations |
| **Build Optimization** | — | Vite: tree-shaking, minification, code splitting |
| **Network Reduction** | Aggregation pipelines (90%+ reduction) | Axios interceptors for auth |
| **Loading States** | — | Skeleton loaders, LinearProgress |

---

## 📈 Scalability Concepts

### Vertical Scaling

```
┌──────────────────────┐
│   Single Server      │
│   ↑ Increase RAM     │
│   ↑ Faster CPU       │
│   ↑ Faster Disk      │
└──────────────────────┘
```

### Horizontal Scaling

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Load    │────►│ Backend  │────►│ MongoDB  │
│ Balancer │     │ Instance │     │ Primary  │
│ (nginx)  │────►│ 1        │     │    │     │
│          │     ├──────────┤     ├────┼─────┤
│          │────►│ Backend  │     │    ▼     │
│          │     │ Instance │     │ Replica  │
│          │────►│ 2        │     │   Set    │
│          │     ├──────────┤     └──────────┘
│          │────►│ Backend  │
│          │     │ Instance │
│          │     │ N        │
└──────────┘     └──────────┘
```

**Key scalability enablers:**
- Stateless JWT auth (any instance handles any request)
- MongoDB replica sets for read scaling
- Vite production builds for CDN distribution
- Proxy-pass architecture for API scaling

---

## 📦 Setup & Installation

### Prerequisites

| Requirement | Version | Check Command |
|:------------|:--------|:--------------|
| Node.js | >= 18.0.0 | `node --version` |
| npm | >= 9.0.0 | `npm --version` |
| MongoDB | >= 6.0 | `mongod --version` |
| Git | — | `git --version` |

### Step 1: Clone the Repository

```bash
git clone https://github.com/KamleshChandela/global-earthquakes.git
cd global-earthquakes
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/earthquake-analytics
# JWT_SECRET=your-super-secret-jwt-key

# Seed the database with 40K+ earthquake records
npm run seed

# Start backend server
npm run dev
```

### Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start frontend dev server
npm run dev
```

### Expected Output

**Backend:**
```
[nodemon] starting `node server.js`
[info] MongoDB Connected: localhost:27017
[info] Server running on port 5000
[info] Environment: development
```

**Frontend:**
```
VITE v4.4.9  ready in 320ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.100:5173/
➜  Proxy:   /api → http://localhost:5000
```

---

## 💻 Local Development

### Ports Reference

| Service | Port | URL | Description |
|:--------|:-----|:----|:------------|
| **Backend API** | 5000 | `http://localhost:5000/api/v1` | Express REST API |
| **Frontend SPA** | 5173 | `http://localhost:5173` | React Vite Dev Server |
| **MongoDB** | 27017 | `mongodb://localhost:27017` | Database |

### Development Workflow

```bash
# Terminal 1: Start MongoDB
mongod --dbpath /data/db

# Terminal 2: Start backend (with hot-reload)
cd backend && npm run dev

# Terminal 3: Start frontend (with HMR)
cd frontend && npm run dev
```

### Database Commands

```bash
# Seed database with sample data
cd backend && npm run seed

# Backup earthquake data to timestamped JSON
cd backend && npm run backup

# Start fresh (clears and re-seeds)
npm run seed
```

### Default Admin Credentials

| Credential | Value |
|:-----------|:-------|
| **Email** | `admin@example.com` |
| **Password** | `admin123` |
| **Role** | `admin` |

---

## 🚀 Deployment Setup

### Backend Deployment

```bash
# Production mode
cd backend && npm start

# Docker deployment
docker build -t earthquake-analytics-api .
docker run -p 5000:5000 --env-file .env earthquake-analytics-api
```

### Frontend Deployment

```bash
# Build for production
cd frontend && npm run build

# Output in frontend/dist/ — deploy to:
# - Vercel (auto-detect)
# - Netlify (publish dist/)
# - AWS S3 + CloudFront
# - GitHub Pages
# - Any static hosting
```

### Deployment Architecture

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   CDN       │──────►│  Frontend   │       │  Backend    │
│ (Cloudflare)│       │ (Static     │       │ (Express)   │
│             │       │  Hosting)   │       │             │
└─────────────┘       └─────────────┘       └──────┬──────┘
                                                    │
                                                    ▼
                                            ┌─────────────┐
                                            │  MongoDB    │
                                            │ (Atlas/Self)│
                                            └─────────────┘
```

---

## 📅 Development Timeline

### Phase 1: Foundation (Days 1-3)

| Day | Backend | Frontend |
|:----|:--------|:---------|
| 1 | Project setup, Express server, folder structure, env config | Vite + React init, MUI theming, store setup |
| 2 | MongoDB connection, Earthquake/User/AuditLog schemas | Axios instance, service layer, auth slice |
| 3 | Rate limiter config, .env.example, package.json scripts | Layout system, common components |

### Phase 2: Core API & UI (Days 4-7)

| Day | Backend | Frontend |
|:----|:--------|:---------|
| 4 | CRUD endpoints (GET all, GET by ID, POST, PATCH, DELETE) | Auth pages (Login, Register) |
| 5 | Info routes (place, country, type, status, mag-type, network) | Earthquake list + filter panel |
| 6 | Bulk operations, exists check | CRUD forms, detail view, bulk upload |
| 7 | Specialized queries (high-mag, deep, shallow, recent, critical) | User Dashboard with live feed |

### Phase 3: Auth & Security (Days 8-10)

| Day | Backend | Frontend |
|:----|:--------|:---------|
| 8 | JWT auth, bcrypt hashing, register/login/logout | Protected routes, PrivateRoute component |
| 9 | Role middleware, profile management | Role-based UI (admin/moderator buttons) |
| 10 | Helmet, CORS, rate limiting, error middleware | Toast notifications, error UX |

### Phase 4: Analytics (Days 11-13)

| Day | Backend | Frontend |
|:----|:--------|:---------|
| 11 | 9 aggregation pipelines | Analytics Dashboard (4 chart types) |
| 12 | 10 statistics endpoints | Statistics Dashboard with year filter |
| 13 | Validation, logging, upload middleware | Search page with debounced input |

### Phase 5: Finalization (Days 14-15)

| Day | Backend | Frontend |
|:----|:--------|:---------|
| 14 | Seed script, backup script, admin controller | Admin Dashboard, User Management, Audit Logs |
| 15 | Documentation, final polish | Responsive fixes, README, code cleanup |

---

## 🏁 Final Conclusion

**Global Earthquakes Analytics Platform** is a production-ready, enterprise-grade full-stack application that demonstrates:

- ✅ **Clean MVC Backend Architecture** — Controllers, services, models with strict separation of concerns
- ✅ **Feature-First Frontend Architecture** — Modular, scalable React SPA with Redux state management
- ✅ **Industry-Standard Security** — JWT auth, bcrypt hashing, Helmet, CORS, rate limiting
- ✅ **Powerful API** — 50+ RESTful endpoints with filtering, sorting, pagination, and search
- ✅ **Advanced Analytics** — 9 MongoDB aggregation pipelines with 6 interactive Recharts visualizations
- ✅ **Role-Based Access** — User, Moderator, Admin roles with full-stack enforcement
- ✅ **Comprehensive Validation** — Multi-layer (Mongoose, Joi, controller, form) data integrity
- ✅ **Premium UI/UX** — Material UI 5 design system, responsive layout, real-time updates
- ✅ **Scalable & Deployable** — Stateless auth, indexing, Docker support, CDN-ready frontend
- ✅ **Production Logging** — Winston structured logging with file + console transports

This platform is ready to serve as the complete solution for seismic monitoring dashboards, research platforms, early warning systems, and educational applications.

---

## 👨‍💻 Author & Developer

<div align="center">

<br>

<img src="https://img.shields.io/badge/Full--Stack%20Developer-000000?style=for-the-badge&logo=code&logoColor=white" alt="Full-Stack Developer" />
<img src="https://img.shields.io/badge/MERN%20Stack-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MERN Stack" />
<img src="https://img.shields.io/badge/Generative%20AI-FF6B6B?style=for-the-badge&logo=openai&logoColor=white" alt="Generative AI" />
<img src="https://img.shields.io/badge/React%20Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Frontend" />
<img src="https://img.shields.io/badge/Node.js%20Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Backend" />

<br>
<br>

### Kamlesh Chandela

**Full-Stack Developer** · **MERN Stack & Generative AI**

🎓 Student at **Swaminarayan University, Kalol**

<br>

---

This entire project — **both frontend and backend** — was **fully designed, architected, and developed independently** by me. Every component, API endpoint, aggregation pipeline, middleware system, chart visualization, authentication flow, database schema, and line of documentation was built from scratch with enterprise-grade quality standards.

<br>

| Area | Details |
|:-----|:--------|
| 🏗 **Backend Architecture** | Designed and implemented the full monolithic MVC structure with 6 controllers, 3 services, 3 models |
| 🎨 **Frontend Architecture** | Built the complete feature-first React SPA with 24 pages, 25+ components, 4 Redux slices |
| 🔌 **RESTful APIs** | Engineered 50+ endpoints with consistent JSON response patterns and middleware chaining |
| 🗄 **MongoDB Schema Design** | Modeled Earthquake, User, and AuditLog schemas with 10 indexes and pre-save hooks |
| 🔐 **Authentication & Authorization** | Full JWT auth with bcrypt hashing, role-based access, and protected route enforcement |
| 📊 **Analytics Pipelines** | 9 MongoDB aggregation pipelines + 10 statistics endpoints for seismic data intelligence |
| ⚙️ **Middleware System** | 6 custom middleware modules (auth, validation, error, logging, rate limit, upload) |
| ✨ **Validation & Error Handling** | Multi-layer validation (Mongoose, Joi, controller, form) with centralized error handling |
| 📈 **Data Visualization** | 6+ interactive Recharts chart types with responsive design and real-time updates |
| 📱 **Responsive UI** | Mobile-first adaptive layout with MUI Grid and breakpoint-aware components |
| 🔍 **Search & Filtering** | Debounced full-text search + 15-parameter dynamic filter system with real-time UX |
| 📖 **Documentation** | Comprehensive developer-friendly documentation across all layers of the platform |

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

---

## 📄 License

<div align="center">

**MIT License** — Copyright © 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.

<br>

*Empowering seismic research through robust, scalable full-stack engineering.*

</div>
