import pytest
from app.algorithms.large_integer.fast_exponentiation import naive_power, fast_power, benchmark_exponentiation
from app.algorithms.large_integer.karatsuba import karatsuba_multiply, benchmark_multiplication
from app.algorithms.matrix.strassen import naive_matrix_mult, strassen_matrix_mult
from app.algorithms.dynamic_programming.lcs import compute_lcs
from app.algorithms.dynamic_programming.matrix_chain import solve_matrix_chain
from app.algorithms.disjoint_set.union_find import DisjointSet
from app.algorithms.recurrence.master_theorem import solve_master_theorem

def test_fast_exponentiation():
    base = 3
    exp = 25
    res_naive, m_naive = naive_power(base, exp)
    res_fast, m_fast = fast_power(base, exp)
    assert res_naive == res_fast == 3**25
    assert m_fast < m_naive  # O(log n) vs O(n)

    bench = benchmark_exponentiation(7, 100, 1000000007)
    assert bench["is_matching"] is True

def test_karatsuba_multiplication():
    a = 1234567890123456
    b = 9876543210987654
    prod, calls = karatsuba_multiply(a, b)
    assert prod == a * b
    assert calls > 1

def test_strassen_matrix_mult():
    A = [
        [1.0, 2.0, 3.0, 4.0],
        [5.0, 6.0, 7.0, 8.0],
        [9.0, 1.0, 2.0, 3.0],
        [4.0, 5.0, 6.0, 7.0]
    ]
    B = [
        [2.0, 0.0, 1.0, 2.0],
        [1.0, 3.0, 2.0, 1.0],
        [0.0, 1.0, 4.0, 3.0],
        [3.0, 2.0, 1.0, 0.0]
    ]
    naive_res, _ = naive_matrix_mult(A, B)
    strassen_res, mults = strassen_matrix_mult(A, B)
    assert mults > 0
    for r in range(4):
        for c in range(4):
            assert abs(naive_res[r][c] - strassen_res[r][c]) < 1e-6

def test_lcs():
    s1 = "GARBA_VIP_PASS"
    s2 = "GARBA_PASS_REGULAR"
    res = compute_lcs(s1, s2)
    assert res["lcs_length"] == len(res["lcs_sequence"])
    assert "GARBA" in res["lcs_sequence"]

def test_matrix_chain():
    # 4 matrices with dimensions 10x20, 20x30, 30x40, 40x30
    dims = [10, 20, 30, 40, 30]
    res = solve_matrix_chain(dims)
    assert res["num_matrices"] == 4
    assert res["optimal_scalar_multiplications"] > 0
    assert "A1" in res["optimal_parenthesization"]

def test_disjoint_set_union():
    dsu = DisjointSet()
    dsu.make_set("ZoneA")
    dsu.make_set("ZoneB")
    dsu.make_set("ZoneC")

    assert dsu.find("ZoneA") == "ZoneA"
    dsu.union("ZoneA", "ZoneB")
    assert dsu.find("ZoneA") == dsu.find("ZoneB")

    dsu.union("ZoneB", "ZoneC")
    assert dsu.find("ZoneA") == dsu.find("ZoneC")
    comps = dsu.get_components()
    assert len(comps) == 1

def test_master_theorem_solver():
    res1 = solve_master_theorem("T(n) = 2T(n/2) + n")
    assert "Θ(n log n)" in res1["asymptotic_complexity"]

    res2 = solve_master_theorem("T(n) = 4T(n/2) + n")
    assert "Θ(n²)" in res2["asymptotic_complexity"] or "n^2" in res2["asymptotic_complexity"]

    res3 = solve_master_theorem("T(n) = T(n-1) + n")
    assert "Θ(n²)" in res3["asymptotic_complexity"]
