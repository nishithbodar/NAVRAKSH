from typing import List, Dict, Any

def fractional_knapsack(capacity: float, items: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Greedy Fractional Knapsack Algorithm.
    Ranks items by value/weight ratio and greedily takes fractional portions.
    """
    if capacity <= 0 or not items:
        return {"total_value": 0, "taken_items": [], "time_complexity": "O(n log n)"}

    # Calculate ratios
    augmented = []
    for item in items:
        w = item["weight"]
        v = item["value"]
        ratio = (v / w) if w > 0 else 0
        augmented.append({**item, "ratio": ratio})

    augmented.sort(key=lambda x: x["ratio"], reverse=True)

    total_value = 0.0
    current_weight = 0.0
    taken = []

    for item in augmented:
        w = item["weight"]
        v = item["value"]
        if current_weight + w <= capacity:
            current_weight += w
            total_value += v
            taken.append({**item, "fraction": 1.0, "taken_weight": w, "taken_value": v})
        else:
            remaining = capacity - current_weight
            if remaining > 0:
                fraction = remaining / w
                val_fraction = v * fraction
                current_weight += remaining
                total_value += val_fraction
                taken.append({**item, "fraction": round(fraction, 4), "taken_weight": remaining, "taken_value": round(val_fraction, 2)})
            break

    return {
        "capacity": capacity,
        "filled_weight": round(current_weight, 2),
        "total_value": round(total_value, 2),
        "taken_items": taken,
        "time_complexity": "O(n log n)",
        "space_complexity": "O(1)"
    }
