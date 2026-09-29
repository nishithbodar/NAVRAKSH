from typing import List, Tuple, Any

def merge_sort_counted(arr: List[Any], key_fn=None) -> Tuple[List[Any], int, int]:
    """
    MergeSort implementation returning (sorted_list, comparisons_count, copies_count).
    Does not use Python's built-in sort.
    """
    comparisons = 0
    copies = 0

    def _val(x):
        return key_fn(x) if key_fn else x

    def _merge(left: List[Any], right: List[Any]) -> List[Any]:
        nonlocal comparisons, copies
        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            comparisons += 1
            if _val(left[i]) <= _val(right[j]):
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
            copies += 1

        while i < len(left):
            result.append(left[i])
            i += 1
            copies += 1

        while j < len(right):
            result.append(right[j])
            j += 1
            copies += 1

        return result

    def _sort(lst: List[Any]) -> List[Any]:
        if len(lst) <= 1:
            return lst
        mid = len(lst) // 2
        left = _sort(lst[:mid])
        right = _sort(lst[mid:])
        return _merge(left, right)

    sorted_arr = _sort(list(arr))
    return sorted_arr, comparisons, copies
