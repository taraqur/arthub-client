"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Download, Loader2 } from "lucide-react";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sales/history`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSales(data);
      }
    } catch (e) {
      console.error("Failed to fetch sales history:", e);
    } finally {
      setLoading(false);
    }
  };

  const totalEarnings = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const artworksSold = sales.length;

  const formatCurrency = (amount) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sales History</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Track your earnings and recent transactions.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Earnings</p>
          <h3 className="text-3xl font-bold text-gray-900">{loading ? "..." : formatCurrency(totalEarnings)}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Artworks Sold</p>
          <h3 className="text-3xl font-bold text-gray-900">{loading ? "..." : artworksSold}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Balance</p>
          <h3 className="text-3xl font-bold text-gray-900">{loading ? "..." : "$0.00"}</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Recent Transactions
          </h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Artwork</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="6" className="p-6 text-center text-sm text-gray-500">Loading sales history...</td></tr>
              ) : sales.length === 0 ? (
                <tr><td colSpan="6" className="p-6 text-center text-sm text-gray-500">No sales history found.</td></tr>
              ) : sales.map(sale => (
                <tr key={sale._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">{sale._id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{sale.artworkId?.title || 'Unknown Artwork'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(sale.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">@{sale.buyerName || sale.buyerId}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      sale.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">+{formatCurrency(sale.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
