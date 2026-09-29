import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class PassType(Base):
    __tablename__ = "pass_types"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), unique=True, index=True, nullable=False)  # GENERAL, GOLD, PLATINUM, DIAMOND, VIP
    display_title = Column(String(150), nullable=False)
    price = Column(Float, nullable=False)
    capacity = Column(Integer, nullable=False)
    benefits = Column(String(500), nullable=True)
    priority_level = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)

    inventories = relationship("Inventory", back_populates="pass_type")
    bookings = relationship("Booking", back_populates="pass_type")
