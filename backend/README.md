# Event Management API

A FastAPI backend server for the Event Management application, following MVC architecture.

> **Note**: For general project information and Docker setup, see the main [README.md](../README.md)

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── controllers/          # Business logic layer
│   │   ├── __init__.py
│   │   ├── event_controller.py
│   │   └── user_controller.py
│   ├── models/              # Data models (SQLAlchemy)
│   │   ├── __init__.py
│   │   ├── event.py
│   │   └── user.py
│   ├── views/               # Data formatting and presentation
│   │   ├── __init__.py
│   │   ├── event_view.py
│   │   └── user_view.py
│   ├── schemas/             # Pydantic schemas for request/response
│   │   ├── __init__.py
│   │   ├── event.py
│   │   └── user.py
│   └── database/            # Database configuration
│       ├── __init__.py
│       ├── database.py
│       └── init_db.py
├── venv/                    # Virtual environment
├── main.py                  # FastAPI application entry point
├── requirements.txt         # Python dependencies
├── env.example             # Environment variables example
└── README.md
```

## Setup Instructions

### 1. Activate Virtual Environment

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

```bash
cp env.example .env
# Edit .env file with your configuration
```

### 4. Initialize Database

```bash
python app/database/init_db.py
```

### 5. Run the Server

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:

- **Interactive API docs (Swagger UI)**: `http://localhost:8000/docs`
- **Alternative API docs (ReDoc)**: `http://localhost:8000/redoc`

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user information
- `GET /api/users/` - Get all users (with pagination)

### Events
- `POST /api/events/` - Create a new event
- `GET /api/events/{event_id}` - Get event by ID
- `PUT /api/events/{event_id}` - Update event information
- `DELETE /api/events/{event_id}` - Delete an event (soft delete)
- `GET /api/events/` - Get all active events (with pagination)
- `GET /api/events/organizer/{organizer_id}` - Get events by organizer

### General
- `GET /` - Welcome message
- `GET /health` - Health check

## MVC Architecture

This project follows the MVC (Model-View-Controller) pattern:

- **Models** (`app/models/`): SQLAlchemy models representing database tables
- **Views** (`app/views/`): Classes responsible for formatting data for presentation
- **Controllers** (`app/controllers/`): Handle business logic and coordinate between models and views
- **Schemas** (`app/schemas/`): Pydantic models for request/response validation

## Features

- ✅ User registration and management
- ✅ Event creation and management
- ✅ Password hashing with bcrypt
- ✅ Database relationships (User-Event)
- ✅ Input validation with Pydantic
- ✅ CORS middleware
- ✅ SQLite database (easily configurable for PostgreSQL)
- ✅ MVC architecture
- ✅ API documentation with Swagger UI

## Development

To add new features:

1. Create models in `app/models/`
2. Create schemas in `app/schemas/`
3. Create views in `app/views/`
4. Create controllers in `app/controllers/`
5. Add routes to `main.py`

## Database

The application uses SQLite by default. To use PostgreSQL:

1. Install PostgreSQL
2. Update `DATABASE_URL` in `.env` file
3. Install `psycopg2-binary` (already in requirements.txt)
4. Run database initialization

## Security Notes

- Passwords are hashed using bcrypt
- CORS is configured (update `ALLOWED_ORIGINS` for production)
- Add JWT authentication for production use
- Use environment variables for sensitive data
