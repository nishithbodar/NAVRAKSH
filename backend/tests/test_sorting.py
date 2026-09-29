import pytest
from app.algorithms.sorting.quick_sort import quick_sort_counted
from app.algorithms.sorting.merge_sort import merge_sort_counted

def test_quick_sort():
    data = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr, comps, swaps = quick_sort_counted(data)
    assert sorted_arr == [11, 12, 22, 25, 34, 64, 90]
    assert comps > 0

def test_merge_sort():
    data = [38, 27, 43, 3, 9, 82, 10]
    sorted_arr, comps, copies = merge_sort_counted(data)
    assert sorted_arr == [3, 9, 10, 27, 38, 43, 82]
    assert comps > 0
