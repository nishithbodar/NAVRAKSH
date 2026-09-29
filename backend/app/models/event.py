import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Date, Time
from sqlalchemy.orm import relationship
from app.core.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(150), index=True, nullable=False)
    venue_id = Column(Integer, ForeignKey("venues.id"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)
    start_time = Column(String(20), nullable=False)
    end_time = Column(String(20), nullable=False)
    capacity = Column(Integer, nullable=False)
    total_passes = Column(Integer, nullable=False)
    available_passes = Column(Integer, nullable=False)
    base_price = Column(Float, nullable=False)
    status = Column(String(50), default="ACTIVE", nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)

    venue = relationship("Venue", back_populates="events")
    inventories = relationship("Inventory", back_populates="event")
    bookings = relationship("Booking", back_populates="event")
    qr_passes = relationship("QrPass", back_populates="event")
