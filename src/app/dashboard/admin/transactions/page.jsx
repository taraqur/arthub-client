"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/admin/transactions", {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Transactions</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Overview of all platform payments and transfers.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500 text-sm">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500 text-sm">No transactions yet.</td></tr>
              ) : transactions.map(t => (
                <tr key={t._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">{t._id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{t.buyerName || t.buyerId}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 flex items-center gap-1">
                    ${t.amount} {t.currency?.toUpperCase() || 'USD'}
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      t.status === 'completed' ? 'bg-green-100 text-green-700' :
                      t.status === 'failed' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
