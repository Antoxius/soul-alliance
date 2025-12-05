import React from "react";
import HeroTitle from './HeroTitle';

export default function Home() {
  // Sample members data
  const members = [
    { 
      name: 'MammaFrdryca', 
      role: 'Alliance Leader',
      rank: 'R5'
    },
    { 
      name: 'Ghis 420', 
      role: 'Warlord', 
      rank: 'R4'
    },
    { 
      name: 'Antoxius', 
      role: 'Butler',
      rank: 'R4'
    },
    { 
      name: 'Goofy', 
      role: 'Muse', 
      rank: 'R4'
    },
    {
      name: 'Gecko Queen',
      role: 'Rally coordinator',
      rank: 'R4'
    },
    {
      name: 'SoftSurv',
      role: 'Hive Coordinator',
      rank: 'R4'
    },
    {
      name: 'Aleron',
      role: 'NaN',
      rank: 'R4'
    },
    {
      name: 'HoliviaPool',
      role: 'Father',
      rank: 'R3'
    },
    {
      name: 'chop chop',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'scoobsheros',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'sams73',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Da Vinci',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'glitterbom',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Treeshelter',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Chandra15',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'GASMALAND',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'mr coccodè',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'SantiPhoenix',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Aeolus27',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'black rock',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'mrtaysn',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'saber v',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Lady Miku',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'HJS-77',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Unlucky1312',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'MrsUnicorn',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Juviny',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'CAndyLAnd',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'AskerbhadGem',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'HOLAKO',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'DuffMan90',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Bandit✮',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'Cornholio',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'BarriosSam',
      role: 'NaN',
      rank: 'R3'
    },
    {
      name: 'staniel',
      role: 'NaN',
      rank: 'R2'
    },
    {
      name: 'SisTerAn',
      role: 'NaN',
      rank: 'R2'
    },
    {
      name: 'Suzocha',
      role: 'NaN',
      rank: 'R2'
    },
    {
      name: 'schefs',
      role: 'NaN',
      rank: 'R2'
    },
    {
      name: 'Lukrecjama',
      role: 'NaN',
      rank: 'R2'
    },
    {
      name: 'Oktopus',
      role: 'NaN',
      rank: 'R2'
    },
    {
      name: 'Fleetwood',
      role: 'NaN',
      rank: 'R2'
    },
    {
      name: 'SuppleCat',
      role: 'NaN',
      rank: 'R2'
    }
  ];

  return (
    <div className="min-h-screen bg-cover bg-center relative" 
         style={{ backgroundImage: "url('/soul-alliance/Background-image.png')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main content */}
      <div className="relative z-10 px-4 pt-16 pb-8 md:px-6 md:pt-20 lg:px-8 lg:pt-24 lg:pb-12">
        {/* Title */}
        <HeroTitle />

        {/* Members Grid */}
        <div className="max-w-7xl mx-auto mt-12 space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wider text-center">
            CLAN MEMBERS
          </h3>

          {/* R5 Section - Alliance Leader */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold text-lg px-4 py-2 rounded">
                R5 - ALLIANCE LEADER
              </div>
              <div className="flex-1 h-0.5 bg-yellow-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {members.filter(m => m.rank === 'R5').map((member, index) => (
                <div key={index} className="bg-black/80 border-2 border-yellow-600 hover:border-yellow-400 transition-all duration-300 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center font-bold text-lg bg-gradient-to-br from-yellow-400 to-yellow-600 text-black border-2 border-yellow-700 rounded">
                      {member.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-white truncate">{member.name}</h4>
                      <p className="text-sm text-yellow-400 truncate">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* R4 Section - Officers */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-lg px-4 py-2 rounded">
                R4 - OFFICERS
              </div>
              <div className="flex-1 h-0.5 bg-purple-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {members.filter(m => m.rank === 'R4').map((member, index) => (
                <div key={index} className="bg-black/80 border-2 border-purple-600 hover:border-purple-400 transition-all duration-300 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center font-bold text-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white border-2 border-purple-800 rounded">
                      {member.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-white truncate">{member.name}</h4>
                      <p className="text-sm text-purple-300 truncate">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* R3 Section - Elite Members */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-lg px-4 py-2 rounded">
                R3 - ELITE MEMBERS
              </div>
              <div className="flex-1 h-0.5 bg-blue-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {members.filter(m => m.rank === 'R3').map((member, index) => (
                <div key={index} className="bg-black/80 border border-blue-600 hover:border-blue-400 transition-all duration-300 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center font-bold text-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white border-2 border-blue-800 rounded">
                      {member.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-white truncate">{member.name}</h4>
                      <p className="text-sm text-blue-300 truncate">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* R2 Section - Members */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-lg px-4 py-2 rounded">
                R2 - MEMBERS
              </div>
              <div className="flex-1 h-0.5 bg-green-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {members.filter(m => m.rank === 'R2').map((member, index) => (
                <div key={index} className="bg-black/80 border border-green-600 hover:border-green-400 transition-all duration-300 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center font-bold text-lg bg-gradient-to-br from-green-500 to-green-700 text-white border-2 border-green-800 rounded">
                      {member.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-white truncate">{member.name}</h4>
                      <p className="text-sm text-green-300 truncate">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
