# Linkora – Full-Stack URL Shortener

Linkora is a full-stack URL shortener application that allows users to create short links, manage their URLs, and track link performance through click analytics. It combines a React-based frontend with a Spring Boot backend, JWT-based authentication, PostgreSQL persistence, and Redis caching for faster URL redirection.

## Features

### Authentication & Security
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users
- Secure access to user-specific URLs and analytics

### URL Management
- Create short URLs from long URLs
- Redirect short links to their original destinations
- View all URLs created by the authenticated user
- Update and delete existing URLs
- Manage links through a centralized dashboard

### Analytics & Dashboard
- Track clicks on individual short URLs
- View click analytics within a specified date range
- Retrieve total click counts by date
- Visualize link performance through analytics charts

### Performance & User Experience
- Redis caching for frequently accessed URL mappings
- Automatic expiration of cached entries based on configured TTL
- Responsive interface for desktop and mobile devices
- Clean dashboard for managing links and viewing analytics

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Chart.js
- React Query

### Backend
- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven

### Database & Caching
- PostgreSQL
- Hibernate
- Redis

### Tools
- Git and GitHub
- Postman
- Docker
- Docker Compose

## Architecture

Linkora follows a client-server architecture in which the React frontend communicates with the Spring Boot backend through REST APIs.

```text
                 User
                  |
                  v
        React + Vite Frontend
                  |
             Axios / HTTP
                  |
                  v
       Spring Boot REST API
                  |
          Spring Security
          + JWT Validation
                  |
                  v
             Service Layer
              /         \
             v           v
        PostgreSQL      Redis
        (Persistence)   (Cache)
```

### Request Flow

1. Users register or log in through the frontend.
2. The backend authenticates users and issues JWT tokens.
3. Authenticated requests include the JWT for authorization.
4. Users create and manage short URLs through REST APIs.
5. When a short URL is accessed, the backend checks Redis for the URL mapping.
6. If the mapping is not cached, the backend retrieves it from PostgreSQL and can cache it for subsequent requests.
7. The user is redirected to the original destination, and click analytics can be recorded.

## Project Structure

### Backend – Spring Boot

```text
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/url/shortner/
│       │       ├── controllers/
│       │       ├── service/
│       │       ├── repository/
│       │       ├── models/
│       │       ├── dtos/
│       │       ├── security/
│       │       ├── config/
│       │       ├── exceptions/
│       │       └── utils/
│       └── resources/
├── pom.xml
└── Dockerfile
```

### Frontend – React

```text
frontend/
├── src/
│   ├── components/
│   ├── contextApi/
│   ├── apis/
│   └── utils/
├── public/
├── package.json
├── package-lock.json
└── vite.config.js
```

*Note: Adjust the folder names above to match your actual repository structure.*

## Prerequisites

Before running the application, install:

- Java 21
- Node.js and npm
- PostgreSQL
- Redis
- Maven, or use the included Maven Wrapper

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Linkora
```

Replace `<repository-url>` with your GitHub repository URL.

### 2. Configure the Backend

Set the following environment variables:

| Variable | Description |
|---|---|
| `DB_URL` | PostgreSQL JDBC connection URL |
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `JWT_SECRET` | Secret key used to sign JWTs |
| `JWT_EXPIRATION` | Token expiration time, if configured |
| `REDIS_URL` | Redis connection URL |

Example local configuration:

```bash
DB_URL=jdbc:postgresql://localhost:5432/url_shortener
DB_USERNAME=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-secure-secret
JWT_EXPIRATION=172800000
REDIS_URL=redis://localhost:6379
```

Use your own credentials and a strong JWT secret. Do not commit actual credentials or secrets to GitHub.

Ensure PostgreSQL and Redis are running and the database exists before starting the backend.

### 3. Start the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

Alternatively, if Maven is installed:

```bash
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:9090
```

### 4. Start the Frontend

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

Ensure the frontend API configuration points to the running backend.

## API Endpoints

The following endpoints are exposed by the backend. Authenticated endpoints require a valid JWT according to the application's security configuration.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/public/register` | Register a user |
| POST | `/api/auth/public/login` | Authenticate a user |

### URL Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/urls/shorten` | Create a short URL |
| GET | `/api/urls/myurls` | Retrieve the user's URLs |
| PUT | `/api/urls/{shortUrl}` | Update a URL |
| DELETE | `/api/urls/{shortUrl}` | Delete a URL |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/urls/analytics/{shortUrl}` | Retrieve URL analytics |
| GET | `/api/urls/totalClicks` | Retrieve total clicks by date |

### URL Redirection

| Method | Endpoint | Description |
|---|---|---|
| GET | `/{shortUrl}` | Redirect to the original URL |

Refer to the backend implementation or Postman collection for exact request bodies, query parameters, and response formats.

## Redis Caching

Redis reduces repeated database lookups for frequently accessed short URLs.

When a short URL is requested, the application checks the cache for its original URL mapping. If the mapping is missing, the backend retrieves it from PostgreSQL and caches it for subsequent requests.

Cached entries expire according to the configured time-to-live (TTL), helping keep the cache manageable.

## Database

PostgreSQL stores persistent application data, including user and URL information. Hibernate and Spring Data JPA simplify database interactions.

The application uses the following Hibernate setting:

```properties
spring.jpa.hibernate.ddl-auto=update
```

This setting updates the database schema based on entity mappings. For production deployments, use a controlled schema migration strategy instead of relying on automatic schema updates.

## Testing with Postman

A Postman collection is included in the backend repository:

```text
URL Shortner Local.postman_collection.json
```

Import the collection into Postman to test authentication, URL management, redirection, and analytics endpoints.

Update the collection's base URL and authentication token as needed for your local setup.

## Docker

Docker support is included in the project.

Build the backend image from the directory containing the Dockerfile:

```bash
docker build -t linkora-backend .
```

Run the backend container:

```bash
docker run -p 9090:9090 linkora-backend
```

The backend also needs access to PostgreSQL and Redis. Configure their connection URLs and credentials for your Docker environment. Running the backend container alone does not start these services.

If a Docker Compose configuration is available, use it to coordinate the application and its dependencies.

## Future Enhancements

### Dashboard Summary Cards
- Display total URLs created.
- Display total clicks across all URLs.

### Improved Analytics
- Default to the last 7 or 30 days.
- Display helpful empty-state messages when insufficient click data exists.

### Search & Filtering
- Search URLs by original URL or description.
- Sort by most clicked, newest, or oldest.

### Improved URL Display
- Display destination domains instead of complete URLs.
- Example: `https://www.google.com/search?q=springboot` → `google.com`

### Production Readiness
- Add automated unit and integration tests.
- Introduce database migrations.
- Add centralized logging and monitoring.
- Improve deployment configuration and secret management.

## Learning Outcomes

This project demonstrates practical implementation of:

- Full-stack development using React and Spring Boot
- REST API design and frontend-backend integration
- JWT-based authentication and authorization
- Database persistence with PostgreSQL and Spring Data JPA
- Redis caching for performance optimization
- URL redirection and click analytics
- Containerization using Docker

---

**Linkora – Shorten links. Manage them. Track their performance.**
