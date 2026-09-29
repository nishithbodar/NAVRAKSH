from typing import List, Dict, Any

def greedy_inventory_allocation(
    capacity: int,
    sellers: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Greedy heuristic for pass allocation by marginal revenue yield.
    Fast O(n log n), sub-optimal under strict fairness / Gini index constraints.
    """
    # Sort sellers by expected yield per pass
    sorted_sellers = sorted(
        sellers,
        key=lambda s: (s.get("revenue_weight", 1.0) * (s.get("exp_price", 1000) / s.get("true_demand", 1000))),
        reverse=True
    )

    remaining_cap = capacity
    allocations = []
    total_rev = 0

    for s in sorted_sellers:
        demand = s.get("true_demand", 1000)
        allocated = min(demand, remaining_cap)
        rev = allocated * s.get("exp_price", 1000)
        allocations.append({
            "seller_id": s.get("id"),
            "name": s.get("name"),
            "true_demand": demand,
            "allocated_quota": allocated,
            "net_shift": allocated - s.get("current_quota", allocated),
            "fill_rate": round((allocated / demand) * 100, 1) if demand > 0 else 100,
            "exp_revenue_lakhs": round(rev / 100000, 2)
        })
        total_rev += rev
        remaining_cap -= allocated

    return {
        "algorithm": "Greedy Heuristic",
        "capacity": capacity,
        "total_allocated": capacity - remaining_cap,
        "unused_inventory": remaining_cap,
        "total_revenue_lakhs": round(total_rev / 100000, 2),
        "allocations": allocations,
        "time_complexity": "O(n log n)",
        "space_complexity": "O(1)"
    }
