from typing import List, Dict, Any

def activity_selection(activities: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Greedy Activity Selection Algorithm.
    Selects maximum number of non-overlapping events/activities by earliest finish time.
    """
    if not activities:
        return {"selected_activities": [], "count": 0, "comparisons": 0}

    # Sort activities by end_time
    sorted_act = sorted(activities, key=lambda x: x["end_time"])
    selected = []
    comparisons = len(activities)

    # First activity is always selected
    selected.append(sorted_act[0])
    last_end = sorted_act[0]["end_time"]

    for i in range(1, len(sorted_act)):
        comparisons += 1
        if sorted_act[i]["start_time"] >= last_end:
            selected.append(sorted_act[i])
            last_end = sorted_act[i]["end_time"]

    return {
        "selected_activities": selected,
        "count": len(selected),
        "total_considered": len(activities),
        "comparisons": comparisons,
        "time_complexity": "O(n log n)",
        "space_complexity": "O(1)"
    }
