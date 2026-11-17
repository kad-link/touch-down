import React, { useState } from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function CostCalculator() {
  const morphNavigate = useMorphNavigate();
  const [distance, setDistance] = useState(35);

  // Fare calculations
  const soloFare = Math.round(150 + distance * 22);
  const poolFare = Math.round(soloFare * 0.62);
  const savings = soloFare - poolFare;
  const detour = distance > 30 ? '4-7 mins' : '2-4 mins';

  return (
    <section id="calculator" className="py-24 px-6 border-t border-white/5 relative">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="luxury-badge">Cost Intelligence</div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Solo Airport Taxis vs. Touchdown Sedans.
          </h2>
          <p className="text-slate-400 font-light text-base sm:text-lg">
            See how much you and your organization save per airport corridor run.
          </p>
        </div>

        <div className="luxury-card p-8 md:p-12 border-white/10 space-y-8">
          
          {/* Distance Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-300">Distance from Airport Terminal:</label>
              <span className="text-lg font-mono font-bold text-[#0066FF]">{distance} km</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="60" 
              step="1" 
              value={distance} 
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>15 km (Inner City)</span>
              <span>35 km (Standard Hub)</span>
              <span>60 km (Outer Suburbs)</span>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            
            {/* Solo Cab */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-mono">Standard Solo Taxi</span>
              <div className="text-2xl font-bold font-mono text-slate-300 line-through">₹{soloFare.toLocaleString()}</div>
              <p className="text-xs text-slate-500">1 car, full flag-drop fare, standard airport surcharge.</p>
            </div>

            {/* Touchdown Pooled */}
            <div className="bg-blue-950/20 p-6 rounded-2xl border border-[#0066FF]/40 space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold bg-[#0066FF] text-white">RECOMMENDED</div>
              <span className="text-xs text-[#0066FF] uppercase font-mono font-bold">Touchdown Pooled Sedan</span>
              <div className="text-3xl font-black font-mono text-white">₹{poolFare.toLocaleString()}</div>
              <p className="text-xs text-emerald-400 font-medium">Save ₹{savings.toLocaleString()} (38% OFF)</p>
            </div>

            {/* Detour Impact */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-mono">Detour Overhead</span>
              <div className="text-2xl font-bold font-mono text-slate-200">{detour}</div>
              <p className="text-xs text-slate-400">Strict corridor ordering with zero backtracking.</p>
            </div>

          </div>

          {/* CTA inside calculator */}
          <div className="text-center pt-4">
            <button 
              onClick={() => morphNavigate('/register')}
              className="btn-primary text-xs py-3 px-8 cursor-pointer"
            >
              Sign Up to Start Saving on Airport Runs
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

