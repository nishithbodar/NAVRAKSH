from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_auth_login():
    response = client.post("/api/auth/login", json={"username": "admin", "password": "Admin@12345"})
    assert response.status_code == 200
    data = response.json()["data"]
    assert "access_token" in data
    assert data["role"] == "ADMIN"

def test_auth_invalid_login():
    response = client.post("/api/auth/login", json={"username": "admin", "password": "WrongPassword"})
    assert response.status_code == 401
