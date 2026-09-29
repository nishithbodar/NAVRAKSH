from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.seller import Seller
from app.schemas.seller import SellerResponse
from app.utils.response import success_response

router = APIRouter(prefix="/sellers", tags=["Sellers"])

@router.get("", response_model=dict)
def list_sellers(db: Session = Depends(get_db)):
    sellers = db.query(Seller).all()
    return success_response(data=[SellerResponse.model_validate(s) for s in sellers])
