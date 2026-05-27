<div align="center">

# 🌍 Earthquake Analytics API

### Industry-Level RESTful Backend for Seismic Data Management & Analytics

<br>

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-7.5-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Hash-3178C6?style=for-the-badge&logo=password&logoColor=white)
![API](https://img.shields.io/badge/API-v1.0.0-6C5CE7?style=for-the-badge)
![MVC](https://img.shields.io/badge/MVC-Architecture-FF6B6B?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![PRs](https://img.shields.io/badge/PRs-Welcome-6C5CE7?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

<br>

**Built with 💚 for the global seismic research community.**

</div>

---

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

1. [Project Introduction](#-project-introduction)
2. [Problem Statement](#-problem-statement)
3. [Dataset Understanding](#-dataset-understanding)
4. [Project Goals](#-project-goals)
5. [Features](#-features)
6. [Industry Features](#-industry-features)
7. [Tech Stack](#-tech-stack)
8. [System Architecture](#-system-architecture)
9. [Monolithic Architecture](#-monolithic-architecture)
10. [MVC Architecture](#-mvc-architecture)
11. [Folder Structure](#-folder-structure)
12. [Environment Variables](#-environment-variables)
13. [Installation Steps](#-installation-steps)
14. [Local Development Setup](#-local-development-setup)
15. [MongoDB Setup](#-mongodb-setup)
16. [Running the Server](#-running-the-server)
17. [API Base URL](#-api-base-url)
18. [Authentication Flow](#-authentication-flow)
19. [JWT Flow](#-jwt-flow)
20. [Middleware Chaining Flow](#-middleware-chaining-flow)
21. [Request Lifecycle](#-request-lifecycle)
22. [Error Handling Architecture](#-error-handling-architecture)
23. [Validation System](#-validation-system)
24. [Database Schema Design](#-database-schema-design)
25. [Earthquake Schema](#-earthquake-schema)
26. [User Schema](#-user-schema)
27. [AuditLog Schema](#-auditlog-schema)
28. [MongoDB Indexing Strategy](#-mongodb-indexing-strategy)
29. [Aggregation Pipeline](#-aggregation-pipeline)
30. [Pagination System](#-pagination-system)
31. [Dynamic Filtering System](#-dynamic-filtering-system)
32. [Advanced Search System](#-advanced-search-system)
33. [Sorting System](#-sorting-system)
34. [Rate Limiting System](#-rate-limiting-system)
35. [Logging System](#-logging-system)

37. [Security Best Practices](#-security-best-practices)
38. [API Response Structure](#-api-response-structure)
39. [Complete API Documentation](#-complete-api-documentation)
    - [1. Basic CRUD Routes](#1-basic-crud-routes)
    - [2. Earthquake Information Routes](#2-earthquake-information-routes)
    - [3. Route Parameter Routes](#3-route-parameter-routes)
    - [4. Query Parameter Routes](#4-query-parameter-routes)
    - [5. Pagination Routes](#5-pagination-routes)
    - [6. Sorting Routes](#6-sorting-routes)
    - [7. Search Routes](#7-search-routes)
    - [8. Filtering Routes](#8-filtering-routes)
    - [9. Analytics Routes](#9-analytics-routes)
    - [10. Statistics Routes](#10-statistics-routes)
    - [11. Combination Query Routes](#11-combination-query-routes)
    - [12. Middleware Routes](#12-middleware-routes)
    - [13. Authentication Routes](#13-authentication-routes)
    - [14. JWT Authentication Routes](#14-jwt-authentication-routes)
    - [15. Error Handling Routes](#15-error-handling-routes)
    - [16. Request Validation Routes](#16-request-validation-routes)
    - [17. API Rate Limiting Routes](#17-api-rate-limiting-routes)
    - [18. HEAD & OPTIONS Routes](#18-head--options-routes)
40. [Postman Testing Guide](#-postman-testing-guide)
41. [Database Seeding Guide](#-database-seeding-guide)
42. [Backup Script Guide](#-backup-script-guide)
43. [Performance Optimization](#-performance-optimization)
44. [Scalability Concepts](#-scalability-concepts)
45. [API Versioning](#-api-versioning)
46. [Health Check Endpoint](#-health-check-endpoint)
47. [Development Timeline](#-development-timeline)
48. [Backend Completion Strategy](#-backend-completion-strategy)
49. [Industry Best Practices](#-industry-best-practices)
50. [Future Improvements](#-future-improvements)
51. [Final Conclusion](#-final-conclusion)
52. [Author](#-author)

</details>

---

## 🌟 Project Introduction

**Earthquake Analytics API** is a production-ready, industry-level RESTful backend service built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. It serves as the backend engine for processing, storing, analyzing, and serving global seismic event data.

This API handles **40,000+ earthquake records** and provides:

- 📦 Full CRUD operations on earthquake data
- 🔍 Advanced querying (filtering, sorting, pagination, search)
- 📊 Powerful analytics via MongoDB aggregation pipelines
- 🔐 Secure authentication with JWT + bcrypt
- 👥 Role-based access control (user, moderator, admin)
- 🛡 Enterprise-grade security and validation

Whether you're building a seismic monitoring dashboard, conducting geophysical research, or developing early warning systems — this API provides the robust backend foundation you need.

---

## 🎯 Problem Statement

Seismic data from global networks (USGS, EMSC, GEOFON) is vast, complex, and scattered across multiple formats and sources. Researchers, developers, and analysts face critical challenges:

| Challenge | Impact |
|:----------|:-------|
| ❌ **Data Scattered** | Earthquake data exists in raw JSON files, CSV exports, and USGS feeds — no unified query interface |
| ❌ **No Standard API** | Each dataset requires custom parsing — no RESTful access pattern |
| ❌ **Slow Queries** | Naive search over 40K+ records is slow without indexing and aggregation |
| ❌ **No Auth System** | Sensitive data and admin operations are unprotected |
| ❌ **No Analytics** | Trend analysis, magnitude distribution, depth analysis require external tools |
| ❌ **No Pagination** | Loading all records at once causes browser crashes and slow responses |

**Earthquake Analytics API** solves all of these by providing a unified, secure, high-performance RESTful interface backed by MongoDB's powerful aggregation engine.

---

## 📊 Dataset Understanding

### Raw JSON Structure

The dataset contains **40,000+ earthquake records** from USGS with the following raw structure:

```json
{
  "id": "us1000example",
  "time": "2024-01-15T10:30:00.000Z",
  "updated": "2024-01-15T11:00:00.000Z",
  "place": "10km SE of Tokyo, Japan",
  "type": "earthquake",
  "latitude": 35.6762,
  "longitude": 139.6503,
  "depth": 50,
  "mag": 5.2,
  "magType": "mb",
  "magError": 0.1,
  "magNst": 45,
  "horizontalError": 5.2,
  "depthError": 2.1,
  "nst": "120",
  "gap": 45,
  "dmin": 1.5,
  "rms": 0.8,
  "net": "US",
  "locationSource": "US",
  "magSource": "US",
  "status": "reviewed"
}
```

### MongoDB Conversion Process

```
RAW JSON (40K+ records)
    │
    ▼
Mongoose Schema with:
    │  ├── Field validation (required, min/max, enum)
    │  ├── Type casting (String, Number, Date)
    │  ├── Default values
    │  ├── Pre-save hooks (derived fields)
    │  └── Virtual properties (coordinates)
    │
    ▼
Seeding Script (npm run seed)
    │  ├── Connect to MongoDB
    │  ├── Clear existing data
    │  ├── Read JSON file
    │  ├── InsertMany with ordered: false
    │  └── Create admin user
    │
    ▼
Indexed + Queryable MongoDB Collection
```

### Schema Planning Decisions

| Raw Field | Mongoose Type | Validation | Derived Field |
|:----------|:-------------|:-----------|:--------------|
| `id` | String (unique) | Required | — |
| `time` | Date | Required | `year`, `month`, `day`, `hour` |
| `place` | String | Required | `country` (extracted) |
| `latitude` | Number (-90 to 90) | Required | — |
| `longitude` | Number (-180 to 180) | Required | `coordinates` (virtual) |
| `depth` | Number (0-1000) | Required | `depthCategory` |
| `mag` | Number (0-10) | Required | `magnitudeCategory` |

---

## 🚩 Project Goals

| Goal | Description |
|:-----|:------------|
| 🎯 **Complete RESTful API** | Full CRUD operations with standardized JSON responses |
| 🔐 **Secure Authentication** | JWT-based auth with bcrypt password hashing |
| 👥 **Role-Based Access** | Granular permissions: user, moderator, admin |
| 📊 **Powerful Analytics** | Aggregation pipelines for real-time seismic insights |
| 🔍 **Advanced Querying** | Filter, sort, paginate, search across 40K+ records |
| 🛡 **Enterprise Security** | Helmet, CORS, rate limiting, input validation |
| 📝 **Comprehensive Logging** | Request logging, error tracking, audit trails |
| 🧪 **Testable & Extensible** | Clean MVC architecture, easy to extend and test |

---

## ✨ Features

### Core Features

- [x] **RESTful API Design** — Standard HTTP methods + JSON responses
- [x] **CRUD Operations** — Create, Read, Update, Delete earthquake records
- [x] **Bulk Operations** — Create, update, delete multiple records at once
- [x] **JWT Authentication** — Secure token-based authentication
- [x] **bcrypt Password Hashing** — Industry-standard password security
- [x] **Role-Based Access Control** — User, Moderator, Admin roles
- [x] **Protected Routes** — Auth-protected endpoints with role checks
- [x] **Advanced Filtering** — 15+ filter parameters on GET endpoints
- [x] **Multi-Field Sorting** — Sort by magnitude, depth, time, place
- [x] **Server-Side Pagination** — Skip/limit with total count + metadata
- [x] **Full-Text Search** — Search across place, country, network, type
- [x] **MongoDB Aggregation** — Server-side analytics pipelines
- [x] **Statistical Summaries** — Count, averages, distributions
- [x] **Request Validation** — Joi schema validation on all inputs
- [x] **Centralized Error Handling** — Consistent error response format
- [x] **Rate Limiting** — 3-tier rate limiting (api, auth, strict)
- [x] **HTTP Security** — Helmet middleware for secure headers
- [x] **CORS Configuration** — Whitelist-based cross-origin access
- [x] **Request Logging** — Winston logging with custom middleware
- [x] **Health Check** — `/health` endpoint for monitoring
- [x] **API Versioning** — `/api/v1/` prefix for future compatibility
- [x] **Database Seeding** — `npm run seed` for quick setup
- [x] **Backup Script** — `npm run backup` for data export
- [x] **Soft Delete Ready** — `isActive` field on users, status on earthquakes

### Analytics Features

| Feature | Pipeline | Output |
|:--------|:---------|:-------|
| Magnitude Distribution | `$bucket` on `mag` | Count per magnitude range |
| Depth Distribution | `$bucket` on `depth` | Count per depth range |
| Country Analysis | `$group` by `country` | Count + avg/max mag per country |
| Monthly Trends | `$match` year + `$group` by month | Monthly counts and averages |
| Network Analysis | `$group` by `net` | Network counts + reviewed stats |
| Location Heatmap | `$group` by 10° grid cell | Geospatial density data |

---

## 🏭 Industry Features

| Feature | Category | Enterprise Benefit |
|:--------|:---------|:-------------------|
| API Versioning (v1) | Design | Non-breaking API evolution |
| Consistent Error Responses | Reliability | Predictable client error handling |
| HTTP Status Codes | Standards | Industry-compliant semantics |
| Environment-Based Config | DevOps | Secure credential management |
| `.env.example` Template | DevOps | Easy onboarding for new devs |
| Graceful Shutdown | Reliability | Zero data loss on restart |
| Connection Pooling | Performance | Efficient MongoDB connections |
| Pre-save Hooks | Data Integrity | Automatic derived field computation |
| Compound Indexes | Performance | Sub-millisecond queries at scale |
| `catchAsync` Wrapper | Code Quality | No try/catch duplication |
| Custom `AppError` Class | Maintainability | Consistent operational errors |
| Service Layer | Architecture | Business logic reusable outside HTTP |
| Audit Logging | Compliance | Track all admin operations |

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| ⚡ **Runtime** | Node.js | 18.x LTS | JavaScript runtime environment |
| 🌐 **Framework** | Express.js | ^4.18.2 | HTTP server & routing |
| 🗄 **Database** | MongoDB | 7.0 | Document-based NoSQL database |
| 📦 **ODM** | Mongoose | ^7.5.0 | Schema modeling & data validation |
| 🔑 **Auth** | jsonwebtoken | ^9.0.2 | Stateless JWT authentication |
| 🔒 **Password** | bcryptjs | ^2.4.3 | Password hashing (12 rounds) |
| 🛡 **Security** | helmet | ^7.0.0 | HTTP header security |
| 🌍 **CORS** | cors | ^2.8.5 | Cross-origin resource sharing |
| ⏱ **Rate Limit** | express-rate-limit | ^6.10.0 | API request throttling |
| ✅ **Validation** | Joi | ^17.10.1 | Schema-based request validation |
| 📝 **Logging** | winston | ^3.10.0 | Production-grade logging |
| ⚙️ **Config** | dotenv | ^16.3.1 | Environment variable management |
| 📁 **Upload** | multer | ^1.4.5 | File upload handling |

---

</div>

---

## 🏗 System Architecture

```
┌───────────────────────────────────────────────────────┐
│                    CLIENT LAYER                        │
│              (React App / Postman / cURL)              │
└──────────────────────┬────────────────────────────────┘
                       │ HTTPS Request
                       ▼
┌───────────────────────────────────────────────────────┐
│                  EXPRESS ROUTER                        │
│     ┌─────────────────────────────────────────────┐   │
│     │           MIDDLEWARE PIPELINE                │   │
│     │  helmet → cors → json() → rateLimiter       │   │
│     │  → auth → validate → loggerMiddleware        │   │
│     └─────────────────────────────────────────────┘   │
└──────────────────────┬────────────────────────────────┘
                       │ Route Match
                       ▼
┌───────────────────────────────────────────────────────┐
│                 CONTROLLER LAYER                       │
│  ┌──────────┐ ┌──────┐ ┌──────────┐ ┌───────┐       │
│  │Earthquake│ │ Auth │ │Analytics │ │ Stats │       │
│  │Controller│ │ Ctrl │ │Controller│ │ Ctrl  │       │
│  └────┬─────┘ └──┬───┘ └────┬─────┘ └───┬───┘       │
└───────┼──────────┼──────────┼────────────┼───────────┘
        ▼          ▼          ▼            ▼
┌───────────────────────────────────────────────────────┐
│                  SERVICE LAYER                         │
│  ┌──────────────┐ ┌────────────┐ ┌────────────────┐  │
│  │ Earthquake   │ │ Analytics  │ │    Auth        │  │
│  │   Service    │ │  Service   │ │   Service      │  │
│  └──────┬───────┘ └─────┬──────┘ └──────┬─────────┘  │
└─────────┼───────────────┼───────────────┼─────────────┘
          ▼               ▼               ▼
┌───────────────────────────────────────────────────────┐
│                  DATA ACCESS LAYER                     │
│  ┌──────────────────────────────────────────────────┐ │
│  │              Mongoose ODM                         │ │
│  │  ┌──────────┐ ┌──────┐ ┌──────────────┐        │ │
│  │  │Earthquake│ │ User │ │ AuditLog     │        │ │
│  │  │  Model   │ │Model │ │   Model      │        │ │
│  │  └──────────┘ └──────┘ └──────────────┘        │ │
│  └──────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

---

## 🏛 Monolithic Architecture

This project follows a **Monolithic MVC Architecture** — a single deployable unit where all components (routing, business logic, data access) live in one codebase.

### Why Monolithic?

| Benefit | Description |
|:--------|:------------|
| 🚀 **Simpler Deployment** | One server, one process, one deployment |
| 🧪 **Easier Testing** | All components testable in-process |
| 🔍 **Simpler Debugging** | Single request flow to trace |
| 📦 **Less Overhead** | No network calls between services |
| 👶 **Beginner Friendly** | Clear separation of concerns without microservice complexity |
| ⚡ **Lower Latency** | In-process function calls vs inter-service HTTP |

### Monolithic Structure

```
backend/
├── server.js        ← Entry point (starts HTTP server)
├── src/app.js       ← Express app (middleware + routes)
├── src/config/      ← Configuration
├── src/models/      ← Mongoose schemas
├── src/controllers/ ← Request handlers
├── src/services/    ← Business logic
├── src/routes/      ← Route definitions
├── src/middlewares/  ← Middleware functions
├── src/utils/       ← Shared utilities
├── src/validations/ ← Joi schemas
└── src/scripts/     ← Automation
```

---

## 🏗 MVC Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   MODEL     │────▶│   VIEW      │────▶│ CONTROLLER  │
│ (Mongoose)  │     │ (JSON Res)  │     │  (Handler)  │
└──────┬──────┘     └─────────────┘     └──────┬──────┘
       │                                       │
       │                                       │
       ▼                                       ▼
┌──────────────────────────────────────────────────┐
│                   SERVICE LAYER                   │
│          (Business Logic & Data Ops)              │
└──────────────────────────────────────────────────┘
```

### How MVC is Implemented Here

| Layer | Files | Responsibility |
|:------|:------|:---------------|
| **Model** | `models/*.js` | Mongoose schemas, validation, indexes, hooks |
| **View** | Controller responses | JSON serialization (no template engine) |
| **Controller** | `controllers/*.js` | Parse request, call service, send response |
| **Service** | `services/*.js` | Business logic, aggregation, data transformation |
| **Routes** | `routes/*.js` | URL mapping, middleware wiring |
| **Middleware** | `middlewares/*.js` | Auth, validation, logging, rate limiting |

### Request Flow Through MVC

```
Client → Route → Middleware → Controller → Service → Model → MongoDB
                                            │
                                            ▼
Client ← JSON ← Controller ← Service ← Model
```

---

## 📁 Folder Structure

```
backend/
│
├── src/
│   ├── config/                          # Application configuration
│   │   ├── db.config.js                 # MongoDB connection with event handlers
│   │   └── rateLimit.config.js          # Rate limit window/max defaults
│   │
│   ├── models/                          # Mongoose data models
│   │   ├── Earthquake.model.js          # Earthquake schema + indexes + hooks
│   │   ├── User.model.js                # User schema + bcrypt hashing
│   │   └── AuditLog.model.js            # Audit trail schema
│   │
│   ├── controllers/                     # Request handlers (thin)
│   │   ├── earthquake.controller.js     # 20+ earthquake endpoints
│   │   ├── auth.controller.js           # Register, login, profile, passwords
│   │   ├── analytics.controller.js      # Aggregation analytics endpoints
│   │   ├── stats.controller.js          # Statistical summary endpoints
│   │   └── admin.controller.js          # User management + audit logs
│   │
│   ├── services/                        # Business logic layer (thick)
│   │   ├── earthquake.service.js        # CRUD, pagination, bulk, specialized queries
│   │   ├── analytics.service.js         # 8+ aggregation pipelines
│   │   ├── auth.service.js              # Token generation, sanitization

│   │
│   ├── routes/                          # Route definitions (versioned)
│   │   ├── v1/                          # API version 1
│   │   │   ├── earthquake.routes.js     # CRUD + 11 info routes
│   │   │   ├── auth.routes.js           # 8 auth endpoints
│   │   │   ├── analytics.routes.js      # 9 analytics endpoints
│   │   │   ├── stats.routes.js          # 10 statistics endpoints
│   │   │   ├── search.routes.js         # Full-text search
│   │   │   └── admin.routes.js          # Admin management
│   │   └── index.js                     # Route aggregator
│   │
│   ├── middlewares/                     # Express middleware pipeline
│   │   ├── auth.middleware.js           # JWT verify + role restrict
│   │   ├── error.middleware.js          # Global error handler
│   │   ├── validation.middleware.js     # Joi request validation
│   │   ├── logger.middleware.js         # Request logging
│   │   ├── rateLimit.middleware.js      # Rate limiting

│   │   └── upload.middleware.js         # File upload handling
│   │
│   ├── utils/                           # Shared utilities
│   │   ├── AppError.js                  # Custom error class
│   │   ├── catchAsync.js                # Async wrapper
│   │   ├── filterBuilder.js             # Fluent filter builder
│   │   ├── pagination.util.js           # Pagination calculator
│   │   ├── validators.js                # Domain validators
│   │   ├── email.service.js             # Email abstraction
│   │   └── logger.js                    # Winston logger
│   │
│   ├── validations/                     # Joi validation schemas
│   │   ├── earthquake.validation.js     # Earthquake schemas
│   │   ├── auth.validation.js           # Auth schemas
│   │   └── user.validation.js           # User schemas
│   │
│   ├── scripts/                         # CLI automation
│   │   ├── seedDatabase.js              # Database seeding
│   │   └── backupData.js                # Data export
│   │
│   └── app.js                           # Express app factory
│
├── .env                                 # Local env vars (gitignored)
├── .env.example                         # Env template
├── .gitignore                           # Git exclusion rules
├── package.json                         # Dependencies + scripts
├── README.md                            # This file
└── server.js                            # Entry point
```

### Folder & File Explanations

#### `src/config/db.config.js`
Establishes MongoDB connection via Mongoose with event handlers for `error`, `disconnected`, and graceful `SIGINT` shutdown.

```javascript
// Connection with retry timeout + socket config
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

#### `src/config/rateLimit.config.js`
Centralized rate limit constants (window, max) for api, auth, and strict limiters.

#### `src/models/Earthquake.model.js`
Core schema with:
- 30+ fields with validation (required, min, max, enum)
- 8 compound and single-field indexes
- Pre-save hooks for derived fields (country extraction, depth/magnitude categorization)
- Virtual property (`coordinates`)
- Static helper methods (`getHighMagnitude`, `getRecent`)

#### `src/models/User.model.js`
User schema with:
- Email validation regex
- bcrypt pre-save hashing (12 rounds)
- `comparePassword` instance method
- Role enum (user, moderator, admin)
- Soft-delete via `isActive`

#### `src/models/AuditLog.model.js`
Audit trail schema tracking user actions with:
- Action enum (CREATE, UPDATE, DELETE, READ, LOGIN, LOGOUT, EXPORT)
- Resource type and ID reference
- IP address and user agent capture
- Compound indexes on `userId + timestamp`

#### `src/controllers/earthquake.controller.js`
Thin request handler with:
- 20+ exported functions
- Query parameter extraction and filtering
- Service delegation
- Consistent JSON response formatting
- Error delegation via `catchAsync`

#### `src/controllers/auth.controller.js`
Authentication handler with:
- Register (create user + return token)
- Login (verify credentials + update lastLogin)
- Profile management (get, update)
- Password management (change, forgot, reset)

#### `src/controllers/analytics.controller.js`
Analytics endpoint handler:
- 9 aggregation-based endpoints
- Delegates to `AnalyticsService` for pipeline execution

#### `src/controllers/stats.controller.js`
Statistics endpoint handler:
- 10 statistical endpoints
- MongoDB aggregation + countDocuments queries

#### `src/controllers/admin.controller.js`
Admin management handler:
- User listing with pagination and role/status filtering
- User update (name, role, isActive, preferences)
- User deletion
- Audit log queries with action/resource filtering

#### `src/services/earthquake.service.js`
Core business logic:
- `getAllEarthquakes` — dynamic filter + sort + paginate
- `getEarthquakeById` — find by MongoDB ID
- `createEarthquake`, `updateEarthquake`, `deleteEarthquake`
- `bulkCreate`, `bulkUpdate`, `bulkDelete`
- Specialized: `getByPlace`, `getByCountry`, `getByType`, `getByStatus`, `getByMagType`, `getByNetwork`
- Analytical: `getHighMagnitude`, `getDeepEarthquakes`, `getShallowEarthquakes`, `getRecentEarthquakes`, `getCriticalEarthquakes`

#### `src/services/analytics.service.js`
Aggregation pipeline definitions:
- `getHighestMagnitude` — single doc sorted by mag DESC
- `getDeepestEarthquakes` — N docs sorted by depth DESC
- `getRecentActivity` — daily group for last N days
- `getLocationAnalysis` — 10° grid cell grouping
- `getCountryAnalysis` — country group with avg/max/extras
- `getMagnitudeAnalysis` — $bucket on mag
- `getDepthAnalysis` — $bucket on depth
- `getMonthlyAnalysis` — group by month for a year
- `getNetworkAnalysis` — group by net with conditional counts

#### `src/services/auth.service.js`
Authentication utilities:
- `generatePasswordResetToken` — crypto randomBytes
- `sanitizeUser` — strip sensitive fields

#### `src/routes/v1/earthquake.routes.js`
Route wiring for 22+ earthquake endpoints with middleware chaining.

#### `src/routes/v1/auth.routes.js`
Route wiring for 8 authentication endpoints.

#### `src/routes/v1/analytics.routes.js`
Route wiring for 9 analytics endpoints.

#### `src/routes/v1/stats.routes.js`
Route wiring for 10 statistics endpoints.

#### `src/routes/v1/search.routes.js`
Single search endpoint with text query support.

#### `src/routes/v1/admin.routes.js`
Admin-only routes with protect + restrictTo('admin').

#### `src/routes/index.js`
Aggregates all v1 routes under `/api/v1`.

#### `src/middlewares/auth.middleware.js`
Two middleware functions:
- `protect` — verifies JWT, attaches `req.user`, checks `isActive`
- `restrictTo` — checks role against allowed roles array

#### `src/middlewares/error.middleware.js`
Global error handler handling:
- CastError (invalid ObjectId)
- Duplicate key (11000)
- ValidationError
- Dev vs Prod error formatting

#### `src/middlewares/validation.middleware.js`
Joi validation middleware for:
- Earthquake creation
- User registration
- User login

#### `src/middlewares/logger.middleware.js`
Custom request logger capturing method, URL, status, duration, and IP.

#### `src/middlewares/rateLimit.middleware.js`
Three rate limiter configurations:
- apiLimiter: 100 req / 15 min
- authLimiter: 5 req / 1 hour (skips successful)
- strictLimiter: 20 req / 1 hour

#### `src/middlewares/upload.middleware.js`
Multer configuration for JSON file uploads.

#### `src/utils/AppError.js`
Custom operational error class with `isOperational` flag.

#### `src/utils/catchAsync.js`
Wrapper to avoid try/catch duplication in async route handlers.

#### `src/utils/filterBuilder.js`
Fluent builder pattern for constructing MongoDB filter objects.

#### `src/utils/pagination.util.js`
Pagination metadata calculator (page, limit, skip, totalPages).

#### `src/utils/validators.js`
Domain-specific validation functions (earthquake, user).

#### `src/utils/email.service.js`
Email abstraction layer (SMTP-ready for production).

#### `src/utils/logger.js`
Winston logger with file + console transports.

---

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|:---------|:---------|:--------|:------------|
| `NODE_ENV` | ✅ | `development` | Controls error verbosity, logging level |
| `PORT` | ❌ | `5000` | HTTP server listen port |
| `MONGODB_URI` | ✅ | — | MongoDB Atlas or local connection string |
| `JWT_SECRET` | ✅ | — | HMAC secret for signing tokens (min 32 chars) |
| `JWT_EXPIRES_IN` | ❌ | `7d` | Token lifetime (e.g., `1h`, `7d`, `30d`) |
| `FRONTEND_URL` | ❌ | `http://localhost:5173` | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS` | ❌ | `900000` | Rate limit window in milliseconds |
| `RATE_LIMIT_MAX` | ❌ | `100` | Max requests per window |
| `LOG_LEVEL` | ❌ | `info` | Winston log level |

### `.env.example`

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/earthquake-analytics

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# CORS
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

---

## 📦 Installation Steps

```bash
# Step 1: Clone the repository
git clone https://github.com/your-org/earthquake-analytics-api.git
cd earthquake-analytics-api/backend

# Step 2: Install all dependencies
npm install

# Step 3: Create environment file
cp .env.example .env

# Step 4: Edit .env with your MongoDB URI
# Open .env and set:
# MONGODB_URI=mongodb://localhost:27017/earthquake-analytics
# JWT_SECRET=<your-secure-random-string>

# Step 5: Seed the database with sample data
npm run seed

# Step 6: Start the development server
npm run dev
```

---

## 💻 Local Development Setup

### Prerequisites Checklist

- [ ] Node.js >= 18.0.0 installed (`node --version`)
- [ ] npm >= 9.0.0 installed (`npm --version`)
- [ ] MongoDB >= 6.0 installed and running (`mongod --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor (VS Code recommended)

### Verify Setup

```bash
node --version   # v18.x.x
npm --version    # v9.x.x
mongod --version # db version v7.x.x
```

### Common Issues

| Issue | Solution |
|:------|:---------|
| MongoDB connection refused | Start MongoDB: `mongod --dbpath /data/db` |
| Port 5000 already in use | Set `PORT=5001` in `.env` |
| JWT secret not set | Generate one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

---

## 🗄 MongoDB Setup

### Local MongoDB

```bash
# Start MongoDB
mongod --dbpath /data/db

# Or on macOS with Homebrew
brew services start mongodb-community
```

### MongoDB Connection String Formats

```
# Local (no auth)
mongodb://localhost:27017/earthquake-analytics

# MongoDB Atlas
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/earthquake-analytics

# Local with auth
mongodb://admin:password@localhost:27017/earthquake-analytics?authSource=admin
```

---

## 🚀 Running the Server

### Development Mode

```bash
npm run dev
```

Uses `nodemon` for hot-reloading on file changes.

### Production Mode

```bash
npm start
```

Starts a single Node.js process.

### Expected Output

```
[nodemon] starting `node server.js`
[info] MongoDB Connected: localhost:27017
[info] Server running on port 5000
[info] Environment: development
```

---

## 🔗 API Base URL

```
Development:  http://localhost:5000/api/v1
Production:   https://your-domain.com/api/v1
```

### Quick Test

```bash
# Health check
curl http://localhost:5000/health

# Response:
# {"status":"OK","timestamp":"2026-05-13T10:00:00.000Z"}

# List first 5 earthquakes (no auth required)
curl http://localhost:5000/api/v1/earthquakes?limit=5

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## 🔐 Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  Client  │         │ Express  │         │  Auth    │         │ MongoDB  │
│          │         │  Router  │         │Controller│         │  (Users) │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ POST /auth/register│                    │                    │
     │ {name,email,pass}  │                    │                    │
     ├───────────────────►│                    │                    │
     │                    │ Route Match        │                    │
     │                    ├───────────────────►│                    │
     │                    │                    │ findOne({email})   │
     │                    │                    ├───────────────────►│
     │                    │                    │◄───────────────────┤
     │                    │                    │ User doc           │
     │                    │                    │                    │
     │                    │                    │ !user → create     │
     │                    │                    │ bcrypt(password)   │
     │                    │                    │                    │
     │                    │                    │ User.create({...}) │
     │                    │                    ├───────────────────►│
     │                    │                    │◄───────────────────┤
     │                    │                    │ newUser            │
     │                    │                    │                    │
     │                    │                    │ jwt.sign(id)      │
     │                    │                    │                    │
     │  201 {user,token}  │                    │                    │
     │◄───────────────────┼────────────────────┤                    │
     │                    │                    │                    │
     │                    │                    │                    │
     │ POST /auth/login   │                    │                    │
     │ {email,password}   │                    │                    │
     ├───────────────────►│                    │                    │
     │                    │ Route Match        │                    │
     │                    ├───────────────────►│                    │
     │                    │                    │ findOne({email})   │
     │                    │                    │ .select('+password')│
     │                    │                    ├───────────────────►│
     │                    │                    │◄───────────────────┤
     │                    │                    │ user+hash          │
     │                    │                    │                    │
     │                    │                    │ comparePassword()  │
     │                    │                    │ bcrypt.compare     │
     │                    │                    │                    │
     │                    │                    │ update lastLogin   │
     │                    │                    │ jwt.sign(id)      │
     │                    │                    │                    │
     │  200 {user,token}  │                    │                    │
     │◄───────────────────┼────────────────────┤                    │
     │                    │                    │                    │
     │                    │                    │                    │
     │ GET /auth/profile  │                    │                    │
     │ Authorization:     │                    │                    │
     │ Bearer <token>     │                    │                    │
     ├───────────────────►│                    │                    │
     │                    │ auth.protect       │                    │
     │                    │ jwt.verify(token)  │                    │
     │                    │ User.findById(id)  │                    │
     │                    ├───────────────────►│                    │
     │                    │◄───────────────────┤                    │
     │                    │ req.user = doc     │                    │
     │                    │                    │                    │
     │  200 {user}        │                    │                    │
     │◄───────────────────┤                    │                    │
```

---

## 🔑 JWT Flow

### Token Generation

```javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};
```

### Token Verification

```javascript
// In auth.middleware.js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.id);
if (!user) return next(new AppError('User no longer exists', 401));
if (!user.isActive) return next(new AppError('Account deactivated', 401));
req.user = user;
```

### Token Payload Structure

```json
{
  "id": "6655abc123def456",
  "iat": 1718456789,
  "exp": 1719061589
}
```

| Field | Description |
|:------|:------------|
| `id` | MongoDB `_id` of the user |
| `iat` | Issued at (Unix timestamp) |
| `exp` | Expiration (Unix timestamp) |

---

## ⛓ Middleware Chaining Flow

```
Route Definition Example:
─────────────────────────────────────────────────────────
router.route('/')
  .get(earthquakeController.getAllEarthquakes)
  .post(protect, restrictTo('admin', 'moderator'), validateEarthquake, earthquakeController.createEarthquake);

Execution Order for POST:
─────────────────────────────────────────────────────────
1. express.json()              ← Parse request body
2. express.urlencoded()        ← Parse URL-encoded data
3. cors()                      ← Handle CORS headers
4. helmet()                    ← Set security headers
5. loggerMiddleware            ← Custom timing log
6. apiLimiter                  ← Rate limit check
7. authLimiter (on /auth/*)    ← Auth rate limit
8. protect                     ← Verify JWT token
9. restrictTo('admin','mod')   ← Check user role
10. validateEarthquake          ← Joi body validation
11. earthquakeController        ← Execute handler
12. errorHandler                ← Catch any errors
─────────────────────────────────────────────────────────
Response flows back through chain (reverse order)
```

---

## 🔄 Request Lifecycle

```
1. Client sends HTTP Request
   │
2. Node.js HTTP Server receives request
   │
3. Express Router matches URL pattern
   │
4. Middleware pipeline executes (in order):
    │  a. helmet → security headers
    │  b. cors → cross-origin check
    │  c. express.json → body parsing
    │  d. loggerMiddleware → custom logging
    │  e. rateLimiter → check request count
    │  f. auth.protect → JWT verification (if protected)
    │  g. auth.restrictTo → role check (if restricted)
    │  h. validation → Joi schema (if POST/PATCH)
   │
5. Controller function executes
   │  a. Extract params from req.params, req.query, req.body
   │  b. Call appropriate service method
   │
6. Service layer executes business logic
   │  a. Build MongoDB filter object
   │  b. Apply pagination (skip, limit)
   │  c. Apply sorting
   │  d. Execute query via Mongoose
   │
7. Mongoose executes MongoDB query
   │  a. Use indexes for performance
   │  b. Return documents
   │
8. Service returns data to controller
   │
9. Controller formats JSON response
   │  a. success: true/false
   │  b. message string
   │  c. data array/object
   │  d. pagination metadata
   │
10. Express sends HTTP response
    │
11. Logger middleware logs completed request
    │
12. Client receives JSON response
```

---

## ❌ Error Handling Architecture

### Custom AppError Class

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;     // Distinguishes expected vs programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}
```

### CatchAsync Wrapper

```javascript
// Eliminates try/catch duplication in every controller
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);  // Passes error to global handler
  };
};
```

### Error Categories

| Category | HTTP Code | isOperational | Handler | Example |
|:---------|:----------|:--------------|:--------|:--------|
| Validation | 400 | ✅ | Joi + Mongoose | Invalid latitude (-999) |
| Duplicate | 400 | ✅ | error.middleware | Duplicate earthquake ID |
| Cast Error | 400 | ✅ | error.middleware | Invalid ObjectId string |
| Not Found | 404 | ✅ | Controller | Earthquake doesn't exist |
| Unauthorized | 401 | ✅ | auth.middleware | Missing/expired token |
| Forbidden | 403 | ✅ | auth.middleware | Insufficient role |
| Rate Limit | 429 | ✅ | rateLimit.middleware | Too many requests |
| Internal | 500 | ❌ | error.middleware | Uncaught exception |

### Error Response Format (Production)

```json
{
  "success": false,
  "message": "Earthquake not found"
}
```

### Error Response Format (Development)

```json
{
  "success": false,
  "message": "Cast to ObjectId failed for value \"abc\" at path \"_id\"",
  "error": {
    "statusCode": 400,
    "status": "fail",
    "isOperational": true
  },
  "stack": "Error: ..."
}
```

---

## ✅ Validation System

### Layers of Validation

```
┌─────────────────────────────────────────┐
│        1. Mongoose Schema Validation    │
│  ├── required: [true, 'message']        │
│  ├── min/max (numbers)                  │
│  ├── enum (allowed values)              │
│  ├── match (regex patterns)             │
│  ├── minlength / maxlength (strings)    │
│  └── unique (no duplicates)             │
├─────────────────────────────────────────┤
│        2. Joi Middleware Validation      │
│  ├── earthquake validation              │
│  ├── register validation                │
│  └── login validation                   │
├─────────────────────────────────────────┤
│        3. Controller-Level Validation    │
│  ├── Check for empty arrays (bulk)      │
│  ├── Parse query params to correct types│
│  └── Sanitize filter objects            │
└─────────────────────────────────────────┘
```

### Joi Schema Example

```javascript
const earthquakeSchema = Joi.object({
  id: Joi.string().required(),
  time: Joi.date().iso().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  depth: Joi.number().min(0).max(1000).required(),
  mag: Joi.number().min(0).max(10).required(),
  place: Joi.string().required(),
  status: Joi.string().valid('reviewed', 'automatic', 'deleted')
});
```

### Validation Error Response

```json
{
  "success": false,
  "message": "\"latitude\" must be less than or equal to 90"
}
```

---

## 🗄 Database Schema Design

### 📌 Earthquake Schema

```javascript
{
  _id:             ObjectId,       // MongoDB auto-generated
  id:              String,         // USGS event ID (unique, indexed)
  time:            Date,           // Event timestamp (indexed)
  updated:         Date,           // Last update
  place:           String,         // Human-readable location (text indexed)
  type:            String,         // earthquake, quarry, explosion, etc.
  latitude:        Number,         // -90 to 90
  longitude:       Number,         // -180 to 180
  depth:           Number,         // 0-1000 km
  mag:             Number,         // 0-10
  magType:         String,         // mb, ml, ms, mw, etc.
  magError:        Number,         // Measurement uncertainty
  magNst:          Number,         // Stations used
  horizontalError: Number,         // Location uncertainty
  depthError:      Number,         // Depth uncertainty
  nst:             String,         // Station count
  gap:             Number,         // Azimuthal gap
  dmin:            Number,         // Distance to nearest station
  rms:             Number,         // Root-mean-square residual
  net:             String,         // Network code (indexed)
  locationSource:  String,         // Source network
  magSource:       String,         // Mag source network
  status:          String,         // reviewed, automatic, deleted
  country:         String,         // Derived from place (indexed)
  year:            Number,         // Derived from time
  month:           Number,         // Derived from time
  day:             Number,         // Derived from time
  hour:            Number,         // Derived from time
  depthCategory:   String,         // shallow, intermediate, deep
  magnitudeCategory: String,       // minor, light, moderate, strong, major, great
  createdAt:       Date,           // Mongoose timestamp
  updatedAt:       Date            // Mongoose timestamp
}
```

#### Virtual Properties

```javascript
earthquakeSchema.virtual('coordinates').get(function() {
  return [this.longitude, this.latitude];  // GeoJSON format
});
```

#### Pre-save Hooks (Automatically Derived)

| Field | Derivation |
|:------|:-----------|
| `country` | Last element of `place` split by comma |
| `year` | `time.getUTCFullYear()` |
| `month` | `time.getUTCMonth() + 1` |
| `day` | `time.getUTCDate()` |
| `hour` | `time.getUTCHours()` |
| `depthCategory` | `depth < 70 → shallow`, `< 300 → intermediate`, `else → deep` |
| `magnitudeCategory` | `mag < 4 → minor`, `< 5 → light`, `< 6 → moderate`, `< 7 → strong`, `< 8 → major`, `else → great` |

---

### 👤 User Schema

```javascript
{
  _id:        ObjectId,
  name:       String,         // 2-50 chars, required
  email:      String,         // Unique, lowercase, regex validated
  password:   String,         // bcrypt hashed, select: false
  role:       String,         // user | moderator | admin
  isActive:   Boolean,        // Soft-delete (default: true)
  isVerified: Boolean,        // Email verified (default: false)
  lastLogin:  Date,           // Last successful login
  preferences: {
    theme:          String,   // light | dark
    notifications:  Boolean,  // Email notifications
    itemsPerPage:   Number    // Pagination preference
  },
  passwordResetToken:   String, // Crypto token
  passwordResetExpires: Date,   // Token expiry
  createdAt: Date,
  updatedAt: Date
}
```

#### bcrypt Hashing

```javascript
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);  // 12 salt rounds
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

---

### 📋 AuditLog Schema

```javascript
{
  _id:       ObjectId,
  userId:    ObjectId,       // Ref → User
  action:    String,         // CREATE | UPDATE | DELETE | READ | LOGIN | LOGOUT | EXPORT
  resource:  String,         // Earthquake | User | etc.
  resourceId: String,        // ID of affected resource
  details:   Mixed,          // Request body or metadata
  ipAddress: String,         // Client IP
  userAgent: String,         // Browser/Client info
  timestamp: Date,           // When action occurred
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📈 MongoDB Indexing Strategy

### Indexes Defined

```javascript
earthquakeSchema.index({ latitude: 1, longitude: 1 });     // Geo queries
earthquakeSchema.index({ mag: -1 });                         // High-mag sorting
earthquakeSchema.index({ depth: 1 });                        // Depth range queries
earthquakeSchema.index({ time: -1 });                        // Recent-first queries
earthquakeSchema.index({ place: 'text' });                   // Full-text search
earthquakeSchema.index({ country: 1, status: 1 });           // Compound filter
earthquakeSchema.index({ magType: 1, net: 1 });              // Network analysis
earthquakeSchema.index({ id: 1 }, { unique: true });         // USGS ID lookup

auditLogSchema.index({ userId: 1, timestamp: -1 });          // User audit trail
auditLogSchema.index({ action: 1, resource: 1 });            // Action filtering
```

### Index Performance Impact

| Query Pattern | Without Index | With Index |
|:--------------|:--------------|:-----------|
| `find({ country: 'Japan' })` | Full collection scan (40K docs) | Index scan (5K docs) |
| `sort({ mag: -1 })` | In-memory sort of 40K docs | Sorted index traversal |
| `find({ time: { $gte: date } })` | Full scan | Index range scan |
| `$text: { $search: 'Japan' }` | Impossible without text index | Full-text search index |

---

## ⚡ Aggregation Pipeline

### Pipeline Stages Used

```javascript
// Example: Country Analysis Pipeline
[
  { $group: {
      _id: '$country',
      count: { $sum: 1 },
      avgMagnitude: { $avg: '$mag' },
      maxMagnitude: { $max: '$mag' },
      avgDepth: { $avg: '$depth' }
  }},
  { $sort: { count: -1 } },
  { $limit: 10 }
]
```

### All Pipeline Definitions

#### Magnitude Distribution

```javascript
[
  { $bucket: {
      groupBy: '$mag',
      boundaries: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      default: 'Other',
      output: { count: { $sum: 1 }, avgDepth: { $avg: '$depth' } }
  }}
]
```

#### Depth Distribution

```javascript
[
  { $bucket: {
      groupBy: '$depth',
      boundaries: [0, 50, 100, 150, 200, 250, 300, 400, 500, 700],
      default: 'Deepest',
      output: { count: { $sum: 1 }, avgMagnitude: { $avg: '$mag' } }
  }}
]
```

#### Recent Activity

```javascript
[
  { $match: { time: { $gte: thirtyDaysAgo } } },
  { $group: {
      _id: { year: { $year: '$time' }, month: { $month: '$time' }, day: { $dayOfMonth: '$time' } },
      count: { $sum: 1 },
      avgMagnitude: { $avg: '$mag' },
      maxMagnitude: { $max: '$mag' }
  }},
  { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
  { $limit: 30 }
]
```

#### Location Heatmap

```javascript
[
  { $group: {
      _id: { lat: { $floor: { $divide: ['$latitude', 10] } }, lon: { $floor: { $divide: ['$longitude', 10] } } },
      count: { $sum: 1 },
      avgMagnitude: { $avg: '$mag' },
      maxMagnitude: { $max: '$mag' }
  }},
  { $sort: { count: -1 } },
  { $limit: 50 }
]
```

---

## 📄 Pagination System

### How Pagination Works

```
Client Request:  GET /earthquakes?page=3&limit=10
                              │          │
                              ▼          ▼
                    page = 3        limit = 10
                              │          │
                              ▼          ▼
                    skip = (3-1)*10 = 20
                    
                    MongoDB Query:
                    .find(filter)
                    .sort(sort)
                    .skip(20)        ← Skip first 20 docs
                    .limit(10)       ← Return next 10 docs
```

### Pagination Utility

```javascript
class PaginationUtil {
  static getPagination(page, limit) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    return { page: pageNum, limit: limitNum, skip };
  }

  static getPaginationMeta(total, page, limit) {
    return {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }
}
```

### Pagination Response

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

| Field | Description |
|:------|:------------|
| `page` | Current page number |
| `limit` | Items per page |
| `totalPages` | Total number of pages available |
| `hasNext` | `true` if there's a next page |
| `hasPrev` | `true` if there's a previous page |
| `total` | Total matching documents across all pages |

---

## 🔍 Dynamic Filtering System

### Filter Parameters

The `GET /earthquakes` endpoint accepts 15+ filter parameters that are dynamically converted to a MongoDB filter object.

```javascript
// Query params → MongoDB filter object mapping
const filter = {};
if (country) filter.country = country;                           // Exact match
if (magType) filter.magType = magType;                             // Exact match
if (status) filter.status = status;                                // Exact match
if (minMagnitude || maxMagnitude) {
  filter.mag = {};
  if (minMagnitude) filter.mag.$gte = parseFloat(minMagnitude);   // Range
  if (maxMagnitude) filter.mag.$lte = parseFloat(maxMagnitude);   // Range
}
if (place) filter.place = { $regex: place, $options: 'i' };      // Regex
if (depthCategory) filter.depthCategory = depthCategory;          // Exact
if (magnitudeCategory) filter.magnitudeCategory = magnitudeCategory;
```

### Example Filter Requests

```bash
# Single filter
GET /earthquakes?country=Japan

# Multiple filters
GET /earthquakes?country=Japan&minMagnitude=6&minDepth=50&status=reviewed

# Range filters
GET /earthquakes?minMagnitude=5&maxMagnitude=7&minDepth=10&maxDepth=100

# Regex search on place
GET /earthquakes?place=Tokyo

# Category filters
GET /earthquakes?depthCategory=deep&magnitudeCategory=major
```

---

## 🔎 Advanced Search System

### Search Endpoint

```http
GET /api/v1/search/earthquakes?q=japan&page=1&limit=20
```

### Search Logic

```javascript
const searchRegex = new RegExp(q.trim(), 'i');

const filter = {
  $or: [
    { place: searchRegex },       // Match against location name
    { country: searchRegex },     // Match against country
    { net: searchRegex },         // Match against network code
    { magType: searchRegex },     // Match against magnitude type
    { type: searchRegex },        // Match against event type
    { status: searchRegex }       // Match against review status
  ]
};
```

### Searchable Fields

| Field | Type | Example |
|:------|:-----|:--------|
| `place` | Regex (case-insensitive) | `?q=tokyo` |
| `country` | Regex (case-insensitive) | `?q=japan` |
| `net` | Regex (case-insensitive) | `?q=US` |
| `magType` | Regex (case-insensitive) | `?q=mb` |
| `type` | Regex (case-insensitive) | `?q=explosion` |
| `status` | Regex (case-insensitive) | `?q=reviewed` |

---

## 🗂 Sorting System

### Sort Parameter Format

```javascript
// sort = "fieldName"       → ascending
// sort = "-fieldName"      → descending
```

### Supported Sort Fields

| Sort Value | Behavior |
|:-----------|:---------|
| `-time` | Most recent first (default) |
| `time` | Oldest first |
| `-mag` | Highest magnitude first |
| `mag` | Lowest magnitude first |
| `-depth` | Deepest first |
| `depth` | Shallowest first |
| `place` | Alphabetical A-Z |

### Example Sort Requests

```bash
# Most recent earthquakes
GET /earthquakes?sort=-time

# Highest magnitude first
GET /earthquakes?sort=-mag

# Shallowest first
GET /earthquakes?sort=depth

# Combined with filters
GET /earthquakes?country=Japan&sort=-mag&limit=5
```

---

## ⏱ Rate Limiting System

### Three-Tier Rate Limiting

```
┌─────────────────────────────────────────────────────────┐
│                    API LIMITER                           │
│  Window: 15 minutes                                      │
│  Max:    100 requests                                    │
│  Applied to: All /api/* routes                          │
│  Response: 429 Too Many Requests                        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    AUTH LIMITER                          │
│  Window: 1 hour                                          │
│  Max:    5 requests                                      │
│  Applied to: /api/v1/auth/* routes                      │
│  Response: 429 Too Many Requests                        │
│  Note: Skips successful login attempts                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   STRICT LIMITER                         │
│  Window: 1 hour                                          │
│  Max:    20 requests                                     │
│  Applied to: Sensitive admin endpoints                  │
│  Response: 429 Too Many Requests                        │
└─────────────────────────────────────────────────────────┘
```

### Rate Limit Configuration

```javascript
const rateLimit = require('express-rate-limit');

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,          // 15 minutes
  max: 100,                           // 100 requests
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

exports.authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,          // 1 hour
  max: 5,                             // 5 login attempts
  message: 'Too many login attempts, please try again after 1 hour',
  skipSuccessfulRequests: true        // Don't count successful logins
});
```

### Rate Limit Response

```json
// HTTP 429 Too Many Requests
{
  "success": false,
  "message": "Too many requests from this IP, please try again after 15 minutes"
}
```

---

## 📝 Logging System

### Winston Logger

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })  // Dev only
  ]
});
```

### Custom Logger Middleware

```javascript
exports.loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      ip: req.ip
    });
  });
  next();
};
```

### Log Output Example

```
# error.log
{"level":"error","message":"Earthquake not found","timestamp":"2026-05-13T10:30:45.000Z"}

# combined.log
{"level":"info","message":"GET /api/v1/earthquakes 200 142ms","timestamp":"2026-05-13T10:30:45.000Z"}
{"level":"info","message":"POST /api/v1/auth/login 200 356ms","timestamp":"2026-05-13T10:30:46.000Z"}
```

---



## 🛡 Security Best Practices

| Practice | Implementation | Benefit |
|:---------|:---------------|:--------|
| **Password Hashing** | bcrypt (12 rounds) | Rainbow table resistant |
| **JWT Signing** | HMAC with long secret | Token forgery prevention |
| **Token Expiry** | 7 day TTL with refresh capability | Limits stolen token window |
| **Role Authorization** | `restrictTo()` middleware | Prevents privilege escalation |
| **Helmet Headers** | XSS, nosniff, frameguard, etc. | Blocks common web attacks |
| **CORS Whitelist** | Only allow `FRONTEND_URL` | Prevents unauthorized origins |
| **Rate Limiting** | 3 tiers (api, auth, strict) | Brute force + DDoS mitigation |
| **Input Validation** | Joi schemas on all inputs | SQL/NoSQL injection prevention |
| **Error Sanitization** | No stack traces in production | Information leakage prevention |
| **Body Size Limit** | `express.json({ limit: '10mb' })` | Payload overflow prevention |
| **`select: false`** | Password excluded from queries | Accidental exposure prevention |
| **Soft Delete** | `isActive` flag on users | Data recovery capability |
| **Audit Logging** | All admin actions logged | Compliance + accountability |

---

## 📦 API Response Structure

### Success Response

```json
{
  "success": true,
  "message": "Earthquakes fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 42,
    "hasNext": true,
    "hasPrev": false
  },
  "total": 415
}
```

### Single Item Response

```json
{
  "success": true,
  "message": "Earthquake fetched successfully",
  "data": {
    "_id": "6655abc123def456",
    "id": "us1000example",
    "time": "2024-01-15T10:30:00.000Z",
    "place": "10km SE of Tokyo, Japan",
    "mag": 5.2,
    "depth": 50,
    "status": "reviewed",
    "country": "Japan"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Earthquake not found"
}
```

### Validation Error Response

```json
{
  "success": false,
  "message": "\"latitude\" must be less than or equal to 90"
}
```

### Authentication Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "6655abc123def456",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 📖 Complete API Documentation

### 1. Basic CRUD Routes

#### `GET /api/v1/earthquakes`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes` |
| **Description** | Retrieve paginated list of earthquakes with filters |
| **Auth Required** | ❌ No |
| **Query Params** | See filtering section below |
| **Sorting** | ✅ `?sort=-mag` |
| **Pagination** | ✅ `?page=1&limit=10` |

**Request:**
```bash
curl "http://localhost:5000/api/v1/earthquakes?page=1&limit=10&sort=-mag&country=Japan"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Earthquakes fetched successfully",
  "data": [
    {
      "_id": "6655abc123def456",
      "id": "us1000example",
      "time": "2024-01-15T10:30:00.000Z",
      "place": "10km SE of Tokyo, Japan",
      "mag": 5.2,
      "magType": "mb",
      "depth": 50,
      "status": "reviewed",
      "country": "Japan"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "totalPages": 42, "hasNext": true, "hasPrev": false },
  "total": 415
}
```

---

#### `GET /api/v1/earthquakes/:id`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/:id` |
| **Description** | Get single earthquake by MongoDB `_id` |
| **Auth Required** | ❌ No |
| **Route Params** | `id` — MongoDB ObjectId |
| **Status Codes** | `200` Found, `404` Not Found |

**Request:**
```bash
curl "http://localhost:5000/api/v1/earthquakes/6655abc123def456"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Earthquake fetched successfully",
  "data": {
    "_id": "6655abc123def456",
    "id": "us1000example",
    "time": "2024-01-15T10:30:00.000Z",
    "place": "10km SE of Tokyo, Japan",
    "latitude": 35.6762,
    "longitude": 139.6503,
    "depth": 50,
    "mag": 5.2,
    "magType": "mb",
    "status": "reviewed",
    "country": "Japan",
    "depthCategory": "shallow",
    "magnitudeCategory": "moderate"
  }
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Earthquake not found"
}
```

---

#### `POST /api/v1/earthquakes`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/earthquakes` |
| **Description** | Create a new earthquake record |
| **Auth Required** | ✅ Yes (admin, moderator) |
| **Role Required** | `admin`, `moderator` |
| **Validation** | Joi earthquake schema |
| **Status Codes** | `201` Created, `400` Validation, `401` Unauthorized, `403` Forbidden |

**Request:**
```bash
curl -X POST "http://localhost:5000/api/v1/earthquakes" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "us2024abc123",
    "time": "2024-06-15T14:30:00.000Z",
    "place": "25km WSW of Lima, Peru",
    "latitude": -12.0464,
    "longitude": -77.0428,
    "depth": 35,
    "mag": 4.8,
    "magType": "mb",
    "type": "earthquake",
    "status": "reviewed"
  }'
```

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Earthquake created successfully",
  "data": {
    "_id": "6655def789abc012",
    "id": "us2024abc123",
    "time": "2024-06-15T14:30:00.000Z",
    "place": "25km WSW of Lima, Peru",
    "latitude": -12.0464,
    "longitude": -77.0428,
    "depth": 35,
    "mag": 4.8,
    "magType": "mb",
    "status": "reviewed",
    "country": "Peru",
    "depthCategory": "shallow",
    "magnitudeCategory": "light"
  }
}
```

---

#### `PATCH /api/v1/earthquakes/:id`

| Detail | Value |
|:-------|:------|
| **Method** | `PATCH` |
| **Endpoint** | `/api/v1/earthquakes/:id` |
| **Description** | Partially update an earthquake record |
| **Auth Required** | ✅ Yes (admin, moderator) |
| **Role Required** | `admin`, `moderator` |
| **Status Codes** | `200` Updated, `404` Not Found, `401` Unauthorized, `403` Forbidden |

**Request:**
```bash
curl -X PATCH "http://localhost:5000/api/v1/earthquakes/6655abc123def456" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"mag": 5.5, "status": "reviewed"}'
```

---

#### `DELETE /api/v1/earthquakes/:id`

| Detail | Value |
|:-------|:------|
| **Method** | `DELETE` |
| **Endpoint** | `/api/v1/earthquakes/:id` |
| **Description** | Permanently delete an earthquake record |
| **Auth Required** | ✅ Yes (admin only) |
| **Role Required** | `admin` |
| **Status Codes** | `200` Deleted, `404` Not Found, `401` Unauthorized, `403` Forbidden |

**Request:**
```bash
curl -X DELETE "http://localhost:5000/api/v1/earthquakes/6655abc123def456" \
  -H "Authorization: Bearer <token>"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Earthquake deleted successfully"
}
```

---

#### `GET /api/v1/earthquakes/exists/:id`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/exists/:id` |
| **Description** | Check if earthquake exists by `_id` |
| **Auth Required** | ❌ No |

**Request:**
```bash
curl "http://localhost:5000/api/v1/earthquakes/exists/6655abc123def456"
```

**Response:**
```json
{
  "success": true,
  "exists": true
}
```

---

#### `POST /api/v1/earthquakes/bulk-create`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/earthquakes/bulk-create` |
| **Description** | Insert multiple earthquake records at once |
| **Auth Required** | ✅ Yes (admin only) |
| **Role Required** | `admin` |
| **Status Codes** | `201` Created, `400` Invalid array |

**Request:**
```bash
curl -X POST "http://localhost:5000/api/v1/earthquakes/bulk-create" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "earthquakes": [
      {"id": "eq001", "time": "2024-01-01T00:00:00Z", "place": "Test 1", "latitude": 0, "longitude": 0, "depth": 10, "mag": 4.5},
      {"id": "eq002", "time": "2024-01-02T00:00:00Z", "place": "Test 2", "latitude": 10, "longitude": 20, "depth": 50, "mag": 3.2}
    ]
  }'
```

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "2 earthquakes created successfully",
  "data": { "insertedCount": 2 }
}
```

---

#### `PATCH /api/v1/earthquakes/bulk-update`

| Detail | Value |
|:-------|:------|
| **Method** | `PATCH` |
| **Endpoint** | `/api/v1/earthquakes/bulk-update` |
| **Description** | Update multiple records matching a filter |
| **Auth Required** | ✅ Yes (admin only) |
| **Role Required** | `admin` |

**Request:**
```bash
curl -X PATCH "http://localhost:5000/api/v1/earthquakes/bulk-update" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"filter": {"country": "Japan"}, "update": {"status": "reviewed"}}'
```

---

#### `DELETE /api/v1/earthquakes/bulk-delete`

| Detail | Value |
|:-------|:------|
| **Method** | `DELETE` |
| **Endpoint** | `/api/v1/earthquakes/bulk-delete` |
| **Description** | Delete multiple records by IDs |
| **Auth Required** | ✅ Yes (admin only) |
| **Role Required** | `admin` |

**Request:**
```bash
curl -X DELETE "http://localhost:5000/api/v1/earthquakes/bulk-delete" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"ids": ["id1", "id2", "id3"]}'
```

---

### 2. Earthquake Information Routes

#### `GET /api/v1/earthquakes/place/:place`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/place/:place` |
| **Description** | Find earthquakes by place name (regex) |
| **Auth Required** | ❌ No |
| **Route Params** | `place` — Location name substring |

```bash
curl "http://localhost:5000/api/v1/earthquakes/place/Tokyo"
```

---

#### `GET /api/v1/earthquakes/country/:country`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/country/:country` |
| **Description** | Find earthquakes by country with pagination |
| **Auth Required** | ❌ No |
| **Route Params** | `country` — Country name |
| **Query Params** | `page`, `limit` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/country/Japan?page=1&limit=20"
```

---

#### `GET /api/v1/earthquakes/type/:type`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/type/:type` |
| **Description** | Filter earthquakes by event type |
| **Auth Required** | ❌ No |
| **Valid Values** | `earthquake`, `quarry`, `explosion`, `landslide`, `icequake`, `other` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/type/earthquake"
```

---

#### `GET /api/v1/earthquakes/status/:status`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/status/:status` |
| **Description** | Filter by review status |
| **Auth Required** | ❌ No |
| **Valid Values** | `reviewed`, `automatic`, `deleted` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/status/reviewed"
```

---

#### `GET /api/v1/earthquakes/mag-type/:magType`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/mag-type/:magType` |
| **Description** | Filter by magnitude type |
| **Auth Required** | ❌ No |
| **Valid Values** | `mb`, `ml`, `ms`, `mw`, `md`, `mh`, `mblg`, `mb_lg`, `mc`, `mwr`, `mww`, `mwb`, `mwc`, `mi`, `mlv`, `mfa` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/mag-type/mw"
```

---

#### `GET /api/v1/earthquakes/network/:net`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/network/:net` |
| **Description** | Filter by seismic network code |
| **Auth Required** | ❌ No |

```bash
curl "http://localhost:5000/api/v1/earthquakes/network/US"
```

---

#### `GET /api/v1/earthquakes/high-magnitude`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/high-magnitude` |
| **Description** | Earthquakes above a magnitude threshold |
| **Auth Required** | ❌ No |
| **Query Params** | `minMag` (default: 6), `page`, `limit` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/high-magnitude?minMag=6&page=1&limit=10"
```

---

#### `GET /api/v1/earthquakes/deep`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/deep` |
| **Description** | Deep earthquakes (depth >= threshold) |
| **Auth Required** | ❌ No |
| **Query Params** | `minDepth` (default: 300), `page`, `limit` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/deep?minDepth=300&page=1&limit=20"
```

---

#### `GET /api/v1/earthquakes/shallow`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/shallow` |
| **Description** | Shallow earthquakes (depth <= threshold) |
| **Auth Required** | ❌ No |
| **Query Params** | `maxDepth` (default: 70), `page`, `limit` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/shallow?maxDepth=70&page=1&limit=20"
```

---

#### `GET /api/v1/earthquakes/recent`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/recent` |
| **Description** | Earthquakes from last N days |
| **Auth Required** | ❌ No |
| **Query Params** | `days` (default: 7), `page`, `limit` |

```bash
curl "http://localhost:5000/api/v1/earthquakes/recent?days=7&page=1&limit=20"
```

---

#### `GET /api/v1/earthquakes/critical`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/earthquakes/critical` |
| **Description** | Critical earthquakes meeting risk criteria |
| **Auth Required** | ❌ No |

```bash
curl "http://localhost:5000/api/v1/earthquakes/critical"
```

**Criteria:**
- `mag >= 6.5`
- OR (`depth <= 10` AND `mag >= 5.5`)
- OR (`country IN [Japan, Indonesia, Chile, New Zealand]` AND `mag >= 6`)

---

### 3. Route Parameter Routes

| Endpoint | Param | Type | Description |
|:---------|:------|:-----|:------------|
| `GET /earthquakes/place/:place` | `:place` | String | Place name (regex) |
| `GET /earthquakes/country/:country` | `:country` | String | Country name |
| `GET /earthquakes/type/:type` | `:type` | String | Event type |
| `GET /earthquakes/status/:status` | `:status` | String | Review status |
| `GET /earthquakes/mag-type/:magType` | `:magType` | String | Magnitude type |
| `GET /earthquakes/network/:net` | `:net` | String | Network code |
| `GET /earthquakes/exists/:id` | `:id` | ObjectId | MongoDB ID |
| `GET /earthquakes/:id` | `:id` | ObjectId | MongoDB ID |
| `PATCH /earthquakes/:id` | `:id` | ObjectId | MongoDB ID |
| `DELETE /earthquakes/:id` | `:id` | ObjectId | MongoDB ID |

---

### 4. Query Parameter Routes

| Endpoint | Available Query Parameters |
|:---------|:--------------------------|
| `GET /earthquakes` | `page`, `limit`, `sort`, `country`, `magType`, `status`, `minMagnitude`, `maxMagnitude`, `minDepth`, `maxDepth`, `net`, `year`, `month`, `place`, `depthCategory`, `magnitudeCategory`, `minGap` |
| `GET /earthquakes/country/:country` | `page`, `limit` |
| `GET /earthquakes/high-magnitude` | `minMag`, `page`, `limit` |
| `GET /earthquakes/deep` | `minDepth`, `page`, `limit` |
| `GET /earthquakes/shallow` | `maxDepth`, `page`, `limit` |
| `GET /earthquakes/recent` | `days`, `page`, `limit` |
| `GET /search/earthquakes` | `q`, `page`, `limit` |
| `GET /analytics/deepest` | `limit` |
| `GET /analytics/recent-activity` | `days` |
| `GET /analytics/country-analysis` | `limit` |
| `GET /analytics/monthly-analysis` | `year` |
| `GET /stats/monthly-count` | `year` |
| `GET /admin/users` | `page`, `limit`, `role`, `isActive` |
| `GET /admin/audit-logs` | `page`, `limit`, `action`, `resource` |

---

### 5. Pagination Routes

All list endpoints support pagination via `page` and `limit` query parameters.

| Endpoint | Default Page | Default Limit | Max Limit |
|:---------|:-------------|:--------------|:----------|
| `GET /earthquakes` | 1 | 10 | 100 |
| `GET /earthquakes/country/:country` | 1 | 20 | 100 |
| `GET /earthquakes/high-magnitude` | 1 | 20 | 100 |
| `GET /search/earthquakes` | 1 | 20 | 100 |
| `GET /admin/users` | 1 | 20 | 100 |
| `GET /admin/audit-logs` | 1 | 20 | 100 |

---

### 6. Sorting Routes

| Endpoint | Sort Field | Sort Format |
|:---------|:-----------|:------------|
| `GET /earthquakes` | `time`, `mag`, `depth`, `place` | `?sort=-mag` (desc), `?sort=mag` (asc) |
| `GET /search/earthquakes` | `time` (default: -time) | `?sort=-time` |

**Available Sort Values:**
- `-time` — Most recent first (default)
- `time` — Oldest first
- `-mag` — Highest magnitude
- `mag` — Lowest magnitude
- `-depth` — Deepest first
- `depth` — Shallowest first
- `place` — Alphabetical A-Z

---

### 7. Search Routes

#### `GET /api/v1/search/earthquakes`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/search/earthquakes` |
| **Description** | Full-text search across multiple earthquake fields |
| **Auth Required** | ❌ No |
| **Query Params** | `q` (required), `page`, `limit` |
| **Status Codes** | `200` Results, `400` Missing query |

**Request:**
```bash
curl "http://localhost:5000/api/v1/search/earthquakes?q=japan&page=1&limit=20"
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": { "page": 1, "limit": 20, "totalPages": 5, "total": 98 }
}
```

---

### 8. Filtering Routes

| Endpoint | Filter Params | Filter Type |
|:---------|:--------------|:------------|
| `GET /earthquakes` | All params below | Dynamic filter |
| `GET /earthquakes/country/:country` | (route param) | Exact match |
| `GET /earthquakes/type/:type` | (route param) | Exact match |
| `GET /earthquakes/status/:status` | (route param) | Exact match |
| `GET /earthquakes/mag-type/:magType` | (route param) | Exact match |
| `GET /earthquakes/network/:net` | (route param) | Exact match |

**Dynamic Filter Parameters for `GET /earthquakes`:**

| Param | Type | Operator | Example |
|:------|:-----|:---------|:--------|
| `country` | String | Exact | `?country=Japan` |
| `magType` | String | Exact | `?magType=mw` |
| `status` | String | Exact | `?status=reviewed` |
| `minMagnitude` | Number | `>=` | `?minMagnitude=6` |
| `maxMagnitude` | Number | `<=` | `?maxMagnitude=7` |
| `minDepth` | Number | `>=` | `?minDepth=50` |
| `maxDepth` | Number | `<=` | `?maxDepth=100` |
| `net` | String | Exact | `?net=US` |
| `year` | Number | Exact | `?year=2024` |
| `month` | Number | Exact | `?month=3` |
| `place` | String | Regex | `?place=Tokyo` |
| `depthCategory` | String | Exact | `?depthCategory=deep` |
| `magnitudeCategory` | String | Exact | `?magnitudeCategory=major` |
| `minGap` | Number | `>=` | `?minGap=45` |

---

### 9. Analytics Routes

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/v1/analytics/highest-magnitude` | Highest magnitude earthquake |
| `GET` | `/api/v1/analytics/deepest` | Deepest N earthquakes |
| `GET` | `/api/v1/analytics/recent-activity` | Daily activity (last N days) |
| `GET` | `/api/v1/analytics/location-analysis` | 10° grid cell grouping |
| `GET` | `/api/v1/analytics/country-analysis` | Country-level stats |
| `GET` | `/api/v1/analytics/network-analysis` | Network statistics |
| `GET` | `/api/v1/analytics/magnitude-analysis` | Magnitude distribution |
| `GET` | `/api/v1/analytics/depth-analysis` | Depth distribution |
| `GET` | `/api/v1/analytics/monthly-analysis` | Monthly aggregation |

**Auth Required:** ❌ No (all analytics routes are public)

**Example — Country Analysis:**
```bash
curl "http://localhost:5000/api/v1/analytics/country-analysis?limit=5"
```

```json
{
  "success": true,
  "data": [
    { "_id": "Japan", "count": 5234, "avgMagnitude": 4.3, "maxMagnitude": 9.1, "avgDepth": 32.5 },
    { "_id": "Indonesia", "count": 4891, "avgMagnitude": 4.1, "maxMagnitude": 8.6, "avgDepth": 45.2 },
    { "_id": "United States", "count": 4321, "avgMagnitude": 3.8, "maxMagnitude": 7.2, "avgDepth": 28.1 },
    { "_id": "Chile", "count": 2987, "avgMagnitude": 4.5, "maxMagnitude": 8.3, "avgDepth": 55.3 },
    { "_id": "New Zealand", "count": 2156, "avgMagnitude": 4.0, "maxMagnitude": 7.8, "avgDepth": 40.7 }
  ]
}
```

---

### 10. Statistics Routes

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/v1/stats/count` | Total earthquake count |
| `GET` | `/api/v1/stats/highest-magnitude` | Highest magnitude record |
| `GET` | `/api/v1/stats/deepest` | Deepest earthquake record |
| `GET` | `/api/v1/stats/average-depth` | Average depth across all records |
| `GET` | `/api/v1/stats/average-magnitude` | Average magnitude across all records |
| `GET` | `/api/v1/stats/country-count` | Count per country (sorted desc) |
| `GET` | `/api/v1/stats/type-count` | Count per event type |
| `GET` | `/api/v1/stats/network-count` | Count per network |
| `GET` | `/api/v1/stats/reviewed-count` | Count of reviewed records |
| `GET` | `/api/v1/stats/monthly-count` | Monthly counts for a year |

**Auth Required:** ❌ No

**Example — Total Count:**
```bash
curl "http://localhost:5000/api/v1/stats/count"
```

```json
{
  "success": true,
  "data": { "total": 41523 }
}
```

**Example — Average Magnitude:**
```bash
curl "http://localhost:5000/api/v1/stats/average-magnitude"
```

```json
{
  "success": true,
  "data": { "averageMagnitude": 4.27 }
}
```

---

### 11. Combination Query Routes

```bash
# Complex query: pagination + sorting + multiple filters
curl "http://localhost:5000/api/v1/earthquakes?page=2&limit=25&sort=-mag&minMagnitude=6&maxDepth=100&magType=mw&status=reviewed"

# Country + magnitude range + depth range
curl "http://localhost:5000/api/v1/earthquakes?country=Japan&minMagnitude=5&maxMagnitude=7&minDepth=10&maxDepth=50&sort=-mag&limit=5"

# Place regex + status + category filter
curl "http://localhost:5000/api/v1/earthquakes?place=San&status=reviewed&magnitudeCategory=major&sort=-time&page=1&limit=10"
```

---

### 12. Middleware Routes

| Endpoint | Middleware Chain |
|:---------|:-----------------|
| `POST /earthquakes` | `protect` → `restrictTo('admin','moderator')` → `validateEarthquake` |
| `PUT /earthquakes/:id` | `protect` → `restrictTo('admin','moderator')` |
| `PATCH /earthquakes/:id` | `protect` → `restrictTo('admin','moderator')` |
| `DELETE /earthquakes/:id` | `protect` → `restrictTo('admin')` |
| `POST /earthquakes/bulk-create` | `protect` → `restrictTo('admin')` |
| `PATCH /earthquakes/bulk-update` | `protect` → `restrictTo('admin')` |
| `DELETE /earthquakes/bulk-delete` | `protect` → `restrictTo('admin')` |
| `POST /auth/logout` | `protect` |
| `GET /auth/profile` | `protect` |
| `PATCH /auth/profile` | `protect` |
| `POST /auth/change-password` | `protect` |
| `GET /admin/users` | `protect` → `restrictTo('admin')` |
| `PATCH /admin/users/:id` | `protect` → `restrictTo('admin')` |
| `DELETE /admin/users/:id` | `protect` → `restrictTo('admin')` |
| `GET /admin/audit-logs` | `protect` → `restrictTo('admin')` |

---

### 13. Authentication Routes

#### `POST /api/v1/auth/register`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/auth/register` |
| **Description** | Create a new user account |
| **Auth Required** | ❌ No |
| **Validation** | Joi register schema (name, email, password) |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "_id": "...", "name": "John Doe", "email": "john@example.com", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

#### `POST /api/v1/auth/login`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/auth/login` |
| **Description** | Authenticate and receive JWT token |
| **Auth Required** | ❌ No |
| **Rate Limited** | ✅ Yes (5 attempts/hour) |
| **Validation** | Joi login schema |

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "name": "Admin User", "email": "admin@example.com", "role": "admin" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

#### `POST /api/v1/auth/logout`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/auth/logout` |
| **Description** | Logout (client-side token removal) |
| **Auth Required** | ✅ Yes |

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### `GET /api/v1/auth/profile`

| Detail | Value |
|:-------|:------|
| **Method** | `GET` |
| **Endpoint** | `/api/v1/auth/profile` |
| **Description** | Get authenticated user's profile |
| **Auth Required** | ✅ Yes |

```json
{
  "success": true,
  "data": {
    "_id": "6655abc...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "isActive": true,
    "preferences": { "theme": "light", "notifications": true }
  }
}
```

---

#### `PATCH /api/v1/auth/profile`

| Detail | Value |
|:-------|:------|
| **Method** | `PATCH` |
| **Endpoint** | `/api/v1/auth/profile` |
| **Description** | Update name and preferences |
| **Auth Required** | ✅ Yes |

```json
{
  "name": "Admin Updated",
  "preferences": { "theme": "dark", "notifications": false }
}
```

---

#### `POST /api/v1/auth/change-password`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/auth/change-password` |
| **Description** | Change password (requires current password) |
| **Auth Required** | ✅ Yes |

```json
{
  "currentPassword": "oldPass123",
  "newPassword": "newSecurePass456"
}
```

---

#### `POST /api/v1/auth/forgot-password`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/auth/forgot-password` |
| **Description** | Request password reset token |
| **Auth Required** | ❌ No |

```json
{
  "email": "john@example.com"
}
```

---

#### `POST /api/v1/auth/reset-password`

| Detail | Value |
|:-------|:------|
| **Method** | `POST` |
| **Endpoint** | `/api/v1/auth/reset-password` |
| **Description** | Reset password using token |
| **Auth Required** | ❌ No |

```json
{
  "token": "a1b2c3d4e5f6...",
  "newPassword": "myNewPassword789"
}
```

---

### 14. JWT Authentication Routes

All routes marked as **Auth Required** use the following header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**JWT Token Flow:**

```
1. POST /auth/login → Receive { user, token }
2. Store token (localStorage, cookie, etc.)
3. Include token in Authorization header for protected routes
4. Server verifies: jwt.verify(token, JWT_SECRET)
5. Server extracts user ID from payload
6. Server looks up user in MongoDB
7. Request proceeds or returns 401
```

---

### 15. Error Handling Routes

| HTTP Code | Meaning | When It Occurs |
|:----------|:--------|:---------------|
| `200` | OK | Successful GET, PATCH, DELETE |
| `201` | Created | Successful POST |
| `400` | Bad Request | Validation failure, missing params |
| `401` | Unauthorized | Missing/expired/invalid JWT |
| `403` | Forbidden | Insufficient role permissions |
| `404` | Not Found | Resource doesn't exist |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Unhandled exception |

---

### 16. Request Validation Routes

| Route | Validation Schema | Fields Validated |
|:------|:-----------------|:-----------------|
| `POST /earthquakes` | `earthquakeSchema` | id, time, latitude, longitude, depth, mag, magType, place, type, status |
| `POST /auth/register` | `registerSchema` | name, email, password, role |
| `POST /auth/login` | `loginSchema` | email, password |

---

### 17. API Rate Limiting Routes

| Route Group | Limiter | Limit |
|:------------|:--------|:------|
| `/api/*` | `apiLimiter` | 100 requests / 15 min |
| `/api/v1/auth/*` | `authLimiter` | 5 attempts / 1 hour (success skipped) |
| Admin endpoints | `strictLimiter` | 20 requests / 1 hour |

---

### 18. HEAD & OPTIONS Routes

All routes automatically support:

| Method | Behavior |
|:-------|:---------|
| `HEAD` | Returns same headers as GET without response body |
| `OPTIONS` | Returns allowed methods via CORS headers |

```bash
# Check allowed methods
curl -X OPTIONS http://localhost:5000/api/v1/earthquakes -v

# Response headers:
# Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
# Access-Control-Allow-Origin: *
```

---

## 📮 Postman Testing Guide

> [!TIP]
> **Interactive public documentation available** — explore all 50+ endpoints live with full request/response examples.
>
> [![Postman](https://img.shields.io/badge/%F0%9F%9A%80%20Open%20Postman%20Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/50839341/2sBXwmQseq)

### Setup

```bash
1. Open Postman
2. Click Import → Import File → Select `docs/postman_collection.json`
3. Create Environment:
   - Variable: `base_url` → Value: `http://localhost:5000/api/v1`
   - Variable: `token` → Value: (leave empty)
4. Save environment and select it
```

### Testing Flow

```
Step 1: Health Check
  GET {{base_url}}/../health

Step 2: Register
  POST {{base_url}}/auth/register
  Body: { "name": "Test", "email": "test@test.com", "password": "test123" }

Step 3: Login (this auto-sets the token variable via script)
  POST {{base_url}}/auth/login
  Body: { "email": "admin@example.com", "password": "admin123" }

Step 4: Get Profile (uses token from Step 3)
  GET {{base_url}}/auth/profile
  Headers: Authorization: Bearer {{token}}

Step 5: List Earthquakes (no auth needed)
  GET {{base_url}}/earthquakes?limit=5

Step 6: Create Earthquake (needs admin token)
  POST {{base_url}}/earthquakes
  Headers: Authorization: Bearer {{token}}

Step 7: Test Analytics
  GET {{base_url}}/analytics/country-analysis?limit=5

Step 8: Test Search
  GET {{base_url}}/search/earthquakes?q=japan
```

### Pre-request Script for Auto-Token

```javascript
// Automatically set token from login response
const responseJson = pm.response.json();
if (responseJson.data && responseJson.data.token) {
  pm.environment.set('token', responseJson.data.token);
}
```

---

## 🌱 Database Seeding Guide

### Seed Script

```bash
npm run seed
```

### What It Does

```
1. Connects to MongoDB using MONGODB_URI from .env
2. Clears existing Earthquake and User collections
3. Reads `src/data/earthquakes.json`
4. Inserts all earthquake records using insertMany()
5. Creates default admin user:
   - Email: admin@example.com
   - Password: admin123
   - Role: admin
   - Verified: true
6. Logs success message with counts
```

### Custom Data Seeding

Place your own JSON dataset in `src/data/earthquakes.json`:

```json
[
  {
    "id": "custom001",
    "time": "2024-06-01T00:00:00.000Z",
    "place": "Custom Location",
    "latitude": 35.0,
    "longitude": 135.0,
    "depth": 10,
    "mag": 6.5,
    "magType": "mw",
    "net": "US",
    "status": "reviewed"
  }
]
```

Then run:
```bash
npm run seed
```

---

## 💾 Backup Script Guide

### Backup Script

```bash
npm run backup
```

### What It Does

```
1. Connects to MongoDB
2. Exports all Earthquake documents (as plain JS objects)
3. Saves to timestamped JSON file: src/backups/earthquakes-backup-2026-05-13T10-30-45-000Z.json
4. Logs file path and record count
```

### Restore from Backup

```bash
# Copy backup file to seed data location
cp src/backups/earthquakes-backup-2026-05-13.json src/data/earthquakes.json

# Run seed to restore
npm run seed
```

---

## 🚀 Performance Optimization

| Technique | Implementation | Impact |
|:----------|:---------------|:-------|
| **MongoDB Indexes** | 8 indexes on high-cardinality fields | 10-50x query speed |
| **Server Pagination** | `skip()` + `limit()` with `countDocuments()` | Prevents OOM on large datasets |
| **Aggregation Pipeline** | Server-side data processing | 90%+ network transfer reduction |

| **Selective Fields** | No unnecessary data in responses | Smaller payloads |
| **Connection Pooling** | Mongoose default pool (100 connections) | Reuse DB connections |
| **Pre-save Hooks** | Compute derived fields on insert | No runtime computation cost |
| **Batch Operations** | `insertMany` for bulk inserts | Single round-trip vs N round-trips |

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

- Upgrade server hardware (RAM, CPU, SSD)
- Simple, no architecture changes needed
- Limited by maximum machine capacity

### Horizontal Scaling

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Load    │────►│ API      │────►│ MongoDB  │
│ Balancer │     │ Instance │     │ Primary  │
│ (nginx)  │────►│ 1        │     │    │     │
│          │     ├──────────┤     ├────┼─────┤
│          │────►│ API      │     │    ▼     │
│          │     │ Instance │     │ Replica  │
│          │────►│ 2        │     │   Set    │
│          │     ├──────────┤     └──────────┘
│          │────►│ API      │
│          │     │ Instance │
│          │     │ N        │
└──────────┘     └──────────┘
```

- Multiple Node.js instances behind load balancer
- MongoDB replica sets for read scaling
- Stateless JWT auth (any instance can handle any request)

### Replication & Sharding

| Strategy | Description | When to Use |
|:---------|:------------|:------------|
| **Replication** | Primary + secondary nodes for redundancy | High availability, read scaling |
| **Sharding** | Partition data across shards by `country` or `year` | Dataset > 100M records |
| **Read Preference** | Route reads to secondaries | Read-heavy workloads |

---

## 🏷 API Versioning

This API uses **URL-based versioning**:

```
/api/v1/earthquakes
/api/v1/auth/login
/api/v1/analytics/country-analysis
```

### Versioning Benefits

- **Backward Compatibility** — Existing clients continue working
- **Gradual Migration** — Clients can migrate at their own pace
- **Parallel Versions** — v1 and v2 can coexist
- **Clear Deprecation** — v1 can be deprecated with clear timelines

---

## ❤️ Health Check Endpoint

```http
GET /health
```

### Response

```json
{
  "status": "OK",
  "timestamp": "2026-05-13T10:00:00.000Z"
}
```

### Usage

```bash
# Monitor with curl
curl http://localhost:5000/health

# Monitor with cron (check every 5 minutes)
*/5 * * * * curl -f http://localhost:5000/health || echo "API Down!"
```

### Uptime Monitoring Integration

```bash
# Uptime Robot, Better Uptime, or Pingdom
# Configure to ping:
GET https://your-domain.com/health

# Expected response:
{"status":"OK","timestamp":"2026-05-13T10:00:00.000Z"}
```

---

## 📅 Development Timeline

### Phase 1: Foundation (Days 1-3)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 1 | Project Setup | Node.js init, Express server, folder structure, env config |
| 2 | Database | MongoDB connection, Earthquake schema, User schema, AuditLog schema |
| 3 | Configuration | Rate limiter config, .env.example, package.json scripts |

### Phase 2: Core API (Days 4-7)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 4 | CRUD Endpoints | GET all, GET by ID, POST, PATCH, DELETE earthquake |
| 5 | Info Routes | Place, country, type, status, mag-type, network endpoints |
| 6 | Bulk Operations | Bulk create, bulk update, bulk delete, exists check |
| 7 | Specialized Queries | High magnitude, deep, shallow, recent, critical |

### Phase 3: Auth & Security (Days 8-10)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 8 | Authentication | Register, login, logout, JWT generation, bcrypt hashing |
| 9 | Authorization | Role middleware, protected routes, profile management |
| 10 | Security | Helmet, CORS, rate limiting, error handling middleware |

### Phase 4: Analytics & Middleware (Days 11-13)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 11 | Analytics API | 9 aggregation endpoints, pipeline development |
| 12 | Statistics API | 10 stats endpoints, caching middleware |
| 13 | Middleware | Validation, logging, upload, cache, rate limit middleware |

### Phase 5: Finalization (Days 14-15)

| Day | Focus | Deliverables |
|:----|:------|:-------------|
| 14 | Scripts & Tools | Seed script, backup script, admin controller, audit logs |
| 15 | Documentation | README, Postman collection, API docs, testing |

---

## 🧠 Backend Completion Strategy

### Development Principles

| Principle | Implementation |
|:----------|:---------------|
| **Separation of Concerns** | Controllers handle HTTP, services handle business logic |
| **DRY (Don't Repeat Yourself)** | `catchAsync` wrapper, `AppError` class, utility functions |
| **Fail Fast** | Validate early in the middleware pipeline |
| **Defense in Depth** | Multiple validation layers (Mongoose + Joi + Controller) |
| **Strict Dependency Control** | Only checklist-required packages allowed |
| **Explicit Error Handling** | Every async route wrapped in `catchAsync` |

### Code Quality Checklist

- [ ] All controllers use `catchAsync`
- [ ] All services use `async/await`
- [ ] All errors use `AppError` class
- [ ] All POST/PATCH bodies validated with Joi
- [ ] All environment variables accessed via `process.env`
- [ ] All sensitive fields have `select: false`
- [ ] All index candidates are indexed
- [ ] All responses follow consistent format (`success`, `message`, `data`)
- [ ] All routes have proper HTTP status codes
- [ ] All auth routes have rate limiting

---

## 🏭 Industry Best Practices

### Code Style

```javascript
// ✅ Good: Services for business logic
class EarthquakeService {
  static async getByCountry(country, pagination) { ... }
}

// ✅ Good: Controllers for request/response only
exports.getByCountry = catchAsync(async (req, res) => {
  const result = await EarthquakeService.getByCountry(...);
  res.status(200).json({ success: true, ... });
});

// ✅ Good: catchAsync wrapper eliminates try/catch
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// ✅ Good: Custom error class for operational errors
class AppError extends Error { ... }

// ❌ Bad: Business logic in controllers
// ❌ Bad: Raw try/catch in every handler
// ❌ Bad: Generic Error instead of AppError
```

### API Design

```javascript
// ✅ Consistent response structure
{ success: true, message: "...", data: {}, pagination: {} }

// ✅ Proper HTTP verbs for CRUD
GET /earthquakes        // List
POST /earthquakes       // Create
PATCH /earthquakes/:id  // Partial update
DELETE /earthquakes/:id // Delete

// ✅ Plural nouns for resources
/earthquakes     // ✅
/earthquake      // ❌

// ✅ API versioning
/api/v1/earthquakes  // ✅
/earthquakes         // ❌
```

---

## 🔮 Future Improvements

| Feature | Description | Priority |
|:--------|:------------|:---------|
| **GraphQL API** | Alternative GraphQL interface for flexible queries | Medium |
| **WebSocket Alerts** | Real-time earthquake alerts for subscribed clients | High |

| **Data Export** | CSV/GeoJSON export endpoints for data portability | Medium |
| **Unit Tests** | Jest + Supertest test suite for all endpoints | High |
| **Swagger Docs** | Auto-generated OpenAPI documentation | Medium |
| **Rate Limit Headers** | Return `X-RateLimit-Remaining` headers | Low |
| **Pagination Links** | Add `Link` header with prev/next URLs | Low |
| **ETag Support** | Conditional requests for cache efficiency | Low |
| **Soft Delete** | Implement `deletedAt` instead of permanent delete | Medium |

---

## 🏁 Final Conclusion

**Earthquake Analytics API** is a production-ready, enterprise-grade RESTful backend that demonstrates:

- ✅ **Clean MVC Architecture** with strict separation of concerns
- ✅ **Industry-standard Security** with JWT auth, bcrypt, Helmet, CORS
- ✅ **Powerful Querying** with 15+ filters, pagination, sorting, search
- ✅ **Advanced Analytics** via MongoDB aggregation pipelines
- ✅ **Robust Error Handling** with custom AppError + global middleware
- ✅ **Comprehensive Validation** across Mongoose, Joi, and controller layers
- ✅ **Scalable Design** with stateless auth, indexing, and pagination

This API is ready to serve as the backend for seismic monitoring dashboards, research platforms, early warning systems, and educational applications.

---

## 👨‍💻 Author & Developer

<div align="center">

<br>

<img src="https://img.shields.io/badge/Full--Stack%20Developer-000000?style=for-the-badge&logo=code&logoColor=white" alt="Full-Stack Developer" />
<img src="https://img.shields.io/badge/MERN%20Stack-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MERN Stack" />
<img src="https://img.shields.io/badge/Generative%20AI-FF6B6B?style=for-the-badge&logo=openai&logoColor=white" alt="Generative AI" />

<br>
<br>

### Kamlesh Chandela

**Full-Stack Developer** · **MERN Stack & Generative AI**

🎓 Student at **Swaminarayan University, Kalol**

<br>

---

This project was **fully designed and developed independently** by me — from backend architecture and API design to MongoDB schema modeling, JWT authentication, analytics aggregation pipelines, middleware systems, and comprehensive documentation.

<br>

| Area | Details |
|:-----|:--------|
| 🏗 **Backend Architecture** | Designed and implemented the full monolithic MVC structure |
| 🔌 **RESTful APIs** | Built 50+ endpoints with consistent response patterns |
| 🗄 **MongoDB Schema Design** | Modeled Earthquake, User, and AuditLog schemas with indexes |
| 🔐 **Authentication & Authorization** | JWT-based auth with bcrypt hashing and role-based access |
| 📊 **Analytics Pipelines** | 9 MongoDB aggregation pipelines for seismic data intelligence |
| ⚙️ **Middleware System** | Auth, validation, rate limiting, logging, error handling |
| ✨ **Validation & Error Handling** | Multi-layer validation (Mongoose, Joi, controller) with centralized error handling |
| 📖 **Documentation** | Comprehensive developer-friendly API documentation |

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
