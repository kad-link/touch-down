import React from 'react';

export default function Protocol() {
  const steps = [
    {
      num: "01",
      title: "Check In On Arrival",
      desc: "Upon landing, input your flight number and destination via your Touchdown dashboard. The engine synchronizes with your baggage carousel timeline."
    },
    {
      num: "02",
      title: "Corridor Match",
      desc: "Our single-origin matcher pairs you with 1-2 passengers heading along your identical highway corridor. Detour is mathematically bounded under 20%."
    },
    {
      num: "03",
      title: "Priority Pillar Staging",
      desc: "Bypass commercial taxi queues. Your digital boarding pass directs you to a dedicated terminal pillar (e.g. Pillar 4B) where your chauffeur awaits."
    },
    {
      num: "04",
      title: "Arterial Home Glide",
      desc: "Relax in an executive sedan cabin with bottled water and high-speed charging. Pay up to 45% less while arriving home on schedule."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0D0D1A]/60 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="luxury-badge">The Protocol</div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How Executive Corridor Pooling Works.
          </h2>
          <p className="text-slate-400 font-light text-base sm:text-lg">
            From gate deboarding to your doorstep in four seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="luxury-card p-6 relative">
              <div className="text-4xl font-display font-extrabold text-slate-800 mb-4">{step.num}</div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

