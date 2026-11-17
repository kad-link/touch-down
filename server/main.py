"""
TOUCHDOWN FASTAPI SERVER
Serves matching endpoints and the dark luxury client application.
"""

import os
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from server.config import (
    AIRPORTS,
    DEFAULT_AIRPORT_CODE,
    VEHICLE_PROFILES
)
from server.models import (
    Airport,
    Commuter,
    MatchRequest,
    MatchResponse
)
from server.services.matcher import matching_engine
from server.services.routing import routing_service

app = FastAPI(
    title="Touchdown Airport Ride-Pooling API",
    description="Algorithmic airport corridor matching engine for executive shared sedans.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLIENT_DIR = os.path.join(BASE_DIR, "client")

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "touchdown-corridor-engine",
        "default_airport": DEFAULT_AIRPORT_CODE,
        "fleet": "Sedan Only"
    }

@app.get("/api/airports")
async def list_airports():
    return {
        "default": DEFAULT_AIRPORT_CODE,
        "airports": list(AIRPORTS.values())
    }

@app.get("/api/airports/{code}")
async def get_airport(code: str):
    code_upper = code.upper()
    if code_upper not in AIRPORTS:
        raise HTTPException(status_code=404, detail=f"Airport '{code}' not found.")
    return AIRPORTS[code_upper]

@app.get("/api/vehicle-profiles")
async def get_vehicle_profiles():
    return VEHICLE_PROFILES

@app.post("/api/match", response_model=MatchResponse)
async def run_matching(request: MatchRequest):
    code_upper = request.airport_code.upper()
    airport_data = AIRPORTS.get(code_upper)
    if not airport_data:
        raise HTTPException(status_code=404, detail=f"Airport '{request.airport_code}' not supported.")

    airport_obj = Airport(**airport_data)
    response = await matching_engine.match_commuters(
        airport=airport_obj,
        commuters=request.commuters
    )
    return response

@app.post("/api/route")
async def get_route(waypoints: List[List[float]]):
    if len(waypoints) < 2:
        raise HTTPException(status_code=400, detail="At least 2 waypoints are required.")
    points = [(p[0], p[1]) for p in waypoints]
    result = await routing_service.get_route(points)
    return result

# Serve React client build
DIST_DIR = os.path.join(CLIENT_DIR, "dist")
if os.path.isdir(DIST_DIR) and os.path.isdir(os.path.join(DIST_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

@app.get("/")
@app.get("/{full_path:path}")
async def serve_index(full_path: str = ""):
    if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
        raise HTTPException(status_code=404, detail="Not Found")
    dist_index = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(dist_index):
        return FileResponse(dist_index)
    index_path = os.path.join(CLIENT_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Touchdown API is running. Visit /docs for OpenAPI documentation."}

