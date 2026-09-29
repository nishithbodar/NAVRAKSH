import time
from typing import Callable, Any, Tuple

def measure_execution_time(func: Callable, *args, **kwargs) -> Tuple[Any, float]:
    """
    Measures CPU execution time of an algorithm in milliseconds using time.perf_counter().
    """
    start_time = time.perf_counter()
    result = func(*args, **kwargs)
    end_time = time.perf_counter()
    execution_time_ms = round((end_time - start_time) * 1000, 4)
    return result, execution_time_ms
