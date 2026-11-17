"""
Airport Commuter Ride-Pooling Matching Engine.
Strictly configured for Sedan fleet with internal corridor detour limits.
"""

import itertools
import logging
from typing import List, Tuple, Dict, Any, Optional

from server.models import (
    Commuter,
    Airport,
    DriverInfo,
    PooledTrip,
    RiderMatchDetails,
    MatchResponse,
    SummaryMetrics
)
from server.services.routing import routing_service
from server.services.pricing import (
    calculate_solo_fare,
    calculate_pooled_fare_breakdown,
    calculate_fleet_summary
)
from server.config import VEHICLE_PROFILES, SAMPLE_DRIVERS, DEFAULT_SETTINGS

logger = logging.getLogger("matcher_service")

class MatchingEngine:
    def __init__(self):
        self.routing = routing_service

    def _evaluate_permutation(
        self,
        perm: Tuple[int, ...],
        dist_matrix: List[List[float]],
        dur_matrix: List[List[float]],
        max_detour_percent: float,
        max_detour_minutes: float
    ) -> Optional[Dict[str, Any]]:
        curr_node = 0
        tot_dist = 0.0
        tot_dur = 0.0
        rider_durations: Dict[int, float] = {}

        for node in perm:
            tot_dist += dist_matrix[curr_node][node]
            tot_dur += dur_matrix[curr_node][node]
            rider_durations[node] = tot_dur
            curr_node = node

        for node in perm:
            solo_dur = dur_matrix[0][node]
            actual_dur = rider_durations[node]
            detour_mins = actual_dur - solo_dur
            detour_pct = (detour_mins / max(1.0, solo_dur)) * 100.0

            if detour_pct > max_detour_percent or detour_mins > max_detour_minutes:
                return None

        return {
            "order": list(perm),
            "total_distance_km": round(tot_dist, 2),
            "total_duration_mins": round(tot_dur, 1),
            "rider_durations": rider_durations
        }

    def _find_best_dropoff_sequence(
        self,
        group_indices: List[int],
        dist_matrix: List[List[float]],
        dur_matrix: List[List[float]],
        max_detour_percent: float,
        max_detour_minutes: float
    ) -> Optional[Dict[str, Any]]:
        best_eval: Optional[Dict[str, Any]] = None
        min_duration = float("inf")

        for perm in itertools.permutations(group_indices):
            res = self._evaluate_permutation(
                perm,
                dist_matrix,
                dur_matrix,
                max_detour_percent,
                max_detour_minutes
            )
            if res and res["total_duration_mins"] < min_duration:
                min_duration = res["total_duration_mins"]
                best_eval = res

        return best_eval

    async def match_commuters(
        self,
        airport: Airport,
        commuters: List[Commuter]
    ) -> MatchResponse:
        if not commuters:
            return MatchResponse(
                airport=airport,
                trips=[],
                unmatched_riders=[],
                summary_metrics=SummaryMetrics(
                    total_commuters=0,
                    total_matched=0,
                    total_unmatched=0,
                    vehicles_dispatched=0,
                    vehicles_saved=0,
                    total_solo_km=0.0,
                    total_pooled_km=0.0,
                    km_saved=0.0,
                    km_saved_percent=0.0,
                    total_solo_cost=0.0,
                    total_pooled_cost=0.0,
                    total_cost_saved=0.0,
                    co2_saved_kg=0.0,
                    average_discount_percent=0.0
                )
            )

        sedan_spec = VEHICLE_PROFILES["Sedan"]
        max_passengers = sedan_spec["max_passengers"]
        max_luggage = sedan_spec["max_luggage"]
        max_detour_percent = DEFAULT_SETTINGS["fixed_detour_percent"]
        max_detour_mins = DEFAULT_SETTINGS["fixed_detour_minutes"]

        points = [(airport.lat, airport.lon)] + [(c.lat, c.lon) for c in commuters]
        dist_matrix, dur_matrix = await self.routing.get_distance_matrix(points)

        n = len(commuters)
        solo_metrics: Dict[int, Dict[str, float]] = {}
        for i in range(1, n + 1):
            d_km = dist_matrix[0][i]
            t_min = dur_matrix[0][i]
            solo_metrics[i] = {
                "distance_km": d_km,
                "duration_mins": t_min,
                "fare": calculate_solo_fare(d_km, t_min)
            }

        candidate_pairs = []
        for i in range(1, n + 1):
            c_i = commuters[i - 1]
            for j in range(i + 1, n + 1):
                c_j = commuters[j - 1]
                if (c_i.passengers + c_j.passengers > max_passengers or
                    c_i.luggage + c_j.luggage > max_luggage):
                    continue

                best_seq = self._find_best_dropoff_sequence(
                    [i, j],
                    dist_matrix,
                    dur_matrix,
                    max_detour_percent,
                    max_detour_mins
                )
                if best_seq:
                    solo_dist_sum = solo_metrics[i]["distance_km"] + solo_metrics[j]["distance_km"]
                    km_saved = solo_dist_sum - best_seq["total_distance_km"]
                    if km_saved > 0:
                        candidate_pairs.append({
                            "indices": [i, j],
                            "km_saved": km_saved,
                            "seq": best_seq
                        })

        candidate_pairs.sort(key=lambda x: x["km_saved"], reverse=True)

        matched_indices = set()
        matched_groups: List[Dict[str, Any]] = []

        for pair in candidate_pairs:
            idx1, idx2 = pair["indices"]
            if idx1 in matched_indices or idx2 in matched_indices:
                continue

            current_group = [idx1, idx2]
            current_passengers = commuters[idx1 - 1].passengers + commuters[idx2 - 1].passengers
            current_luggage = commuters[idx1 - 1].luggage + commuters[idx2 - 1].luggage
            current_best_seq = pair["seq"]

            for k in range(1, n + 1):
                if k in matched_indices or k in current_group:
                    continue

                c_k = commuters[k - 1]
                if (current_passengers + c_k.passengers <= max_passengers and
                    current_luggage + c_k.luggage <= max_luggage):

                    test_group = current_group + [k]
                    candidate_seq = self._find_best_dropoff_sequence(
                        test_group,
                        dist_matrix,
                        dur_matrix,
                        max_detour_percent,
                        max_detour_mins
                    )
                    if candidate_seq:
                        total_solo_km = sum(solo_metrics[idx]["distance_km"] for idx in test_group)
                        candidate_km_saved = total_solo_km - candidate_seq["total_distance_km"]
                        if candidate_km_saved > (total_solo_km - current_best_seq["total_distance_km"] - solo_metrics[k]["distance_km"]):
                            current_group = test_group
                            current_best_seq = candidate_seq
                            current_passengers += c_k.passengers
                            current_luggage += c_k.luggage

            for idx in current_group:
                matched_indices.add(idx)

            matched_groups.append({
                "group": current_group,
                "seq": current_best_seq
            })

        pooled_trips: List[PooledTrip] = []
        cab_counter = 1

        for mg in matched_groups:
            seq_info = mg["seq"]
            order = seq_info["order"]
            tot_pooled_dist = seq_info["total_distance_km"]
            tot_pooled_dur = seq_info["total_duration_mins"]

            cab_id = f"SEDAN-{cab_counter:02d}"
            raw_driver = SAMPLE_DRIVERS[(cab_counter - 1) % len(SAMPLE_DRIVERS)]
            driver_info = DriverInfo(
                name=raw_driver["name"],
                plate=raw_driver["plate"],
                model=raw_driver["model"],
                phone=raw_driver["phone"],
                rating=raw_driver["rating"],
                bay=raw_driver.get("bay", "Terminal 1, Pillar 4B")
            )

            trip_riders: List[RiderMatchDetails] = []
            trip_solo_cost = 0.0
            trip_pooled_cost = 0.0
            ordered_coords = [(airport.lat, airport.lon)]

            for step_num, node_idx in enumerate(order, start=1):
                c = commuters[node_idx - 1]
                ordered_coords.append((c.lat, c.lon))

                solo_d = solo_metrics[node_idx]["distance_km"]
                solo_t = solo_metrics[node_idx]["duration_mins"]
                solo_fare = solo_metrics[node_idx]["fare"]

                actual_t = seq_info["rider_durations"][node_idx]
                pricing_breakdown = calculate_pooled_fare_breakdown(
                    solo_fare=solo_fare,
                    solo_duration_mins=solo_t,
                    pooled_duration_mins=actual_t
                )

                trip_solo_cost += solo_fare
                trip_pooled_cost += pricing_breakdown["pooled_fare"]

                rider_detail = RiderMatchDetails(
                    rider_id=c.id,
                    name=c.name,
                    destination_name=c.destination_name,
                    lat=c.lat,
                    lon=c.lon,
                    passengers=c.passengers,
                    luggage=c.luggage,
                    dropoff_sequence=step_num,
                    assigned_cab_id=cab_id,
                    driver_name=driver_info.name,
                    driver_phone=driver_info.phone,
                    vehicle_plate=driver_info.plate,
                    pickup_bay=driver_info.bay,
                    solo_distance_km=solo_d,
                    solo_duration_mins=solo_t,
                    solo_fare=solo_fare,
                    pooled_distance_km=tot_pooled_dist,
                    pooled_duration_mins=actual_t,
                    pooled_fare=pricing_breakdown["pooled_fare"],
                    savings_amount=pricing_breakdown["savings_amount"],
                    savings_percent=pricing_breakdown["savings_percent"],
                    detour_duration_mins=pricing_breakdown["detour_duration_mins"],
                    detour_percent=pricing_breakdown["detour_percent"]
                )
                trip_riders.append(rider_detail)

            route_data = await self.routing.get_route(ordered_coords)
            trip_savings = round(trip_solo_cost - trip_pooled_cost, 2)
            trip_savings_pct = round((trip_savings / max(1.0, trip_solo_cost)) * 100.0, 1)
            driver_payout = round(trip_pooled_cost * DEFAULT_SETTINGS.get("driver_revenue_share", 0.78), 2)

            trip = PooledTrip(
                vehicle_id=cab_id,
                vehicle_type="Sedan",
                driver=driver_info,
                driver_earnings=driver_payout,
                status="CONFIRMED",
                total_riders=len(trip_riders),
                total_passengers=sum(r.passengers for r in trip_riders),
                total_luggage=sum(r.luggage for r in trip_riders),
                total_distance_km=route_data.get("distance_km", tot_pooled_dist),
                total_duration_mins=route_data.get("duration_mins", tot_pooled_dur),
                total_solo_cost=round(trip_solo_cost, 2),
                total_pooled_cost=round(trip_pooled_cost, 2),
                total_savings=trip_savings,
                savings_percent=trip_savings_pct,
                dropoff_order=[commuters[idx - 1].name for idx in order],
                riders=trip_riders,
                route_coordinates=route_data.get("geometry", [])
            )
            pooled_trips.append(trip)
            cab_counter += 1

        unmatched_riders = [commuters[i - 1] for i in range(1, n + 1) if i not in matched_indices]
        summary = calculate_fleet_summary(
            trips=pooled_trips,
            total_commuters_count=n,
            unmatched_count=len(unmatched_riders)
        )

        return MatchResponse(
            airport=airport,
            trips=pooled_trips,
            unmatched_riders=unmatched_riders,
            summary_metrics=SummaryMetrics(**summary)
        )

matching_engine = MatchingEngine()

