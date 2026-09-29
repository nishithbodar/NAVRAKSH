from typing import List, Tuple, Any, Optional

def binary_search_counted(arr: List[Any], target: Any, key_fn=None) -> Tuple[Optional[int], int]:
    """
    Standard binary search over sorted array.
    Returns (index_if_found, comparisons_count).
    """
    comparisons = 0
    left = 0
    right = len(arr) - 1

    def _val(x):
        return key_fn(x) if key_fn else x

    target_val = _val(target)

    while left <= right:
        comparisons += 1
        mid = (left + right) // 2
        mid_val = _val(arr[mid])

        if mid_val == target_val:
            return mid, comparisons
        elif mid_val < target_val:
            left = mid + 1
        else:
            right = mid - 1

    return None, comparisons
