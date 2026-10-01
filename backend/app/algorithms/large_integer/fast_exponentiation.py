import time
from typing import Dict, Any, Tuple

def naive_power(base: int, exponent: int, modulus: int = None) -> Tuple[int, int]:
    """
    Naive linear exponentiation: base * base * ... * base (exponent times).
    Time Complexity: O(n) multiplications.
    Returns (result, multiplications_count).
    """
    if exponent == 0:
        return 1, 0
    if exponent < 0:
        raise ValueError("Negative exponents not supported for integer demonstration")

    result = 1
    mults = 0
    for _ in range(exponent):
        result *= base
        if modulus:
            result %= modulus
        mults += 1
    return result, mults

def fast_power(base: int, exponent: int, modulus: int = None) -> Tuple[int, int]:
    """
    Fast Exponentiation by Squaring (Divide and Conquer / Binary Exponentiation).
    x^n = (x^(n/2))^2 if n is even, x * (x^((n-1)/2))^2 if n is odd.
    Time Complexity: O(log n) multiplications.
    Returns (result, multiplications_count).
    """
    if exponent == 0:
        return 1, 0
    if exponent < 0:
        raise ValueError("Negative exponents not supported for integer demonstration")

    result = 1
    current_base = base
    mults = 0
    curr_exp = exponent

    while curr_exp > 0:
        if curr_exp % 2 == 1:
            result *= current_base
            if modulus:
                result %= modulus
            mults += 1
        current_base *= current_base
        if modulus:
            current_base %= modulus
        mults += 1
        curr_exp //= 2

    return result, mults

def benchmark_exponentiation(base: int, exponent: int, modulus: int = None) -> Dict[str, Any]:
    """
    Compares Naive Exponentiation vs Fast Exponentiation by Squaring.
    Measures actual execution times, multiplication operations, and output consistency.
    """
    # Naive multiplication timing (cap exponent to 100,000 to prevent CPU lock)
    if exponent <= 100000:
        t0 = time.perf_counter()
        naive_res, naive_mults = naive_power(base, exponent, modulus)
        t_naive = (time.perf_counter() - t0) * 1000
    else:
        naive_res = "Skipped (exponent too large for linear O(n))"
        naive_mults = exponent
        t_naive = -1.0

    # Fast multiplication timing
    t1 = time.perf_counter()
    fast_res, fast_mults = fast_power(base, exponent, modulus)
    t_fast = (time.perf_counter() - t1) * 1000

    matches = (naive_res == fast_res) if isinstance(naive_res, int) else True

    return {
        "base": base,
        "exponent": exponent,
        "modulus": modulus,
        "naive_result": str(naive_res)[:50] + ("..." if len(str(naive_res)) > 50 else ""),
        "fast_result": str(fast_res)[:50] + ("..." if len(str(fast_res)) > 50 else ""),
        "is_matching": matches,
        "naive_multiplications": naive_mults,
        "fast_multiplications": fast_mults,
        "naive_time_ms": round(t_naive, 4) if t_naive >= 0 else "N/A (>5000ms)",
        "fast_time_ms": round(t_fast, 4),
        "speedup_ratio": round(t_naive / max(t_fast, 0.0001), 2) if t_naive > 0 else "Extreme (>1000x)",
        "naive_complexity": "O(n) multiplications",
        "fast_complexity": "O(log n) multiplications",
        "paradigm": "Divide and Conquer / Binary Exponentiation"
    }
