import random
import time
from typing import Dict, Any, List
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
        dataset_type: str = "random"
    ) -> Dict[str, Any]:
        # Bound size to protect server
        dataset_size = min(max(dataset_size, 10), 50000)

        # Generate dataset
        if dataset_type == "sorted":
            base_data = list(range(dataset_size))
        elif dataset_type == "reverse_sorted":
            base_data = list(range(dataset_size, 0, -1))
        elif dataset_type == "nearly_sorted":
            base_data = list(range(dataset_size))
            for _ in range(dataset_size // 20):
                i, j = random.randint(0, dataset_size - 1), random.randint(0, dataset_size - 1)
                base_data[i], base_data[j] = base_data[j], base_data[i]
        else:
            base_data = [random.randint(1, 1000000) for _ in range(dataset_size)]

        results = []

        for algo in algorithms:
            algo_key = algo.lower()
            data_copy = list(base_data)

            if "quick" in algo_key:
                t0 = time.perf_counter()
                sorted_arr, comps, swaps = quick_sort_counted(data_copy)
                t_ms = round((time.perf_counter() - t0) * 1000, 4)
                item = {
                    "algorithm": "Quick Sort (In-Place Partitioning)",
                    "dataset_size": dataset_size,
                    "execution_time_ms": t_ms,
                    "comparisons": comps,
                    "swaps_or_rotations": swaps,
                    "memory_estimate": f"{round(dataset_size * 8 / 1024, 2)} KB",
                    "time_complexity": "O(n log n) Avg",
                    "space_complexity": "O(log n)"
                }
            elif "merge" in algo_key:
                t0 = time.perf_counter()
                sorted_arr, comps, copies = merge_sort_counted(data_copy)
                t_ms = round((time.perf_counter() - t0) * 1000, 4)
                item = {
                    "algorithm": "Merge Sort (Divide and Conquer)",
                    "dataset_size": dataset_size,
                    "execution_time_ms": t_ms,
                    "comparisons": comps,
                    "swaps_or_rotations": copies,
                    "memory_estimate": f"{round(dataset_size * 16 / 1024, 2)} KB",
                    "time_complexity": "O(n log n) Worst",
                    "space_complexity": "O(n)"
                }
            elif "heap" in algo_key:
                t0 = time.perf_counter()
                h = BinaryHeap()
                for x in data_copy:
                    h.insert(x)
                comps = h.comparisons
                swaps = h.swaps
                t_ms = round((time.perf_counter() - t0) * 1000, 4)
                item = {
                    "algorithm": "Binary Heap Sort",
                    "dataset_size": dataset_size,
                    "execution_time_ms": t_ms,
                    "comparisons": comps,
                    "swaps_or_rotations": swaps,
                    "memory_estimate": f"{round(dataset_size * 8 / 1024, 2)} KB",
                    "time_complexity": "O(n log n)",
                    "space_complexity": "O(n)"
                }
            else:
                continue

            results.append(item)

            # Persist to algorithm_executions table
            try:
                rec = AlgorithmExecution(
                    algorithm_name=item["algorithm"],
                    category=category,
                    input_size=dataset_size,
                    execution_time_ms=item["execution_time_ms"],
                    comparisons=item["comparisons"],
                    swaps_or_rotations=item["swaps_or_rotations"],
                    memory_estimate=item["memory_estimate"],
                    time_complexity=item["time_complexity"],
                    space_complexity=item["space_complexity"]
                )
                db.add(rec)
                db.commit()
            except Exception:
                db.rollback()

        return {
            "category": category,
            "dataset_type": dataset_type,
            "dataset_size": dataset_size,
            "results": results
        }
