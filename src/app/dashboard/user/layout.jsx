import UserSidebar from "@/components/user/UserSidebar";
import UserTopNav from "@/components/user/UserTopNav";

export default function UserLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#f9fafb] overflow-hidden font-sans">
      <UserSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <UserTopNav />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
