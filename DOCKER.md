# Docker Setup for Castle Combo

This document explains how to run Castle Combo using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)

## Quick Start (Development)

1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your configuration (optional for development).

3. **Start all services:**
   ```bash
   docker-compose up
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

## Services

| Service | Port | Description |
|---------|------|-------------|
| `client` | 5173 | React frontend (Vite dev server) |
| `server` | 3000 | Express.js backend API |
| `mongodb` | 27017 | MongoDB database |
| `mongo-express` | 8081 | MongoDB admin UI (debug profile) |

## Common Commands

### Start services
```bash
# Start all services (foreground)
docker-compose up

# Start all services (background)
docker-compose up -d

# Start with MongoDB admin UI
docker-compose --profile debug up
```

### Stop services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
```

### Rebuild containers
```bash
# Rebuild all
docker-compose up --build

# Rebuild specific service
docker-compose up --build server
```

### Execute commands in containers
```bash
# Access server shell
docker-compose exec server sh

# Access client shell
docker-compose exec client sh

# Run npm commands
docker-compose exec server npm install <package>
docker-compose exec client npm install <package>
```

## Production Deployment

1. **Set production environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with secure production values
   ```

2. **Build and run production containers:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Access:**
   - Application: http://localhost (port 80)

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│                 (castle-combo-network)                   │
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐  │
│  │  Client  │───▶│  Server  │───▶│     MongoDB      │  │
│  │  :5173   │    │  :3000   │    │      :27017      │  │
│  │  (React) │    │ (Express)│    │                  │  │
│  └──────────┘    └──────────┘    └──────────────────┘  │
│       │               │                   │             │
└───────┼───────────────┼───────────────────┼─────────────┘
        │               │                   │
   localhost:5173  localhost:3000     localhost:27017
```

## Volumes

- `mongodb_data`: Persists MongoDB data between container restarts

## Troubleshooting

### Port already in use
```bash
# Find process using port
netstat -ano | findstr :5173  # Windows
lsof -i :5173                  # Linux/Mac

# Change port in docker-compose.yml
```

### MongoDB connection issues
```bash
# Check if MongoDB is healthy
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb
```

### Node modules issues
```bash
# Remove and rebuild
docker-compose down
docker volume prune
docker-compose up --build
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGO_ROOT_USERNAME` | admin | MongoDB root username |
| `MONGO_ROOT_PASSWORD` | password | MongoDB root password |
| `JWT_SECRET` | (development key) | Secret for JWT signing |
| `JWT_EXPIRES_IN` | 7d | JWT token expiration |
| `CLIENT_URL` | http://localhost:5173 | Frontend URL for CORS |
