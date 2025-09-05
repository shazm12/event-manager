from pydantic import BaseModel, EmailStr
from typing import Optional

class AttendeeBase(BaseModel):
    name: str
    email: EmailStr

class AttendeeCreate(AttendeeBase):
    pass

class AttendeeResponse(AttendeeBase):
    id: int
    email: EmailStr
    event_id: int
    
    class Config:
        from_attributes = True