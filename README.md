# Event Management Application

A modern event management application built with FastAPI (backend) and Next.js (frontend), featuring event creation, attendee registration, and real-time capacity tracking.

## 🚀 Quick Start with Docker

The easiest way to run the application is using Docker:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Stop the Application

```bash
docker-compose down
```

## 📁 Project Structure

```
event-manage-app/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── controllers/     # API endpoints
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── database/       # Database configuration
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Backend container
│   └── README.md          # Backend documentation
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities
│   ├── package.json       # Node.js dependencies
│   ├── Dockerfile         # Frontend container
│   └── README.md          # Frontend documentation
├── docker-compose.yml     # Multi-service orchestration
└── DOCKER.md             # Detailed Docker setup guide
```

## 🛠️ Development Setup

### Prerequisites

- Python 3.13+ (for backend)
- Node.js 20+ (for frontend)
- Docker & Docker Compose (recommended)

### Individual Component Setup

For detailed setup instructions for each component:

- **Backend**: See [backend/README.md](./backend/README.md)
- **Frontend**: See [frontend/README.md](./frontend/README.md)
- **Docker**: See [DOCKER.md](./DOCKER.md)

## ✨ Features

### 🎯 Core Functionality

- **Event Management**: Create, view, and manage events
- **Attendee Registration**: Simple registration with name and email
- **Real-time Capacity**: Visual progress bars and capacity status
- **Pagination**: Efficient data loading for large datasets
- **Responsive Design**: Works on desktop and mobile

### 🎨 User Interface

- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Toast Notifications**: User feedback with Sonner
- **Loading States**: Smooth user experience
- **Error Handling**: Comprehensive error management

### 🔧 Technical Features

- **RESTful API**: FastAPI with automatic documentation
- **Database**: SQLite with SQLAlchemy ORM
- **Type Safety**: Full TypeScript support
- **Server-side Pagination**: Efficient data handling
- **Docker Support**: Containerized deployment

## 🏗️ Architecture

### Backend (FastAPI)
- **MVC Pattern**: Controllers, Models, Schemas
- **Database**: SQLAlchemy with SQLite
- **Validation**: Pydantic schemas
- **Documentation**: Auto-generated OpenAPI docs

### Frontend (Next.js)
- **App Router**: Modern Next.js routing
- **Components**: Reusable UI components
- **State Management**: React hooks
- **Styling**: Tailwind CSS with shadcn/ui

## 📊 API Endpoints

### Events
- `GET /api/events/` - List all events (paginated)
- `POST /api/events/` - Create new event
- `GET /api/events/{id}/` - Get event details
- `GET /api/events/{id}/attendees` - Get event attendees

### Attendees
- `POST /api/events/{id}/register` - Register for event
- `GET /api/events/{id}/attendees` - List attendees (paginated)

## 🚀 Deployment

### Docker (Recommended)
```bash
docker-compose up --build
```

### Manual Deployment
1. Set up backend: See [backend/README.md](./backend/README.md)
2. Set up frontend: See [frontend/README.md](./frontend/README.md)
3. Configure environment variables
4. Run both services


For detailed setup instructions:

- **Backend Issues**: Check [backend/README.md](./backend/README.md)
- **Frontend Issues**: Check [frontend/README.md](./frontend/README.md)
- **Docker Issues**: Check [DOCKER.md](./DOCKER.md)
- **General Issues**: Open an issue on GitHub
