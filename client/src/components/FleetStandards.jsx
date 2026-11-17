import React from 'react';

export default function FleetStandards() {
  const standards = [
    {
      icon: "fa-chair",
      title: "Cap: 3 Passengers Max",
      desc: "No middle-seat squeezing. You get ample legroom and privacy, guaranteeing an executive cabin atmosphere suitable for work calls."
    },
    {
      icon: "fa-box-archive",
      title: "Cap: 3 Check-In Bags",
      desc: "Every passenger is guaranteed dedicated space in the boot for one full-sized check-in suitcase plus one personal cabin carry-on."
    },
    {
      icon: "fa-shield-halved",
      title: "Vetted Airport Chauffeurs",
      desc: "4.8+ star rated chauffeurs with airport terminal security badges, clean backgrounds, and defensive highway driving certifications."
    }
  ];

  return (
    <section id="fleet" className="py-24 px-6 border-t border-white/5 bg-[#0D0D1A]/60 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="luxury-badge">Fleet Standards</div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Strictly Executive Sedans. No Compromise.
          </h2>
          <p className="text-slate-400 font-light text-base sm:text-lg">
            We do not mix vehicle segments. Touchdown operates exclusively with pristine executive sedans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {standards.map((s, idx) => (
            <div key={idx} className="luxury-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-[#0066FF] text-xl">
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold font-display text-white">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

