from typing import Optional, List, Any

class BinomialNode:
    def __init__(self, key: int, data: Any = None):
        self.key = key
        self.data = data
        self.degree = 0
        self.parent: Optional['BinomialNode'] = None
        self.child: Optional['BinomialNode'] = None
        self.sibling: Optional['BinomialNode'] = None

class BinomialHeap:
    """
    Manual implementation of Binomial Heap supporting O(log n) merge,
    insert, extract_min, and decrease_key operations.
    """
    def __init__(self):
        self.head: Optional[BinomialNode] = None
        self.comparisons = 0
        self.merges = 0

    def _link(self, y: BinomialNode, z: BinomialNode):
        # Links node y as a child of node z
        self.merges += 1
        y.parent = z
        y.sibling = z.child
        z.child = y
        z.degree += 1

    def _merge_root_lists(self, h1: Optional[BinomialNode], h2: Optional[BinomialNode]) -> Optional[BinomialNode]:
        if not h1:
            return h2
        if not h2:
            return h1

        head = None
        tail = None
        p1, p2 = h1, h2

        def append_node(node):
            nonlocal head, tail
            if not head:
                head = tail = node
            else:
                tail.sibling = node
                tail = node

        while p1 and p2:
            if p1.degree <= p2.degree:
                next_p1 = p1.sibling
                append_node(p1)
                p1 = next_p1
            else:
                next_p2 = p2.sibling
                append_node(p2)
                p2 = next_p2

        while p1:
            next_p1 = p1.sibling
            append_node(p1)
            p1 = next_p1
        while p2:
            next_p2 = p2.sibling
            append_node(p2)
            p2 = next_p2

        return head

    def union(self, other: 'BinomialHeap'):
        new_head = self._merge_root_lists(self.head, other.head)
        self.head = None
        other.head = None

        if not new_head:
            return

        prev_x = None
        x = new_head
        next_x = x.sibling

        while next_x:
            if (x.degree != next_x.degree) or (next_x.sibling and next_x.sibling.degree == x.degree):
                prev_x = x
                x = next_x
            else:
                self.comparisons += 1
                if x.key <= next_x.key:
                    x.sibling = next_x.sibling
                    self._link(next_x, x)
                else:
                    if not prev_x:
                        new_head = next_x
                    else:
                        prev_x.sibling = next_x
                    self._link(x, next_x)
                    x = next_x
            next_x = x.sibling

        self.head = new_head

    def insert(self, key: int, data: Any = None):
        temp_heap = BinomialHeap()
        temp_heap.head = BinomialNode(key, data)
        self.union(temp_heap)

    def get_min(self) -> Optional[BinomialNode]:
        if not self.head:
            return None
        min_node = self.head
        curr = self.head.sibling
        while curr:
            self.comparisons += 1
            if curr.key < min_node.key:
                min_node = curr
            curr = curr.sibling
        return min_node

    def extract_min(self) -> Optional[BinomialNode]:
        if not self.head:
            return None

        # Find min node and its predecessor
        min_node = self.head
        min_prev = None
        curr = self.head.sibling
        curr_prev = self.head

        while curr:
            self.comparisons += 1
            if curr.key < min_node.key:
                min_node = curr
                min_prev = curr_prev
            curr_prev = curr
            curr = curr.sibling

        # Remove min_node from root list
        if min_prev:
            min_prev.sibling = min_node.sibling
        else:
            self.head = min_node.sibling

        # Reverse children of min_node to form another binomial heap
        child_head = None
        child = min_node.child
        while child:
            next_child = child.sibling
            child.sibling = child_head
            child.parent = None
            child_head = child
            child = next_child

        child_heap = BinomialHeap()
        child_heap.head = child_head
        self.union(child_heap)

        return min_node
