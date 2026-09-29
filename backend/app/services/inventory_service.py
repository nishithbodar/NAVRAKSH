import time
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.seller import Seller
from app.models.event import Event
from app.algorithms.dynamic_programming.knapsack import solve_bounded_knapsack
from app.algorithms.greedy.inventory_allocation import greedy_inventory_allocation
from app.algorithms.branch_bound.allocation import branch_and_bound_allocation

class InventoryService:
    @staticmethod
    def allocate_inventory(
        db: Session,
        event_id: int,
        algorithm: str = "DYNAMIC_PROGRAMMING",
        total_passes: int = 10000,
        alpha_weight: float = 0.75,
        beta_demand_fill: float = 0.85,
        gamma_gini: float = 0.65
    ) -> Dict[str, Any]:
        event = db.query(Event).filter(Event.id == event_id).first()
        sellers = db.query(Seller).all()

        if not sellers:
            # Fallback mock sellers for algorithm demonstration
            seller_data = [
                {"id": 1, "name": "Seller A (Karnavati Garba Hub)", "true_demand": 3200, "current_quota": 2000, "exp_price": 700},
                {"id": 2, "name": "Seller B (Sarkhej Youth Club)", "true_demand": 2800, "current_quota": 2000, "exp_price": 700},
                {"id": 3, "name": "Seller C (Navrangpura Agency)", "true_demand": 2100, "current_quota": 2000, "exp_price": 700},
                {"id": 4, "name": "Seller D (Maninagar Pass Desk)", "true_demand": 1500, "current_quota": 1800, "exp_price": 700},
                {"id": 5, "name": "Seller E (Bopal Online Outlet)", "true_demand": 1200, "current_quota": 1200, "exp_price": 700},
                {"id": 6, "name": "Seller F (Vastrapur Campus Booth)", "true_demand": 900, "current_quota": 1000, "exp_price": 700},
            ]
        else:
            seller_data = [
                {
                    "id": s.id,
                    "name": s.name,
                    "true_demand": s.true_demand,
                    "current_quota": s.allocated_quota,
                    "exp_price": 700
                }
                for s in sellers
            ]

        t0 = time.perf_counter()

        algo_upper = algorithm.upper()
        if "GREEDY" in algo_upper:
            res = greedy_inventory_allocation(total_passes, seller_data)
        elif "BRANCH" in algo_upper:
            res = branch_and_bound_allocation(total_passes, seller_data)
        else:
            # Dynamic Programming Bounded Knapsack
            weights = [s["true_demand"] for s in seller_data]
            values = [s["true_demand"] * s["exp_price"] for s in seller_data]
            min_bounds = [int(s["true_demand"] * 0.4) for s in seller_data]
            max_bounds = [s["true_demand"] for s in seller_data]
            labels = [s["name"] for s in seller_data]

            res = solve_bounded_knapsack(
                capacity=total_passes,
                weights=weights,
                values=values,
                min_bounds=min_bounds,
                max_bounds=max_bounds,
                labels=labels
            )

        exec_time_ms = round((time.perf_counter() - t0) * 1000, 4)
        res["execution_time_ms"] = exec_time_ms
        res["event_name"] = event.name if event else "Navratri Mahotsav 2026"
        return res
