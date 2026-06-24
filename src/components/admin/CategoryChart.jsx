"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function CategoryChart({ data }) {
  const chartData = data && data.length > 0 ? data : [
    { name: "Digital Art", value: 0, color: "#8b5cf6" },
    { name: "Photography", value: 0, color: "#ec4899" },
    { name: "Painting", value: 0, color: "#f59e0b" },
    { name: "Other", value: 0, color: "#e5e7eb" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 h-full flex flex-col items-center justify-center relative">
      <h3 className="font-bold text-gray-900 text-lg absolute top-6 left-6">
        Category Distribution
      </h3>

      <div className="w-full flex-1 min-h-[250px] relative mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-gray-900 leading-none">100%</span>
          <span className="text-[10px] font-bold text-gray-400 tracking-wider mt-1 uppercase">Market Share</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full grid grid-cols-2 gap-y-3 gap-x-4 mt-6">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium text-gray-500">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
