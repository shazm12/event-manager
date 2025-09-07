# Event Management API

FastAPI backend server for the Event Management application.

> **Note**: For general project information and Docker setup, see the main [README.md](../README.md)

## Quick Start

### 1. Setup Environment

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Initialize Database

**Option A: Using SQL Schema (Recommended)**
```bash
python setup_database.py setup
```

**Option B: Direct Database Creation**
```bash
python -m app.database.init_db
```

### 3. Run Server

```bash
python main.py
```

API available at: `http://localhost:8000`

## API Documentation

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Main Endpoints

### Events
- `GET /api/events/` - List events (paginated)
- `POST /api/events/` - Create event
- `GET /api/events/{id}/` - Get event details
- `GET /api/events/{id}/attendees` - Get attendees

### Attendees
- `POST /api/events/{id}/register` - Register for event

## Database Setup

This project uses a simple SQL schema file for database setup.

### Database Commands

```bash
# Setup database with tables and sample data
python setup_database.py setup

# Reset database (drop and recreate)
python setup_database.py reset

# Show database information
python setup_database.py info
```

## Project Structure

```
backend/
├── app/
│   ├── controllers/     # API endpoints
│   ├── models/         # SQLAlchemy models
│   ├── schemas/        # Pydantic schemas
│   └── database/       # Database config
├── main.py            # FastAPI app
├── setup_database.py  # Database setup script
├── database_schema.sql # SQL schema file
└── requirements.txt   # Dependencies
```

## Features

- **Automatic Timezone Conversion**: All datetime fields are automatically converted to UTC
- **Pagination Support**: Events and attendees support server-side pagination
- **Data Validation**: Comprehensive validation using Pydantic schemas
- **RESTful API**: Clean REST endpoints with proper HTTP status codes

## Environment Variables

Create `.env` file:
```env
DATABASE_URL=sqlite:///./event_management.db
```
