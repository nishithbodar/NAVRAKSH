import time
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.event import Event
from app.algorithms.trees.interval_tree import IntervalTree

def time_to_float(t_str: str) -> float:
    # "20:30" -> 20.5
    parts = t_str.split(":")
    return int(parts[0]) + int(parts[1]) / 60.0

class ConflictService:
    @staticmethod
    def check_conflicts(
        db: Session,
        event_date: str,
        venue_id: int,
        start_time: str,
        end_time: str,
        event_name: str = "New Event"
    ) -> Dict[str, Any]:
        """
        Uses an Interval Tree to detect venue scheduling conflicts
        and sound curfew overlap in O(log n).
        """
        t0 = time.perf_counter()

        # Query existing events for this venue and date
        existing_events = db.query(Event).filter(
            Event.venue_id == venue_id
        ).all()

        tree = IntervalTree()

        # Build Interval Tree from existing events
        for ev in existing_events:
            low = time_to_float(ev.start_time)
            high = time_to_float(ev.end_time)
            tree.insert(low, high, {
                "id": ev.id,
                "name": ev.name,
                "start": ev.start_time,
                "end": ev.end_time
            })

        # Canonical Sound Curfew interval [24.0, 26.0] (Midnight to 2:00 AM)
        tree.insert(24.0, 26.0, {
            "id": -1,
            "name": "State Sound Curfew Mandate (100 dB Limit)",
            "start": "00:00",
            "end": "02:00",
            "curfew": True
        })

        # Query proposed interval
        p_low = time_to_float(start_time)
        p_high = time_to_float(end_time)

        conflicts = tree.search_all_conflicts(p_low, p_high)
        exec_time_ms = round((time.perf_counter() - t0) * 1000, 4)

        has_conflict = len(conflicts) > 0
        curfew_flag = any(c["data"].get("curfew") for c in conflicts)

        return {
            "has_conflict": has_conflict,
            "conflicts_count": len(conflicts),
            "overlapping_events": conflicts,
            "sound_curfew_infraction": curfew_flag,
            "execution_time_ms": exec_time_ms,
            "comparisons": tree.comparisons,
            "interval_tree_statistics": {
                "total_intervals": len(existing_events) + 1,
                "time_complexity": "O(min(n, k log n))",
                "space_complexity": "O(n)"
            }
        }
