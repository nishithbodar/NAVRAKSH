import math
import re
from typing import Dict, Any

def solve_master_theorem(expression: str) -> Dict[str, Any]:
    """
    Structured recurrence parser and analyzer supporting:
    1. Divide-and-Conquer Recurrences: T(n) = a T(n/b) + f(n) (Master Theorem)
       Examples:
       - T(n) = 2T(n/2) + n       -> Theta(n log n)
       - T(n) = 2T(n/2) + 1       -> Theta(n)
       - T(n) = 3T(n/2) + n       -> Theta(n^log_2(3)) ≈ Theta(n^1.585)
       - T(n) = 4T(n/2) + n^2     -> Theta(n^2 log n)
       - T(n) = 7T(n/2) + n^2     -> Theta(n^log_2(7)) (Strassen)
       - T(n) = 8T(n/2) + n^2     -> Theta(n^3) (Standard matrix mult)
    2. Subtract-and-Conquer Recurrences: T(n) = c T(n-d) + f(n)
       Examples:
       - T(n) = T(n-1) + n        -> Theta(n^2) (Insertion sort, Quick sort worst case)
       - T(n) = T(n-1) + 1        -> Theta(n) (Linear search)
       - T(n) = 2T(n-1) + 1       -> Theta(2^n) (Towers of Hanoi)
    """
    cleaned = expression.replace(" ", "").strip()

    # Check for subtract-and-conquer: T(n) = a T(n-c) + f(n)
    sub_pattern = r"^T\(n\)=(\d*)T\(n-(\d+)\)\+?(.*)$"
    sub_match = re.match(sub_pattern, cleaned)
    if sub_match:
        a_str, c_str, fn_str = sub_match.groups()
        a = int(a_str) if a_str else 1
        c = int(c_str) if c_str else 1
        fn_clean = fn_str.strip() if fn_str else "1"

        if a == 1:
            if fn_clean in ["n", "n^1"]:
                asymptotic = "Θ(n²)"
                explanation = (
                    f"Subtract-and-Conquer telescoping summation: T(n) = T(n-{c}) + n. "
                    f"Summing over n/{c} steps gives n + (n-{c}) + (n-2{c}) + ... + 1 = Θ(n²)."
                )
            elif fn_clean in ["1", "c", "O(1)"]:
                asymptotic = "Θ(n)"
                explanation = (
                    f"Subtract-and-Conquer telescoping summation: T(n) = T(n-{c}) + 1. "
                    f"Takes n/{c} steps of unit work = Θ(n)."
                )
            elif "^2" in fn_clean or "n*n" in fn_clean:
                asymptotic = "Θ(n³)"
                explanation = (
                    f"Telescoping sum of squares: sum_{{k=1}}^{{n}} k² = n(n+1)(2n+1)/6 = Θ(n³)."
                )
            else:
                asymptotic = f"Θ(n · ({fn_clean}))"
                explanation = f"Summing {fn_clean} over n/{c} recursion steps."

            return {
                "expression": expression,
                "method": "Subtract-and-Conquer (Telescoping Series)",
                "a": a,
                "b": f"n - {c}",
                "c": c,
                "fn": fn_clean,
                "case": "Linear Decrement (a = 1)",
                "asymptotic_complexity": asymptotic,
                "explanation": explanation,
                "recursion_tree_depth": f"n / {c}",
                "work_at_leaves": "Θ(1)",
                "total_leaves": 1
            }
        else:
            # a > 1: exponential recurrence, e.g. T(n) = 2T(n-1) + 1 => O(2^n)
            asymptotic = f"Θ({a}^n)"
            explanation = (
                f"Exponential branching: Each step decreases n by {c} while spawning {a} subproblems. "
                f"Tree has depth n/{c} and branching factor {a}, leading to {a}^(n/{c}) leaves = Θ({a}^n)."
            )
            return {
                "expression": expression,
                "method": "Subtract-and-Conquer (Exponential Branching)",
                "a": a,
                "b": f"n - {c}",
                "c": c,
                "fn": fn_clean,
                "case": f"Exponential Tree (a = {a} > 1)",
                "asymptotic_complexity": asymptotic,
                "explanation": explanation,
                "recursion_tree_depth": f"n / {c}",
                "work_at_leaves": f"Θ({a}^n)",
                "total_leaves": f"{a}^(n/{c})"
            }

    # Divide-and-conquer pattern: T(n) = a T(n/b) + f(n)
    div_pattern = r"^T\(n\)=(\d*)T\(n/(\d+)\)\+?(.*)$"
    div_match = re.match(div_pattern, cleaned)

    if not div_match:
        return {
            "error": "Unable to parse recurrence expression. Supported formats: 'T(n) = 2T(n/2) + n', 'T(n) = T(n-1) + n', 'T(n) = 4T(n/2) + 1'",
            "expression": expression,
            "supported": False
        }

    a_str, b_str, fn_str = div_match.groups()
    a = int(a_str) if a_str else 1
    b = int(b_str) if b_str else 2

    if a < 1 or b <= 1:
        return {"error": "Invalid recurrence parameters: require a >= 1 and b > 1 for Master Theorem"}

    log_b_a = math.log(a, b)
    log_b_a_rounded = round(log_b_a, 3)

    # Parse f(n) polynomial exponent and logarithmic factors
    fn_lower = fn_str.lower().strip()
    k = 0.0
    has_log = "log" in fn_lower

    if "^" in fn_lower:
        exp_part = fn_lower.split("^")[-1]
        try:
            k = float(re.findall(r"[\d.]+", exp_part)[0])
        except Exception:
            k = 1.0
    elif "n" in fn_lower:
        k = 1.0
    elif not fn_str or fn_str in ["1", "c", "o(1)"]:
        k = 0.0

    diff = round(k - log_b_a, 4)

    # Master Theorem Cases (Cormen, Leiserson, Rivest, Stein):
    # Case 1: f(n) = O(n^(log_b(a) - eps))  => T(n) = Theta(n^(log_b a))
    # Case 2: f(n) = Theta(n^(log_b a) * log^p n) => T(n) = Theta(n^(log_b a) * log^(p+1) n)
    # Case 3: f(n) = Omega(n^(log_b(a) + eps)) => T(n) = Theta(f(n))
    if abs(diff) < 0.05:
        case = 2
        case_name = "Case 2 (Balanced Work)"
        if log_b_a_rounded == 0:
            asymptotic = "Θ(log n)"
        elif log_b_a_rounded == 1:
            asymptotic = "Θ(n log n)"
        else:
            asymptotic = f"Θ(n^{log_b_a_rounded} log n)"
        explanation = (
            f"Case 2: f(n) = {fn_str or '1'} is asymptotically equal to n^(log_{b} {a}) = n^{log_b_a_rounded}. "
            f"Work is distributed evenly across all levels of the recursion tree. Total time is {asymptotic}."
        )
    elif diff < 0:
        case = 1
        case_name = "Case 1 (Leaf Heavy)"
        if log_b_a_rounded == round(log_b_a_rounded):
            asymptotic = f"Θ(n^{int(log_b_a_rounded)})" if int(log_b_a_rounded) != 1 else "Θ(n)"
        else:
            asymptotic = f"Θ(n^{log_b_a_rounded})"
        explanation = (
            f"Case 1: The work at the leaves n^(log_{b} {a}) = n^{log_b_a_rounded} strictly dominates f(n) = {fn_str or '1'}. "
            f"Total time is determined by the leaves: {asymptotic}."
        )
    else:
        case = 3
        case_name = "Case 3 (Root Heavy)"
        asymptotic = f"Θ({fn_str})"
        explanation = (
            f"Case 3: The divide/combine cost at the root f(n) = {fn_str} strictly dominates the work at the leaves "
            f"n^(log_{b} {a}) = n^{log_b_a_rounded}. Satisfying the regularity condition a·f(n/b) <= c·f(n), total time is {asymptotic}."
        )

    return {
        "expression": expression,
        "method": "Master Theorem (Divide and Conquer)",
        "a": a,
        "b": b,
        "fn": fn_str or "1",
        "log_b_a": log_b_a_rounded,
        "case": case,
        "case_name": case_name,
        "asymptotic_complexity": asymptotic,
        "explanation": explanation,
        "recursion_tree_depth": f"log_{b}(n)",
        "work_at_leaves": f"n^(log_{b} {a}) = n^{log_b_a_rounded}",
        "total_leaves": f"n^(log_{b} {a})"
    }
