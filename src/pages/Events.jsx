export default function Events() {
  const events = [
    {
      id: 1,
      title: "Frankenstein (Bio-Mutant)",
      time: "19:00 Server Time",
      schedule: "Days Alternate",
      icon: "🧟",
      image: "/soul-alliance/events/frankenstein.png",
      description: "Face off against the Bio-Mutant terror"
    },
    {
      id: 2,
      title: "Zombie Siege",
      time: "19:00 Server Time",
      schedule: "Days Alternate",
      icon: "🧟‍♂️",
      image: "/soul-alliance/events/zombie-siege.png",
      description: "Defend your base from the undead horde"
    },
    {
      id: 3,
      title: "Black Gold",
      time: "Check In-Game",
      schedule: "Sundays",
      icon: "💰",
      description: "Compete for valuable resources"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider mb-4 text-white">
            RECURRING EVENTS
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Join us for scheduled events happening every week
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-700 hover:border-red-700 transition-all duration-300 transform hover:scale-105 overflow-hidden bg-cover bg-center bg-gray-900"
              style={event.image ? { backgroundImage: `url(${event.image})` } : { backgroundColor: '#1a1a1a' }}
            >
              <div className="relative p-4 text-center h-48">
                <div className="absolute inset-0"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="text-5xl mb-2">{event.icon}</div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-wider text-white drop-shadow-lg">
                    {event.title}
                  </h2>
                </div>
              </div>
              
              <div className="bg-black/80 p-6 space-y-4">
                <p className="text-gray-300 text-center">{event.description}</p>
                
                <div className="space-y-2 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-bold">TIME:</span>
                    <span className="text-red-700 font-bold">{event.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-bold">SCHEDULE:</span>
                    <span className="text-white font-bold">{event.schedule}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Notice */}
        <div className="max-w-4xl mx-auto bg-red-900/20 border border-red-700 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="text-red-700 text-3xl">ℹ️</div>
            <div>
              <h3 className="font-bold text-xl mb-2 text-red-700">IMPORTANT NOTICE</h3>
              <p className="text-gray-300">
                For direct information and real-time updates, please check in-game announcements and the events calendar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}