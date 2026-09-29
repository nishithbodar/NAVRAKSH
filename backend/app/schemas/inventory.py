from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import datetime

class InventoryAllocateRequest(BaseModel):
    event_id: int
    algorithm: Optional[str] = "DYNAMIC_PROGRAMMING"  # GREEDY, DYNAMIC_PROGRAMMING, BRANCH_AND_BOUND
    total_passes: Optional[int] = 10000
    alpha_weight: Optional[float] = 0.75
    beta_demand_fill: Optional[float] = 0.85
    gamma_gini: Optional[float] = 0.65

class InventoryResponse(BaseModel):
    id: int
    event_id: int
    seller_id: int
    pass_type_id: int
    allocated_quantity: int
    sold_quantity: int
    available_quantity: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True
