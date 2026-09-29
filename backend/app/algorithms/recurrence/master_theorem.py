import math
import re
from typing import Dict, Any

def solve_master_theorem(expression: str) -> Dict[str, Any]:
    """
    Parses and solves recurrences of the form:
    T(n) = a T(n/b) + f(n)
    Example inputs:
    'T(n) = 2T(n/2) + n' -> O(n log n)
    'T(n) = 4T(n/2) + n' -> O(n^2)
    'T(n) = 2T(n/2) + 1' -> O(n)
    'T(n) = 7T(n/2) + n^2' -> O(n^log2(7))
    """
    cleaned = expression.replace(" ", "")

    # Regex pattern: T(n)=(\d*)T\(n/(\d+)\)\+(.+)
    pattern = r"T\(n\)=(\d*)T\(n/(\d+)\)\+?(.*)"
    match = re.match(pattern, cleaned)

    if not match:
        return {
            "error": "Unable to parse recurrence. Supported format example: 'T(n) = 2T(n/2) + n'",
            "expression": expression,
            "supported": False
        }

    a_str, b_str, fn_str = match.groups()
    a = int(a_str) if a_str else 1
    b = int(b_str) if b_str else 2

    if a < 1 or b <= 1:
        return {"error": "Invalid recurrence parameters: require a >= 1 and b > 1"}

    log_b_a = math.log(a, b)
    log_b_a_rounded = round(log_b_a, 3)

    # Estimate exponent of f(n)
    fn_lower = fn_str.lower()
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
    elif not fn_str or fn_str == "1" or fn_str == "c":
        k = 0.0

    # Determine Master Theorem Case
    # Case 1: f(n) = O(n^(log_b(a) - eps)) => T(n) = Theta(n^log_b(a))
    # Case 2: f(n) = Theta(n^log_b(a) * log^k(n)) => T(n) = Theta(n^log_b(a) * log^(k+1)(n))
    # Case 3: f(n) = Omega(n^(log_b(a) + eps)) => T(n) = Theta(f(n))
    diff = round(k - log_b_a, 4)

    if abs(diff) < 0.05:
        case = 2
        asymptotic = f"Θ(n^{log_b_a_rounded} log n)" if log_b_a_rounded != 1 else "Θ(n log n)"
        explanation = f"Case 2: f(n) is asymptotically equal to n^log_{b}({a}) = n^{log_b_a_rounded}. Total time is Θ(n^{log_b_a_rounded} log n)."
    elif diff < 0:
        case = 1
        asymptotic = f"Θ(n^{log_b_a_rounded})" if log_b_a_rounded != round(log_b_a_rounded) else f"Θ(n^{int(log_b_a_rounded)})"
        explanation = f"Case 1: n^log_{b}({a}) = n^{log_b_a_rounded} dominates f(n) = {fn_str or 'O(1)'}. Total time is Θ(n^{log_b_a_rounded})."
    else:
        case = 3
        asymptotic = f"Θ({fn_str})"
        explanation = f"Case 3: f(n) = {fn_str} dominates n^log_{b}({a}) = n^{log_b_a_rounded} and regularity condition holds. Total time is Θ({fn_str})."

    return {
        "expression": expression,
        "a": a,
        "b": b,
        "log_b_a": log_b_a_rounded,
        "fn": fn_str or "1",
        "case": case,
        "asymptotic_complexity": asymptotic,
        "explanation": explanation,
        "recursion_tree_depth": f"log_{b}(n)",
        "work_at_leaves": f"n^log_{b}({a}) = n^{log_b_a_rounded}"
    }
