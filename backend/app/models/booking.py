import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    booking_reference = Column(String(100), unique=True, index=True, nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False, index=True)
    seller_id = Column(Integer, ForeignKey("sellers.id"), nullable=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False, index=True)
    pass_type_id = Column(Integer, ForeignKey("pass_types.id"), nullable=False, index=True)
    quantity = Column(Integer, default=1, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)
    booking_status = Column(String(50), default="CONFIRMED", index=True, nullable=False)  # CONFIRMED, CANCELLED, REFUNDED
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)

    customer = relationship("Customer", back_populates="bookings")
    seller = relationship("Seller", back_populates="bookings")
    event = relationship("Event", back_populates="bookings")
    pass_type = relationship("PassType", back_populates="bookings")
    transactions = relationship("Transaction", back_populates="booking")
    qr_passes = relationship("QrPass", back_populates="booking")
