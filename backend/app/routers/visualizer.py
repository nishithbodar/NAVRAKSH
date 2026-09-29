from fastapi import APIRouter
from app.services.algorithm_service import AlgorithmService
from app.algorithms.disjoint_set.union_find import DisjointSet
from app.utils.response import success_response

router = APIRouter(prefix="/visualizer", tags=["DSA Visualizer"])

@router.get("/rbt", response_model=dict)
def get_rbt_visualizer_state():
    state = AlgorithmService.get_rbt_state()
    return success_response(data=state)

@router.get("/heap", response_model=dict)
def get_heap_visualizer_state():
    return success_response(data={
        "type": "Max-Heap Priority Queue",
        "array_representation": [98, 85, 72, 64, 58, 51, 45, 38],
        "nodes": [
            {"index": 0, "val": "98 (Sarkhej VIP)", "parent": None},
            {"index": 1, "val": "85 (Karnavati Club)", "parent": 0},
            {"index": 2, "val": "72 (YMCA Suite)", "parent": 0},
            {"index": 3, "val": "64 (SG Highway 1)", "parent": 1},
            {"index": 4, "val": "58 (Vastrapur Desk)", "parent": 1},
            {"index": 5, "val": "51 (Bopal Gold)", "parent": 2},
        ],
        "time_complexity": "Extract-Max O(log n)"
    })

@router.get("/dsu", response_model=dict)
def get_dsu_visualizer_state():
    dsu = DisjointSet()
    dsu.union("Zone A1 (Mangal Mandap)", "Zone A2 (Inner Ring)")
    dsu.union("Zone A2 (Inner Ring)", "Zone A3 (Garba VIP)")
    dsu.union("Zone B1 (Public Concourse)", "Zone B2 (Turnstile Plaza)")
    dsu.union("Zone C1 (Food Court)", "Zone C2 (Parking West)")

    return success_response(data={
        "connected_components": dsu.get_components(),
        "total_operations": dsu.operations_count,
        "time_complexity": "α(n) ≈ O(1) Amortized"
    })
