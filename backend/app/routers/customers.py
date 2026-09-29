from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.customer import Customer
from app.schemas.customer import CustomerResponse
from app.utils.response import success_response

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("", response_model=dict)
def list_customers(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    customers = db.query(Customer).offset(skip).limit(limit).all()
    return success_response(data=[CustomerResponse.model_validate(c) for c in customers])
