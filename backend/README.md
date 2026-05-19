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
