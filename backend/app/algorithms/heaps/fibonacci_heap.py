import math
from typing import Optional, List, Any

class FibNode:
    def __init__(self, key: int, data: Any = None):
        self.key = key
        self.data = data
        self.degree = 0
        self.parent: Optional['FibNode'] = None
        self.child: Optional['FibNode'] = None
        self.left: 'FibNode' = self
        self.right: 'FibNode' = self
        self.mark = False

class FibonacciHeap:
    """
    Manual educational implementation of Fibonacci Heap with
    O(1) amortized insertion, decrease-key, and O(log n) amortized extract_min.
    """
    def __init__(self):
        self.min_node: Optional[FibNode] = None
        self.total_nodes = 0
        self.comparisons = 0

    def insert(self, key: int, data: Any = None) -> FibNode:
        node = FibNode(key, data)
        if not self.min_node:
            self.min_node = node
        else:
            # Insert into root list
            node.left = self.min_node
            node.right = self.min_node.right
            self.min_node.right.left = node
            self.min_node.right = node
            self.comparisons += 1
            if node.key < self.min_node.key:
                self.min_node = node
        self.total_nodes += 1
        return node

    def get_min(self) -> Optional[int]:
        return self.min_node.key if self.min_node else None

    def extract_min(self) -> Optional[FibNode]:
        z = self.min_node
        if z is not None:
            # Move all children of z to the root list
            if z.child is not None:
                children = []
                c = z.child
                while True:
                    children.append(c)
                    c = c.right
                    if c == z.child:
                        break

                for c in children:
                    c.left.right = c.right
                    c.right.left = c.left
                    c.left = self.min_node
                    c.right = self.min_node.right
                    self.min_node.right.left = c
                    self.min_node.right = c
                    c.parent = None

            # Remove z from root list
            z.left.right = z.right
            z.right.left = z.left

            if z == z.right:
                self.min_node = None
            else:
                self.min_node = z.right
                self._consolidate()

            self.total_nodes -= 1
        return z

    def _consolidate(self):
        max_deg = int(math.log2(self.total_nodes + 1) * 2) + 2
        A: List[Optional[FibNode]] = [None] * max_deg

        root_list = []
        x = self.min_node
        if x is not None:
            while True:
                root_list.append(x)
                x = x.right
                if x == self.min_node:
                    break

        for w in root_list:
            x = w
            d = x.degree
            while d < len(A) and A[d] is not None:
                y = A[d]
                self.comparisons += 1
                if x.key > y.key:
                    x, y = y, x
                self._link(y, x)
                A[d] = None
                d += 1
            if d < len(A):
                A[d] = x

        self.min_node = None
        for i in range(len(A)):
            if A[i] is not None:
                if self.min_node is None:
                    self.min_node = A[i]
                    self.min_node.left = self.min_node
                    self.min_node.right = self.min_node
                else:
                    A[i].left = self.min_node
                    A[i].right = self.min_node.right
                    self.min_node.right.left = A[i]
                    self.min_node.right = A[i]
                    self.comparisons += 1
                    if A[i].key < self.min_node.key:
                        self.min_node = A[i]

    def _link(self, y: FibNode, x: FibNode):
        y.left.right = y.right
        y.right.left = y.left
        y.parent = x
        if x.child is None:
            x.child = y
            y.left = y
            y.right = y
        else:
            y.left = x.child
            y.right = x.child.right
            x.child.right.left = y
            x.child.right = y
        x.degree += 1
        y.mark = False
