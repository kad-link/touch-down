import React, { useState } from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function Navbar() {
  const morphNavigate = useMorphNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => morphNavigate('/')} 
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0066FF] to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-white/10 group-hover:scale-105 transition duration-300">
            <i className="fa-solid fa-plane-arrival text-white text-base"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5">
              TOUCHDOWN
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse"></span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Executive Airport Corridors</span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#capabilities" className="hover:text-[#0066FF] transition">Core Capabilities</a>
          <a href="#how-it-works" className="hover:text-[#0066FF] transition">The Protocol</a>
          <a href="#calculator" className="hover:text-[#0066FF] transition">Cost Intelligence</a>
          <a href="#fleet" className="hover:text-[#0066FF] transition">Sedan Fleet</a>
          <a href="#airports" className="hover:text-[#0066FF] transition">Hubs</a>
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
            className="btn-primary text-xs uppercase tracking-wider py-2.5 px-5"
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
        <div className="md:hidden bg-[#0D0D1A]/95 border-b border-white/10 px-6 py-4 space-y-3">
          <a 
            href="#capabilities" 
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-300 hover:text-[#0066FF] py-1"
          >
            Core Capabilities
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-300 hover:text-[#0066FF] py-1"
          >
            The Protocol
          </a>
          <a 
            href="#calculator" 
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-300 hover:text-[#0066FF] py-1"
          >
            Cost Intelligence
          </a>
          <a 
            href="#fleet" 
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-slate-300 hover:text-[#0066FF] py-1"
          >
            Sedan Fleet
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button 
              onClick={() => { setMobileOpen(false); morphNavigate('/login'); }}
              className="btn-secondary text-xs text-center py-2.5 w-full"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setMobileOpen(false); morphNavigate('/register'); }}
              className="btn-primary text-xs text-center py-2.5 w-full"
            >
              Register for Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

