import datetime
import uuid
from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.user import User
from app.models.customer import Customer
from app.models.seller import Seller
from app.models.venue import Venue
from app.models.event import Event
from app.models.pass_type import PassType
from app.models.inventory import Inventory
from app.models.booking import Booking
from app.models.transaction import Transaction
from app.models.qr_pass import QrPass
from app.models.fraud_record import FraudRecord
from app.models.algorithm_execution import AlgorithmExecution

def seed_all():
    print("[*] Creating database schema tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(User).filter(User.username == "admin").first():
            print("[✓] Database is already seeded.")
            return

        print("[*] Seeding Admin and Operator Users...")
        admin = User(
            username="admin",
            email="admin@navraksh.gov.in",
            hashed_password=get_password_hash("Admin@12345"),
            full_name="Darshan Dave",
            role="ADMIN"
        )
        operator = User(
            username="operator1",
            email="operator1@navraksh.gov.in",
            hashed_password=get_password_hash("Operator@12345"),
            full_name="Rajesh Jadav",
            role="OPERATOR"
        )
        db.add_all([admin, operator])
        db.commit()

        print("[*] Seeding Venues...")
        v1 = Venue(name="Shath Sangath Festival Grounds", address="SG Highway, Bodakdev", zone="West Zone", capacity=30000)
        v2 = Venue(name="Mangaliya Garba Grounds", address="Vastrapur Lake Road", zone="Central Zone", capacity=20000)
        v3 = Venue(name="YMCA International Concourse", address="SG Highway, Makarba", zone="South Zone", capacity=15000)
        db.add_all([v1, v2, v3])
        db.commit()

        print("[*] Seeding Pass Types...")
        pt1 = PassType(name="VIP", display_title="Royal Lounge Platinum VIP", price=15000.0, capacity=2000, benefits="Lounge access, fastrack gate, Valet, Dinner", priority_level=5)
        pt2 = PassType(name="DIAMOND", display_title="Saibo Diamond Pavillion", price=9500.0, capacity=4000, benefits="Covered stage seating, Priority lane", priority_level=4)
        pt3 = PassType(name="PLATINUM", display_title="Heritage Deluxe Pass", price=6500.0, capacity=6000, benefits="Dedicated entry portal, reserved viewing", priority_level=3)
        pt4 = PassType(name="GOLD", display_title="Gold Couple Pass", price=4500.0, capacity=8000, benefits="2 Persons admission all prime nights", priority_level=2)
        pt5 = PassType(name="GENERAL", display_title="Garba Arena Regular", price=1500.0, capacity=10000, benefits="General arena admission", priority_level=1)
        db.add_all([pt1, pt2, pt3, pt4, pt5])
        db.commit()

        print("[*] Seeding Navratri Events...")
        e1 = Event(
            name="Madhratri Maha Garba 2026",
            venue_id=v1.id,
            date=datetime.date(2026, 10, 15),
            start_time="19:30",
            end_time="02:00",
            capacity=25000,
            total_passes=25000,
            available_passes=110,
            base_price=1500.0,
            status="ACTIVE"
        )
        e2 = Event(
            name="Saibo Garba Mahotsav",
            venue_id=v2.id,
            date=datetime.date(2026, 10, 16),
            start_time="20:00",
            end_time="01:30",
            capacity=18000,
            total_passes=18000,
            available_passes=250,
            base_price=1200.0,
            status="ACTIVE"
        )
        e3 = Event(
            name="Kirtidan Diamond Raas",
            venue_id=v3.id,
            date=datetime.date(2026, 10, 17),
            start_time="20:00",
            end_time="02:30",
            capacity=14000,
            total_passes=14000,
            available_passes=400,
            base_price=1800.0,
            status="ACTIVE"
        )
        db.add_all([e1, e2, e3])
        db.commit()

        print("[*] Seeding Sellers...")
        s1 = Seller(name="Seller A (Karnavati Garba Hub)", code="SELLER-A", tier="Tier-1 Mega Partner", location="Ahmedabad West", true_demand=3200, allocated_quota=2650, contact_phone="+91 98250 11001")
        s2 = Seller(name="Seller B (Sarkhej Youth Club)", code="SELLER-B", tier="Tier-1 Club Partner", location="SG Highway Zone", true_demand=2800, allocated_quota=2400, contact_phone="+91 98250 11002")
        s3 = Seller(name="Seller C (Navrangpura Agency)", code="SELLER-C", tier="Tier-2 Direct Agency", location="Central City", true_demand=2100, allocated_quota=1950, contact_phone="+91 98250 11003")
        s4 = Seller(name="Seller D (Maninagar Pass Desk)", code="SELLER-D", tier="Tier-2 Retail Point", location="South Zone", true_demand=1500, allocated_quota=1450, contact_phone="+91 98250 11004")
        s5 = Seller(name="Seller E (Bopal Online Outlet)", code="SELLER-E", tier="Tier-3 Web Portal", location="Suburban Node", true_demand=1200, allocated_quota=1150, contact_phone="+91 98250 11005")
        s6 = Seller(name="Seller F (Vastrapur Campus Booth)", code="SELLER-F", tier="Tier-3 Campus Outlet", location="Student Desk", true_demand=900, allocated_quota=400, contact_phone="+91 98250 11006")
        db.add_all([s1, s2, s3, s4, s5, s6])
        db.commit()

        print("[*] Seeding Customers...")
        c1 = Customer(full_name="Aarav Joshi", email="aarav.joshi@example.com", phone="+91 98251 10328", city="Ahmedabad")
        c2 = Customer(full_name="Rahul Patel", email="rahul.patel@example.com", phone="+91 98250 84291", city="Ahmedabad")
        c3 = Customer(full_name="Kavita Dave", email="kavita.dave@example.com", phone="+91 98790 10164", city="Ahmedabad")
        c4 = Customer(full_name="Priya Shah", email="priya.shah@example.com", phone="+91 98240 99120", city="Ahmedabad")
        c5 = Customer(full_name="Nirav Trivedi", email="nirav.trivedi@example.com", phone="+91 99099 44219", city="Ahmedabad")
        c6 = Customer(full_name="Devang Parikh", email="devang.parikh@example.com", phone="+91 97230 10082", city="Ahmedabad")
        c7 = Customer(full_name="Tanmay Mehta", email="tanmay.mehta@example.com", phone="+91 98252 10889", city="Ahmedabad")
        db.add_all([c1, c2, c3, c4, c5, c6, c7])
        db.commit()

        print("[*] Seeding Bookings & QR Passes...")
        # Booking 1: Aarav Joshi
        b1 = Booking(
            booking_reference="BK-20261010-001032",
            customer_id=c1.id,
            seller_id=s1.id,
            event_id=e1.id,
            pass_type_id=pt1.id,
            quantity=1,
            unit_price=15000.0,
            total_amount=15000.0,
            booking_status="CONFIRMED"
        )
        db.add(b1)
        db.flush()

        tx1 = Transaction(transaction_reference="TX-99F4A7C1", booking_id=b1.id, amount=15000.0, payment_method="UPI", payment_status="SUCCESS")
        qr1 = QrPass(pass_number="NAV-1032", booking_id=b1.id, event_id=e1.id, qr_token="0x99F4A7C1", status="USED", rfid_token="RFID-1032-VIP", scanned_gate="Gate A1", scanned_turnstile="Turnstile 01", used_at=datetime.datetime.utcnow())
        db.add_all([tx1, qr1])

        # Booking 2: Rahul Patel
        b2 = Booking(
            booking_reference="BK-20261012-008429",
            customer_id=c2.id,
            seller_id=s1.id,
            event_id=e1.id,
            pass_type_id=pt4.id,
            quantity=2,
            unit_price=4500.0,
            total_amount=9000.0,
            booking_status="CONFIRMED"
        )
        db.add(b2)
        db.flush()

        tx2 = Transaction(transaction_reference="TX-842910AA", booking_id=b2.id, amount=9000.0, payment_method="UPI", payment_status="SUCCESS")
        qr2 = QrPass(pass_number="NAV-84291", booking_id=b2.id, event_id=e1.id, qr_token="NAV-84291", status="VALID", rfid_token="RFID-84291-C2")
        db.add_all([tx2, qr2])

        # Seeding a fraud record
        fr1 = FraudRecord(
            pass_number="NAV-84291",
            qr_token="NAV-84291",
            risk_score=0.99,
            risk_level="CRITICAL",
            threat_vector="REPLAY_ATTACK",
            details="Pass NAV-84291 was presented concurrently at Gate 02 after original check-in at Gate 01.",
            recommended_action="Lock Turnstile & Intercept",
            terminal_id="Turnstile B"
        )
        db.add(fr1)

        db.commit()
        print("[✓] Database seeded successfully with realistic Navratri operational data!")

    finally:
        db.close()

if __name__ == "__main__":
    seed_all()
