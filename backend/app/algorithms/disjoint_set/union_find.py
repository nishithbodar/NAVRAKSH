from typing import Dict, Any, List

class DisjointSet:
    """
    Disjoint Set Union-Find with Path Compression and Union by Rank
    for clustering festival group bookings and venue zones.
    """
    def __init__(self):
        self.parent: Dict[Any, Any] = {}
        self.rank: Dict[Any, int] = {}
        self.size: Dict[Any, int] = {}
        self.operations_count = 0

    def make_set(self, x: Any):
        if x not in self.parent:
            self.parent[x] = x
            self.rank[x] = 0
            self.size[x] = 1

    def find(self, x: Any) -> Any:
        self.make_set(x)
        self.operations_count += 1
        # Path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: Any, y: Any) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)
        self.operations_count += 1

        if root_x == root_y:
            return False  # Already in same set

        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
            self.size[root_y] += self.size[root_x]
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
            self.size[root_x] += self.size[root_y]
        else:
            self.parent[root_y] = root_x
            self.size[root_x] += self.size[root_y]
            self.rank[root_x] += 1

        return True

    def get_components(self) -> Dict[Any, List[Any]]:
        components: Dict[Any, List[Any]] = {}
        for elem in list(self.parent.keys()):
            root = self.find(elem)
            if root not in components:
                components[root] = []
            components[root].append(elem)
        return components
