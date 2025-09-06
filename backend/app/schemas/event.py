from app.schemas.attendee import AttendeeResponse
from pydantic import BaseModel, field_validator, model_validator
from datetime import datetime
from typing import Optional

class EventBase(BaseModel):
    name: str
    location: str
    start_time: datetime
    end_time: datetime
    max_capacity: int

class EventCreate(EventBase):
    @field_validator('max_capacity')
    @classmethod
    def validate_capacity(cls, v):
        if v <= 0:
            raise ValueError('Max capacity must be greater than 0')
        return v
    
    @field_validator('name', 'location')
    @classmethod
    def validate_strings(cls, v):
        if not v or not v.strip():
            raise ValueError('Name and location cannot be empty')
        return v.strip()
    
    @model_validator(mode='after')
    def validate_times(self):
        if self.start_time >= self.end_time:
            raise ValueError('End time must be after start time')
        return self

class EventUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    max_capacity: Optional[int] = None

class PaginationResponse(BaseModel):
    total: int
    skip: int
    limit: int
    has_next: bool
    has_prev: bool

class EventResponse(EventBase):
    id: int
    location: str
    start_time: datetime
    end_time: datetime
    attendees: list[AttendeeResponse]
    max_capacity: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class EventsResponse(BaseModel):
    events: list[EventResponse]
    pagination: PaginationResponse  
    

    class Config:
        from_attributes = True
