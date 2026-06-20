# South Trails Spring Boot API

Local API for the React app.

## Run

From the project root:

```powershell
npm run dev:backend
```

This script stops any old process already listening on port `8080` before starting the backend. That avoids H2 file-lock errors such as `Database may be already in use`.

In another terminal:

```powershell
npm run dev
```

Frontend: `http://127.0.0.1:5173/`

Backend: `http://localhost:8080/api`

Health check: `http://localhost:8080/api/health`

H2 console: `http://localhost:8080/h2-console`

Swagger UI: `http://localhost:8080/swaggerui.html`

OpenAPI JSON: `http://localhost:8080/api-docs`

JDBC URL: `jdbc:h2:file:./data/south-trails-db`

User: `sa`

Password: leave empty.

## Main Endpoints

- `GET /api/packages`
- `GET /api/packages/{id}`
- `POST /api/packages`
- `PUT /api/packages/{id}`
- `DELETE /api/packages/{id}`
- `GET /api/customers`
- `POST /api/auth/customer/signup`
- `POST /api/auth/customer/signin`
- `POST /api/auth/admin/signin`
- `GET /api/bookings`
- `POST /api/bookings`
- `PATCH /api/bookings/{id}/status`
- `GET /api/reviews`
- `POST /api/reviews`
- `POST /api/contact-requests`
