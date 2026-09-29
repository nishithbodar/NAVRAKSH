import pytest
from app.algorithms.dynamic_programming.knapsack import solve_bounded_knapsack

def test_knapsack_bounded():
    capacity = 10000
    weights = [3200, 2800, 2100, 1500, 1200, 900]
    values = [3200 * 700, 2800 * 700, 2100 * 700, 1500 * 700, 1200 * 700, 900 * 700]
    min_bounds = [1200, 1000, 800, 500, 400, 300]
    max_bounds = weights
    labels = ["Seller A", "Seller B", "Seller C", "Seller D", "Seller E", "Seller F"]

    res = solve_bounded_knapsack(capacity, weights, values, min_bounds, max_bounds, labels)
    assert res["total_allocated"] <= capacity
    assert res["total_revenue"] > 0
    assert len(res["allocations"]) == len(labels)
