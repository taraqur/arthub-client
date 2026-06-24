import ArtistSidebar from "@/components/artist/ArtistSidebar";
import ArtistTopNav from "@/components/artist/ArtistTopNav";

export default function ArtistLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#f9fafb] overflow-hidden font-sans">
      <ArtistSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ArtistTopNav />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
