import random
import time
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.algorithm_execution import AlgorithmExecution
from app.algorithms.trees.red_black_tree import RedBlackTree
from app.algorithms.sorting.quick_sort import quick_sort_counted
from app.algorithms.sorting.merge_sort import merge_sort_counted
from app.algorithms.heaps.binary_heap import BinaryHeap
from app.algorithms.disjoint_set.union_find import DisjointSet

# Shared canonical RBT instance for live visualizer operations
canonical_rbt = RedBlackTree()

# Seed default canonical nodes matching the frontend
_INITIAL_KEYS = [
    (1032, {"holder": "Aarav Joshi", "passType": "Royal Lounge Platinum", "night": "All 9 Nights", "gate": "Gate A1 (VIP Fastrack)", "hash": "0x99F4A7C1"}),
    (1016, {"holder": "Kavita Dave", "passType": "Heritage Garba Access", "night": "Night 1-4 Suite", "gate": "Gate B2 (Turnstile)", "hash": "0x88B3E42D"}),
    (1008, {"holder": "Devang Parikh", "passType": "Garba Arena Regular", "night": "Night 5 (Maha Garba)", "gate": "Gate C4 (General)", "hash": "0x17A9F091"}),
    (1024, {"holder": "Rahul Patel", "passType": "Madhratri Gold Tier", "night": "Night 1 to 9 Season", "gate": "Gate A3 (Priority)", "hash": "0x43D211BA"}),
    (1056, {"holder": "Nirav Trivedi", "passType": "Heritage Pass Deluxe", "night": "Night 7-9 Finale", "gate": "Gate B1 (VIP)", "hash": "0x22F43C09"}),
    (1040, {"holder": "Priya Shah", "passType": "Saibo Diamond Pavillion", "night": "Night 6 (Sharad Purnima)", "gate": "Gate A1 (VIP Fastrack)", "hash": "0xDF8109EA"}),
    (1036, {"holder": "Ananya Vyas", "passType": "Swara Mandir Premium", "night": "Night 3 Festive", "gate": "Gate B3 (Turnstile)", "hash": "0x55E90288"}),
    (1048, {"holder": "Hardik Chauhan", "passType": "Mahotsav VIP Club", "night": "Night 8 Special", "gate": "Gate A2 (Priority)", "hash": "0x66AB4510"}),
    (1072, {"holder": "Bina Vora", "passType": "Khelaiya Gold Access", "night": "Night 9 Dussehra Eve", "gate": "Gate C1 (Standard)", "hash": "0x44CD117E"}),
    (1088, {"holder": "Tanmay Mehta", "passType": "Aangan Regular Pass", "night": "Night 4 Mid-Week", "gate": "Gate C2 (Standard)", "hash": "0x99238FF0"}),
]

for k, d in _INITIAL_KEYS:
    canonical_rbt.insert(k, d)

class AlgorithmService:
    @staticmethod
    def get_rbt_state() -> Dict[str, Any]:
        return canonical_rbt.to_visualizer_format()

    @staticmethod
    def insert_rbt_key(key: int, data: Dict[str, Any] = None) -> Dict[str, Any]:
        t0 = time.perf_counter()
        canonical_rbt.insert(key, data or {"holder": f"Pass Holder #{key}", "passType": "Regular Pass"})
        t_ms = round((time.perf_counter() - t0) * 1000, 4)
        return {
            "key": key,
            "execution_time_ms": t_ms,
            "steps": canonical_rbt.steps,
            "tree": canonical_rbt.to_visualizer_format()
        }

    @staticmethod
    def search_rbt_key(key: int) -> Dict[str, Any]:
        t0 = time.perf_counter()
        node = canonical_rbt.search(key)
        t_ms = round((time.perf_counter() - t0) * 1000, 4)
        return {
            "found": node is not None and node != canonical_rbt.NIL,
            "key": key,
            "color": node.color if (node and node != canonical_rbt.NIL) else None,
            "data": node.data if (node and node != canonical_rbt.NIL) else None,
            "execution_time_ms": t_ms
        }

    @staticmethod
    def run_benchmark(
        db: Session,
        category: str,
        algorithms: List[str],
        dataset_size: int = 1000,
        input_sizes: Optional[List[int]] = None,
        dataset_type: str = "random"
    ) -> Dict[str, Any]:
        from app.services.algorithm_benchmark_service import AlgorithmBenchmarkService
        return AlgorithmBenchmarkService.run_benchmark(
            db=db,
            category=category,
            algorithms=algorithms,
            dataset_size=dataset_size,
            input_sizes=input_sizes,
            dataset_type=dataset_type
        )
