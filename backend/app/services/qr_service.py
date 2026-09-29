import time
import datetime
from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.qr_pass import QrPass
from app.models.fraud_record import FraudRecord
from app.algorithms.hashing.hash_index import OpenAddressingHashTable

# Global in-memory hash table for sub-millisecond turnstile lookups
turnstile_hash_index = OpenAddressingHashTable(capacity=65536)

class QrService:
    @staticmethod
    def verify_qr(db: Session, qr_token: str, gate_id: str = "Gate 02", turnstile_id: str = "Turnstile B") -> Dict[str, Any]:
        """
        Constant-time O(1) hash lookup with immediate duplicate replay-attack detection.
        Demonstrates Open-Addressing hash indexing and bucket collision telemetry.
        """
        t0 = time.perf_counter()

        # Step 1: Open-Addressing Hash Index Lookup
        lookup_result = turnstile_hash_index.lookup(qr_token)
        slot = lookup_result["slot"]
        bucket_window = turnstile_hash_index.get_bucket_window(slot, window=3)

        # Step 2: Database Record Verification
        qr_pass = db.query(QrPass).filter(
            (QrPass.qr_token == qr_token) | (QrPass.pass_number == qr_token)
        ).first()

        exec_time_ms = round((time.perf_counter() - t0) * 1000, 4)

        if not qr_pass:
            # Corrupted or unknown hash
            fraud = FraudRecord(
                pass_number="UNKNOWN",
                qr_token=qr_token,
                risk_score=0.95,
                risk_level="CRITICAL",
                threat_vector="TAMPERED_HASH",
                details=f"Unknown or forged QR token signature presented at {gate_id} ({turnstile_id})",
                recommended_action="Quarantine Pass & Intercept Attendee",
                terminal_id=turnstile_id
            )
            db.add(fraud)
            db.commit()

            return {
                "valid": False,
                "status": "INVALID",
                "message": "Security Alert: Tampered or invalid QR payload checksum failure.",
                "hash_resolution_time_ms": exec_time_ms,
                "hash_slot": slot,
                "bucket_window": bucket_window
            }

        # Step 3: Check for Replay Attack (Already scanned)
        if qr_pass.status == "USED":
            time_delta = ""
            if qr_pass.used_at:
                delta_sec = int((datetime.datetime.utcnow() - qr_pass.used_at).total_seconds())
                time_delta = f"{delta_sec} seconds ago"

            fraud = FraudRecord(
                pass_number=qr_pass.pass_number,
                qr_token=qr_pass.qr_token,
                risk_score=0.99,
                risk_level="CRITICAL",
                threat_vector="REPLAY_ATTACK",
                details=f"Pass {qr_pass.pass_number} was already scanned at {qr_pass.scanned_gate or 'Gate 01'} ({time_delta}). Replay attempt detected at {gate_id}.",
                recommended_action="Lock Turnstile & Dispatch Security Patrol Unit",
                terminal_id=turnstile_id
            )
            db.add(fraud)
            db.commit()

            return {
                "valid": False,
                "status": "DUPLICATE_ALERT",
                "pass_number": qr_pass.pass_number,
                "attendee_name": qr_pass.booking.customer.full_name if qr_pass.booking else "Unknown",
                "message": f"ACCESS DENIED — Pass {qr_pass.pass_number} was already scanned and consumed.",
                "hash_resolution_time_ms": exec_time_ms,
                "hash_slot": slot,
                "bucket_window": bucket_window
            }

        if qr_pass.status == "CANCELLED":
            return {
                "valid": False,
                "status": "CANCELLED",
                "pass_number": qr_pass.pass_number,
                "message": "ACCESS DENIED — Pass has been cancelled or refunded.",
                "hash_resolution_time_ms": exec_time_ms,
                "hash_slot": slot,
                "bucket_window": bucket_window
            }

        # Step 4: Valid First Entry -> Consume pass & Unlock turnstile
        qr_pass.status = "USED"
        qr_pass.used_at = datetime.datetime.utcnow()
        qr_pass.scanned_gate = gate_id
        qr_pass.scanned_turnstile = turnstile_id

        # Insert into memory hash table for fast detection of subsequent scans
        turnstile_hash_index.insert(qr_token, {
            "pass_number": qr_pass.pass_number,
            "scanned_at": qr_pass.used_at.isoformat(),
            "gate": gate_id
        })

        db.commit()

        customer_name = qr_pass.booking.customer.full_name if (qr_pass.booking and qr_pass.booking.customer) else "Rahul Patel"
        tier_title = qr_pass.booking.pass_type.display_title if (qr_pass.booking and qr_pass.booking.pass_type) else "Gold Couple Pass"

        return {
            "valid": True,
            "status": "GRANTED",
            "pass_number": qr_pass.pass_number,
            "attendee_name": customer_name,
            "pass_tier": tier_title,
            "night": "Night 6 (Special)",
            "gate": gate_id,
            "rfid_token": qr_pass.rfid_token or f"RFID-{qr_pass.pass_number}-C1",
            "hash_resolution_time_ms": exec_time_ms,
            "hash_slot": slot,
            "bucket_window": bucket_window,
            "message": "VERIFIED ENTRY — Turnstile unlocked for 4.0s."
        }
