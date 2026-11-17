import React, { useState } from 'react';
import { useMorphNavigate } from '../components/SquareMorphTransition';

export default function RegisterPage() {
  const morphNavigate = useMorphNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hub: 'BLR',
    role: 'commuter',
    password: '',
    agree: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful registration, transition to login
    morphNavigate('/login');
  };

  return (
    <div className="bg-[#0D0D1A] text-[#F1F1EE] min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
      {/* Ambient Glows */}
      <div className="hero-glow"></div>
      <div className="ambient-blue-glow top-20 left-[-10%]"></div>

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
            Already have an account?
            <button 
              onClick={() => morphNavigate('/login')}
              className="text-[#0066FF] hover:underline font-semibold ml-1.5 cursor-pointer"
            >
              Sign In Here
            </button>
          </div>
        </div>
      </header>

      {/* Registration Card */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-16 relative z-10">
        <div className="w-full max-w-xl">
          <div className="luxury-card p-8 sm:p-12 border-white/10 shadow-2xl relative">
            
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="luxury-badge mx-auto">Private Membership</div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Register for Touchdown
              </h1>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Join the executive ground mobility network. Access synchronized corridor pooling, digital pillar boarding, and guaranteed sedans.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Legal Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Aarav Sharma" 
                      className="luxury-input pl-10" 
                    />
                    <i className="fa-solid fa-user absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Corporate / Personal Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="aarav@vistara.com" 
                      className="luxury-input pl-10" 
                    />
                    <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Mobile Number (SMS Updates)</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450 12345" 
                      className="luxury-input pl-10" 
                    />
                    <i className="fa-solid fa-phone absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Primary Airport Hub</label>
                  <div className="relative">
                    <select 
                      value={formData.hub}
                      onChange={(e) => setFormData({ ...formData, hub: e.target.value })}
                      className="luxury-input pl-10 appearance-none cursor-pointer"
                    >
                      <option value="BLR">BLR — Kempegowda Bengaluru</option>
                      <option value="DEL">DEL — Indira Gandhi New Delhi</option>
                      <option value="BOM">BOM — Chhatrapati Shivaji Mumbai</option>
                      <option value="SFO">SFO — San Francisco International</option>
                    </select>
                    <i className="fa-solid fa-plane-departure absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
                    <i className="fa-solid fa-chevron-down absolute right-3.5 top-3.5 text-[10px] text-slate-500 pointer-events-none"></i>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Membership Category</label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label 
                    onClick={() => setFormData({ ...formData, role: 'commuter' })}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                      formData.role === 'commuter' ? 'bg-[#0066FF]/15 border-[#0066FF]' : 'bg-slate-900/80 border-white/5'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="membership_role" 
                      checked={formData.role === 'commuter'} 
                      onChange={() => {}} 
                      className="text-[#0066FF] focus:ring-[#0066FF]" 
                    />
                    <div>
                      <strong className="text-white block">Executive Commuter</strong>
                      <span className="text-[10px] text-slate-400">Post-flight passenger</span>
                    </div>
                  </label>

                  <label 
                    onClick={() => setFormData({ ...formData, role: 'chauffeur' })}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                      formData.role === 'chauffeur' ? 'bg-[#0066FF]/15 border-[#0066FF]' : 'bg-slate-900/80 border-white/5'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="membership_role" 
                      checked={formData.role === 'chauffeur'} 
                      onChange={() => {}} 
                      className="text-[#0066FF] focus:ring-[#0066FF]" 
                    />
                    <div>
                      <strong className="text-white block">Chauffeur Partner</strong>
                      <span className="text-[10px] text-slate-400">Airport Sedan driver</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Create Secure Access Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Minimum 8 characters" 
                    className="luxury-input pl-10" 
                  />
                  <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    required 
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-[#0066FF] focus:ring-[#0066FF]" 
                  />
                  <span>
                    I agree to the Touchdown Executive Corridor Charter, strict baggage limits (max 1 check-in bag per commuter), and zero-backtracking routing rules.
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-primary w-full py-4 mt-4 text-xs uppercase tracking-wider cursor-pointer">
                <span>Complete Registration & Enter</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>

            </form>

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

