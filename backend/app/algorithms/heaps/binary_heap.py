from typing import List, Any, Optional

class BinaryHeap:
    """
    Manual educational implementation of a Min/Max Binary Heap.
    Does not use Python heapq.
    """
    def __init__(self, is_min_heap: bool = True):
        self.heap: List[Any] = []
        self.is_min_heap = is_min_heap
        self.comparisons = 0
        self.swaps = 0

    def _compare(self, a: Any, b: Any) -> bool:
        self.comparisons += 1
        key_a = a[0] if isinstance(a, tuple) else a
        key_b = b[0] if isinstance(b, tuple) else b
        return (key_a < key_b) if self.is_min_heap else (key_a > key_b)

    def parent(self, i: int) -> int:
        return (i - 1) // 2

    def left_child(self, i: int) -> int:
        return 2 * i + 1

    def right_child(self, i: int) -> int:
        return 2 * i + 2

    def insert(self, item: Any):
        self.heap.append(item)
        self._sift_up(len(self.heap) - 1)

    def _sift_up(self, i: int):
        while i > 0 and self._compare(self.heap[i], self.heap[self.parent(i)]):
            self.swaps += 1
            p = self.parent(i)
            self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
            i = p

    def peek(self) -> Optional[Any]:
        return self.heap[0] if self.heap else None

    def extract_top(self) -> Optional[Any]:
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()

        root = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._sift_down(0)
        return root

    def _sift_down(self, i: int):
        target = i
        left = self.left_child(i)
        right = self.right_child(i)
        n = len(self.heap)

        if left < n and self._compare(self.heap[left], self.heap[target]):
            target = left
        if right < n and self._compare(self.heap[right], self.heap[target]):
            target = right

        if target != i:
            self.swaps += 1
            self.heap[i], self.heap[target] = self.heap[target], self.heap[i]
            self._sift_down(target)

    def size(self) -> int:
        return len(self.heap)

    def to_list(self) -> List[Any]:
        return list(self.heap)
