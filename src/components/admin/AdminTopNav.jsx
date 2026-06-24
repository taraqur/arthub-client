"use client";

import Link from "next/link";
import { Search, Bell, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";

export default function AdminTopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const links = [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Artists", href: "/dashboard/admin/artists" },
    { name: "Market", href: "/dashboard/admin/market" },
    { name: "Settings", href: "/dashboard/admin/settings" },
  ];

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <span className="font-serif text-2xl font-bold tracking-tight text-purple-700">
            ArtHub
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-purple-600 border-b-2 border-purple-600 py-7"
                    : "text-gray-500 hover:text-gray-900 py-7"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full bg-gray-50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 text-gray-700"
          />
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <button 
              className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin profile"
                className="w-full h-full object-cover"
              />
            </button>
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
