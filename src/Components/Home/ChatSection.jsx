export default function ChatSection({ messages }) {
  return (
    <div className="bg-black/80 border border-gray-700 p-4 md:p-6 lg:p-8 lg:col-span-2">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider">CHAT</h3>
        <button className="text-gray-500 hover:text-gray-300 text-xl md:text-2xl">⋯</button>
      </div>
      <div className="space-y-2 md:space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start gap-3 md:gap-4 p-2 md:p-3 hover:bg-white/5 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
            </div>
            <div className="flex-1">
              <div className="font-bold text-white mb-1 text-sm md:text-base">{msg.name}</div>
              <div className="text-gray-400 text-xs md:text-sm">{msg.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
