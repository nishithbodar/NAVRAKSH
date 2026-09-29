from typing import Dict, Any, List

def compute_lcs(str1: str, str2: str) -> Dict[str, Any]:
    """
    Computes Longest Common Subsequence between two strings/sequences
    with full DP matrix return for visualization and diff analysis.
    """
    m = len(str1)
    n = len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    comparisons = 0

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            comparisons += 1
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Reconstruct LCS sequence
    i, j = m, n
    lcs_chars = []
    while i > 0 and j > 0:
        if str1[i - 1] == str2[j - 1]:
            lcs_chars.append(str1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    lcs_sequence = "".join(reversed(lcs_chars))
    similarity_score = round((2 * len(lcs_sequence) / (m + n)) * 100, 2) if (m + n) > 0 else 0

    return {
        "lcs_length": dp[m][n],
        "lcs_sequence": lcs_sequence,
        "string_1_length": m,
        "string_2_length": n,
        "comparisons": comparisons,
        "similarity_score": similarity_score,
        "dp_table": dp,
        "time_complexity": "O(m · n)",
        "space_complexity": "O(m · n)"
    }
