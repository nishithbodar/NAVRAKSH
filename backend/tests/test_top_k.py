import pytest
from app.algorithms.searching.quickselect import quickselect_kth
from app.algorithms.searching.median_of_medians import median_of_medians_select

def test_quickselect():
    data = [7, 10, 4, 3, 20, 15]
    # 0-indexed 2nd smallest is 4 (sorted: 3, 4, 7, 10, 15, 20)
    kth, comps = quickselect_kth(data, 1)
    assert kth == 4
    # 4th smallest is 15
    kth4, comps = quickselect_kth(data, 4)
    assert kth4 == 15

def test_median_of_medians():
    data = [12, 3, 5, 7, 4, 19, 26]
    # sorted: 3, 4, 5, 7, 12, 19, 26
    val, comps = median_of_medians_select(data, 0)
    assert val == 3
    val3, comps = median_of_medians_select(data, 3)
    assert val3 == 7
