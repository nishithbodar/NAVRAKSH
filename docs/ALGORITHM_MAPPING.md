# NAVRAKSH — Comprehensive DAA Algorithm Mapping

This document provides a systematic mapping of all Design and Analysis of Algorithms (DAA) topics implemented in **NAVRAKSH (Intelligent Navratri Pass Management & Sales Optimization System)**.

---

## 1. Primary DAA Algorithm Mapping Table

| DAA Topic | Algorithm Implemented | NAVRAKSH Feature | Time Complexity | Space Complexity | Why It Is Appropriate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dynamic Programming** | Bounded Knapsack with Memoization | Pass Inventory Quota Allocation | $O(n \cdot W \cdot M)$ | $O(n \cdot W)$ | Solves the multi-seller bounded capacity problem with minimum reservation quotas and maximum demands; guarantees provable global revenue maximization. |
| **Dynamic Programming** | 2D Recurrence $DP[p][b]$ | Group / Troupe Booking Optimizer | $O(m \cdot p \cdot b)$ | $O(p \cdot b)$ | Accommodates exactly $p$ troupe members within budget $b$ while maximizing priority value across multi-tiered festival passes. |
| **Dynamic Programming** | Longest Common Subsequence (LCS) | Booking Audit & Ticket Diff Verification | $O(m \cdot n)$ | $O(m \cdot n)$ | Identifies altered, re-ordered, or fraudulent pass sequence amendments between initial reservation and final turnstile checkout. |
| **Dynamic Programming** | Matrix Chain Multiplication | Multi-Stage Analytics Pipeline Optimization | $O(n^3)$ | $O(n^2)$ | Minimizes scalar multiplication operations across chained matrix transformations for festival analytics. |
| **Branch and Bound** | Best-First Search with Linear Relaxation Upper Bound | Constrained Inventory Allocation & Troupe Booking | $O(b^d)$ worst, pruned $O(d)$ avg | $O(d)$ | Prunes subtrees where upper bound cannot exceed incumbent solution, proving global optimality with minimal state exploration. |
| **Backtracking** | State Restoration with Feasibility Pruning | Combinatorial Group Pass Allocation | $O(m \cdot k^n)$ pruned | $O(n)$ recursion stack | Explores discrete pass combinations; supports undo operations and bounds checking to satisfy strict attendee constraints. |
| **Greedy Heuristics** | Marginal Value-to-Price Ratio Sort | Real-Time Fast Quota Rebalancer | $O(n \log n)$ | $O(n)$ | Fast sub-millisecond heuristic for instant allocation adjustments under dynamic festival ticket demand. |
| **Balanced Search Trees** | Red-Black Tree (Self-Balancing BST) | Pass Master Index & Fast Lookups | $O(\log n)$ guaranteed | $O(n)$ | Strictly maintains black-height invariant and avoids red-red conflicts via rotations, guaranteeing worst-case $O(\log n)$ lookup. |
| **Augmented Trees** | Augmented Interval Tree ($[\text{low}, \text{high})$ half-open) | Festival Hall & Sound Curfew Conflict Detection | $O(\log n + k)$ | $O(n)$ | Detects overlapping arena rehearsal and sound schedule conflicts across 6 festival arenas with curfew decibel checks. |
| **Priority Queues / Heaps** | Binary Heap (Min/Max) | Fast Turnstile Priority Dispatch | $O(\log n)$ insert / extract | $O(n)$ flat array | Cache-friendly array representation for rapid dispatching of regular turnstile queues. |
| **Advanced Heaps** | Binomial Heap | Multi-Gate Queue Merging | $O(\log n)$ merge & extract | $O(n)$ pointer tree | Allows logarithmic time merging of queues when turnstile load is redistributed across festival gates. |
| **Advanced Heaps** | Fibonacci Heap | High-Throughput VIP Dispatch Queue | $O(1)$ amortized insert/merge, $O(\log n)$ extract | $O(n)$ cyclic lists | Minimizes latency for massive batch insertion of VIP and troupe waiver requests. |
| **Disjoint Set Union (DSU)** | Union by Rank + Path Compression | Festival Security Zone & Corridor Connectivity | $O(\alpha(n))$ near-constant | $O(n)$ | Instantly checks if two festival arenas or turnstile gates are connected in the same security cluster. |
| **Hashing** | Open-Addressing with Robin Hood / Linear Probing | Zero-Latency Gate QR Verification | $O(1)$ average, $O(n)$ worst-case | $O(n)$ | Constant-time token lookup with cryptographic signature check, replay attack prevention, and collision tracking. |
| **Order Statistics** | Hoare's Quickselect | Rapid Top-K Sales Intelligence | $O(n)$ average, $O(n^2)$ worst-case | $O(1)$ in-place | Rapidly locates the $k$-th highest seller or customer without sorting the entire dataset. |
| **Order Statistics** | Median of Medians (BFPRT) | Deterministic Top-K Sales Intelligence | $O(n)$ guaranteed worst-case | $O(\log n)$ stack | Guarantees strictly linear $O(n)$ worst-case selection regardless of input distribution. |
| **Divide and Conquer** | Merge Sort | Stable Attendee & Pass Sorting | $O(n \log n)$ guaranteed | $O(n)$ | Stable sorting for attendee lists preserving original order of identical timestamps. |
| **Divide and Conquer** | Randomized In-Place Quick Sort | High-Speed Ticket Transaction Sorting | $O(n \log n)$ average | $O(\log n)$ stack | In-place partition sort minimizing memory overhead during large batch ticket sorting. |
| **Divide and Conquer** | Karatsuba Fast Multiplication | Arbitrary Precision Cryptographic Arithmetic | $O(n^{\log_2 3}) \approx O(n^{1.585})$ | $O(n)$ | Multiplies large security tokens and ticket hashes with 3 recursive multiplications instead of 4. |
| **Divide and Conquer** | Strassen Matrix Multiplication | High-Dimensional Arena Analytics | $O(n^{\log_2 7}) \approx O(n^{2.807})$ | $O(n^2)$ | Sub-cubic matrix multiplication using 7 recursive block multiplications. |
| **Divide and Conquer** | Binary Exponentiation (Squaring) | Fast Modular Cryptographic Exponentiation | $O(\log n)$ multiplications | $O(1)$ | Multiplies powers by repeated squaring for turnstile cryptographic verification tokens. |
| **Recurrence Analysis** | Master Method & Telescoping Parser | Algorithm Complexity Profiler | $O(1)$ analysis time | $O(1)$ | Parses recurrences ($T(n) = aT(n/b) + f(n)$ and $T(n) = T(n-1) + f(n)$) to classify Master Theorem cases and recursion tree work. |

