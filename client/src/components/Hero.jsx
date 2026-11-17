import React from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function Hero() {
  const morphNavigate = useMorphNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24 overflow-hidden bg-grid-pattern">
      {/* 20% Soft Purple Radial Glow Centered Behind Hero Text */}
      <div className="hero-glow"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Luxury Badge */}
        <div className="inline-block">
          <div className="luxury-badge">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-ping"></span>
            Algorithmic Post-Flight Mobility Engine
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] text-white">
          Touch Down. Pool Swiftly.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-blue-400 to-indigo-300">
            Glide Home in Dark Luxury.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed">
          The algorithmic ground mobility network engineered exclusively for synchronized flight deboardings. Clubbing executive commuters along identical highway corridors with zero backtracking and up to 45% fare reduction.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => morphNavigate('/register')}
            className="btn-primary text-sm px-8 py-4 w-full sm:w-auto"
          >
            <span>Register for Private Access</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
          <button 
            onClick={() => morphNavigate('/login')}
            className="btn-secondary text-sm px-8 py-4 w-full sm:w-auto"
          >
            <i className="fa-solid fa-lock text-slate-400"></i>
            <span>Sign In to Portal</span>
          </button>
        </div>

        {/* Metric Highlights Ticker */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="luxury-card p-4 text-center">
            <div className="font-display font-bold text-2xl lg:text-3xl text-white">42%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Average Fare Savings</div>
          </div>
          <div className="luxury-card p-4 text-center">
            <div className="font-display font-bold text-2xl lg:text-3xl text-[#0066FF]">&lt; 6 min</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Corridor Detour Bound</div>
          </div>
          <div className="luxury-card p-4 text-center">
            <div className="font-display font-bold text-2xl lg:text-3xl text-white">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Guaranteed Sedans Only</div>
          </div>
          <div className="luxury-card p-4 text-center">
            <div className="font-display font-bold text-2xl lg:text-3xl text-emerald-400">38%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">CO₂ Emissions Cut</div>
          </div>
        </div>

        {/* Live Corridor Simulation Graphic Card */}
        <div className="pt-8">
          <div className="luxury-card p-6 md:p-8 max-w-3xl mx-auto text-left shadow-2xl border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-300">
                  Live Corridors: BLR · DEL · BOM · SFO
                </span>
              </div>
              <span className="text-xs font-mono text-[#0066FF] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                Touchdown Matching Engine v2.4
              </span>
            </div>

            {/* Visual Flow Row */}
            <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Origin Airport Hub */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-plane-arrival text-indigo-400 text-lg"></i>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">ORIGIN AIRPORT</div>
                  <div className="text-sm font-bold text-white">Kempegowda (BLR) T1</div>
                  <div className="text-[11px] text-slate-500">Pillar 4B Staging Bay</div>
                </div>
              </div>

              {/* Direction Arrow */}
              <div className="hidden md:flex flex-col items-center text-slate-500">
                <span className="text-[10px] uppercase font-mono text-[#0066FF]">Sub-Second Conflation</span>
                <i className="fa-solid fa-arrow-right-long text-[#0066FF] text-lg"></i>
              </div>

              {/* Matched Sedan */}
              <div className="flex items-center gap-3 w-full md:w-auto bg-slate-900/80 p-3 rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-car text-[#0066FF] text-lg"></i>
                </div>
                <div>
                  <div className="text-xs text-[#0066FF] font-bold font-mono">SEDAN-01 · 2/3 PASSENGERS</div>
                  <div className="text-sm font-semibold text-white">Priya (Indiranagar) + Rahul (Koramangala)</div>
                  <div className="text-[11px] text-emerald-400 font-medium">₹580 Saved · 0 Min Backtracking</div>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <span>Highway Radial: Outer Ring Road South Corridor</span>
              <button 
                onClick={() => morphNavigate('/register')}
                className="text-[#0066FF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                Register to dispatch your shared ride <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

