import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from app.core.database import Base

class FraudRecord(Base):
    __tablename__ = "fraud_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    pass_number = Column(String(50), nullable=True, index=True)
    qr_token = Column(String(255), nullable=True, index=True)
    risk_score = Column(Float, nullable=False)
    risk_level = Column(String(50), nullable=False)  # LOW, MEDIUM, HIGH, CRITICAL
    threat_vector = Column(String(100), nullable=False)  # REPLAY_ATTACK, TAMPERED_HASH, EXCESSIVE_BOOKINGS
    details = Column(Text, nullable=False)
    recommended_action = Column(String(150), nullable=False)
    terminal_id = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
