import React from "react";
import HeroTitle from './HeroTitle';
import UpcomingEvents from './UpcomingEvents';

export default function Home() {
  // Sample events and chat data
  const events = [
    { date: '25', month: 'APR', title: 'BOSS INVASIGN', subtitle: 'BOSS INVASION' },
    { date: '27', month: 'APR', title: 'BASE DEFENSE', subtitle: 'BASE DEFENSE' },
    { date: '02', month: 'MAY', title: 'RESOURCE RAID', subtitle: 'RESOURCE RAID' },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center relative" 
         style={{ backgroundImage: "url('/Background-image.png')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main content */}
      <div className="relative z-10 px-4 pt-16 pb-8 md:px-6 md:pt-20 lg:px-8 lg:pt-24 lg:pb-12">
        {/* Title */}
        <HeroTitle />

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl">
          {/* Upcoming Events */}
          <UpcomingEvents events={events} />
        </div>
      </div>
    </div>
  );
}
