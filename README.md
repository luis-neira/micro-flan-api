# Node.js API
A Node.js REST API built with Express.js following a modular, dependency-injected architecture using Awilix.
Supports PostgreSQL via Knex.js and pg, with structured logging powered by Pino.

## Features
- Modular and maintainable architecture with controllers, repositories, and middleware

- Dependency injection for loose coupling and testability

- Config management and environment variable validation

- Database migrations and query building with Knex + PostgreSQL

- Fast, structured logging with Pino and pino-http

- Safe bootstrapping and error handling during startup

## Tech Stack
| Purpose                | Library          |
| ---------------------- | ---------------- |
| Web framework          | Express.js       |
| Dependency injection   | Awilix           |
| DB access & migrations | Knex + pg        |
| Config loading         | dotenv           |
| Config validation      | AJV              |
| Logging                | Pino & pino-http |

## Architecture
This API follows a modular, dependency-injected architecture that promotes loose coupling, testability, and maintainability.

### Core Concepts
- **Dependency Injection with Awilix**:
The API uses Awilix to manage dependencies. Instead of modules importing dependencies directly, all dependencies are registered in a DI container and injected where needed. This makes it easy to swap implementations or mock components for testing.

- **Layers and Responsibilities**:

   - **Controllers**: Handle incoming HTTP requests, invoke business logic, and return responses.

   - **Repositories**: Encapsulate all data access logic. They interact with the database via Knex, abstracting query building and persistence.

   - **Database Client**: The Knex instance is created once and injected as a singleton. Repositories receive it via DI.

   - **Middleware**: For cross-cutting concerns like authentication, logging, and error handling.

   - **Config and Logger**: Both are injected as singletons, providing consistent configuration and logging throughout the app.

## Project Structure
```
src
├── api
│   ├── auth
│   │   ├── index.js
│   │   └── usecase
│   │       └── login
│   │           └── login.controller.js
│   ├── rental
│   │   ├── index.js
│   │   └── usecase
│   │       ├── createRental
│   │       │   ├── create-rental.controller.js
│   │       │   ├── create-rental.repository.js
│   │       │   └── create-rental.schema.js
│   │       ├── deleteRental
│   │       │   ├── delete-rental.controller.js
│   │       │   ├── delete-rental.repository.js
│   │       │   └── delete-rental.schema.js
│   │       ├── getRental
│   │       │   ├── get-rentals.controller.js
│   │       │   ├── get-rentals.repository.js
│   │       │   └── get-rentals.schema.js
│   │       ├── getRentalTenants
│   │       │   ├── get-rental-tenants.controller.js
│   │       │   ├── get-rental-tenants.repository.js
│   │       │   └── get-rental-tenants.schema.js
│   │       └── updateRental
│   │           ├── update-rental.controller.js
│   │           ├── update-rental.repository.js
│   │           └── update-rental.schema.js
│   └── tenant
│       ├── index.js
│       └── usecase
│           └── getTenants
│               ├── get-tenants.controller.js
│               └── get-tenants.repository.js
├── app.js
├── bootstrap
│   ├── safeBuildContainer.js
│   ├── safeBuildExpressApp.js
│   ├── safeStartHttpServer.js
│   └── safeTestDatabaseConnection.js
├── config
│   ├── defaultsValidator.js
│   ├── index.js
│   └── validator.js
├── container
│   └── index.js
├── index.js
├── infra
│   ├── db
│   │   └── index.js
│   └── logger
│       └── index.js
├── lib
│   ├── format-bootstrap-error.js
│   ├── with-scope-handler.js
│   └── wrap-async.js
├── middleware
│   ├── authenticate-token.js
│   ├── cors.js
│   ├── error.js
│   ├── logger.js
│   ├── not-found.js
│   ├── timer.js
│   └── validate.js
└── server.js
```

## Configuration
- Uses `.env` files + dotenv

- Validated at startup with AJV

- Config is injected into the Awilix container so it’s accessible anywhere

Example .env:
```
# Application
NODE_VERSION=20.11.0
PORT=3000
NODE_ENV=production
ENABLE_SERVER_LOGGING=true
ENABLE_STACK_TRACE=true
ENABLE_CORS=false

# Database
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=
POSTGRES_PASSWORD=
DB_ENV=development

# Other Services
JWT_SECRET=

```

## Logging
- Application logs: Pino

- HTTP logs: pino-http

- Logs are JSON structured, making them easy to search and parse in production

## Database
- PostgreSQL as the database

- Knex.js used for:

   - Query building in repositories

   - Running migrations and seeds

## Getting Started
1. git clone the repsitory.
2. create a .env file at the root of the project and copy the environment variables from `.env.example` and fill in the values accordingly.
3. run `docker compose up`
