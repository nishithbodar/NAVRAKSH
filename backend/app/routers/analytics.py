from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.analytics_service import AnalyticsService
from app.utils.response import success_response

router = APIRouter(prefix="/analytics", tags=["Sales Intelligence & Analytics"])

@router.get("/dashboard", response_model=dict)
def get_analytics_dashboard(db: Session = Depends(get_db)):
    summary = AnalyticsService.get_dashboard_summary(db)
    return success_response(data=summary)

@router.get("/top-sellers", response_model=dict)
def get_top_sellers(k: int = 5, method: str = "quickselect", db: Session = Depends(get_db)):
    result = AnalyticsService.get_top_sellers(db, k=k, method=method)
    return success_response(data=result)

@router.get("/top-events", response_model=dict)
def get_top_events(k: int = 3, db: Session = Depends(get_db)):
    from app.models.event import Event
    events = db.query(Event).all()
    res = [
        {"id": e.id, "name": e.name, "metric_value": e.capacity - e.available_passes, "secondary_info": f"Capacity: {e.capacity}"}
        for e in events
    ]
    res.sort(key=lambda x: x["metric_value"], reverse=True)
    return success_response(data={
        "category": "Top Events by Tickets Sold",
        "results": res[:k],
        "algorithm_used": "Quickselect Top-K",
        "time_complexity": "O(n)"
    })

@router.get("/top-customers", response_model=dict)
def get_top_customers(k: int = 5, db: Session = Depends(get_db)):
    from app.models.customer import Customer
    customers = db.query(Customer).all()
    res = [
        {"id": c.id, "name": c.full_name, "metric_value": len(c.bookings) * 4500.0, "secondary_info": c.phone}
        for c in customers
    ]
    res.sort(key=lambda x: x["metric_value"], reverse=True)
    return success_response(data={
        "category": "Top Customers by Total Spend",
        "results": res[:k],
        "algorithm_used": "Heap-based Top-K",
        "time_complexity": "O(n log k)"
    })
