from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.services.booking_service import BookingService
from app.models.booking import Booking
from app.schemas.booking import BookingCreate, BookingResponse, BookingCancelRequest
from app.utils.response import success_response

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("", response_model=dict)
def create_booking(req: BookingCreate, db: Session = Depends(get_db)):
    booking = BookingService.create_booking(
        db=db,
        customer_id=req.customer_id,
        event_id=req.event_id,
        pass_type_id=req.pass_type_id,
        seller_id=req.seller_id,
        quantity=req.quantity,
        payment_method=req.payment_method
    )
    return success_response(
        data=BookingResponse.model_validate(booking),
        message="Booking confirmed and QR passes generated successfully"
    )

@router.get("", response_model=dict)
def list_bookings(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    bookings = db.query(Booking).offset(skip).limit(limit).all()
    return success_response(data=[BookingResponse.model_validate(b) for b in bookings])

@router.get("/{id}", response_model=dict)
def get_booking(id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return success_response(data=BookingResponse.model_validate(booking))

@router.post("/{id}/cancel", response_model=dict)
def cancel_booking(id: int, req: BookingCancelRequest = None, db: Session = Depends(get_db)):
    booking = BookingService.cancel_booking(db, id, reason=req.reason if req else "Cancelled")
    return success_response(
        data=BookingResponse.model_validate(booking),
        message="Booking cancelled and inventory returned to capacity pool"
    )
