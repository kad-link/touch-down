import React from 'react';

export default function AirportHubs() {
  const hubs = [
    {
      code: "BLR",
      name: "Bengaluru Kempegowda",
      desc: "Hebbal, Indiranagar, Koramangala, Whitefield, Electronic City radials."
    },
    {
      code: "DEL",
      name: "New Delhi Indira Gandhi",
      desc: "Gurgaon Cyber City, Golf Course Rd, South Delhi, Noida Expressways."
    },
    {
      code: "BOM",
      name: "Mumbai Chhatrapati Shivaji",
      desc: "Western Express Highway, BKC, South Mumbai, Powai/Thane corridors."
    },
    {
      code: "SFO",
      name: "San Francisco International",
      desc: "Downtown SF, Financial District, SOMA, Silicon Valley US-101 corridors."
    }
  ];

  return (
    <section id="airports" className="py-24 px-6 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="luxury-badge">Active Metro Hubs</div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Live Across High-Volume Airport Corridors.
          </h2>
          <p className="text-slate-400 font-light text-base sm:text-lg">
            Deployed at metro airports where long-distance arterial highway commutes yield massive pooling dividends.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, idx) => (
            <div key={idx} className="luxury-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold font-display text-white">{hub.code}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ACTIVE</span>
              </div>
              <div className="text-sm font-semibold text-slate-200">{hub.name}</div>
              <p className="text-xs text-slate-400">{hub.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

