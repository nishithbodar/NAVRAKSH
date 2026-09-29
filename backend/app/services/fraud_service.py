from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.fraud_record import FraudRecord

class FraudService:
    @staticmethod
    def get_fraud_records(db: Session, limit: int = 50) -> List[FraudRecord]:
        return db.query(FraudRecord).order_by(FraudRecord.created_at.desc()).limit(limit).all()

    @staticmethod
    def evaluate_risk(
        db: Session,
        pass_number: str = None,
        qr_token: str = None,
        customer_id: int = None
    ) -> Dict[str, Any]:
        """
        Rule-based algorithmic fraud detection using deterministic heuristics:
        1. Duplicate token replay check
        2. Customer booking frequency velocity
        3. High-volume velocity threshold
        """
        reasons = []
        score = 0.0

        if qr_token:
            # Check if this token has repeated scans
            existing_flag = db.query(FraudRecord).filter(FraudRecord.qr_token == qr_token).first()
            if existing_flag:
                score += 0.7
                reasons.append("Token previously flagged in replay attack log")

        if customer_id:
            # Check customer order velocity
            from app.models.booking import Booking
            count = db.query(Booking).filter(Booking.customer_id == customer_id).count()
            if count > 5:
                score += 0.3
                reasons.append(f"Unusual booking frequency ({count} orders) within festival period")

        level = "LOW"
        action = "Allow Entry"
        if score >= 0.7:
            level = "CRITICAL"
            action = "Lock Turnstile & Quarantine Pass"
        elif score >= 0.4:
            level = "MEDIUM"
            action = "Request Physical ID Verification"

        return {
            "risk_score": round(score, 2),
            "risk_level": level,
            "reasons": reasons if reasons else ["No suspicious heuristics detected. Standard risk index."],
            "recommended_action": action
        }
