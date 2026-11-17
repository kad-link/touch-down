import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import Protocol from '../components/Protocol';
import CostCalculator from '../components/CostCalculator';
import FleetStandards from '../components/FleetStandards';
import AirportHubs from '../components/AirportHubs';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D1A] text-[#F1F1EE] flex flex-col relative">
      <Navbar />
      <main className="flex-1 pt-20">
        <Hero />
        <Capabilities />
        <Protocol />
        <CostCalculator />
        <FleetStandards />
        <AirportHubs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

