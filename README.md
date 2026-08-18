# South Trails

South Trails is a full-stack South India travel booking project with a React/Vite frontend and a Spring Boot backend.

## Quick Start

1. Copy `.env.example` to `.env`.
2. Start the backend:

```bash
npm run dev:backend
```

3. Seed or refresh backend packages:

```bash
npm run seed:backend-packages
```

4. Start the frontend:

```bash
npm run dev
```

Frontend: `http://127.0.0.1:5173`  
Backend health: `http://127.0.0.1:8080/api/health`  
Swagger UI: `http://127.0.0.1:8080/swaggerui.html`

## Main Features

- 68 seeded travel packages across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
- Package browsing, filters, detail pages, booking flow, booking success page, profile, reviews, wishlist, and mock payment receipts.
- Admin login, package management, real image uploads, bookings, customers, users, and live analytics.
- Spring Boot API with H2 persistence, validation, Swagger UI, static upload serving, and real analytics endpoints.

## Admin Login

Email: `admin@southtrails.com`  
Password: `admin123`

## Useful Commands

```bash
npm run lint
npm test
npm run build
npm run build:backend
npm run test:e2e
```

## Backend Data

Seed data lives in:

`backend/src/main/resources/package-seed.psv`

Uploaded admin package images are stored under:

`backend/uploads/packages`

## Notes

Keep `VITE_API_BASE_URL=http://127.0.0.1:8080/api` when using Spring Boot as the production data source.
