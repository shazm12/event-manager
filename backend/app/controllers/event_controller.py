from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.attendees import Attendee
from app.schemas.attendee import AttendeeCreate, AttendeeResponse
from app.database.database import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventResponse, EventUpdate

router = APIRouter()

@router.post("/", response_model=EventResponse)
async def create_event(event: EventCreate, db: Session = Depends(get_db)):
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
        await db.commit()
        await db.refresh(db_event)
        
        return db_event
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating event: {str(e)}"
        )

@router.get("/", response_model=list[EventResponse])
async def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all events with pagination"""
    events =await db.query(Event).offset(skip).limit(limit).all()
    return events

@router.post("/{event_id}/register", response_model=AttendeeResponse)
async def create_attendee(event_id: int, attendee: AttendeeCreate, db: Session = Depends(get_db)):
    """ Create a new attendee for an event """
    try:
        db_event = await db.query(Event).filter(Event.id == event_id).first()
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
        await db.commit()
        await db.refresh(db_attendee)
        
        return db_attendee
    
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating attendee: {str(e)}"
        )


@router.get("/{event_id}/attendees", response_model=list[AttendeeResponse])
async def get_event_attendees(event_id: int, db: Session = Depends(get_db)):
    """Get all attendees for an event"""
    event = await db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return event.attendees