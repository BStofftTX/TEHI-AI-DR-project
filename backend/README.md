# TEHI Backend

Spring Boot API for the TEHI mobile and dashboard apps.

## Stack

- Java 23
- Spring Boot 3.4.2
- Spring Security and JWT auth
- Spring Data JPA with PostgreSQL and H2 for local development
- SpringDoc OpenAPI
- MapStruct, Lombok, and Bean Validation
- Cloudinary, Firebase Admin, Twilio, and WebSocket support
- Maven 3.9.10

## Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/predict`
- `GET /api/model-info`

## Local Run

1. Install Java 23 and Maven 3.9.10.
2. From `backend/`, run:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

3. Open the API docs at `http://localhost:8080/swagger-ui/index.html`.

## Configuration

The app expects environment-specific values for:

- Database connection details
- JWT secret material
- Cloudinary credentials
- Firebase service account settings
- Twilio credentials

## Notes

- `POST /api/predict` currently proxies image inference through the service layer.
- The dev profile uses H2, while production is configured for PostgreSQL.
