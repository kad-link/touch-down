"""
TOUCHDOWN SERVER CONFIGURATION
Airport coordinates, sedan fleet specifications, and pricing settings.
"""

from typing import Dict, List, Any

AIRPORTS: Dict[str, Dict[str, Any]] = {
    "VTZ": {
        "code": "VTZ",
        "name": "Visakhapatnam International Airport",
        "city": "Visakhapatnam",
        "country": "India",
        "lat": 17.7215,
        "lon": 83.2245,
        "currency": "₹",
        "zoom": 12,
        "description": "Visakhapatnam Airport connects via NH-16 highway spines into NAD Junction, Siripuram, MVP Colony, Rushikonda, and Madhurawada."
    },
    "DEL": {
        "code": "DEL",
        "name": "Indira Gandhi International Airport",
        "city": "New Delhi",
        "country": "India",
        "lat": 28.5562,
        "lon": 77.1000,
        "currency": "₹",
        "zoom": 11,
        "description": "Delhi Airport connects to extensive suburban hubs across Gurgaon, Noida, and South Delhi."
    },
    "BOM": {
        "code": "BOM",
        "name": "Chhatrapati Shivaji Maharaj International Airport",
        "city": "Mumbai",
        "country": "India",
        "lat": 19.0896,
        "lon": 72.8656,
        "currency": "₹",
        "zoom": 11,
        "description": "Mumbai Airport feeds the Western Express Highway and Eastern Suburbs corridors."
    },
    "SFO": {
        "code": "SFO",
        "name": "San Francisco International Airport",
        "city": "San Francisco",
        "country": "USA",
        "lat": 37.6213,
        "lon": -122.3790,
        "currency": "$",
        "zoom": 11,
        "description": "SFO serves commuters heading North into Downtown SF and South into Silicon Valley."
    }
}

DEFAULT_AIRPORT_CODE = "VTZ"

# Strict Sedan Fleet Specification (no SUVs or large vans)
VEHICLE_PROFILES: Dict[str, Dict[str, Any]] = {
    "Sedan": {
        "max_passengers": 3,
        "max_luggage": 3,
        "name": "Executive Airport Sedan",
        "fuel_type": "CNG / Petrol / Hybrid"
    }
}

# Pre-assigned Airport Chauffeurs
SAMPLE_DRIVERS: List[Dict[str, Any]] = [
    {"name": "Rajesh Gowda", "plate": "KA-04-E-4821", "model": "Executive Sedan", "phone": "+91 98450 12345", "rating": 4.9, "bay": "Terminal 1, Pillar 4B"},
    {"name": "Suresh Kumar", "plate": "KA-51-M-9023", "model": "Executive Sedan", "phone": "+91 98860 67890", "rating": 4.8, "bay": "Terminal 1, Pillar 5A"},
    {"name": "Manjunath K", "plate": "KA-01-AF-3312", "model": "Executive Sedan", "phone": "+91 97420 54321", "rating": 4.9, "bay": "Terminal 1, Pillar 3C"},
    {"name": "Venkatesh R", "plate": "KA-05-D-7788", "model": "Executive Sedan", "phone": "+91 99000 88776", "rating": 4.7, "bay": "Terminal 1, Pillar 6B"}
]

# Internal fixed corridor detour bounds (no user slider)
DEFAULT_SETTINGS = {
    "fixed_detour_percent": 30.0,     # Max allowable corridor detour ratio
    "fixed_detour_minutes": 25.0,     # Absolute detour cap in minutes
    "base_fare_inr": 150.0,           # Airport flag-drop base fare
    "rate_per_km_inr": 18.0,          # Per-km rate
    "rate_per_min_inr": 2.0,          # Per-minute rate
    "base_discount_percent": 25.0,    # Baseline discount for sharing
    "detour_discount_weight": 0.4,    # Extra discount factor for detour endured
    "driver_revenue_share": 0.78,     # Drivers earn 78% of collected pooled fares
    "co2_grams_per_km": 120.0,        # Vehicle emissions standard
    "osrm_endpoint": "https://router.project-osrm.org"
}

