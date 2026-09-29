import pytest
from app.algorithms.dynamic_programming.group_booking import optimize_group_booking

def test_group_booking_paradigms():
    tiers = [
        {"name": "VIP", "price": 15000, "priority_level": 5},
        {"name": "Gold", "price": 4500, "priority_level": 2},
        {"name": "General", "price": 1500, "priority_level": 1}
    ]
    res = optimize_group_booking(group_size=6, budget=30000, available_pass_tiers=tiers)
    assert len(res["solutions"]) == 4
    assert res["recommended_solution"] is not None
    assert res["recommended_solution"]["total_cost"] <= 30000
