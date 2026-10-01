# NAVRAKSH — Intelligent Navratri Pass Management & Sales Optimization System
**B.Tech Semester 5 Design and Analysis of Algorithms (DAA) Innovative Project**

---

## 1. Project Overview
**NAVRAKSH** is an algorithmic platform designed for Ahmedabad's premier 9-night Navratri festival. Rather than presenting algorithms as abstract textbook exercises, NAVRAKSH demonstrates **real-world algorithmic formulations, exact execution-time profiling, empirical operation counts, and theoretical complexity analyses** applied directly to festival pass inventory allocation, troupe group bookings, gate turnstile security, and arena scheduling.

Every algorithm in NAVRAKSH actually executes, measures its own execution time using high-resolution hardware counters (`time.perf_counter()`), tracks actual state evaluations and node prunings, and provides strict mathematical justification for optimality.

---

## 2. Problem Statement
Managing a massive multi-venue Navratri festival involves complex computational challenges:
1. **Pass Inventory Allocation (NP-Hard / Bounded Knapsack)**: Distributing ticket quotas among regional partner outlets with distinct demands, pricing, and minimum reservation requirements to maximize festival revenue without violating venue capacity limits.
2. **Troupe & Group Booking Optimization**: Accommodating delegations and dance troupes within strict budgets and group size constraints across multiple pass tiers.
3. **Turnstile Gate Verification & Replay Protection**: Verifying QR cryptographic tokens in $O(1)$ average time while indexing pass holders in guaranteed $O(\log n)$ balanced structures.
4. **Arena Rehearsal & Sound Curfew Scheduling**: Detecting temporal overlaps and sound curfew violations across multiple arenas in $O(\log n + k)$ time using augmented interval trees.

---

## 3. Four Core Applications
- **CORE 1: Intelligent Pass Inventory Allocation**: Compares Bounded Knapsack Dynamic Programming, Branch and Bound, and Greedy heuristics.
- **CORE 2: Group Booking Optimization**: Live 4-paradigm solver executing Greedy, Dynamic Programming ($DP[p][b]$), Branch & Bound (with linear relaxation bounds), and Recursive Backtracking.
- **CORE 3: Pass Search & QR Verification**: Separates persistent database storage from in-memory DAA indexing (Open-Addressing Hash Table vs Red-Black Tree vs Binary Search vs Linear Search).
- **CORE 4: Venue Conflict & Sound Curfew Detection**: Augmented Interval Tree detecting half-open $[\text{start}, \text{end})$ time overlaps across specific venues and dates.

---

## 4. DAA Algorithm Labs & Interactive Modules
In addition to the operational Navratri management interfaces, NAVRAKSH includes dedicated academic DAA exploration labs:
1. **Algorithm Benchmark Lab**: Empirical scaling benchmarks across Sorting, Searching, Greedy, DP, Backtracking, Branch & Bound, Heaps, and Divide & Conquer for $N \in [100, 50000]$.
2. **Complexity & Recurrence Analyzer**: Interactive parser for Master Method ($T(n) = aT(n/b) + f(n)$) and Telescoping Decrements ($T(n) = T(n-1) + f(n)$).
3. **Divide & Conquer Suite**: Karatsuba Large Integer Multiplication ($O(n^{1.585})$), Strassen Matrix Multiplication ($O(n^{2.807})$), Fast Binary Exponentiation ($O(\log n)$), and Merge Sort.
4. **Priority Heap Comparison**: Direct empirical profiling of Binary Heap, Binomial Heap, and Fibonacci Heap ($O(1)$ amortized insert/merge).
5. **Top-K Sales Intelligence**: Comparison between Full Sorting ($O(n \log n)$), Min-Heap ($O(n \log k)$), Quickselect ($O(n)$ average), and Median of Medians ($O(n)$ guaranteed worst-case).
6. **Festival Zone DSU Visualizer**: Dynamic connectivity with Union by Rank and Path Compression ($O(\alpha(n))$).
7. **Exact vs Approximate Optimization (NP Demo)**: Demonstrates combinatorial explosion ($2^n$ state growth) versus polynomial-time greedy approximation.

---

## 5. Algorithmic Complexity Reference Table

