import React from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function CTASection() {
  const morphNavigate = useMorphNavigate();

  return (
    <section className="py-20 px-6 border-t border-white/5 relative overflow-hidden bg-grid-pattern">
      <div className="hero-glow"></div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
        <div className="luxury-badge">Get Started</div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Ready on Touchdown.
        </h2>
        <p className="text-slate-300 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Skip the terminal taxi queues. Synchronized corridor pooling with guaranteed executive sedans and transparent pricing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button 
            onClick={() => morphNavigate('/register')}
            className="btn-primary text-sm px-8 py-3.5 w-full sm:w-auto cursor-pointer"
          >
            <span>Register for Free Access</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
          <button 
            onClick={() => morphNavigate('/login')}
            className="btn-secondary text-sm px-8 py-3.5 w-full sm:w-auto cursor-pointer"
          >
            <span>Sign In to Portal</span>
          </button>
        </div>
      </div>
    </section>
  );
}
