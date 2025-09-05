from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    location: str
    start_date: datetime
    end_date: datetime
    max_attendees: Optional[int] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    max_attendees: Optional[int] = None
    is_active: Optional[bool] = None

class EventResponse(EventBase):
    id: int
    current_attendees: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    organizer_id: int

    class Config:
        from_attributes = True
