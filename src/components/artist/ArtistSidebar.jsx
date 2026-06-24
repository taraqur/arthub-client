"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Palette, 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  LogOut,
  PlusSquare
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

export default function ArtistSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard/artist", icon: LayoutDashboard },
    { name: "My Portfolio", href: "/dashboard/artist/artworks", icon: Palette },
    { name: "Add New Art", href: "/dashboard/artist/add-artwork", icon: PlusSquare },
    { name: "Sales History", href: "/dashboard/artist/sales", icon: TrendingUp },
    { name: "Settings", href: "/dashboard/artist/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-purple-700 tracking-tight">Creator Hub</h2>
        <p className="text-xs font-medium text-gray-500 mt-1">Artist Dashboard</p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <Link
          href="/dashboard/artist/help"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          Help Center
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
