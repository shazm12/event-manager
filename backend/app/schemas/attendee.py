from pydantic import BaseModel, EmailStr
from typing import Optional

class AttendeeBase(BaseModel):
    name: str
    email: EmailStr

class AttendeeCreate(AttendeeBase):
    pass

class PaginationResponse(BaseModel):
    total: int
    skip: int
    limit: int
    has_next: bool
    has_prev: bool

class AttendeeResponse(AttendeeBase):
    id: int
    email: EmailStr
    event_id: int
    
    class Config:
        from_attributes = True

class AttendeesResponse(BaseModel):
    attendees: list[AttendeeResponse]
    pagination: PaginationResponse
    
    class Config:
        from_attributes = True


