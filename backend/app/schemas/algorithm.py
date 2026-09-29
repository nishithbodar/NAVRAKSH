from pydantic import BaseModel
from typing import List, Optional, Any, Dict
import datetime

class BenchmarkRequest(BaseModel):
    algorithm_category: str  # sorting, searching, heaps
    algorithms: List[str]  # ["quick_sort", "merge_sort"]
    dataset_size: int = 1000  # 100, 1000, 10000, etc.
    dataset_type: str = "random"  # random, sorted, reverse_sorted, nearly_sorted

class BenchmarkItemResult(BaseModel):
    algorithm: str
    dataset_size: int
    execution_time_ms: float
    comparisons: int
    swaps_or_rotations: int
    memory_estimate: str
    time_complexity: str
    space_complexity: str

class BenchmarkResponse(BaseModel):
    category: str
    dataset_type: str
    dataset_size: int
    results: List[BenchmarkItemResult]

class MasterTheoremRequest(BaseModel):
    expression: str  # e.g. "T(n) = 2T(n/2) + n"

class KaratsubaRequest(BaseModel):
    number_a: int
    number_b: int

class StrassenRequest(BaseModel):
    matrix_a: List[List[float]]
    matrix_b: List[List[float]]

class RbtInsertRequest(BaseModel):
    key: int
    holder: Optional[str] = "Pass Holder"
    pass_type: Optional[str] = "Regular"
    night: Optional[str] = "Night 1"
    gate: Optional[str] = "Gate 01"

class ConflictCheckRequest(BaseModel):
    event_date: str
    venue_id: int
    start_time: str
    end_time: str
    event_name: Optional[str] = "New Proposal"
