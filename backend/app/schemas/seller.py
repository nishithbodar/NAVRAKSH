from pydantic import BaseModel
from typing import Optional
import datetime

class SellerCreate(BaseModel):
    name: str
    code: str
    tier: Optional[str] = "Tier-1"
    location: str
    true_demand: int = 1000
    contact_phone: Optional[str] = None

class SellerQuotaUpdate(BaseModel):
    allocated_quota: int

class SellerResponse(BaseModel):
    id: int
    name: str
    code: str
    tier: str
    location: str
    true_demand: int
    allocated_quota: int
    contact_phone: Optional[str]
    created_at: datetime.datetime

    class Config:
        from_attributes = True
