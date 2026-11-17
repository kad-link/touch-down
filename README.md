# 🛬 Touchdown — Executive Airport Corridor Ride-Pooling

Touchdown is an executive ground mobility platform engineered to eliminate post-flight solo taxi wastage. By synchronizing with flight deboarding timelines and grouping arriving commuters along shared arterial highway corridors, Touchdown reduces airport fares by up to 45% while preserving luxury executive standards with guaranteed zero backtracking.

---

## 📁 Repository Structure

```
vistara/
├── .gitignore               # Version control exclusion rules
├── README.md                # Project & architecture overview
│
├── client/                  # Frontend Web Application (React.js + Vite)
│   ├── package.json         # React 18, React Router v6, Lenis, Lucide React, Tailwind
│   ├── vite.config.js       # Vite build & dev server configuration
│   ├── tailwind.config.js   # Dark luxury obsidian & royal violet palette (#08060D, #0F0C18, #7C3AED, #6366F1)
│   ├── index.html           # HTML entry point with Inter & Plus Jakarta Sans fonts
│   │
│   ├── src/
│   │   ├── main.jsx         # React root mounting BrowserRouter
│   │   ├── App.jsx          # App router (/, /login, /register) & Lenis hook
│   │   ├── index.css        # Dark luxury design tokens, Square Morph keyframes, Lenis CSS
│   │   │
│   │   ├── hooks/
│   │   │   └── useLenis.js  # Smooth scrolling hook with RAF loop & ScrollTrigger ticker
│   │   │
│   │   ├── components/
│   │   │   ├── SquareMorphTransition.jsx # Page transition manager with morphing square loader
│   │   │   ├── Navbar.jsx   # Glassmorphic navigation header
│   │   │   ├── Hero.jsx     # Dark luxury hero with 20% soft purple radial glow
│   │   │   ├── Capabilities.jsx # 6 core engineering capabilities + registration banner
│   │   │   ├── Protocol.jsx # 4-step post-flight executive protocol
│   │   │   ├── CostCalculator.jsx # Dynamic React distance slider (solo vs. pool savings)
│   │   │   ├── FleetStandards.jsx # Executive sedan specs (max 3 pax, max 3 bags)
│   │   │   ├── AirportHubs.jsx # Active metro hubs (BLR, DEL, BOM, SFO)
│   │   │   ├── CTASection.jsx # Final membership CTA prompt
│   │   │   └── Footer.jsx   # Executive luxury footer with status indicators
│   │   │
│   │   └── pages/
│   │       ├── LandingPage.jsx   # Composes all landing sections
│   │       ├── LoginPage.jsx     # Dark luxury login with Commuter / Chauffeur switcher
│   │       └── RegisterPage.jsx  # Private membership registration portal
│   │
│   └── dist/                # Production build artifacts
│
└── server/                  # Backend API & Matching Engine (Python / FastAPI)
    ├── main.py              # REST API & static React build asset server
    ├── config.py            # Airport hubs, Sedan specifications & chauffeur data
    ├── models.py            # Pydantic data schemas
    ├── requirements.txt     # Backend dependencies
    └── services/
        ├── matcher.py       # Single-origin corridor matching engine
        ├── routing.py       # OpenStreetMap / OSRM matrix & geometry service
        └── pricing.py       # Detour-compensated fare & rebate calculator
```

---

## 🚀 Running the React Client

### Development Server (Hot Reload)
```bash
cd client
npm install
npm run dev
```
Runs at [http://localhost:3000](http://localhost:3000).

### Production Build
```bash
cd client
npm run build
```
Creates optimized static bundles in `client/dist/`.

### Preview Production Build
```bash
cd client
npm run preview
```
Runs at [http://localhost:4173](http://localhost:4173).
