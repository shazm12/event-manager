# Docker Setup for Event Management App

This document explains how to run the Event Management application using Docker.

> **Note**: For general project information and setup, see the main [README.md](./README.md)

## Prerequisites

- Docker
- Docker Compose

## Quick Start

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop all services
docker-compose down
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Individual Service Commands

### Backend Only

```bash
# Build backend image
docker build -t event-manage-backend ./backend

# Run backend container
docker run -p 8000:8000 event-manage-backend
```

### Frontend Only

```bash
# Build frontend image
docker build -t event-manage-frontend ./frontend

# Run frontend container
docker run -p 3000:3000 event-manage-frontend
```

## Development Mode

For development with hot reloading:

```bash
# Backend development
cd backend
docker build -t event-manage-backend-dev -f Dockerfile.dev .
docker run -p 8000:8000 -v $(pwd):/app event-manage-backend-dev

# Frontend development
cd frontend
docker build -t event-manage-frontend-dev -f Dockerfile.dev .
docker run -p 3000:3000 -v $(pwd):/app event-manage-frontend-dev
```

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=sqlite:///./event_management.db
DEBUG=True
```

## Health Checks

Both services include health checks:

- **Backend**: `GET /health`
- **Frontend**: `GET /`

Check service health:

```bash
# Check all services
docker-compose ps

# Check specific service logs
docker-compose logs backend
docker-compose logs frontend
```

## Database

The application uses SQLite by default. The database file is persisted in a Docker volume.

### Reset Database

```bash
# Stop services and remove volumes
docker-compose down -v

# Restart services (will create fresh database)
docker-compose up --build
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :8000
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Build Failures**
   ```bash
   # Clean build cache
   docker-compose build --no-cache
   
   # Remove all containers and images
   docker system prune -a
   ```

3. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f backend
```

## Production Deployment

For production deployment:

1. Update environment variables
2. Use production database (PostgreSQL)
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Use Docker secrets for sensitive data

### Production Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/eventdb
    depends_on:
      - db
  
  frontend:
    build: ./frontend
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=eventdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
