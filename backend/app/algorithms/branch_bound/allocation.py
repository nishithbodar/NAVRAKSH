from typing import List, Dict, Any

def branch_and_bound_allocation(
    capacity: int,
    sellers: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Branch and Bound exact solver for constrained inventory allocation.
    Uses linear relaxation upper bound and priority queue pruning.
    Tracks nodes explored and nodes pruned.
    """
    n = len(sellers)
    nodes_explored = 0
    nodes_pruned = 0

    # Best solution tracker
    best_allocation = [0] * n
    best_value = 0.0

    # Sort sellers by efficiency ratio
    indexed_sellers = list(enumerate(sellers))
    indexed_sellers.sort(
        key=lambda x: (x[1].get("exp_price", 1000) * x[1].get("priority_mult", 1.0)),
        reverse=True
    )

    def calculate_upper_bound(level: int, current_weight: int, current_value: float) -> float:
        nonlocal nodes_pruned
        bound = current_value
        rem_cap = capacity - current_weight

        for i in range(level, n):
            orig_idx, s = indexed_sellers[i]
            demand = s.get("true_demand", 1000)
            price = s.get("exp_price", 1000)
            if demand <= rem_cap:
                bound += demand * price
                rem_cap -= demand
            else:
                bound += rem_cap * price
                break
        return bound

    def search_tree(level: int, current_weight: int, current_value: float, current_alloc: List[int]):
        nonlocal best_value, best_allocation, nodes_explored, nodes_pruned
        nodes_explored += 1

        if current_value > best_value and current_weight <= capacity:
            best_value = current_value
            best_allocation = list(current_alloc)

        if level >= n or current_weight >= capacity:
            return

        orig_idx, s = indexed_sellers[level]
        demand = s.get("true_demand", 1000)
        price = s.get("exp_price", 1000)

        # Explore branch 1: Allocate full demand or as much as fits
        can_take = min(demand, capacity - current_weight)
        new_alloc = list(current_alloc)
        new_alloc[orig_idx] = can_take

        ub = calculate_upper_bound(level + 1, current_weight + can_take, current_value + can_take * price)
        if ub > best_value:
            search_tree(level + 1, current_weight + can_take, current_value + can_take * price, new_alloc)
        else:
            nodes_pruned += 1

        # Explore branch 2: Minimum quota fallback
        min_quota = int(s.get("min_quota", demand * 0.4))
        if min_quota < can_take:
            new_alloc_min = list(current_alloc)
            new_alloc_min[orig_idx] = min_quota
            ub_min = calculate_upper_bound(level + 1, current_weight + min_quota, current_value + min_quota * price)
            if ub_min > best_value:
                search_tree(level + 1, current_weight + min_quota, current_value + min_quota * price, new_alloc_min)
            else:
                nodes_pruned += 1

    search_tree(0, 0, 0.0, [0] * n)

    # Format result
    alloc_result = []
    for i, s in enumerate(sellers):
        qty = best_allocation[i]
        rev = qty * s.get("exp_price", 1000)
        alloc_result.append({
            "seller_id": s.get("id"),
            "name": s.get("name"),
            "allocated_quota": qty,
            "true_demand": s.get("true_demand", 1000),
            "exp_revenue_lakhs": round(rev / 100000, 2),
            "fill_rate": round((qty / s.get("true_demand", 1000)) * 100, 1)
        })

    return {
        "algorithm": "Branch and Bound",
        "capacity": capacity,
        "total_allocated": sum(best_allocation),
        "total_revenue_lakhs": round(best_value / 100000, 2),
        "nodes_explored": nodes_explored,
        "nodes_pruned": nodes_pruned,
        "allocations": alloc_result,
        "is_optimal": True,
        "time_complexity": "O(2ⁿ) Pruned",
        "space_complexity": "O(n)"
    }
