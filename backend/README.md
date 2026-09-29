# NAVRAKSH — Intelligent Navratri Pass Management & Sales Optimization

> *"From Pass Sale to Gate Entry — Every Decision Powered by Algorithms."*

NAVRAKSH is a production-grade, algorithmic event management backend designed for high-density Indian festival operations. Built specifically to demonstrate Design and Analysis of Algorithms (DAA) in real-world scenarios, every operational decision—from multi-seller inventory partitioning to millisecond turnstile anti-counterfeit verification—is powered by actual, measured algorithm implementations.

---

## 1. System Architecture

```
backend/
├── app/
│   ├── main.py                     # FastAPI application entry point, CORS & lifecycle hooks
│   ├── core/
│   │   ├── config.py               # Pydantic environment configuration & settings
│   │   ├── database.py             # SQLAlchemy session manager & MySQL/SQLite connector
│   │   ├── security.py             # JWT token handling & bcrypt password hashing
│   │   └── exceptions.py           # Standardized business exception hierarchy
│   ├── models/                     # SQLAlchemy relational models
│   │   ├── user.py                 # Users & RBAC (ADMIN, SELLER, OPERATOR)
│   │   ├── customer.py             # Attendee & customer registry
│   │   ├── seller.py               # Authorized distribution partners
│   │   ├── venue.py                # Festival venue grounds & zones
│   │   ├── event.py                # Navratri night events & capacities
│   │   ├── pass_type.py            # VIP, Diamond, Platinum, Gold, General tiers
│   │   ├── inventory.py            # Event-to-seller quota tracking
│   │   ├── booking.py              # Booking transactions with atomic safety
│   │   ├── transaction.py          # Payment records & references
│   │   ├── qr_pass.py              # QR tokens & RFID wristband bindings
│   │   ├── fraud_record.py         # Forensic replay-attack & breach logs
│   │   └── algorithm_execution.py  # Historical benchmark telemetry
│   ├── schemas/                    # Pydantic request/response validation schemas
│   ├── routers/                    # Layered API endpoints
│   │   ├── auth.py                 # Registration & JWT login
│   │   ├── dashboard.py            # Live summary stats, daily sales, gate status
│   │   ├── bookings.py             # Atomic booking creation & cancellations
│   │   ├── inventory.py            # Pass quota allocation & tracking
│   │   ├── events.py               # Festival schedule & capacity listing
│   │   ├── sellers.py              # Distribution partners
│   │   ├── customers.py            # Customer registry
│   │   ├── qr.py                   # O(1) hash turnstile verification & duplicate check
│   │   ├── fraud.py                # Rule-based fraud risk evaluator
│   │   ├── allocation.py           # Knapsack simulation deck endpoints
│   │   ├── group_booking.py        # Multi-paradigm group optimizer
│   │   ├── conflicts.py            # Interval Tree sound curfew & overlap checker
│   │   ├── algorithms.py           # RBT, Karatsuba, Strassen, Matrix Chain, LCS
│   │   ├── visualizer.py           # Intermediate states for RBT, Heaps, DSU
│   │   ├── benchmark.py            # Benchmark execution engine & historical telemetry
│   │   ├── complexity.py           # Master Theorem recurrence analyzer
│   │   ├── analytics.py            # Top-K sellers/events (Quickselect, Heaps, Median)
│   │   └── reports.py              # CSV export download for managers
│   ├── services/                   # Business logic layer
│   ├── algorithms/                 # Real, manual DAA algorithm implementations
│   │   ├── trees/                  # Red-Black Tree, Interval Tree
│   │   ├── heaps/                  # Binary Heap, Binomial Heap, Fibonacci Heap
│   │   ├── disjoint_set/           # Union-Find with path compression
│   │   ├── dynamic_programming/    # Bounded Knapsack, LCS, Matrix Chain, Group Booking
│   │   ├── greedy/                 # Fractional Knapsack, Activity Selection, Greedy Alloc
│   │   ├── branch_bound/           # Bounded Allocation with linear relaxation
│   │   ├── backtracking/           # Combinations with search pruning
│   │   ├── sorting/                # Quick Sort, Merge Sort (counted comparisons)
│   │   ├── searching/              # Quickselect, Median of Medians, Binary Search
│   │   ├── large_integer/          # Karatsuba Fast Multiplication
│   │   ├── matrix/                 # Strassen Matrix Multiplication
│   │   ├── recurrence/             # Master Theorem Solver
│   │   └── hashing/                # Open-Addressing Robin Hood Hash Table
│   ├── seed/
│   │   └── seed_database.py        # Database seeder with realistic Navratri operational data
│   └── utils/
│       ├── benchmark.py            # Precise CPU timing via time.perf_counter()
│       └── response.py             # Consistent JSON envelopes
├── tests/                          # Pytest suite for algorithms & APIs
├── requirements.txt
├── .env.example
├── README.md
└── run.py
```

