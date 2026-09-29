from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_list_bookings():
    response = client.get("/api/bookings")
    assert response.status_code == 200
    res = response.json()
    assert res["success"] is True
    assert isinstance(res["data"], list)

def test_create_and_cancel_booking():
    # 1. Create booking
    payload = {
        "customer_id": 1,
        "event_id": 1,
        "pass_type_id": 5,
        "quantity": 2,
        "payment_method": "UPI"
    }
    response = client.post("/api/bookings", json=payload)
    assert response.status_code == 200
    res = response.json()
    booking_id = res["data"]["id"]
    assert res["data"]["booking_status"] == "CONFIRMED"
    assert len(res["data"]["qr_passes"]) == 2

    # 2. Cancel booking
    cancel_res = client.post(f"/api/bookings/{booking_id}/cancel")
    assert cancel_res.status_code == 200
    assert cancel_res.json()["data"]["booking_status"] == "CANCELLED"
