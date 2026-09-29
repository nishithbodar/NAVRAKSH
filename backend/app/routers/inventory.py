from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.inventory import Inventory
from app.schemas.inventory import InventoryAllocateRequest, InventoryResponse
from app.services.inventory_service import InventoryService
from app.utils.response import success_response

router = APIRouter(prefix="/inventory", tags=["Inventory"])

@router.get("", response_model=dict)
def get_all_inventory(db: Session = Depends(get_db)):
    items = db.query(Inventory).all()
    return success_response(data=[InventoryResponse.model_validate(i) for i in items])

@router.get("/{event_id}", response_model=dict)
def get_event_inventory(event_id: int, db: Session = Depends(get_db)):
    items = db.query(Inventory).filter(Inventory.event_id == event_id).all()
    return success_response(data=[InventoryResponse.model_validate(i) for i in items])

@router.post("/allocate", response_model=dict)
def allocate_inventory(req: InventoryAllocateRequest, db: Session = Depends(get_db)):
    result = InventoryService.allocate_inventory(
        db=db,
        event_id=req.event_id,
        algorithm=req.algorithm,
        total_passes=req.total_passes,
        alpha_weight=req.alpha_weight,
        beta_demand_fill=req.beta_demand_fill,
        gamma_gini=req.gamma_gini
    )
    return success_response(data=result, message=f"Inventory allocated using {req.algorithm}")
