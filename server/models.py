"""
Pydantic schemas for Touchdown Server.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class Airport(BaseModel):
    code: str
    name: str
    city: str
    country: str
    lat: float
    lon: float
    currency: str = "₹"
    zoom: int = 11
    description: Optional[str] = None

class Commuter(BaseModel):
    id: str
    name: str
    destination_name: str
    lat: float
    lon: float
    passengers: int = Field(default=1, ge=1, le=3)
    luggage: int = Field(default=1, ge=0, le=3)
    flight_number: Optional[str] = "6E-542"
    pickup_point: Optional[str] = "Arrivals Terminal 1"

class DriverInfo(BaseModel):
    name: str
    plate: str
    model: str = "Executive Sedan"
    phone: str
    rating: float = 4.9
    bay: str = "Terminal 1, Pillar 4B"

class RiderMatchDetails(BaseModel):
    rider_id: str
    name: str
    destination_name: str
    lat: float
    lon: float
    passengers: int
    luggage: int
    dropoff_sequence: int
    assigned_cab_id: str
    driver_name: str
    driver_phone: str
    vehicle_plate: str
    pickup_bay: str
    solo_distance_km: float
    solo_duration_mins: float
    solo_fare: float
    pooled_distance_km: float
    pooled_duration_mins: float
    pooled_fare: float
    savings_amount: float
    savings_percent: float
    detour_duration_mins: float
    detour_percent: float

class PooledTrip(BaseModel):
    vehicle_id: str
    vehicle_type: str = "Sedan"
    driver: DriverInfo
    driver_earnings: float
    status: str = "CONFIRMED"
    total_riders: int
    total_passengers: int
    total_luggage: int
    total_distance_km: float
    total_duration_mins: float
    total_solo_cost: float
    total_pooled_cost: float
    total_savings: float
    savings_percent: float
    dropoff_order: List[str]
    riders: List[RiderMatchDetails]
    route_coordinates: List[List[float]] = []

class SummaryMetrics(BaseModel):
    total_commuters: int
    total_matched: int
    total_unmatched: int
    vehicles_dispatched: int
    vehicles_saved: int
    total_solo_km: float
    total_pooled_km: float
    km_saved: float
    km_saved_percent: float
    total_solo_cost: float
    total_pooled_cost: float
    total_cost_saved: float
    co2_saved_kg: float
    average_discount_percent: float

class MatchRequest(BaseModel):
    airport_code: str = "VTZ"
    commuters: List[Commuter]

class MatchResponse(BaseModel):
    airport: Airport
    trips: List[PooledTrip]
    unmatched_riders: List[Commuter]
    summary_metrics: SummaryMetrics

