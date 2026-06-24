"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function FeaturedArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artworks?limit=6`);
        if (res.ok) {
          const data = await res.json();
          // We can just grab the latest 6
          setArtworks(data.slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to fetch featured artworks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Artworks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most captivating pieces carefully selected by our curators.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Link href={`/artworks/${artwork._id}`} key={artwork._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-indigo-500/30 hover:shadow-xl transition-all duration-300 group cursor-pointer shadow-md block">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={artwork.imageUrl || 'https://via.placeholder.com/400'} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className={`absolute top-4 right-4 ${artwork.status === 'sold' ? 'bg-red-500' : 'bg-[#00d084]'} text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                    {artwork.status === 'sold' ? 'SOLD OUT' : 'AVAILABLE'}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full">
                    {artwork.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-500 text-xs mb-3">Uploaded {new Date(artwork.createdAt).toLocaleDateString()}</p>
                  <h3 className="text-gray-900 font-bold text-xl mb-3">{artwork.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[3rem] line-clamp-2">
                    {artwork.description}
                  </p>
                  
                  <div className="w-full h-px bg-gray-100 mb-5"></div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-500 text-[10px] font-bold tracking-wider uppercase mb-1">PRICE</p>
                      <p className="text-gray-900 text-2xl font-bold">${artwork.price?.toLocaleString()}</p>
                    </div>
                    <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full text-xs font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link href="/browse" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
            View All Artworks
          </Link>
        </div>
      </div>
    </section>
  );
}
