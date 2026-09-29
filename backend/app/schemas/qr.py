from pydantic import BaseModel
from typing import Optional, Dict, Any
import datetime

class QrVerifyRequest(BaseModel):
    qr_token: str
    gate_id: Optional[str] = "Gate 02"
    turnstile_id: Optional[str] = "Turnstile B"

class QrVerifyResponse(BaseModel):
    valid: bool
    status: str
    pass_number: Optional[str] = None
    attendee_name: Optional[str] = None
    pass_tier: Optional[str] = None
    night: Optional[str] = None
    gate: Optional[str] = None
    hash_resolution_time_ms: float
    hash_slot: Optional[int] = None
    bucket_window: Optional[list] = None
    message: str
