from typing import List, Tuple, Any

def quickselect_kth(arr: List[Any], k: int, key_fn=None) -> Tuple[Any, int]:
    """
    Finds the k-th smallest element (0-indexed) using Quickselect.
    Average time: O(n). Returns (element, comparisons).
    """
    comparisons = 0
    a = list(arr)

    def _val(x):
        return key_fn(x) if key_fn else x

    def _select(left: int, right: int, k_idx: int) -> Any:
        nonlocal comparisons
        if left == right:
            return a[left]

        # Use right element as pivot
        pivot = _val(a[right])
        i = left

        for j in range(left, right):
            comparisons += 1
            if _val(a[j]) <= pivot:
                a[i], a[j] = a[j], a[i]
                i += 1

        a[i], a[right] = a[right], a[i]

        if k_idx == i:
            return a[i]
        elif k_idx < i:
            return _select(left, i - 1, k_idx)
        else:
            return _select(i + 1, right, k_idx)

    if not a or k < 0 or k >= len(a):
        return None, 0

    result = _select(0, len(a) - 1, k)
    return result, comparisons
