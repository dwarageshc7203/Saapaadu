# Saapaadu Backend (Spring Boot)

## Requirements
- Java 17
- PostgreSQL

## Environment variables

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=saapaadu
DB_URL=
MAIL_USER=
MAIL_PASS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
COOKIE_SAMESITE=Lax
COOKIE_SECURE=false
```

Notes:
- If `DB_URL` is set it overrides host/port/name.
- For production, set `COOKIE_SAMESITE=None` and `COOKIE_SECURE=true` when using cross-site cookies.

## Run

```
mvn spring-boot:run
```
