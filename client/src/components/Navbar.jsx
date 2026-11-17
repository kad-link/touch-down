import React, { useState } from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function Navbar() {
  const morphNavigate = useMorphNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);
    if (window.location.pathname !== '/') {
      morphNavigate('/');
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
        }
      }, 500);
      return;
    }
    if (window.lenis) {
      window.lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => morphNavigate('/')} 
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-950 via-indigo-950 to-violet-900 flex items-center justify-center shadow-lg shadow-violet-950/40 border border-violet-800/20 group-hover:scale-105 transition duration-300">
            <i className="fa-solid fa-plane-arrival text-slate-200 text-base"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-wider text-white">
              TOUCHDOWN
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Executive Airport Corridors</span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a 
            href="#capabilities" 
            onClick={(e) => handleNavClick(e, '#capabilities')}
            className="hover:text-violet-300 transition cursor-pointer"
          >
            Capabilities
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleNavClick(e, '#how-it-works')}
            className="hover:text-violet-300 transition cursor-pointer"
          >
            Protocol
          </a>
          <a 
            href="#calculator" 
            onClick={(e) => handleNavClick(e, '#calculator')}
            className="hover:text-violet-300 transition cursor-pointer"
          >
            Calculator
          </a>
          <a 
            href="#airports" 
            onClick={(e) => handleNavClick(e, '#airports')}
            className="hover:text-violet-300 transition cursor-pointer"
          >
            Hubs
          </a>
        </nav>

        {/* Auth Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => morphNavigate('/login')}
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => morphNavigate('/register')}
            className="btn-primary text-xs uppercase tracking-wider py-2.5 px-5 cursor-pointer"
          >
            <i className="fa-solid fa-id-card-clip text-sm"></i>
            Register for Access
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#08060D]/95 border-b border-white/10 px-6 py-4 space-y-3">
          <a 
            href="#capabilities" 
            onClick={(e) => handleNavClick(e, '#capabilities')}
            className="block text-sm text-slate-300 hover:text-violet-300 py-1 cursor-pointer"
          >
            Capabilities
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleNavClick(e, '#how-it-works')}
            className="block text-sm text-slate-300 hover:text-violet-300 py-1 cursor-pointer"
          >
            Protocol
          </a>
          <a 
            href="#calculator" 
            onClick={(e) => handleNavClick(e, '#calculator')}
            className="block text-sm text-slate-300 hover:text-violet-300 py-1 cursor-pointer"
          >
            Calculator
          </a>
          <a 
            href="#airports" 
            onClick={(e) => handleNavClick(e, '#airports')}
            className="block text-sm text-slate-300 hover:text-violet-300 py-1 cursor-pointer"
          >
            Hubs
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button 
              onClick={() => { setMobileOpen(false); morphNavigate('/login'); }}
              className="btn-secondary text-xs text-center py-2.5 w-full cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setMobileOpen(false); morphNavigate('/register'); }}
              className="btn-primary text-xs text-center py-2.5 w-full cursor-pointer"
            >
              Register for Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
