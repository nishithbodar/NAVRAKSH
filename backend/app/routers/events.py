from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.event import Event
from app.schemas.event import EventResponse
from app.utils.response import success_response

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("", response_model=dict)
def list_events(db: Session = Depends(get_db)):
    events = db.query(Event).all()
    return success_response(data=[EventResponse.model_validate(e) for e in events])
