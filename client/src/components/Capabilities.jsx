import React from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function Capabilities() {
  const morphNavigate = useMorphNavigate();

  const capabilities = [
    {
      icon: "fa-diagram-project",
      title: "Radial Highway Conflation",
      desc: "Groups passengers boarding at the terminal who share natural arterial highway spines into the city center. Mathematically guarantees strict near-to-far topological drop-offs with zero U-turns.",
      category: "Topology Engine",
      tag: "OSRM Road Graph"
    },
    {
      icon: "fa-scale-balanced",
      title: "Detour-Compensated Split",
      desc: "Eliminates rider reluctance. Commuters dropped first receive a direct baseline discount (25% off). Downstream passengers enduring marginal detour minutes receive boosted rebates (up to 45% off).",
      category: "Fair Split Protocol",
      tag: "Proportional Marginal"
    },
    {
      icon: "fa-suitcase-rolling",
      title: "Trunk-First Luggage Gating",
      desc: "Luggage—not seats—is the real bottleneck in airport rides. Touchdown strictly enforces a 3-passenger and 3-check-in-bag cap on its executive sedan fleet, preventing airport baggage cramping.",
      category: "Trunk Volume",
      tag: "Max 3 Bags / Sedan"
    },
    {
      icon: "fa-map-location-dot",
      title: "OpenStreetMap Road Matrix",
      desc: "Leverages high-speed OpenStreetMap routing with sub-second NxN duration matrices. Dynamically adjusts for flyovers, highway toll booths, and ring-road entry ramps without commercial map lock-in.",
      category: "Mapping Engine",
      tag: "OpenStreetMap & OSRM"
    },
    {
      icon: "fa-passport",
      title: "Dual Persona Telemetry",
      desc: "Commuters receive a digital Boarding Pass indicating specific terminal pickup pillars and co-passenger names. Drivers receive an optimized turn-by-turn navigation sheet with guaranteed high pooled earnings.",
      category: "Interfaces",
      tag: "User & Driver Views"
    },
    {
      icon: "fa-leaf",
      title: "Carbon Wastage Avoidance",
      desc: "By collapsing three individual airport-to-city solo taxi runs into one shared executive vehicle, Touchdown slashes terminal taxi congestion by 66% and eliminates 120 grams of CO₂ per saved kilometer.",
      category: "Environmental",
      tag: "Zero Deadhead Waste"
    }
  ];

  return (
    <section id="capabilities" className="py-24 px-6 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="luxury-badge">Engineering Capabilities</div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Built for the Exact Geometry of Post-Flight Dispersal.
          </h2>
          <p className="text-slate-400 font-light text-base sm:text-lg">
            Standard ride-hailing algorithms fail at airports because they treat airport ground transit as random point-to-point hops. Touchdown solves the single-depot corridor matching challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="luxury-card p-8 flex flex-col justify-between">
              <div>
                <div className="feature-icon-wrapper">
                  <i className={`fa-solid ${cap.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-3">{cap.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{cap.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{cap.category}</span>
                <span className="text-[#0066FF]">{cap.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Prompt Banner */}
        <div className="mt-16 luxury-card p-8 border-[#0066FF]/30 bg-gradient-to-r from-blue-950/40 via-dark-card to-dark-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">Unlock All Corridor Matching Capabilities</h4>
            <p className="text-sm text-slate-400">
              Register or sign in with your business email to simulate flight batches, view live interactive maps, and dispatch pooled sedans.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => morphNavigate('/register')}
              className="btn-primary text-xs py-3 px-6 cursor-pointer"
            >
              Create Account
            </button>
            <button 
              onClick={() => morphNavigate('/login')}
              className="btn-secondary text-xs py-3 px-6 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

