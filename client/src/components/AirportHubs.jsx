import React from 'react';

export default function AirportHubs() {
  const hubs = [
    {
      code: "VTZ",
      name: "Visakhapatnam",
      sub: "International",
      corridor: "NH-16 Tech Corridor"
    },
    {
      code: "DEL",
      name: "New Delhi",
      sub: "Indira Gandhi",
      corridor: "Gurgaon & Expressway Radials"
    },
    {
      code: "BOM",
      name: "Mumbai",
      sub: "Chhatrapati Shivaji",
      corridor: "WEH & BKC Connectors"
    },
    {
      code: "SFO",
      name: "San Francisco",
      sub: "International",
      corridor: "US-101 Bay Corridor"
    }
  ];

  return (
    <section id="airports" className="py-20 px-6 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="luxury-badge">Operational Hubs</div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Active Airport Corridors.
          </h2>
          <p className="text-slate-400 font-light text-sm sm:text-base">
            Live across arterial metro corridors with high commuter density.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {hubs.map((hub, idx) => (
            <div key={idx} className="luxury-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold font-display text-white">{hub.code}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-400">ACTIVE</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">{hub.name}</div>
                <div className="text-xs text-slate-500">{hub.sub}</div>
              </div>
              <p className="text-[11px] text-violet-300 font-mono pt-1">{hub.corridor}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