| Algorithm | Paradigm | Time Complexity (Best/Avg/Worst) | Space Complexity | Optimality Guarantee |
| :--- | :--- | :--- | :--- | :--- |
| **Bounded Knapsack** | Dynamic Programming | $\Theta(n \cdot W \cdot M)$ | $O(n \cdot W)$ | **Global Optimal** (Bellman's Principle) |
| **Group Booking DP** | Dynamic Programming | $\Theta(m \cdot p \cdot b)$ | $O(p \cdot b)$ | **Global Optimal** over discrete state space |
| **Branch and Bound** | Pruned State Space | $O(d)$ avg / $O(b^d)$ worst | $O(d)$ | **Global Optimal** (Admissible Relaxation) |
| **Recursive Backtracking** | Exhaustive / Pruned | $O(b^d)$ | $O(d)$ stack | **Optimal** if search limit not reached |
| **Ratio-Based Greedy** | Greedy Heuristic | $O(n \log n)$ | $O(n)$ | **Heuristic Only** (No knapsack guarantee) |
| **Red-Black Tree** | Balanced BST | $O(\log n)$ guaranteed | $O(n)$ | Balanced invariant strictly verified |
| **Interval Tree** | Augmented Tree | $O(\log n + k)$ | $O(n)$ | Geometric half-open overlap |
| **Binary Heap** | Array Priority Queue | $O(\log n)$ insert / extract | $O(n)$ | Complete binary tree invariant |
| **Fibonacci Heap** | Amortized Heap | $O(1)$ insert, $O(\log n)$ extract | $O(n)$ | Lazy consolidation |
| **Quickselect** | Order Statistics | $O(n)$ avg / $O(n^2)$ worst | $O(1)$ in-place | Expected linear selection |
| **Median of Medians** | Deterministic Selection | $O(n)$ worst-case | $O(\log n)$ | Strict worst-case linear selection |
| **Karatsuba** | Divide & Conquer | $O(n^{\log_2 3}) \approx O(n^{1.585})$ | $O(n)$ | Exact integer product |
| **Strassen** | Divide & Conquer | $O(n^{\log_2 7}) \approx O(n^{2.807})$ | $O(n^2)$ | Sub-cubic matrix multiplication |
| **Fast Exponentiation** | Divide & Conquer | $O(\log n)$ multiplications | $O(1)$ | Exact power by squaring |
| **Disjoint Set (DSU)** | Graph Connectivity | $O(\alpha(n))$ | $O(n)$ | Path compression + Union by rank |

---

## 6. Two-Person Project Team Division (Viva Guide)

### Member 1: Optimization & Algorithmic Paradigms
- **Greedy Heuristics**: Value-to-price ratio allocation, fractional knapsack.
- **Dynamic Programming**: Bounded Knapsack, 2D Group Booking, LCS ticket diff, Matrix Chain multiplication.
- **Branch and Bound**: Linear relaxation upper bound calculation, subtree pruning.
- **Backtracking**: Feasible combination search, state restoration.
- **Divide and Conquer**: Karatsuba integer multiplication, Strassen matrix multiplication, Fast Exponentiation by squaring, Merge Sort.
- **Complexity Analyzer**: Master Theorem case classification and recursion tree depth analysis.

### Member 2: Data Structures & Real-Time Operations
- **Red-Black Tree**: Insertion fixup, left/right rotations, recoloring, black-height invariance.
- **Augmented Interval Tree**: Half-open $[\text{start}, \text{end})$ conflict detection, venue curfew tracking.
- **Priority Heaps**: Binary Heap, Binomial Heap (logarithmic merge), Fibonacci Heap (lazy constant-time merge).
- **Disjoint Set Union (DSU)**: Union by Rank, Path Compression, festival security clusters.
- **Hashing & Order Statistics**: Open-addressing hash table with collision probes, Hoare's Quickselect, Deterministic Median of Medians.
- **Real-Time Verification**: QR cryptographic hash verification and duplicate replay prevention.

---

## 7. How to Run the Project

### Prerequisites
- Node.js (v18+)
- Python (3.11+)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Run the FastAPI server:
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend Setup
```bash
# In the workspace root:
npm install
npm run dev
```

### Running Backend DAA Unit Tests
```bash
# Run all 30 algorithmic test suites:
PYTHONPATH=. pytest backend/tests -v
```
All tests verify invariant properties, optimality against brute-force baselines on small instances, and correct complexity tracking.
