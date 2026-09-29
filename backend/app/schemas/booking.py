from pydantic import BaseModel
from typing import Optional, List
import datetime

class BookingCreate(BaseModel):
    customer_id: int
    event_id: int
    pass_type_id: int
    seller_id: Optional[int] = None
    quantity: int = 1
    payment_method: Optional[str] = "UPI"

class BookingCancelRequest(BaseModel):
    reason: Optional[str] = "Customer requested cancellation"

class QrPassBrief(BaseModel):
    pass_number: str
    qr_token: str
    status: str
    rfid_token: Optional[str]

    class Config:
        from_attributes = True

class BookingResponse(BaseModel):
    id: int
    booking_reference: str
    customer_id: int
    event_id: int
    pass_type_id: int
    seller_id: Optional[int]
    quantity: int
    unit_price: float
    total_amount: float
    booking_status: str
    created_at: datetime.datetime
    qr_passes: List[QrPassBrief] = []

    class Config:
        from_attributes = True
