from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.pass_type import PassType
from app.schemas.optimizer import GroupBookingRequest
from app.algorithms.dynamic_programming.group_booking import optimize_group_booking
from app.utils.response import success_response

router = APIRouter(prefix="/group-booking", tags=["Group Booking Optimizer"])

@router.post("/optimize", response_model=dict)
def optimize_group(req: GroupBookingRequest, db: Session = Depends(get_db)):
    pass_types = db.query(PassType).all()
    tiers = [
        {"name": pt.display_title, "price": pt.price, "priority_level": pt.priority_level}
        for pt in pass_types
    ]
    if not tiers:
        tiers = [
            {"name": "VIP Platinum", "price": 15000, "priority_level": 5},
            {"name": "Diamond Pavillion", "price": 9500, "priority_level": 4},
            {"name": "Heritage Pass", "price": 6500, "priority_level": 3},
            {"name": "Gold Couple", "price": 4500, "priority_level": 2},
            {"name": "Arena Regular", "price": 1500, "priority_level": 1},
        ]

    result = optimize_group_booking(
        group_size=req.number_of_people,
        budget=req.budget,
        available_pass_tiers=tiers
    )
    return success_response(data=result)
