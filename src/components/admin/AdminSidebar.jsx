"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  CreditCard,
  ClipboardList,
  LifeBuoy,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Curations", href: "/dashboard/admin/curations", icon: ImageIcon },
    { name: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
    { name: "Audit Logs", href: "/dashboard/admin/logs", icon: ClipboardList },
  ];

  const bottomNavItems = [
    { name: "Support", href: "/dashboard/admin/support", icon: LifeBuoy },
    { name: "Log Out", href: "/login", icon: LogOut }, // Or hook up to signOut
  ];

  return (
    <aside className="w-64 bg-[#fcfcfc] border-r border-gray-100 flex flex-col h-full hidden lg:flex shrink-0">
      {/* User Info */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
            .
          </div>
          <div>
            <h3 className="text-sm font-bold text-purple-600 leading-tight">
              Admin Control
            </h3>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider">
              SYSTEM OVERLORD
            </p>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#f4effc] text-purple-700 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="px-4 pb-6 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
