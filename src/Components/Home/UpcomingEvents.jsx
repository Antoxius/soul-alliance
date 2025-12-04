export default function UpcomingEvents({ events }) {
  return (
    <div className="bg-black/80 border border-gray-700 p-4 md:p-6 lg:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-wider">
        EVENT SCHEDULE
      </h3>
      <div className="space-y-3 md:space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-3 md:gap-4 pb-3 md:pb-4 border-b border-gray-700 last:border-0">
            <div className="text-center min-w-[50px] md:min-w-[60px]">
              <div className="text-3xl md:text-4xl font-bold text-white">{event.date}</div>
              <div className="text-xs md:text-sm text-gray-400">{event.month}</div>
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold text-white tracking-wide">{event.title}</div>
              <div className="text-sm md:text-base text-gray-400">{event.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
