import uuid
import datetime
from sqlalchemy.orm import Session
from app.models.booking import Booking
from app.models.transaction import Transaction
from app.models.qr_pass import QrPass
from app.models.event import Event
from app.models.inventory import Inventory
from app.models.pass_type import PassType
from app.models.customer import Customer
from app.core.exceptions import InsufficientInventoryException, NavrakshException

class BookingService:
    @staticmethod
    def create_booking(
        db: Session,
        customer_id: int,
        event_id: int,
        pass_type_id: int,
        seller_id: int = None,
        quantity: int = 1,
        payment_method: str = "UPI"
    ) -> Booking:
        """
        Creates a booking with atomic database transactions.
        Guarantees that partial failures do not corrupt inventory and prevents overselling.
        """
        # Validate Customer
        customer = db.query(Customer).filter(Customer.id == customer_id).first()
        if not customer:
            raise NavrakshException(status_code=404, code="CUSTOMER_NOT_FOUND", message="Customer does not exist")

        # Validate Event
        event = db.query(Event).filter(Event.id == event_id).with_for_update().first()
        if not event:
            raise NavrakshException(status_code=404, code="EVENT_NOT_FOUND", message="Event does not exist")

        # Validate Pass Type
        pass_type = db.query(PassType).filter(PassType.id == pass_type_id).first()
        if not pass_type:
            raise NavrakshException(status_code=404, code="PASS_TYPE_NOT_FOUND", message="Pass type does not exist")

        # Check Event Available Passes
        if event.available_passes < quantity:
            raise InsufficientInventoryException(
                f"Requested {quantity} passes but only {event.available_passes} are available for {event.name}"
            )

        # Check Seller Inventory if specified
        if seller_id:
            inv = db.query(Inventory).filter(
                Inventory.event_id == event_id,
                Inventory.seller_id == seller_id,
                Inventory.pass_type_id == pass_type_id
            ).with_for_update().first()

            if not inv or inv.available_quantity < quantity:
                raise InsufficientInventoryException("Requested seller does not possess sufficient quota")
            inv.sold_quantity += quantity
            inv.available_quantity -= quantity

        # Calculate Price & Total
        unit_price = pass_type.price
        total_amount = unit_price * quantity

        # Update Event Inventory
        event.available_passes -= quantity

        # Create Booking Record
        booking_ref = f"BK-{datetime.datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        booking = Booking(
            booking_reference=booking_ref,
            customer_id=customer_id,
            seller_id=seller_id,
            event_id=event_id,
            pass_type_id=pass_type_id,
            quantity=quantity,
            unit_price=unit_price,
            total_amount=total_amount,
            booking_status="CONFIRMED"
        )
        db.add(booking)
        db.flush()  # populate booking.id

        # Create Transaction Record
        tx_ref = f"TX-{uuid.uuid4().hex[:10].upper()}"
        transaction = Transaction(
            transaction_reference=tx_ref,
            booking_id=booking.id,
            amount=total_amount,
            payment_method=payment_method,
            payment_status="SUCCESS",
            gateway_reference=f"RAZORPAY-{uuid.uuid4().hex[:8].upper()}"
        )
        db.add(transaction)

        # Generate QR Passes for each ticket in booking
        for i in range(quantity):
            pass_no = f"NAV-{str(booking.id).zfill(4)}-{i+1}"
            qr_tok = f"QR-{uuid.uuid4().hex}"
            rfid = f"RFID-{pass_no}-C{i+1}"
            qr_pass = QrPass(
                pass_number=pass_no,
                booking_id=booking.id,
                event_id=event_id,
                qr_token=qr_tok,
                status="VALID",
                rfid_token=rfid
            )
            db.add(qr_pass)

        db.commit()
        db.refresh(booking)
        return booking

    @staticmethod
    def cancel_booking(db: Session, booking_id: int, reason: str = "Cancelled") -> Booking:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        if not booking:
            raise NavrakshException(status_code=404, code="BOOKING_NOT_FOUND", message="Booking not found")

        if booking.booking_status == "CANCELLED":
            return booking

        # Return inventory to event
        event = db.query(Event).filter(Event.id == booking.event_id).first()
        if event:
            event.available_passes += booking.quantity

        # Invalidate QR passes
        for qr in booking.qr_passes:
            qr.status = "CANCELLED"

        booking.booking_status = "CANCELLED"
        db.commit()
        db.refresh(booking)
        return booking
