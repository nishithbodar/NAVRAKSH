import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class QrPass(Base):
    __tablename__ = "qr_passes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    pass_number = Column(String(50), unique=True, index=True, nullable=False)  # e.g. NAV-84291
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False, index=True)
    qr_token = Column(String(255), unique=True, index=True, nullable=False)
    status = Column(String(50), default="VALID", nullable=False)  # VALID, USED, CANCELLED, INVALID
    rfid_token = Column(String(100), nullable=True)
    issued_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    used_at = Column(DateTime, nullable=True)
    scanned_gate = Column(String(100), nullable=True)
    scanned_turnstile = Column(String(50), nullable=True)

    booking = relationship("Booking", back_populates="qr_passes")
    event = relationship("Event", back_populates="qr_passes")
