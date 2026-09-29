from typing import List, Dict, Any

def find_pass_combinations(
    target_budget: float,
    available_passes: List[Dict[str, Any]],
    max_passes: int = 10,
    max_states: int = 5000
) -> Dict[str, Any]:
    """
    Backtracking solver to find valid pass combinations summing to target budget.
    Includes maximum state exploration limit to prevent server unresponsiveness.
    """
    solutions = []
    states_explored = 0

    passes = sorted(available_passes, key=lambda x: x["price"])

    def backtrack(start_idx: int, current_sum: float, current_combo: List[Dict[str, Any]]):
        nonlocal states_explored
        states_explored += 1
        if states_explored >= max_states:
            return

        if len(current_combo) > max_passes or current_sum > target_budget:
            return

        # Close enough within budget tolerance
        if abs(current_sum - target_budget) <= 500 or current_sum == target_budget:
            solutions.append({
                "passes": list(current_combo),
                "total_cost": current_sum,
                "count": len(current_combo)
            })
            if len(solutions) >= 20:  # Limit return size
                return

        for i in range(start_idx, len(passes)):
            p = passes[i]
            if current_sum + p["price"] <= target_budget:
                current_combo.append(p)
                backtrack(i, current_sum + p["price"], current_combo)
                current_combo.pop()

    backtrack(0, 0.0, [])

    return {
        "algorithm": "Backtracking with Pruning",
        "target_budget": target_budget,
        "solutions_found": len(solutions),
        "solutions": solutions[:10],
        "states_explored": states_explored,
        "max_search_limit": max_states,
        "time_complexity": "O(kⁿ)",
        "space_complexity": "O(n)"
    }
