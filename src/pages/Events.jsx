export default function Events() {
  const events = [
    {
      id: 1,
      title: "Frankenstein (Bio-Mutant)",
      time: "19:00 Server Time",
      schedule: "Days Alternate",
      icon: "🧟",
      description: "Face off against the Bio-Mutant terror",
      color: "from-green-900 to-green-700"
    },
    {
      id: 2,
      title: "Zombie Siege",
      time: "19:00 Server Time",
      schedule: "Days Alternate",
      icon: "🧟‍♂️",
      description: "Defend your base from the undead horde",
      color: "from-red-900 to-red-700"
    },
    {
      id: 3,
      title: "Black Gold",
      time: "Check In-Game",
      schedule: "Sundays",
      icon: "💰",
      description: "Compete for valuable resources",
      color: "from-yellow-900 to-yellow-700"
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
              className="bg-black/80 border border-gray-700 hover:border-red-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`bg-gradient-to-r ${event.color} p-4 text-center`}>
                <div className="text-5xl mb-2">{event.icon}</div>
                <h2 className="text-xl md:text-2xl font-bold tracking-wider text-white">
                  {event.title}
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
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