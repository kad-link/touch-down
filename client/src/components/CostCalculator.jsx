import React, { useState } from 'react';

export default function CostCalculator() {
  const [distance, setDistance] = useState(35);

  // Fare calculations
  const soloFare = Math.round(150 + distance * 22);
  const poolFare = Math.round(soloFare * 0.62);
  const savings = soloFare - poolFare;
  const detour = distance > 30 ? '4–6 mins' : '2–4 mins';

  return (
    <section id="calculator" className="py-20 px-6 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="luxury-badge">Cost Intelligence</div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Solo Taxis vs. Touchdown Sedans.
          </h2>
          <p className="text-slate-400 font-light text-sm sm:text-base">
            Estimated savings across standard highway airport corridors.
          </p>
        </div>

        <div className="luxury-card p-6 md:p-10 border-white/10 space-y-8">
          
          {/* Distance Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-300">Distance from Airport:</label>
              <span className="text-base font-mono font-bold text-violet-300">{distance} km</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="60" 
              step="1" 
              value={distance} 
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5B21B6]"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>15 km (Inner City)</span>
              <span>35 km (Standard Hub)</span>
              <span>60 km (Outer Radials)</span>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-white/10">
            
            {/* Solo Cab */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-1.5">
              <span className="text-[11px] text-slate-400 uppercase font-mono">Solo Airport Taxi</span>
              <div className="text-2xl font-bold font-mono text-slate-400 line-through">₹{soloFare.toLocaleString()}</div>
              <p className="text-[11px] text-slate-500">Standard single-passenger fare</p>
            </div>

            {/* Touchdown Pooled */}
            <div className="bg-[#130D22]/60 p-5 rounded-2xl border border-violet-900/40 space-y-1.5 relative overflow-hidden">
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[8px] font-bold bg-gradient-to-r from-violet-900 to-indigo-950 text-violet-200 border border-violet-800/30">RECOMMENDED</div>
              <span className="text-[11px] text-violet-300 uppercase font-mono font-bold">Touchdown Pooled Sedan</span>
              <div className="text-3xl font-black font-mono text-white">₹{poolFare.toLocaleString()}</div>
              <p className="text-[11px] text-emerald-400 font-medium">Save ₹{savings.toLocaleString()} (38% OFF)</p>
            </div>

            {/* Detour Impact */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-1.5">
              <span className="text-[11px] text-slate-400 uppercase font-mono">Detour Bound</span>
              <div className="text-2xl font-bold font-mono text-slate-200">{detour}</div>
              <p className="text-[11px] text-slate-400">Strict near-to-far ordering</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
