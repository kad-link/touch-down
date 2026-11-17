import React from 'react';
import { useMorphNavigate } from './SquareMorphTransition';

export default function Footer() {
  const morphNavigate = useMorphNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
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
    <footer className="border-t border-white/10 bg-[#06040A] text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-950 via-indigo-950 to-violet-900 border border-violet-800/30 flex items-center justify-center text-slate-200">
              <i className="fa-solid fa-plane-arrival text-xs"></i>
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider text-white">TOUCHDOWN</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Touchdown is the dark luxury algorithmic mobility engine engineered to eradicate solo taxi wastage after flight arrivals. Premium shared sedans across high-volume urban radials.
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-sm pt-2">
            <a href="#" className="hover:text-violet-300 transition"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#" className="hover:text-violet-300 transition"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-violet-300 transition"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>

        {/* Links: Capabilities */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#capabilities" onClick={(e) => handleNavClick(e, '#capabilities')} className="hover:text-white transition">
                Radial Matching Engine
              </a>
            </li>
            <li>
              <a href="#capabilities" onClick={(e) => handleNavClick(e, '#capabilities')} className="hover:text-white transition">
                Detour Compensation
              </a>
            </li>
            <li>
              <a href="#capabilities" onClick={(e) => handleNavClick(e, '#capabilities')} className="hover:text-white transition">
                Luggage-First Gating
              </a>
            </li>
            <li>
              <a href="#calculator" onClick={(e) => handleNavClick(e, '#calculator')} className="hover:text-white transition">
                Cost Intelligence
              </a>
            </li>
            <li>
              <a href="#capabilities" onClick={(e) => handleNavClick(e, '#capabilities')} className="hover:text-white transition">
                Executive Sedans
              </a>
            </li>
          </ul>
        </div>

        {/* Links: Hubs */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Airport Hubs</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#airports" onClick={(e) => handleNavClick(e, '#airports')} className="hover:text-white transition">
                Visakhapatnam (VTZ)
              </a>
            </li>
            <li>
              <a href="#airports" onClick={(e) => handleNavClick(e, '#airports')} className="hover:text-white transition">
                Indira Gandhi (DEL)
              </a>
            </li>
            <li>
              <a href="#airports" onClick={(e) => handleNavClick(e, '#airports')} className="hover:text-white transition">
                Chhatrapati Shivaji (BOM)
              </a>
            </li>
            <li>
              <a href="#airports" onClick={(e) => handleNavClick(e, '#airports')} className="hover:text-white transition">
                San Francisco (SFO)
              </a>
            </li>
            <li>
              <button onClick={() => morphNavigate('/register')} className="hover:text-white transition cursor-pointer">
                Enterprise Terminal API
              </button>
            </li>
          </ul>
        </div>

        {/* Links: Membership */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Portal Access</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => morphNavigate('/login')} className="hover:text-white transition cursor-pointer">
                Executive Sign In
              </button>
            </li>
            <li>
              <button onClick={() => morphNavigate('/register')} className="hover:text-white transition cursor-pointer">
                Create Membership
              </button>
            </li>
            <li><a href="#" className="hover:text-white transition">Corporate Ground Mobility</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy & Security Charter</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Status */}
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          &copy; 2026 Touchdown Mobility Technologies Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-mono text-[11px] text-slate-400">Corridor Nodes Operational: VTZ · DEL · BOM · SFO</span>
        </div>
      </div>
    </footer>
  );
}
