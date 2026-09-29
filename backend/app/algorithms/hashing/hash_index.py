import hashlib
from typing import Optional, Dict, Any, List

class OpenAddressingHashTable:
    """
    Open-addressing hash table with Robin Hood hashing / linear probing
    used for turnstile QR token resolution in constant time O(1).
    """
    def __init__(self, capacity: int = 65536):
        self.capacity = capacity
        self.table: List[Optional[Dict[str, Any]]] = [None] * capacity
        self.size = 0

    def _hash(self, key: str) -> int:
        # Murmur-like deterministic integer hash % capacity
        md5_digest = hashlib.md5(key.encode('utf-8')).hexdigest()
        int_val = int(md5_digest[:8], 16)
        return int_val % self.capacity

    def insert(self, key: str, value: Any) -> int:
        idx = self._hash(key)
        probes = 0

        while self.table[idx] is not None:
            if self.table[idx]["key"] == key:
                self.table[idx]["value"] = value
                return probes
            idx = (idx + 1) % self.capacity
            probes += 1
            if probes >= self.capacity:
                raise OverflowError("Hash table full")

        self.table[idx] = {
            "key": key,
            "value": value,
            "probes": probes
        }
        self.size += 1
        return probes

    def lookup(self, key: str) -> Optional[Dict[str, Any]]:
        idx = self._hash(key)
        probes = 0

        while self.table[idx] is not None:
            if self.table[idx]["key"] == key:
                return {
                    "found": True,
                    "slot": idx,
                    "probes": probes,
                    "value": self.table[idx]["value"]
                }
            idx = (idx + 1) % self.capacity
            probes += 1
            if probes >= self.capacity:
                break

        return {"found": False, "slot": idx, "probes": probes, "value": None}

    def load_factor(self) -> float:
        return round(self.size / self.capacity, 4)

    def get_bucket_window(self, center_slot: int, window: int = 4) -> List[Dict[str, Any]]:
        slots = []
        for i in range(center_slot - window, center_slot + window + 1):
            slot_idx = i % self.capacity
            item = self.table[slot_idx]
            slots.append({
                "slot": slot_idx,
                "is_empty": item is None,
                "key": item["key"] if item else "••• EMPTY",
                "status": "USED" if item else "NULL"
            })
        return slots
