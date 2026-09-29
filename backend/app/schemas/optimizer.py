from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class AllocationSimulationRequest(BaseModel):
    total_passes: int = 10000
    algorithm: str = "dp"  # greedy, dp, bb
    alpha: float = 0.75
    beta: float = 0.85
    gamma: float = 0.65

class GroupBookingRequest(BaseModel):
    number_of_people: int
    budget: float
    preferred_pass_types: Optional[List[str]] = None
    preferred_events: Optional[List[int]] = None
