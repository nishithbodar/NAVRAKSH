import time
from typing import List, Dict, Any, Tuple

Matrix = List[List[float]]

def _matrix_add(A: Matrix, B: Matrix) -> Matrix:
    return [[A[i][j] + B[i][j] for j in range(len(A[0]))] for i in range(len(A))]

def _matrix_sub(A: Matrix, B: Matrix) -> Matrix:
    return [[A[i][j] - B[i][j] for j in range(len(A[0]))] for i in range(len(A))]

def naive_matrix_mult(A: Matrix, B: Matrix) -> Tuple[Matrix, int]:
    n = len(A)
    C = [[0.0] * n for _ in range(n)]
    multiplications = 0
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
                multiplications += 1
    return C, multiplications

def strassen_matrix_mult(A: Matrix, B: Matrix) -> Tuple[Matrix, int]:
    """
    Manual implementation of Strassen's 7-multiplication Matrix Algorithm.
    Operates on n x n matrices where n is a power of 2 (or pads to power of 2).
    """
    n = len(A)
    mults = 0

    if n <= 2:
        return naive_matrix_mult(A, B)

    # Split into 4 n/2 x n/2 submatrices
    mid = n // 2
    A11 = [row[:mid] for row in A[:mid]]
    A12 = [row[mid:] for row in A[:mid]]
    A21 = [row[:mid] for row in A[mid:]]
    A22 = [row[mid:] for row in A[mid:]]

    B11 = [row[:mid] for row in B[:mid]]
    B12 = [row[mid:] for row in B[:mid]]
    B21 = [row[:mid] for row in B[mid:]]
    B22 = [row[mid:] for row in B[mid:]]

    # Compute 7 Strassen products:
    # M1 = (A11 + A22)(B11 + B22)
    M1, m1 = strassen_matrix_mult(_matrix_add(A11, A22), _matrix_add(B11, B22))
    # M2 = (A21 + A22) B11
    M2, m2 = strassen_matrix_mult(_matrix_add(A21, A22), B11)
    # M3 = A11 (B12 - B22)
    M3, m3 = strassen_matrix_mult(A11, _matrix_sub(B12, B22))
    # M4 = A22 (B21 - B11)
    M4, m4 = strassen_matrix_mult(A22, _matrix_sub(B21, B11))
    # M5 = (A11 + A12) B22
    M5, m5 = strassen_matrix_mult(_matrix_add(A11, A12), B22)
    # M6 = (A21 - A11)(B11 + B12)
    M6, m6 = strassen_matrix_mult(_matrix_sub(A21, A11), _matrix_add(B11, B12))
    # M7 = (A12 - A22)(B21 + B22)
    M7, m7 = strassen_matrix_mult(_matrix_sub(A12, A22), _matrix_add(B21, B22))

    mults += m1 + m2 + m3 + m4 + m5 + m6 + m7

    # Combine results
    # C11 = M1 + M4 - M5 + M7
    C11 = _matrix_add(_matrix_sub(_matrix_add(M1, M4), M5), M7)
    # C12 = M3 + M5
    C12 = _matrix_add(M3, M5)
    # C21 = M2 + M4
    C21 = _matrix_add(M2, M4)
    # C22 = M1 - M2 + M3 + M6
    C22 = _matrix_add(_matrix_add(_matrix_sub(M1, M2), M3), M6)

    # Reassemble C
    C = []
    for i in range(mid):
        C.append(C11[i] + C12[i])
    for i in range(mid):
        C.append(C21[i] + C22[i])

    return C, mults
