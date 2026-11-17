import React from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function Hero() {
  const morphNavigate = useMorphNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-grid-pattern">
      {/* Soft Purple Radial Glow Centered Behind Hero Text */}
      <div className="hero-glow"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] text-white">
          Touch Down. Pool Swiftly.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-slate-200">
            Glide Home in Dark Luxury.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          Synchronized executive ride-pooling for deboarding flight passengers. Zero backtracking, dedicated airport bay pickup, and up to 45% fare reduction.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button 
            onClick={() => morphNavigate('/register')}
            className="btn-primary text-sm px-8 py-3.5 w-full sm:w-auto cursor-pointer"
          >
            <span>Register for Private Access</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
          <button 
            onClick={() => morphNavigate('/login')}
            className="btn-secondary text-sm px-8 py-3.5 w-full sm:w-auto cursor-pointer"
          >
            <i className="fa-solid fa-lock text-slate-400"></i>
            <span>Sign In to Portal</span>
          </button>
        </div>

        {/* Metric Highlights Ticker */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="luxury-card p-3.5 text-center">
            <div className="font-display font-bold text-xl lg:text-2xl text-white">42%</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Average Savings</div>
          </div>
          <div className="luxury-card p-3.5 text-center">
            <div className="font-display font-bold text-xl lg:text-2xl text-violet-300">&lt; 6 min</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Detour Bound</div>
          </div>
          <div className="luxury-card p-3.5 text-center">
            <div className="font-display font-bold text-xl lg:text-2xl text-white">100%</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Sedans Only</div>
          </div>
          <div className="luxury-card p-3.5 text-center">
            <div className="font-display font-bold text-xl lg:text-2xl text-emerald-400">38%</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">CO₂ Cut</div>
          </div>
        </div>

      </div>
    </section>
  );
}
