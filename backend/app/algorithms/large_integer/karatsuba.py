import time
from typing import Dict, Any, Tuple

def karatsuba_multiply(x: int, y: int) -> Tuple[int, int]:
    """
    Manual implementation of Karatsuba Fast Multiplication.
    Recursively divides n-digit numbers into high and low halves:
    xy = 10^2m ac + 10^m (ad + bc) + bd
    where (ad + bc) = (a + b)(c + d) - ac - bd
    Returns (product, recursive_calls_count).
    """
    calls = 1
    # Base case for small numbers
    if x < 10 or y < 10:
        return x * y, calls

    # Calculate size of numbers
    n = max(len(str(x)), len(str(y)))
    m = n // 2

    # Split numbers into high and low halves
    high1, low1 = divmod(x, 10**m)
    high2, low2 = divmod(y, 10**m)

    # 3 recursive multiplications
    z0, c0 = karatsuba_multiply(low1, low2)
    z2, c2 = karatsuba_multiply(high1, high2)
    z1, c1 = karatsuba_multiply(low1 + high1, low2 + high2)

    calls += c0 + c1 + c2
    result = (z2 * 10**(2 * m)) + ((z1 - z2 - z0) * 10**m) + z0
    return result, calls

def benchmark_multiplication(num_a: int, num_b: int) -> Dict[str, Any]:
    # Traditional multiplication timing
    t0 = time.perf_counter()
    trad_res = num_a * num_b
    t_trad = (time.perf_counter() - t0) * 1000

    # Karatsuba multiplication timing
    t1 = time.perf_counter()
    karat_res, recursive_calls = karatsuba_multiply(num_a, num_b)
    t_karat = (time.perf_counter() - t1) * 1000

    return {
        "number_a_digits": len(str(num_a)),
        "number_b_digits": len(str(num_b)),
        "traditional_result": str(trad_res),
        "karatsuba_result": str(karat_res),
        "is_matching": trad_res == karat_res,
        "traditional_time_ms": round(t_trad, 4),
        "karatsuba_time_ms": round(t_karat, 4),
        "karatsuba_recursive_calls": recursive_calls,
        "traditional_complexity": "O(n²)",
        "karatsuba_complexity": "O(n^log₂3) ≈ O(n^1.585)"
    }
