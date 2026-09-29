from typing import List, Tuple, Any

def quick_sort_counted(arr: List[Any], key_fn=None) -> Tuple[List[Any], int, int]:
    """
    In-place QuickSort returning (sorted_list, comparisons_count, swaps_count).
    Does not use Python's built-in sort.
    """
    comparisons = 0
    swaps = 0
    a = list(arr)

    def _val(x):
        return key_fn(x) if key_fn else x

    def _partition(low: int, high: int) -> int:
        nonlocal comparisons, swaps
        pivot = _val(a[high])
        i = low - 1

        for j in range(low, high):
            comparisons += 1
            if _val(a[j]) <= pivot:
                i += 1
                swaps += 1
                a[i], a[j] = a[j], a[i]

        swaps += 1
        a[i + 1], a[high] = a[high], a[i + 1]
        return i + 1

    def _qsort(low: int, high: int):
        if low < high:
            pi = _partition(low, high)
            _qsort(low, pi - 1)
            _qsort(pi + 1, high)

    if a:
        _qsort(0, len(a) - 1)

    return a, comparisons, swaps
