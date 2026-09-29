import uvicorn
import os
import sys

# Ensure current backend directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    port = int(os.getenv("BACKEND_PORT", "8001"))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"[*] Starting NAVRAKSH Backend on {host}:{port}...")
    uvicorn.run("app.main:app", host=host, port=port, reload=False)
