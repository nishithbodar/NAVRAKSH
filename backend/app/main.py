import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.seed.seed_database import seed_all

from app.routers import (
    auth,
    dashboard,
    bookings,
    inventory,
    events,
    sellers,
    customers,
    qr,
    fraud,
    allocation,
    group_booking,
    conflicts,
    algorithms,
    visualizer,
    benchmark,
    complexity,
    analytics,
    reports,
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title="NAVRAKSH API",
    description="Intelligent Navratri Pass Management and Sales Optimization System — Real-World DAA Algorithmic Backend",
    version="4.2.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# Configure CORS for React frontend (localhost:5173, localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event: create tables & auto-seed if needed
@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        seed_all()
    except Exception as e:
        logger.error(f"Error during startup DB initialization: {e}")

# Health check endpoint
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "NAVRAKSH Backend",
        "version": "v4.2.0",
        "daa_engine": "ACTIVE"
    }

# Mount all API routers
app.include_router(auth.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(bookings.router, prefix="/api")
app.include_router(inventory.router, prefix="/api")
app.include_router(events.router, prefix="/api")
app.include_router(sellers.router, prefix="/api")
app.include_router(customers.router, prefix="/api")
app.include_router(qr.router, prefix="/api")
app.include_router(fraud.router, prefix="/api")
app.include_router(allocation.router, prefix="/api")
app.include_router(group_booking.router, prefix="/api")
app.include_router(conflicts.router, prefix="/api")
app.include_router(algorithms.router, prefix="/api")
app.include_router(visualizer.router, prefix="/api")
app.include_router(benchmark.router, prefix="/api")
app.include_router(complexity.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(reports.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
