import csv
import io
from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.booking import Booking
from app.models.qr_pass import QrPass
from app.utils.response import success_response

router = APIRouter(prefix="/reports", tags=["Reports & Export"])

@router.get("/pass-sales", response_model=dict)
def get_pass_sales_report(db: Session = Depends(get_db)):
    qr_passes = db.query(QrPass).all()
    rows = []
    for q in qr_passes:
        b = q.booking
        cust_name = b.customer.full_name if (b and b.customer) else "Unknown"
        seller_name = b.seller.name if (b and b.seller) else "Direct Web Portal"
        tier_title = b.pass_type.display_title if (b and b.pass_type) else "Regular"
        price = b.unit_price if b else 1500.0

        rows.append({
            "pass_id": q.pass_number,
            "attendee_name": cust_name,
            "tier": tier_title,
            "nights": "All 9 Nights" if "VIP" in tier_title else "Night 6 Special",
            "gate": q.scanned_gate or "Gate 02 (Turnstile B)",
            "seller": seller_name,
            "price_inr": price,
            "rfid_token": q.rfid_token or "N/A",
            "status": q.status,
            "scan_timestamp": q.used_at.isoformat() if q.used_at else "Unconsumed"
        })
    return success_response(data=rows)

@router.get("/export-csv")
def download_pass_sales_csv(db: Session = Depends(get_db)):
    """
    Direct server-side CSV file download endpoint for managers.
    """
    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow([
        "Pass ID",
        "Attendee Name",
        "Contact Phone",
        "Pass Tier Designation",
        "Access Schedule",
        "Assigned Gate",
        "Authorized Seller Partner",
        "Base Price (INR)",
        "RFID Token",
        "Status",
        "Verified Scan Timestamp"
    ])

    qr_passes = db.query(QrPass).all()
    for q in qr_passes:
        b = q.booking
        cust_name = b.customer.full_name if (b and b.customer) else "N/A"
        phone = b.customer.phone if (b and b.customer) else "N/A"
        seller_name = b.seller.name if (b and b.seller) else "Direct Online"
        tier_title = b.pass_type.display_title if (b and b.pass_type) else "Regular"
        price = b.unit_price if b else 1500.0

        writer.writerow([
            q.pass_number,
            cust_name,
            phone,
            tier_title,
            "Night 6 (Sharad Purnima)",
            q.scanned_gate or "Gate 02",
            seller_name,
            price,
            q.rfid_token or "N/A",
            q.status,
            q.used_at.isoformat() if q.used_at else "Unconsumed"
        ])

    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=navraksh_pass_sales_export.csv"}
    )
