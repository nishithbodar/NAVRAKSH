from pydantic import BaseModel
from typing import Optional, List
import datetime

class FraudRecordResponse(BaseModel):
    id: int
    pass_number: Optional[str]
    qr_token: Optional[str]
    risk_score: float
    risk_level: str
    threat_vector: str
    details: str
    recommended_action: str
    terminal_id: Optional[str]
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class FraudCheckRequest(BaseModel):
    pass_number: Optional[str] = None
    qr_token: Optional[str] = None
    customer_id: Optional[int] = None
    event_id: Optional[int] = None
