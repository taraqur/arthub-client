"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Eye } from "lucide-react";

export default function BoughtArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/purchases", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        // Extract artworks from purchases
        const collected = data.map(p => p.artworkId).filter(Boolean);
        setArtworks(collected);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading collection...</div>;

  return (
    <div className="max-w-6xl mx-auto w-full pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Collection</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Artworks you have purchased and own.</p>
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Your collection is empty</h2>
            <p className="text-gray-500 mt-2">Start exploring the marketplace to find your next masterpiece.</p>
            <Link href="/browse" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                Browse Marketplace
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((art, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                            src={art.imageUrl} 
                            alt={art.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                            <button className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:text-blue-600 transition-colors" title="Download High-Res">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{art.title}</h3>
                        <p className="text-sm font-medium text-gray-500 mb-4">{art.category}</p>
                        
                        <Link 
                            href={`/artwork/${art._id}`}
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-xl text-sm font-bold transition-colors"
                        >
                            <Eye className="w-4 h-4" /> View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
