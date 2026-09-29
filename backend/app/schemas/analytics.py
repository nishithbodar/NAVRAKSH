from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class DashboardSummaryResponse(BaseModel):
    total_passes: int
    sold_passes: int
    available_passes: int
    total_revenue: float
    today_revenue: float
    qr_scans: int
    flagged_transactions: int
    active_events: int
    algorithm_engine_status: str = "ACTIVE"
    average_latency_ms: float = 0.04

class TopKResultItem(BaseModel):
    id: int
    name: str
    metric_value: float
    secondary_info: Optional[str] = None

class TopKResponse(BaseModel):
    category: str
    algorithm_used: str
    k: int
    results: List[TopKResultItem]
    execution_time_ms: float
    comparisons: int
    time_complexity: str
    space_complexity: str
