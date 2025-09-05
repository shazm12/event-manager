from .database import engine, Base
from ..models import event, attendees

def create_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables()
    print("Database tables created successfully!")
