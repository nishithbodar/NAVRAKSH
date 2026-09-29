import pytest
from app.algorithms.trees.red_black_tree import RedBlackTree, RED, BLACK

def test_rbt_insertion_and_search():
    rbt = RedBlackTree()
    keys = [1032, 1016, 1056, 1008, 1024, 1040, 1072, 1036, 1048]
    for k in keys:
        rbt.insert(k, {"name": f"Pass-{k}"})

    # Search existing keys
    for k in keys:
        node = rbt.search(k)
        assert node is not None and node != rbt.NIL
        assert node.key == k

    # Search non-existing key
    assert rbt.search(9999) is None

def test_rbt_invariants():
    rbt = RedBlackTree()
    keys = [50, 20, 60, 10, 30, 70, 25, 35, 65, 80, 5, 15]
    for k in keys:
        rbt.insert(k)

    validation = rbt.validate_invariants()
    assert validation["all_valid"] is True
    assert validation["prop_1_colors"] is True
    assert validation["prop_2_root_black"] is True
    assert validation["prop_3_leaf_black"] is True
    assert validation["prop_4_red_children"] is True
    assert validation["prop_5_equal_black_height"] is True
