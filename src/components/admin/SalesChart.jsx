"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ data }) {
  const chartData = data && data.length > 0 ? data : [
    { name: "JAN", sales: 0 },
    { name: "FEB", sales: 0 },
    { name: "MAR", sales: 0 },
    { name: "APR", sales: 0 },
    { name: "MAY", sales: 0 },
    { name: "JUN", sales: 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Sales Performance</h3>
        <button className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
          Last 6 Months ▾
        </button>
      </div>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#fff", fontSize: 0 }} // Hidden Y Axis labels as per design
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
