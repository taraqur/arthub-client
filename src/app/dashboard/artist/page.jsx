"use client";

import { useEffect, useState } from "react";
import { Palette, ShoppingCart, TrendingUp } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function ArtistDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalArtworks: 0,
    activeSales: 0,
    totalRevenue: 0
  });
  
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
        fetchDashboardData(session.user.id);
    } else if (session === null) {
        setLoading(false);
    }
  }, [session]);

  const fetchDashboardData = async (artistId) => {
    try {
      setLoading(true);
      const [artworksRes, salesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artworks?artistId=${artistId}`, { credentials: "include" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sales/history`, { credentials: "include" })
      ]);

      let artworks = [];
      let sales = [];

      if (artworksRes.ok) artworks = await artworksRes.json();
      if (salesRes.ok) sales = await salesRes.json();

      const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

      setStats({
        totalArtworks: artworks.length,
        activeSales: artworks.filter(a => a.status === 'available').length,
        totalRevenue
      });
      
      setRecentSales(sales.slice(0, 5));
    } catch (e) {
      console.error("Failed to fetch dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Artist Dashboard</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Manage your collection and view your sales performance.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border border-purple-100">
          <TrendingUp className="w-4 h-4" />
          {formatCurrency(stats.totalRevenue)}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Palette className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">All time</span>
          </div>
          <p className="text-sm font-medium text-gray-500">Total Artworks</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{loading ? "..." : stats.totalArtworks}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Available</span>
          </div>
          <p className="text-sm font-medium text-gray-500">Active Listings</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{loading ? "..." : stats.activeSales}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{loading ? "..." : formatCurrency(stats.totalRevenue)}</h3>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Recent Sales</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Artwork Title</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">Loading...</td></tr>
              ) : recentSales.length === 0 ? (
                <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">No sales yet.</td></tr>
              ) : recentSales.map(sale => (
                <tr key={sale._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{sale.artworkId?.title || 'Unknown Artwork'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{sale.buyerName || sale.buyerId}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(sale.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">+{formatCurrency(sale.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
