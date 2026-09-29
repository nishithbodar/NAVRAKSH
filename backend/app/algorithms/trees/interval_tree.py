from typing import List, Dict, Any, Optional

class IntervalNode:
    def __init__(self, low: float, high: float, data: Any = None):
        self.low = low
        self.high = high
        self.max_high = high
        self.data = data or {}
        self.left: Optional['IntervalNode'] = None
        self.right: Optional['IntervalNode'] = None

class IntervalTree:
    """
    Augmented Interval Tree for O(log n) time-slot conflict
    and venue sound curfew detection.
    """
    def __init__(self):
        self.root: Optional[IntervalNode] = None
        self.comparisons = 0

    def insert(self, low: float, high: float, data: Any = None):
        new_node = IntervalNode(low, high, data)
        if not self.root:
            self.root = new_node
            return

        curr = self.root
        while True:
            self.comparisons += 1
            if high > curr.max_high:
                curr.max_high = high

            if low < curr.low:
                if not curr.left:
                    curr.left = new_node
                    break
                curr = curr.left
            else:
                if not curr.right:
                    curr.right = new_node
                    break
                curr = curr.right

    def _do_overlap(self, low1: float, high1: float, low2: float, high2: float) -> bool:
        return low1 < high2 and low2 < high1

    def search_all_conflicts(self, low: float, high: float) -> List[Dict[str, Any]]:
        conflicts = []
        self._search_recursive(self.root, low, high, conflicts)
        return conflicts

    def _search_recursive(self, node: Optional[IntervalNode], low: float, high: float, results: List[Dict[str, Any]]):
        if not node:
            return

        self.comparisons += 1
        if self._do_overlap(node.low, node.high, low, high):
            results.append({
                "interval": [node.low, node.high],
                "data": node.data,
                "conflict_range": [max(node.low, low), min(node.high, high)]
            })

        if node.left and node.left.max_high >= low:
            self._search_recursive(node.left, low, high, results)

        self._search_recursive(node.right, low, high, results)

    def get_all_intervals(self) -> List[Dict[str, Any]]:
        intervals = []
        def in_order(n: Optional[IntervalNode]):
            if not n:
                return
            in_order(n.left)
            intervals.append({
                "low": n.low,
                "high": n.high,
                "max_high": n.max_high,
                "data": n.data
            })
            in_order(n.right)
        in_order(self.root)
        return intervals
