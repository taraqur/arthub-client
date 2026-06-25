"use client";

import StatCard from "@/components/admin/StatCard";
import SalesChart from "@/components/admin/SalesChart";
import CategoryChart from "@/components/admin/CategoryChart";
import UsersTable from "@/components/admin/UsersTable";
import { Users, UserCircle2, ShoppingCart, Wallet } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminDash() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    artworksSold: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error("Failed to fetch stats:", e);
      }
    };
    fetchStats();
  }, []);

  // Format revenue to a readable string (e.g., "$4.2M" or "$500")
  const formatRevenue = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
    return `$${amount}`;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Overview</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Real-time performance metrics and user management.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="Real-time"
          isNeutral={true}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Total Artists"
          value={stats.totalArtists.toLocaleString()}
          change="Real-time"
          isNeutral={true}
          icon={UserCircle2}
          color="pink"
        />
        <StatCard
          title="Artworks Sold"
          value={stats.artworksSold.toLocaleString()}
          change="Real-time"
          isNeutral={true}
          icon={ShoppingCart}
          color="amber"
        />
        <StatCard
          title="Total Revenue"
          value={formatRevenue(stats.totalRevenue)}
          change="Real-time"
          isNeutral={true}
          icon={Wallet}
          color="purple"
          bgColor="bg-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={stats.salesData} />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart data={stats.categoryData} />
        </div>
      </div>

      {/* Table */}
      <div>
        <UsersTable />
      </div>

      {/* Footer / Copyright area inside layout */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-start text-xs text-gray-400 font-medium border-t border-gray-100">
        <div className="flex flex-col gap-2 md:w-1/2">
          <h4 className="text-gray-900 font-bold text-base tracking-tight">ArtHub Visionary Marketplace</h4>
          <p className="leading-relaxed">Empowering digital artists through cutting-edge curation and high-end collector engagement.</p>
          <p className="mt-2">©Copyright 2026 <span className="font-bold text-gray-700">ArtHub</span> | Design By <span className="font-bold text-gray-700">Md. Taraqur Rahman</span></p>
        </div>
        
        <div className="flex gap-12 mt-6 md:mt-0">
           <div className="flex flex-col gap-2">
              <span className="font-bold text-gray-900 mb-1">Resources</span>
              <a href="#" className="hover:text-purple-600 transition-colors">Artist Agreement</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Press Kit</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Help Center</a>
           </div>
           <div className="flex flex-col gap-2">
              <span className="font-bold text-gray-900 mb-1">Legal</span>
              <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
           </div>
        </div>
      </div>
    </div>
  );
}
