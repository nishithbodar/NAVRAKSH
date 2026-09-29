from pydantic import BaseModel
from typing import Optional
import datetime

class EventCreate(BaseModel):
    name: str
    venue_id: int
    date: datetime.date
    start_time: str
    end_time: str
    capacity: int
    total_passes: int
    base_price: float

class EventResponse(BaseModel):
    id: int
    name: str
    venue_id: int
    date: datetime.date
    start_time: str
    end_time: str
    capacity: int
    total_passes: int
    available_passes: int
    base_price: float
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True
