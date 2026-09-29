from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.fraud_service import FraudService
from app.schemas.fraud import FraudRecordResponse, FraudCheckRequest
from app.utils.response import success_response

router = APIRouter(prefix="/fraud", tags=["Fraud Detection"])

@router.get("/records", response_model=dict)
def get_fraud_records(limit: int = 50, db: Session = Depends(get_db)):
    records = FraudService.get_fraud_records(db, limit)
    return success_response(data=[FraudRecordResponse.model_validate(r) for r in records])

@router.post("/evaluate", response_model=dict)
def evaluate_fraud_risk(req: FraudCheckRequest, db: Session = Depends(get_db)):
    result = FraudService.evaluate_risk(
        db=db,
        pass_number=req.pass_number,
        qr_token=req.qr_token,
        customer_id=req.customer_id
    )
    return success_response(data=result)
