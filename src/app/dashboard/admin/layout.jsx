import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopNav from "@/components/admin/AdminTopNav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#f9fafb] overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopNav />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
