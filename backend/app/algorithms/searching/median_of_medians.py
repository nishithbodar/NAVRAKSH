from typing import List, Tuple, Any

def median_of_medians_select(arr: List[Any], k: int, key_fn=None) -> Tuple[Any, int]:
    """
    Deterministic Linear-Time Selection using Median of Medians.
    Guarantees O(n) worst-case time complexity.
    Returns (k-th smallest element, comparisons_count).
    """
    comparisons = 0

    def _val(x):
        return key_fn(x) if key_fn else x

    def _select(sub_arr: List[Any], target_k: int) -> Any:
        nonlocal comparisons
        if len(sub_arr) <= 5:
            # Insertion sort small group
            sorted_sub = sorted(sub_arr, key=_val)
            comparisons += len(sub_arr) * 2
            return sorted_sub[target_k]

        # Divide into sublists of size 5
        medians = []
        for i in range(0, len(sub_arr), 5):
            chunk = sub_arr[i:i + 5]
            sorted_chunk = sorted(chunk, key=_val)
            comparisons += len(chunk) * 2
            medians.append(sorted_chunk[len(sorted_chunk) // 2])

        # Find median of medians
        pivot = _select(medians, len(medians) // 2)

        # Partition around pivot
        lows = []
        highs = []
        pivots = []

        pivot_val = _val(pivot)
        for x in sub_arr:
            comparisons += 1
            x_val = _val(x)
            if x_val < pivot_val:
                lows.append(x)
            elif x_val > pivot_val:
                highs.append(x)
            else:
                pivots.append(x)

        if target_k < len(lows):
            return _select(lows, target_k)
        elif target_k < len(lows) + len(pivots):
            return pivots[0]
        else:
            return _select(highs, target_k - len(lows) - len(pivots))

    if not arr or k < 0 or k >= len(arr):
        return None, 0

    result = _select(list(arr), k)
    return result, comparisons