---

## 2. 2-Person Team Division for Viva

### Member 1: Optimization, Paradigms & Divide-and-Conquer
- **Topics**: Dynamic Programming (Bounded Knapsack, Group Booking, LCS, Matrix Chain), Branch and Bound, Recursive Backtracking, Greedy Heuristics, Divide & Conquer (Merge Sort, Quick Sort, Karatsuba, Strassen, Fast Exponentiation), Master Method & Recurrence Analyzer, Exact vs Approximation (NP Demo).
- **Core Files**:
  - `backend/app/algorithms/dynamic_programming/`
  - `backend/app/algorithms/branch_bound/`
  - `backend/app/algorithms/backtracking/`
  - `backend/app/algorithms/greedy/`
  - `backend/app/algorithms/large_integer/`
  - `backend/app/algorithms/matrix/`
  - `backend/app/algorithms/recurrence/`
  - `backend/app/services/algorithm_benchmark_service.py`

### Member 2: Data Structures, Search & Real-Time Operations
- **Topics**: Red-Black Tree, Augmented Interval Tree, Binary Heap, Binomial Heap, Fibonacci Heap, Disjoint Set Union (DSU), Open-Addressing Hash Index, QR Verification, Order Statistics (Quickselect, Median of Medians), Schedule Conflict Detection.
- **Core Files**:
  - `backend/app/algorithms/trees/red_black_tree.py`
  - `backend/app/algorithms/trees/interval_tree.py`
  - `backend/app/algorithms/heaps/`
  - `backend/app/algorithms/disjoint_set/`
  - `backend/app/algorithms/hashing/`
  - `backend/app/algorithms/searching/`
  - `backend/app/services/qr_service.py`
  - `backend/app/services/conflict_service.py`
