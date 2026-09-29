from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.qr import QrVerifyRequest
from app.services.qr_service import QrService
from app.models.qr_pass import QrPass
from app.utils.response import success_response

router = APIRouter(prefix="/qr", tags=["QR Verification & Gate Access"])

@router.post("/verify", response_model=dict)
def verify_qr_pass(req: QrVerifyRequest, db: Session = Depends(get_db)):
    result = QrService.verify_qr(
        db=db,
        qr_token=req.qr_token,
        gate_id=req.gate_id or "Gate 02",
        turnstile_id=req.turnstile_id or "Turnstile B"
    )
    return success_response(data=result, message=result["message"])

@router.post("/{token}/use", response_model=dict)
def use_qr_token(token: str, gate: str = "Gate 02", db: Session = Depends(get_db)):
    result = QrService.verify_qr(db=db, qr_token=token, gate_id=gate)
    return success_response(data=result)

@router.get("/all", response_model=dict)
def list_all_qr_passes(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    passes = db.query(QrPass).offset(skip).limit(limit).all()
    return success_response(data=[
        {
            "id": p.id,
            "pass_number": p.pass_number,
            "status": p.status,
            "qr_token": p.qr_token,
            "rfid_token": p.rfid_token,
            "issued_at": p.issued_at.isoformat() if p.issued_at else None,
            "used_at": p.used_at.isoformat() if p.used_at else None,
            "gate": p.scanned_gate
        }
        for p in passes
    ])
