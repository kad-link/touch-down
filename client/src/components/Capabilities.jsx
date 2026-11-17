import React from 'react';

export default function Capabilities() {
  const capabilities = [
    {
      icon: "fa-diagram-project",
      title: "Corridor Conflation",
      desc: "Synchronizes deboarded passengers heading along the same highway radial. Guarantees near-to-far drop sequence with zero backtracking.",
      tag: "OSRM Road Graph"
    },
    {
      icon: "fa-car",
      title: "Guaranteed Sedans Only",
      desc: "Strictly capped at 3 passengers and 3 check-in bags per vehicle. Ample legroom, dedicated trunk space, and professional executive service.",
      tag: "Executive Fleet"
    },
    {
      icon: "fa-car",
      title: "Guaranteed Sedans Only",
      desc: "Strictly capped at 3 passengers and 3 check-in bags per vehicle. Ample legroom, dedicated trunk space, and professional executive service.",
      tag: "Executive Fleet"
    },
    {
      icon: "fa-scale-balanced",
      title: "Detour-Compensated Split",
      desc: "First-drop riders receive baseline fare reductions. Downstream passengers enduring marginal minutes receive boosted rebates up to 45% off.",
      tag: "Fair Split Protocol"
    }
  ];

  return (
    <section id="capabilities" className="py-20 px-6 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="luxury-badge">Core Capabilities</div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Engineered for Post-Flight Dispersal.
          </h2>
          <p className="text-slate-400 font-light text-sm sm:text-base">
            Eliminating solo taxi congestion through single-depot corridor matching and fair fare splits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="luxury-card p-7 flex flex-col justify-between">
              <div>
                <div className="feature-icon-wrapper mb-5">
                  <i className={`fa-solid ${cap.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">{cap.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{cap.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Protocol</span>
                <span className="text-violet-300">{cap.tag}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
