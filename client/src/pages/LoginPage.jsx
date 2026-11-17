import React, { useState } from 'react';
import { useMorphNavigate } from '../components/SquareMorphTransition';

export default function LoginPage() {
  const morphNavigate = useMorphNavigate();
  const [persona, setPersona] = useState('commuter'); // 'commuter' | 'chauffeur'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and transition smoothly back to landing
    morphNavigate('/');
  };

  return (
    <div className="bg-[#0D0D1A] text-[#F1F1EE] min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
      {/* Ambient Glows */}
      <div className="hero-glow"></div>
      <div className="ambient-blue-glow top-10 right-[-10%]"></div>

      {/* Top Header */}
      <header className="w-full glass-header py-4 px-6 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => morphNavigate('/')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
              <i className="fa-solid fa-plane-arrival text-sm"></i>
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-white">TOUCHDOWN</span>
          </button>

          <div className="text-xs text-slate-400">
            Don't have an executive account?
            <button 
              onClick={() => morphNavigate('/register')}
              className="text-[#0066FF] hover:underline font-semibold ml-1.5 cursor-pointer"
            >
              Register Here
            </button>
          </div>
        </div>
      </header>

      {/* Login Card Form */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-16 relative z-10">
        <div className="w-full max-w-md">
          <div className="luxury-card p-8 sm:p-10 border-white/10 shadow-2xl relative">
            
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="luxury-badge mx-auto">Portal Authentication</div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Sign In to Touchdown
              </h1>
              <p className="text-xs text-slate-400">
                Access your flight corridor match, digital boarding pass, or chauffeur manifest.
              </p>
            </div>

            {/* Persona Switcher */}
            <div className="bg-slate-900/90 p-1 rounded-xl border border-white/5 flex gap-1 mb-6 text-xs font-semibold">
              <button 
                type="button" 
                onClick={() => setPersona('commuter')}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  persona === 'commuter' ? 'bg-[#0066FF] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-user"></i>
                <span>Commuter</span>
              </button>
              <button 
                type="button" 
                onClick={() => setPersona('chauffeur')}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  persona === 'chauffeur' ? 'bg-[#0066FF] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-taxi"></i>
                <span>Chauffeur</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {persona === 'commuter' ? 'Business Email or Flight ID' : 'Chauffeur Partner ID / Phone'}
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={persona === 'commuter' ? "name@company.com or 6E-542" : "CH-8821 or +91 98450..."}
                    className="luxury-input pl-10"
                  />
                  <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">Access Key / Password</label>
                  <a href="#" className="text-[11px] text-[#0066FF] hover:underline">Forgot key?</a>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••" 
                    className="luxury-input pl-10"
                  />
                  <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 text-[#0066FF] focus:ring-[#0066FF]" />
                  <span>Remember this terminal</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">TLS 1.3 Encrypted</span>
              </div>

              <button type="submit" className="btn-primary w-full py-3.5 mt-2 text-xs uppercase tracking-wider cursor-pointer">
                <span>Sign In to Executive Portal</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <span className="relative bg-dark-card px-3 text-[11px] text-slate-500 font-mono uppercase">Or Enter With</span>
            </div>

            {/* SSO */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => morphNavigate('/')} className="btn-secondary py-2.5 text-xs w-full justify-center cursor-pointer">
                <i className="fa-brands fa-google text-slate-300"></i>
                <span>Google Workspace</span>
              </button>
              <button type="button" onClick={() => morphNavigate('/')} className="btn-secondary py-2.5 text-xs w-full justify-center cursor-pointer">
                <i className="fa-brands fa-microsoft text-slate-300"></i>
                <span>Microsoft SSO</span>
              </button>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center pt-4 border-t border-white/5">
              <button 
                onClick={() => morphNavigate('/')}
                className="text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-[10px]"></i>
                <span>Return to Landing Overview</span>
              </button>
            </div>

          </div>
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-white/5 text-center text-xs text-slate-500">
        &copy; 2026 Touchdown Mobility Technologies Inc. · Secured by End-to-End Corridor Cryptography
      </footer>
    </div>
  );
}

