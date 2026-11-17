# 🛬 Touchdown — Executive Airport Corridor Ride-Pooling

Touchdown is an executive ground mobility platform engineered to eliminate post-flight solo taxi wastage. By synchronizing with flight deboarding timelines and grouping arriving commuters along shared arterial highway corridors, Touchdown reduces airport fares by up to 45% while preserving luxury executive standards with guaranteed zero backtracking.

---

## 📁 Repository Structure

```
vistara/
├── .gitignore         # Version control exclusion rules
├── README.md          # Project & architecture overview
│
├── client/            # Frontend Web Application (Dark Luxury SaaS)
│   ├── index.html     # Landing page (capabilities, pricing intelligence, fleet)
│   ├── login.html     # Sign-in portal with persona toggling
│   ├── register.html  # Private membership onboarding portal
│   ├── css/
│   │   └── style.css  # Dark luxury design tokens, Square Morph keyframes, Lenis resets
│   └── js/
│       ├── main.js    # Lenis smooth scroll, GSAP ScrollTrigger ticker & savings calculator
│       └── transition.js # Square Morph page transition engine
│
└── server/            # Backend API & Matching Engine (Python / FastAPI)
    ├── main.py        # REST endpoints and static client mounting
    ├── config.py      # Airport hubs, Sedan fleet limits & chauffeurs
    ├── models.py      # Pydantic schemas (Commuter, DriverInfo, PooledTrip)
    ├── requirements.txt # Backend dependencies
    ├── services/
    │   ├── matcher.py # Greedy Sedan corridor matching engine
    │   ├── routing.py # OpenStreetMap / OSRM matrix & polyline service
    │   └── pricing.py # Detour-compensated fare & rebate calculator
    └── tests/
        └── test_server.py # Backend unit and endpoint tests
```

---

## 🎨 Dark Luxury Design System (Client)

| Element | Specification |
| :--- | :--- |
| **Theme** | Dark Mode / Dark Luxury SaaS |
| **Primary Background** | `#0D0D1A` (deep dark blue-black) |
| **Card Background** | `#111827` with 1px border at `rgba(255, 255, 255, 0.08)` |
| **Primary Typography** | `#F1F1EE` (clean sans-serif: `Inter` & `Plus Jakarta Sans`) |
| **Accent Color** | Electric Blue `#0066FF` for CTA buttons & highlighted text |
| **Hero Atmosphere** | Subtle radial gradient: soft purple glow at 20% opacity (`rgba(139, 92, 246, 0.20)`) centered behind hero text |
| **Primary CTA Button** | Electric Blue `#0066FF`, white text, `box-shadow: 0 0 30px rgba(0, 102, 255, 0.4)` |
| **Smooth Scrolling** | [Lenis v1.1.13](https://unpkg.com/lenis@1.1.13/dist/lenis.min.js) with smooth requestAnimationFrame loop |
| **Page Transitions** | Geometric **Square Morph** loading animation between all page transitions |

---

## ⚡ Core Tasks & Platform Capabilities

1. **Radial Highway Conflation:** Mathematically groups terminal deboardings along natural arterial corridors with monotonic near-to-far ordering.
2. **Detour-Compensated Fair Pricing:** Baseline 25% discount for first drop-offs; up to 45% rebate for downstream passengers enduring minor detour minutes.
3. **Trunk-First Luggage Allocation:** Strictly enforces a 3-passenger and 3-check-in-bag cap on executive sedans.
4. **OpenStreetMap Routing Topology:** Sub-second duration matrices and turn-by-turn road geometries avoiding dead-ends and U-turns.
5. **Dual Persona Digital Manifest:** Executive Commuter Boarding Pass with terminal pickup pillars alongside Chauffeur turn-by-turn route sheets.
6. **Carbon Wastage Avoidance:** Collapses 3 individual airport taxi trips into 1 shared executive sedan, cutting urban airport commute emissions by 38%.

---

## 🚀 Running the Project

### Option A: Static Frontend Preview (Client Only)
```bash
cd client
python3 -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080).

### Option B: Full-Stack Backend + Client (Server)
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r server/requirements.txt
uvicorn server.main:app --reload --port 8000
```
- **Web App:** [http://localhost:8000](http://localhost:8000)
- **API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)
