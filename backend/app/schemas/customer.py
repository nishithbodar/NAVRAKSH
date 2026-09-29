from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    city: Optional[str] = "Ahmedabad"

class CustomerResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    city: str
    kyc_verified: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True
