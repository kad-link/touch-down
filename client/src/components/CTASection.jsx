import React from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function CTASection() {
  const morphNavigate = useMorphNavigate();

  return (
    <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden bg-grid-pattern">
      <div className="hero-glow"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <div className="luxury-badge">Join the Network</div>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
          Your Executive Corridor Sedan Is Ready on Touchdown.
        </h2>
        <p className="text-slate-300 font-light text-base sm:text-lg max-w-2xl mx-auto">
          Promptly register or sign in to avail automated corridor matching, real-time OpenStreetMap manifests, and priority terminal pickup bays.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => morphNavigate('/register')}
            className="btn-primary text-sm px-10 py-4 w-full sm:w-auto cursor-pointer"
          >
            <span>Register for Free Account</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
          <button 
            onClick={() => morphNavigate('/login')}
            className="btn-secondary text-sm px-10 py-4 w-full sm:w-auto cursor-pointer"
          >
            <span>Sign In to Existing Portal</span>
          </button>
        </div>
      </div>
    </section>
  );
}