---

## 2. Tech Stack

- **Runtime**: Python 3.10+ / 3.11+
- **Framework**: FastAPI + Uvicorn
- **ORM**: SQLAlchemy 2.0
- **Database**: MySQL (PyMySQL) with automatic local SQLite fallback for testing environments
- **Security**: JWT (`python-jose`) + bcrypt password hashing (`passlib`)
- **Validation**: Pydantic v2
- **Testing**: `pytest`, `httpx` (FastAPI TestClient)

---

## 3. Installation & Setup

### A. Clone and Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### B. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```
Edit `.env` to configure your MySQL connection:
```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/navraksh_db
SQLITE_FALLBACK=true
SECRET_KEY=your_secret_jwt_key_here
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### C. MySQL Setup
In your MySQL shell:
```sql
CREATE DATABASE navraksh_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### D. Seed the Database
Populates admin/operator users, venues, events, sellers, pass types, and active bookings:
```bash
python -m app.seed.seed_database
```

### E. Run the Backend
```bash
python run.py
# or
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 4. API Documentation

Interactive Swagger documentation is available at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI Schema**: `http://localhost:8000/openapi.json`

---

## 5. DAA Algorithms & Complexity Reference

| Module | Data Structure / Algorithm | Real-World Navratri Application | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Pass Index** | **Red-Black Tree** | Canonical pass directory & self-balancing search | $O(\log n)$ | $O(n)$ |
| **Curfew Check** | **Interval Tree** | Venue time conflict & sound curfew detection | $O(\min(n, k \log n))$ | $O(n)$ |
| **Gate Security** | **Open-Addressing Hash** | Instant turnstile scan & replay-attack block | $O(1)$ average | $O(N)$ |
| **Surge Priority** | **Binary Heap** | Top-K VIP rush-hour pass queue | $O(\log n)$ | $O(n)$ |
| **Bulk Merging** | **Binomial & Fibonacci Heap** | Corporate bulk pass consolidation | $O(1)$ amortized | $O(n)$ |
| **Zone Clusters** | **Disjoint Set (Union-Find)**| Garba circle & venue zone clustering | $\alpha(n) \approx O(1)$ | $O(n)$ |
| **Pass Optimizer**| **Bounded Knapsack DP** | Multi-seller revenue maximization with quotas | $O(n \cdot W)$ | $O(W)$ |
| **Group Booking** | **Branch & Bound** | Constrained group booking with bounds pruning | $O(2^n)$ pruned | $O(n)$ |
| **Top Sellers** | **Quickselect & Median-of-Medians** | Linear-time rank selection | $O(n)$ worst-case | $O(1)$ |
| **Big Numbers** | **Karatsuba Fast Multiply** | High-precision financial reconciliation | $O(n^{\log_2 3}) \approx O(n^{1.585})$ | $O(n)$ |
| **Venue Matrix** | **Strassen Algorithm** | Cross-gate crowd transition projection | $O(n^{\log_2 7}) \approx O(n^{2.807})$ | $O(n^2)$ |
| **Complexity** | **Master Theorem Solver** | Asymptotic analysis for divide-and-conquer | $O(1)$ parsing | $O(1)$ |

---

## 6. Running Tests

Run the complete test suite:
```bash
pytest -v
```

All algorithms and API endpoints are tested:
- `test_red_black_tree.py`
- `test_interval_tree.py`
- `test_heaps.py`
- `test_knapsack.py`
- `test_group_booking.py`
- `test_sorting.py`
- `test_top_k.py`
- `test_auth.py`
- `test_bookings.py`
- `test_inventory.py`
- `test_api.py`

---

## 7. Connecting to the React Frontend

The existing React frontend connects seamlessly to the backend API:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```
All routes (`/api/dashboard/summary`, `/api/inventory/allocate`, `/api/qr/verify`, `/api/visualizer/rbt`, etc.) return consistent JSON envelopes:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```
Manager CSV downloads are available at:
`GET /api/reports/export-csv`
