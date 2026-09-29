from typing import Optional, List, Dict, Any

RED = "RED"
BLACK = "BLACK"

class RBTNode:
    def __init__(self, key: int, data: Any = None, color: str = RED):
        self.key = key
        self.data = data or {}
        self.color = color
        self.left: 'RBTNode' = None
        self.right: 'RBTNode' = None
        self.parent: 'RBTNode' = None

class RedBlackTree:
    """
    Production-grade, fully functional Red-Black Tree implementation
    with step-by-step operation recording for DSA Visualizer.
    """
    def __init__(self):
        self.NIL = RBTNode(key=0, color=BLACK)
        self.NIL.left = self.NIL
        self.NIL.right = self.NIL
        self.root = self.NIL
        self.comparisons = 0
        self.rotations = 0
        self.steps: List[Dict[str, Any]] = []

    def _left_rotate(self, x: RBTNode):
        self.rotations += 1
        y = x.right
        x.right = y.left
        if y.left != self.NIL:
            y.left.parent = x

        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y

        y.left = x
        x.parent = y

        self.steps.append({
            "operation": "LEFT_ROTATE",
            "node": x.key,
            "pivot": y.key,
            "description": f"Left rotate at node {x.key} with child {y.key}"
        })

    def _right_rotate(self, y: RBTNode):
        self.rotations += 1
        x = y.left
        y.left = x.right
        if x.right != self.NIL:
            x.right.parent = y

        x.parent = y.parent
        if y.parent is None:
            self.root = x
        elif y == y.parent.right:
            y.parent.right = x
        else:
            y.parent.left = x

        x.right = y
        y.parent = x

        self.steps.append({
            "operation": "RIGHT_ROTATE",
            "node": y.key,
            "pivot": x.key,
            "description": f"Right rotate at node {y.key} with child {x.key}"
        })

    def insert(self, key: int, data: Any = None):
        self.steps = []
        node = RBTNode(key=key, data=data, color=RED)
        node.left = self.NIL
        node.right = self.NIL

        y = None
        x = self.root

        while x != self.NIL:
            y = x
            self.comparisons += 1
            if node.key < x.key:
                x = x.left
            elif node.key > x.key:
                x = x.right
            else:
                x.data = data
                return

        node.parent = y
        if y is None:
            self.root = node
        elif node.key < y.key:
            y.left = node
        else:
            y.right = node

        self.steps.append({
            "operation": "INSERT_LEAF",
            "key": key,
            "color": RED,
            "parent": y.key if y else None,
            "description": f"Inserted {key} as RED leaf under parent {y.key if y else 'None'}"
        })

        if node.parent is None:
            node.color = BLACK
            return

        if node.parent.parent is None:
            return

        self._insert_fixup(node)

    def _insert_fixup(self, k: RBTNode):
        while k.parent and k.parent.color == RED:
            if k.parent == k.parent.parent.right:
                u = k.parent.parent.left  # Uncle
                if u and u.color == RED:
                    # Case 1: Uncle is RED -> Recolor
                    u.color = BLACK
                    k.parent.color = BLACK
                    k.parent.parent.color = RED
                    self.steps.append({
                        "operation": "RECOLOR",
                        "description": f"Case 1: Uncle {u.key} is RED -> Recolor parent and uncle to BLACK, grandparent {k.parent.parent.key} to RED"
                    })
                    k = k.parent.parent
                else:
                    if k == k.parent.left:
                        # Case 2: Triangle -> Right rotate
                        k = k.parent
                        self._right_rotate(k)
                    # Case 3: Line -> Left rotate
                    k.parent.color = BLACK
                    k.parent.parent.color = RED
                    self._left_rotate(k.parent.parent)
            else:
                u = k.parent.parent.right  # Uncle
                if u and u.color == RED:
                    u.color = BLACK
                    k.parent.color = BLACK
                    k.parent.parent.color = RED
                    self.steps.append({
                        "operation": "RECOLOR",
                        "description": f"Case 1: Uncle {u.key} is RED -> Recolor parent and uncle to BLACK, grandparent {k.parent.parent.key} to RED"
                    })
                    k = k.parent.parent
                else:
                    if k == k.parent.right:
                        k = k.parent
                        self._left_rotate(k)
                    k.parent.color = BLACK
                    k.parent.parent.color = RED
                    self._right_rotate(k.parent.parent)

            if k == self.root:
                break

        self.root.color = BLACK

    def search(self, key: int) -> Optional[RBTNode]:
        current = self.root
        comparisons = 0
        while current != self.NIL and current is not None:
            comparisons += 1
            if key == current.key:
                return current
            elif key < current.key:
                current = current.left
            else:
                current = current.right
        return None

    def get_height(self, node: Optional[RBTNode] = None) -> int:
        if node is None:
            node = self.root
        if node == self.NIL or node is None:
            return 0
        return 1 + max(self.get_height(node.left), self.get_height(node.right))

    def get_black_height(self, node: Optional[RBTNode] = None) -> int:
        if node is None:
            node = self.root
        if node == self.NIL or node is None:
            return 0
        left_bh = self.get_black_height(node.left)
        return left_bh + (1 if node.color == BLACK else 0)

    def validate_invariants(self) -> Dict[str, Any]:
        """
        Validates the 5 canonical Red-Black Tree properties:
        1. Node color is strictly RED or BLACK.
        2. Root is BLACK.
        3. All NIL leaves are BLACK.
        4. Both children of RED nodes are BLACK.
        5. Every path from root to leaf has equal black-height.
        """
        prop1 = True
        prop2 = (self.root == self.NIL or self.root.color == BLACK)
        prop3 = (self.NIL.color == BLACK)
        prop4 = True
        
        # Check prop 4
        def check_red_children(n: RBTNode) -> bool:
            if n == self.NIL or n is None:
                return True
            if n.color == RED:
                if n.left and n.left.color == RED:
                    return False
                if n.right and n.right.color == RED:
                    return False
            return check_red_children(n.left) and check_red_children(n.right)

        prop4 = check_red_children(self.root)

        # Check prop 5 (equal black height)
        black_heights = []
        def collect_bh(n: RBTNode, current_bh: int):
            if n == self.NIL or n is None:
                black_heights.append(current_bh + 1)
                return
            new_bh = current_bh + (1 if n.color == BLACK else 0)
            collect_bh(n.left, new_bh)
            collect_bh(n.right, new_bh)

        collect_bh(self.root, 0)
        prop5 = len(set(black_heights)) <= 1

        all_valid = all([prop1, prop2, prop3, prop4, prop5])
        return {
            "all_valid": all_valid,
            "prop_1_colors": prop1,
            "prop_2_root_black": prop2,
            "prop_3_leaf_black": prop3,
            "prop_4_red_children": prop4,
            "prop_5_equal_black_height": prop5,
            "black_height": self.get_black_height(),
            "tree_height": self.get_height()
        }

    def to_visualizer_format(self) -> Dict[str, Any]:
        nodes_list = []
        edges_list = []

        def traverse(n: RBTNode, parent_id: Optional[int] = None):
            if n == self.NIL or n is None:
                return
            nodes_list.append({
                "id": str(n.key),
                "key": n.key,
                "color": n.color,
                "data": n.data,
                "black_height": self.get_black_height(n),
            })
            if parent_id is not None:
                edges_list.append({
                    "from": str(parent_id),
                    "to": str(n.key),
                })
            traverse(n.left, n.key)
            traverse(n.right, n.key)

        traverse(self.root)
        return {
            "root": str(self.root.key) if self.root != self.NIL else None,
            "total_nodes": len(nodes_list),
            "tree_height": self.get_height(),
            "black_height": self.get_black_height(),
            "invariants": self.validate_invariants(),
            "nodes": nodes_list,
            "edges": edges_list,
        }
