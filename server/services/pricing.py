"""
Fare Calculation & Detour-Compensated Rebate Engine.
"""

from typing import Dict, Any, List
from server.config import DEFAULT_SETTINGS

def calculate_solo_fare(
    distance_km: float,
    duration_mins: float,
    base_fare: float = DEFAULT_SETTINGS["base_fare_inr"],
    rate_per_km: float = DEFAULT_SETTINGS["rate_per_km_inr"],
    rate_per_min: float = DEFAULT_SETTINGS["rate_per_min_inr"]
) -> float:
    return round(base_fare + (distance_km * rate_per_km) + (duration_mins * rate_per_min), 2)

def calculate_pooled_fare_breakdown(
    solo_fare: float,
    solo_duration_mins: float,
    pooled_duration_mins: float,
    base_discount_percent: float = DEFAULT_SETTINGS["base_discount_percent"],
    detour_discount_weight: float = DEFAULT_SETTINGS["detour_discount_weight"]
) -> Dict[str, float]:
    detour_mins = max(0.0, round(pooled_duration_mins - solo_duration_mins, 1))
    detour_ratio = detour_mins / max(1.0, solo_duration_mins)
    detour_percent = round(detour_ratio * 100.0, 1)

    bonus_discount = min(15.0, (detour_ratio * 100.0) * detour_discount_weight)
    total_discount_percent = min(45.0, max(20.0, base_discount_percent + bonus_discount))

    pooled_fare = round(solo_fare * (1.0 - total_discount_percent / 100.0), 2)
    savings_amount = round(solo_fare - pooled_fare, 2)

    return {
        "solo_fare": solo_fare,
        "pooled_fare": pooled_fare,
        "savings_amount": savings_amount,
        "savings_percent": round(total_discount_percent, 1),
        "detour_duration_mins": detour_mins,
        "detour_percent": detour_percent
    }

def calculate_fleet_summary(
    trips: List[Any],
    total_commuters_count: int,
    unmatched_count: int
) -> Dict[str, Any]:
    total_solo_km = 0.0
    total_pooled_km = 0.0
    total_solo_cost = 0.0
    total_pooled_cost = 0.0
    all_discounts = []

    for trip in trips:
        total_pooled_km += trip.total_distance_km
        total_pooled_cost += trip.total_pooled_cost
        for r in trip.riders:
            total_solo_km += r.solo_distance_km
            total_solo_cost += r.solo_fare
            all_discounts.append(r.savings_percent)

    km_saved = max(0.0, round(total_solo_km - total_pooled_km, 2))
    km_saved_percent = round((km_saved / total_solo_km) * 100.0, 1) if total_solo_km > 0 else 0.0
    cost_saved = max(0.0, round(total_solo_cost - total_pooled_cost, 2))

    co2_factor_kg = DEFAULT_SETTINGS["co2_grams_per_km"] / 1000.0
    co2_saved_kg = round(km_saved * co2_factor_kg, 2)

    avg_discount = round(sum(all_discounts) / len(all_discounts), 1) if all_discounts else 0.0

    return {
        "total_commuters": total_commuters_count,
        "total_matched": total_commuters_count - unmatched_count,
        "total_unmatched": unmatched_count,
        "vehicles_dispatched": len(trips),
        "vehicles_saved": max(0, total_commuters_count - len(trips)),
        "total_solo_km": round(total_solo_km, 2),
        "total_pooled_km": round(total_pooled_km, 2),
        "km_saved": km_saved,
        "km_saved_percent": km_saved_percent,
        "total_solo_cost": round(total_solo_cost, 2),
        "total_pooled_cost": round(total_pooled_cost, 2),
        "total_cost_saved": cost_saved,
        "co2_saved_kg": co2_saved_kg,
        "average_discount_percent": avg_discount
    }

