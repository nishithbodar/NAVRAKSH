from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Any, Dict
import datetime

class BenchmarkRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    algorithm_category: str  # sorting, searching, greedy, dynamic_programming, backtracking, branch_bound, heaps, trees, divide_and_conquer
    algorithms: List[str]  # e.g. ["quick_sort", "merge_sort"]
    dataset_size: int = 1000  # Default single size
    input_sizes: Optional[List[int]] = None  # Optional multi-size benchmark
    dataset_type: str = "random"  # random, sorted, reverse_sorted, nearly_sorted

class BenchmarkItemResult(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    algorithm: str
    dataset_size: int
    execution_time_ms: float
    comparisons: int
    swaps_or_rotations: int
    states_explored: Optional[int] = 0
    nodes_pruned: Optional[int] = 0
    memory_estimate: str
    time_complexity: str
    space_complexity: str
    optimality: Optional[str] = None

class BenchmarkResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
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

class FastExponentiationRequest(BaseModel):
    base: int
    exponent: int
    modulus: Optional[int] = None

class TopKRequest(BaseModel):
    k: int = 5
    dataset_size: int = 1000
    metric: str = "sales"  # sales, revenue, bookings

class ExactVsApproxRequest(BaseModel):
    n_items: int = 20
    capacity: int = 1000

class LcsRequest(BaseModel):
    sequence_a: str
    sequence_b: str

class MatrixChainRequest(BaseModel):
    dimensions: List[int]

class DsuRequest(BaseModel):
    operations: List[Dict[str, Any]]  # [{"op": "make", "x": 1}, {"op": "union", "x": 1, "y": 2}, {"op": "find", "x": 1}]

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
