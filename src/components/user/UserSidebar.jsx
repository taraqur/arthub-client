"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  User, 
  Clock, 
  Image as ImageIcon, 
  CreditCard,
  LogOut,
  HelpCircle
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const navItems = [
    { name: "My Profile", href: "/dashboard/user", icon: User },
    { name: "Bought Artworks", href: "/dashboard/user/collection", icon: ImageIcon },
    { name: "Purchase History", href: "/dashboard/user/purchases", icon: Clock },
    { name: "Subscription", href: "/dashboard/user/subscription", icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-blue-700 tracking-tight">My ArtHub</h2>
        <p className="text-xs font-medium text-gray-500 mt-1">Collector Dashboard</p>
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
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
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
          href="/dashboard/user/help"
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
