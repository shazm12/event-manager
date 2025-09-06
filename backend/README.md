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

## Project Structure

```
backend/
├── app/
│   ├── controllers/     # API endpoints
│   ├── models/         # SQLAlchemy models
│   ├── schemas/        # Pydantic schemas
│   └── database/       # Database config
├── main.py            # FastAPI app
└── requirements.txt   # Dependencies
```

## Environment Variables

Create `.env` file:
```env
DATABASE_URL=sqlite:///./event_management.db
```
