import pytest
from app.algorithms.dynamic_programming.group_booking import optimize_group_booking

def brute_force_group_booking(group_size: int, budget: int, tiers: list) -> int:
    """
    Brute force exhaustive search to prove global optimality of DP, B&B, and Backtracking.
    """
    best_value = 0
    t0_price, t0_val = tiers[0]["price"], tiers[0]["priority_level"] * 100
    t1_price, t1_val = tiers[1]["price"], tiers[1]["priority_level"] * 100
    t2_price, t2_val = tiers[2]["price"], tiers[2]["priority_level"] * 100

    for q0 in range(group_size + 1):
        for q1 in range(group_size + 1 - q0):
            for q2 in range(group_size + 1 - q0 - q1):
                cost = q0 * t0_price + q1 * t1_price + q2 * t2_price
                if cost <= budget:
                    val = q0 * t0_val + q1 * t1_val + q2 * t2_val
                    if val > best_value:
                        best_value = val
    return best_value

def test_group_booking_paradigms():
    tiers = [
        {"name": "VIP", "price": 5000, "priority_level": 5},
        {"name": "Gold", "price": 2000, "priority_level": 2},
        {"name": "General", "price": 1000, "priority_level": 1}
    ]
    res = optimize_group_booking(group_size=4, budget=8000, available_pass_tiers=tiers)
    assert len(res["solutions"]) == 4

    greedy_res = next(s for s in res["solutions"] if s["algorithm"] == "Greedy Heuristic")
    dp_res = next(s for s in res["solutions"] if s["algorithm"] == "Dynamic Programming")
    bb_res = next(s for s in res["solutions"] if s["algorithm"] == "Branch and Bound")
    bt_res = next(s for s in res["solutions"] if s["algorithm"] == "Recursive Backtracking")

    # Verify constraints for all 4 solvers
    for s in [greedy_res, dp_res, bb_res, bt_res]:
        assert s["total_cost"] <= 8000
        assert s["people_admitted"] <= 4

    # Run brute force ground truth
    bf_optimal_value = brute_force_group_booking(group_size=4, budget=8000, tiers=tiers)

    # Prove DP, B&B, and Backtracking achieve exact brute force optimality
    assert bb_res["total_value"] == bf_optimal_value, f"B&B {bb_res['total_value']} != BF {bf_optimal_value}"
    assert bt_res["total_value"] == bf_optimal_value, f"BT {bt_res['total_value']} != BF {bf_optimal_value}"
    assert dp_res["total_value"] == bf_optimal_value, f"DP {dp_res['total_value']} != BF {bf_optimal_value}"

    # Verify real counters (no fake 48 or 182)
    assert bb_res["states_explored"] > 0
    assert bt_res["states_explored"] > 0
    assert dp_res["states_explored"] > 0
