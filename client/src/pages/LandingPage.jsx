import React from 'react';
import AirportScene from '../components/AirportScene';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import Protocol from '../components/Protocol';
import CostCalculator from '../components/CostCalculator';
import AirportHubs from '../components/AirportHubs';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08060D] text-[#F1F1EE] flex flex-col relative selection:bg-[#4C1D95] selection:text-white">
      {/* 3D Cinematic Airport Terminal, ATC Tower & Executive Sedan */}
      <AirportScene />

      {/* Floating Content Layers */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20">
          <Hero />
          <Capabilities />
          <Protocol />
          <CostCalculator />
          <AirportHubs />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
