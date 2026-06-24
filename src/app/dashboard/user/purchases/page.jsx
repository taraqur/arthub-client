"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/purchases`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setPurchases(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Purchase History</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Review your past transactions and receipts.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Artwork</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-6 text-center text-sm text-gray-500">Loading...</td></tr>
              ) : purchases.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-sm text-gray-500">No purchases found.</td></tr>
              ) : purchases.map(purchase => (
                <tr key={purchase._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">{purchase._id.slice(-8).toUpperCase()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {purchase.artworkId?.imageUrl && (
                        <img src={purchase.artworkId.imageUrl} alt="art" className="w-10 h-10 rounded object-cover" />
                      )}
                      <div>
                        <div className="text-sm font-bold text-gray-900">{purchase.artworkId?.title || 'Deleted Artwork'}</div>
                        <Link href={`/artwork/${purchase.artworkId?._id}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          View details <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {formatCurrency(purchase.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      purchase.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {purchase.status}
                    </span>
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
