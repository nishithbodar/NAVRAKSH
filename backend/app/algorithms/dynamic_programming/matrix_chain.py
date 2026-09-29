from typing import List, Dict, Any

def solve_matrix_chain(dimensions: List[int]) -> Dict[str, Any]:
    """
    Computes optimal matrix chain multiplication parenthesization
    using Dynamic Programming.
    dimensions = [d0, d1, d2, ..., dn] for n matrices
    """
    n = len(dimensions) - 1
    if n <= 0:
        return {"error": "Invalid dimensions list"}

    m = [[0] * (n + 1) for _ in range(n + 1)]
    s = [[0] * (n + 1) for _ in range(n + 1)]
    scalar_multiplications = 0

    for l in range(2, n + 1):  # Chain length
        for i in range(1, n - l + 2):
            j = i + l - 1
            m[i][j] = float('inf')
            for k in range(i, j):
                scalar_multiplications += 1
                q = m[i][k] + m[k + 1][j] + dimensions[i - 1] * dimensions[k] * dimensions[j]
                if q < m[i][j]:
                    m[i][j] = q
                    s[i][j] = k

    def get_parenthesization(i: int, j: int) -> str:
        if i == j:
            return f"A{i}"
        return f"({get_parenthesization(i, s[i][j])} x {get_parenthesization(s[i][j] + 1, j)})"

    optimal_expression = get_parenthesization(1, n)

    return {
        "num_matrices": n,
        "optimal_scalar_multiplications": m[1][n],
        "optimal_parenthesization": optimal_expression,
        "computations": scalar_multiplications,
        "m_table": m,
        "s_split_table": s,
        "time_complexity": "O(n³)",
        "space_complexity": "O(n²)"
    }
