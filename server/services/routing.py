"""
Routing service integrating OpenStreetMap via OSRM with caching and Haversine circuity fallback.
"""

import math
import logging
from typing import List, Tuple, Dict, Any
import httpx
from server.config import DEFAULT_SETTINGS

logger = logging.getLogger("routing_service")

_MATRIX_CACHE: Dict[str, Dict[str, Any]] = {}
_ROUTE_CACHE: Dict[str, Dict[str, Any]] = {}

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0088
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (math.sin(delta_phi / 2.0) ** 2 +
         math.cos(phi1) * math.cos(phi2) * (math.sin(delta_lambda / 2.0) ** 2))
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return R * c

def estimate_fallback_road_metrics(lat1: float, lon1: float, lat2: float, lon2: float) -> Tuple[float, float]:
    straight_km = haversine_distance(lat1, lon1, lat2, lon2)
    road_km = round(straight_km * 1.35, 2)
    duration_mins = round((road_km / 40.0) * 60.0, 1)
    return max(road_km, 0.5), max(duration_mins, 2.0)

def generate_interpolated_line(coords: List[Tuple[float, float]], steps_per_segment: int = 15) -> List[List[float]]:
    full_line: List[List[float]] = []
    for i in range(len(coords) - 1):
        lat1, lon1 = coords[i]
        lat2, lon2 = coords[i + 1]
        for step in range(steps_per_segment):
            t = step / float(steps_per_segment)
            curr_lat = lat1 + t * (lat2 - lat1)
            curr_lon = lon1 + t * (lon2 - lon1)
            full_line.append([round(curr_lon, 6), round(curr_lat, 6)])
    if coords:
        last_lat, last_lon = coords[-1]
        full_line.append([round(last_lon, 6), round(last_lat, 6)])
    return full_line

class RoutingService:
    def __init__(self, base_url: str = DEFAULT_SETTINGS["osrm_endpoint"]):
        self.base_url = base_url.rstrip("/")
        self.timeout = 2.5

    def _make_coord_string(self, points: List[Tuple[float, float]]) -> str:
        return ";".join([f"{lon:.6f},{lat:.6f}" for lat, lon in points])

    async def get_distance_matrix(self, points: List[Tuple[float, float]]) -> Tuple[List[List[float]], List[List[float]]]:
        n = len(points)
        if n <= 1:
            return [[0.0] * n for _ in range(n)], [[0.0] * n for _ in range(n)]

        coord_str = self._make_coord_string(points)
        cache_key = f"table_{coord_str}"

        if cache_key in _MATRIX_CACHE:
            return _MATRIX_CACHE[cache_key]["distances"], _MATRIX_CACHE[cache_key]["durations"]

        url = f"{self.base_url}/table/v1/driving/{coord_str}?annotations=distance,duration"
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                resp = await client.get(url)
                if resp.status_code == 200:
                    data = resp.json()
                    if data.get("code") == "Ok":
                        dist_m = data["distances"]
                        dur_s = data["durations"]
                        dist_km = [[round(d / 1000.0, 2) if d is not None else 999.0 for d in row] for row in dist_m]
                        dur_mins = [[round(d / 60.0, 1) if d is not None else 999.0 for d in row] for row in dur_s]
                        _MATRIX_CACHE[cache_key] = {"distances": dist_km, "durations": dur_mins}
                        return dist_km, dur_mins
        except Exception:
            pass

        # Haversine circuity fallback
        dist_km = [[0.0] * n for _ in range(n)]
        dur_mins = [[0.0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if i != j:
                    d, t = estimate_fallback_road_metrics(points[i][0], points[i][1], points[j][0], points[j][1])
                    dist_km[i][j] = d
                    dur_mins[i][j] = t

        _MATRIX_CACHE[cache_key] = {"distances": dist_km, "durations": dur_mins}
        return dist_km, dur_mins

    async def get_route(self, points: List[Tuple[float, float]]) -> Dict[str, Any]:
        if len(points) < 2:
            return {"distance_km": 0.0, "duration_mins": 0.0, "geometry": []}

        coord_str = self._make_coord_string(points)
        cache_key = f"route_{coord_str}"

        if cache_key in _ROUTE_CACHE:
            return _ROUTE_CACHE[cache_key]

        url = f"{self.base_url}/route/v1/driving/{coord_str}?overview=full&geometries=geojson&steps=false"
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                resp = await client.get(url)
                if resp.status_code == 200:
                    data = resp.json()
                    if data.get("code") == "Ok" and data.get("routes"):
                        best = data["routes"][0]
                        res = {
                            "distance_km": round(best["distance"] / 1000.0, 2),
                            "duration_mins": round(best["duration"] / 60.0, 1),
                            "geometry": best["geometry"]["coordinates"]
                        }
                        _ROUTE_CACHE[cache_key] = res
                        return res
        except Exception:
            pass

        tot_km, tot_mins = 0.0, 0.0
        for i in range(len(points) - 1):
            d, t = estimate_fallback_road_metrics(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1])
            tot_km += d
            tot_mins += t

        res = {
            "distance_km": round(tot_km, 2),
            "duration_mins": round(tot_mins, 1),
            "geometry": generate_interpolated_line(points)
        }
        _ROUTE_CACHE[cache_key] = res
        return res

routing_service = RoutingService()

