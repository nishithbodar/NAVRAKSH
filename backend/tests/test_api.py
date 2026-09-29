from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "NAVRAKSH Backend"

def test_dashboard_summary():
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    res = response.json()
    assert res["success"] is True
    assert "total_passes" in res["data"]
    assert "total_revenue" in res["data"]

def test_karatsuba_api():
    response = client.post("/api/algorithms/karatsuba", json={"number_a": 12345678, "number_b": 87654321})
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["is_matching"] is True

def test_master_theorem_api():
    response = client.post("/api/complexity/analyze", json={"expression": "T(n) = 2T(n/2) + n"})
    assert response.status_code == 200
    data = response.json()["data"]
    assert "Θ(n log n)" in data["asymptotic_complexity"]

def test_qr_verify_api():
    response = client.post("/api/qr/verify", json={"qr_token": "0x99F4A7C1", "gate_id": "Gate 01"})
    assert response.status_code == 200
    assert response.json()["success"] is True
