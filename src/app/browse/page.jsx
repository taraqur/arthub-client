"use client";

import React from 'react';
import Link from 'next/link';

const featuredArtworks = [
  {
    id: 1,
    image: '/featured/artwork1.jpg',
    category: 'SCULPTURE',
    title: 'Shattered Grace',
    artist: 'Jane Vincent',
    price: '$600',
    available: true,
  },
  {
    id: 2,
    image: '/featured/artwork2.jpg',
    category: 'SCULPTURE',
    title: 'The Silent Thinker',
    artist: 'Diego Rivera',
    price: '$850',
    available: true,
  },
  {
    id: 3,
    image: '/featured/artwork3.jpg',
    category: 'DIGITAL',
    title: 'Neon Oasis',
    artist: 'Gustav Klimt',
    price: '$250',
    available: true,
  },
  {
    id: 4,
    image: '/featured/artwork4.jpg',
    category: 'PAINTING',
    title: 'Ethereal Forest',
    artist: 'Jane Vincent',
    price: '$320',
    available: true,
  },
  {
    id: 5,
    image: '/featured/artwork5.jpg',
    category: 'DIGITAL',
    title: 'Fragments of Time',
    artist: 'ArtHub Curator',
    price: '$120',
    available: true,
  },
  {
    id: 6,
    image: '/featured/artwork6.jpg',
    category: 'PAINTING',
    title: 'Celestial Whispers',
    artist: 'Gustav Klimt',
    price: '$450',
    available: true,
  }
];

export default function Browse() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 pt-20 pb-24 px-4 md:px-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900">Explore Artworks</h1>
          <p className="text-gray-500 text-lg max-w-2xl">Discover unique pieces created by verified artists from around the world. Browse our carefully curated collection.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm sticky top-24">
              
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                </div>
                <button className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">Search</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Title or artist..." 
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">Category</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm font-medium">
                    <option>All Categories</option>
                    <option>Painting</option>
                    <option>Sculpture</option>
                    <option>Digital</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">Price Range</label>
                <div className="flex items-center gap-3 mb-4">
                  <input type="text" placeholder="Min" className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm font-medium" />
                  <span className="text-gray-400 font-bold">-</span>
                  <input type="text" placeholder="Max" className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm font-medium" />
                </div>
                <button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md hover:shadow-lg">
                  Apply Price
                </button>
              </div>

              {/* Availability */}
              <div className="mb-2">
                <label className="block text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">Availability</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-700 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm font-medium">
                    <option>All Items</option>
                    <option>Available</option>
                    <option>Sold</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-white border border-gray-200 p-4 px-6 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm font-medium mb-3 sm:mb-0">
                Showing <span className="font-bold text-gray-900">6</span> of <span className="font-bold text-gray-900">6</span> Artworks
              </p>
              <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-lg px-3 py-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <select className="bg-transparent text-gray-700 text-sm font-bold focus:outline-none cursor-pointer appearance-none pr-4">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredArtworks.map((artwork) => (
                <div key={artwork.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 group flex flex-col shadow-sm">
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden bg-gray-100">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    {artwork.available && (
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                        AVAILABLE
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-indigo-600 bg-indigo-50 inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider mb-4 w-max">{artwork.category}</p>
                    <h3 className="text-gray-900 font-extrabold text-xl mb-1">{artwork.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 font-medium">By: <span className="text-gray-900 font-bold">{artwork.artist}</span></p>
                    
                    <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-end">
                      <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Price</p>
                         <p className="text-gray-900 text-2xl font-black">{artwork.price}</p>
                      </div>
                      <Link href={`/artworks/${artwork.id}`} className="text-white bg-gray-900 hover:bg-indigo-600 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
