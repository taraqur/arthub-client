export default function StatCard({ title, value, change, isPositive, isNeutral, icon: Icon, color, bgColor }) {
  return (
    <div className={`rounded-2xl p-6 ${bgColor || "bg-white"} shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between h-40 transition-transform hover:-translate-y-1 duration-300`}>
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color ? `text-${color}-500 bg-${color}-50` : "text-gray-500 bg-gray-50"}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {change && (
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isNeutral ? "bg-gray-100 text-gray-500" :
            isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}>
            {isPositive && !isNeutral ? "+" : ""}{change}
          </div>
        )}
      </div>
      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${bgColor && bgColor !== 'bg-white' ? 'text-white/80' : 'text-gray-400'}`}>
          {title}
        </h4>
        <div className={`text-3xl font-bold ${bgColor && bgColor !== 'bg-white' ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
