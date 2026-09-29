from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.algorithm import ConflictCheckRequest
from app.services.conflict_service import ConflictService
from app.utils.response import success_response

router = APIRouter(prefix="/conflicts", tags=["Event Conflicts & Interval Tree"])

@router.post("/check", response_model=dict)
def check_event_conflict(req: ConflictCheckRequest, db: Session = Depends(get_db)):
    result = ConflictService.check_conflicts(
        db=db,
        event_date=req.event_date,
        venue_id=req.venue_id,
        start_time=req.start_time,
        end_time=req.end_time,
        event_name=req.event_name or "New Proposed Event"
    )
    return success_response(data=result)
