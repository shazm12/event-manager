from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.attendees import Attendee
from app.schemas.attendee import AttendeeCreate, AttendeeResponse, AttendeesResponse
from app.database.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventResponse, EventsResponse, PaginationResponse

router = APIRouter()

@router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    """Create a new event"""
    try:
        if event.start_time >= event.end_time:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="End time must be after start time"
            )
        
        if event.max_capacity <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Max capacity must be greater than 0"
            )
        
        db_event = Event(
            name=event.name,
            location=event.location,
            start_time=event.start_time,
            end_time=event.end_time,
            max_capacity=event.max_capacity
        )
        
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        
        return db_event
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating event: {str(e)}"
        )

@router.get("/", response_model=EventsResponse)
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all events with pagination"""
    total_count = db.query(Event).count()
    events = db.query(Event).offset(skip).limit(limit).all()
    
    # Return paginated response
    return {
        "events": events,
        "pagination": {
            "total": total_count,
            "skip": skip,
            "limit": limit,
            "has_next": skip + limit < total_count,
            "has_prev": skip > 0
        }
    }

@router.get("/{event_id}/", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    """Get a single event by ID"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    return event

@router.post("/{event_id}/register", response_model=AttendeeResponse)
def create_attendee(event_id: int, attendee: AttendeeCreate, db: Session = Depends(get_db)):
    """ Create a new attendee for an event """
    try:
        db_event = db.query(Event).filter(Event.id == event_id).first()
        if not db_event:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
        
        if len(db_event.attendees) >= db_event.max_capacity:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Event is at capacity")
        
        if db_event.start_time <= datetime.now():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Event has already started")

        if db_event.end_time < datetime.now():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Event has already ended")
        
        find_attendee_by_email = db.query(Attendee).filter(Attendee.event_id == event_id).filter(Attendee.email == attendee.email).first()
    
        if find_attendee_by_email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Attendee already has registered for this event")
            
            
        db_attendee = Attendee(
            name=attendee.name,
            email=attendee.email,
            event=db_event
        )
        db.add(db_attendee)
        db.commit()
        db.refresh(db_attendee)
        
        return db_attendee
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating attendee: {str(e)}"
        )


@router.get("/{event_id}/attendees", response_model=AttendeesResponse)
def get_event_attendees(event_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Get all attendees for an event"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    total_count = len(event.attendees)
    attendees = event.attendees[skip:skip+limit]
    
    return {
        "attendees": attendees,
        "pagination": {
            "total": total_count,
            "skip": skip,
            "limit": limit,
            "has_next": skip + limit < total_count,
            "has_prev": skip > 0
        }
    }    