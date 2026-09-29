import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class Seller(Base):
    __tablename__ = "sellers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(150), unique=True, index=True, nullable=False)
    code = Column(String(50), unique=True, index=True, nullable=False)  # Seller A, Seller B, etc.
    tier = Column(String(50), default="Tier-1", nullable=False)
    location = Column(String(150), nullable=False)
    true_demand = Column(Integer, default=0, nullable=False)
    allocated_quota = Column(Integer, default=0, nullable=False)
    contact_phone = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)

    inventories = relationship("Inventory", back_populates="seller")
    bookings = relationship("Booking", back_populates="seller")
