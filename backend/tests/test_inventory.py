from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_inventory_allocation_dp():
    payload = {
        "event_id": 1,
        "algorithm": "DYNAMIC_PROGRAMMING",
        "total_passes": 10000,
        "alpha_weight": 0.75,
        "beta_demand_fill": 0.85,
        "gamma_gini": 0.65
    }
    response = client.post("/api/inventory/allocate", json=payload)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["total_allocated"] <= 10000
    assert "allocations" in data

def test_inventory_allocation_greedy():
    payload = {
        "event_id": 1,
        "algorithm": "GREEDY",
        "total_passes": 8000
    }
    response = client.post("/api/inventory/allocate", json=payload)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["algorithm"] == "Greedy Heuristic"
