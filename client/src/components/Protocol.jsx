import React from 'react';

export default function Protocol() {
  const steps = [
    {
      num: "01",
      title: "Check In On Arrival",
      desc: "Input your flight number and destination upon landing to sync with baggage carousel timing."
    },
    {
      num: "02",
      title: "Corridor Match",
      desc: "Paired with 1–2 passengers along your highway corridor with detour bounded strictly under 20%."
    },
    {
      num: "03",
      title: "Pillar 2A Staging",
      desc: "Bypass commercial taxi queues directly to Pillar 2A where your executive sedan awaits."
    },
    {
      num: "04",
      title: "Direct Home Glide",
      desc: "Relax in a private sedan cabin and save up to 45% compared to solo airport taxis."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[#08060D]/60 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="luxury-badge">The Protocol</div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            How Executive Pooling Works.
          </h2>
          <p className="text-slate-400 font-light text-sm sm:text-base">
            From gate deboarding to your doorstep in four seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div key={idx} className="luxury-card p-6 relative">
              <div className="text-3xl font-display font-black text-slate-700/80 mb-3">{step.num}</div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
