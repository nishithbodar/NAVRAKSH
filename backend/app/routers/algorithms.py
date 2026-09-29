from fastapi import APIRouter
from app.services.algorithm_service import AlgorithmService
from app.schemas.algorithm import RbtInsertRequest, KaratsubaRequest, StrassenRequest
from app.algorithms.large_integer.karatsuba import benchmark_multiplication
from app.algorithms.matrix.strassen import strassen_matrix_mult, naive_matrix_mult
from app.algorithms.dynamic_programming.matrix_chain import solve_matrix_chain
from app.algorithms.dynamic_programming.lcs import compute_lcs
from app.utils.response import success_response
import time

router = APIRouter(prefix="/algorithms", tags=["Algorithms Lab"])

# Red-Black Tree Endpoints
@router.post("/rbt/insert", response_model=dict)
def insert_rbt(req: RbtInsertRequest):
    res = AlgorithmService.insert_rbt_key(req.key, {
        "holder": req.holder,
        "passType": req.pass_type,
        "night": req.night,
        "gate": req.gate
    })
    return success_response(data=res, message=f"Node {req.key} inserted with RB-Insert-Fixup")

@router.get("/rbt/search/{key}", response_model=dict)
def search_rbt(key: int):
    res = AlgorithmService.search_rbt_key(key)
    return success_response(data=res)

@router.get("/rbt/traversal", response_model=dict)
def traverse_rbt():
    state = AlgorithmService.get_rbt_state()
    return success_response(data=state)

# Large Integer Multiplication (Karatsuba)
@router.post("/karatsuba", response_model=dict)
def run_karatsuba(req: KaratsubaRequest):
    res = benchmark_multiplication(req.number_a, req.number_b)
    return success_response(data=res)

# Strassen Matrix Multiplication
@router.post("/strassen", response_model=dict)
def run_strassen(req: StrassenRequest):
    A = req.matrix_a
    B = req.matrix_b

    t0 = time.perf_counter()
    naive_res, naive_mults = naive_matrix_mult(A, B)
    t_naive = (time.perf_counter() - t0) * 1000

    t1 = time.perf_counter()
    strassen_res, strassen_mults = strassen_matrix_mult(A, B)
    t_strassen = (time.perf_counter() - t1) * 1000

    return success_response(data={
        "matrix_size": f"{len(A)}x{len(A)}",
        "strassen_result": strassen_res,
        "naive_multiplications": naive_mults,
        "strassen_multiplications": strassen_mults,
        "naive_time_ms": round(t_naive, 4),
        "strassen_time_ms": round(t_strassen, 4),
        "naive_complexity": "O(n³)",
        "strassen_complexity": "O(n^log₂7) ≈ O(n^2.807)"
    })

# Matrix Chain Multiplication
@router.post("/matrix-chain", response_model=dict)
def run_matrix_chain(dimensions: list[int]):
    res = solve_matrix_chain(dimensions)
    return success_response(data=res)

# Longest Common Subsequence
@router.post("/lcs", response_model=dict)
def run_lcs(string_a: str, string_b: str):
    res = compute_lcs(string_a, string_b)
    return success_response(data=res)
