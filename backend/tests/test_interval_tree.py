import pytest
from app.algorithms.trees.interval_tree import IntervalTree

def test_interval_tree_overlap_detection():
    tree = IntervalTree()
    # Insert intervals
    tree.insert(18.0, 20.5, {"event": "Aarti"})
    tree.insert(20.0, 23.75, {"event": "Maha Raas"})
    tree.insert(23.5, 26.0, {"event": "Night Curfew"})

    # Query overlapping slot with Maha Raas
    conflicts = tree.search_all_conflicts(21.0, 22.0)
    assert len(conflicts) >= 1
    assert any(c["data"]["event"] == "Maha Raas" for c in conflicts)

    # Query slot outside range
    no_conflicts = tree.search_all_conflicts(10.0, 12.0)
    assert len(no_conflicts) == 0
