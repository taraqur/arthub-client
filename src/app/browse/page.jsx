"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export default function BrowseArtworks() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("newest");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [page, setPage] = useState(1);
    const limit = 8;

    const categories = ["All", "Digital", "Painting", "Photography", "AI Art", "3D"];

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/api/artworks?sort=${sort}`;
                if (search) url += `&search=${search}`;
                if (category !== "All") url += `&category=${category}`;
                if (minPrice) url += `&minPrice=${minPrice}`;
                if (maxPrice) url += `&maxPrice=${maxPrice}`;

                const res = await fetch(url);
                const data = await res.json();
                setArtworks(data);
            } catch (error) {
                console.error("Failed to fetch artworks", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchArtworks();
            setPage(1); // reset to page 1 on filter change
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [search, category, sort, minPrice, maxPrice]);

    // Client-side pagination since backend doesn't paginate currently
    const paginatedArtworks = artworks.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(artworks.length / limit) || 1;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-6 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Discover Extraordinary Art</h1>
                    
                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Search by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-white border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>

                            <select 
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="bg-white border border-slate-200 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                            
                            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
                                <span className="text-sm text-slate-500 font-medium">Price:</span>
                                <input 
                                    type="number" 
                                    placeholder="Min" 
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-16 py-1.5 px-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                                <span className="text-slate-300">-</span>
                                <input 
                                    type="number" 
                                    placeholder="Max" 
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-16 py-1.5 px-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse h-[360px]">
                                <div className="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
                                <div className="h-5 w-3/4 bg-slate-200 rounded mb-2"></div>
                                <div className="h-4 w-1/2 bg-slate-200 rounded mb-4"></div>
                                <div className="h-10 w-full bg-slate-200 rounded-xl mt-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : paginatedArtworks.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {paginatedArtworks.map(artwork => (
                                <Link href={`/artworks/${artwork._id}`} key={artwork._id} className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden">
                                    <div className="aspect-square w-full overflow-hidden relative bg-slate-100">
                                        <img 
                                            src={artwork.imageUrl || 'https://via.placeholder.com/400'} 
                                            alt={artwork.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                                            {artwork.category}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="font-bold text-slate-900 text-lg line-clamp-1 mb-1">{artwork.title}</h3>
                                        <p className="text-sm text-slate-500 mb-4 line-clamp-1">by {artwork.artistName}</p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-lg font-extrabold text-indigo-600">${artwork.price?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-colors ${
                                                page === i + 1 
                                                    ? 'bg-indigo-600 text-white shadow-sm' 
                                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No artworks found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">We couldn't find anything matching your current filters. Try adjusting your search criteria.</p>
                        <button 
                            onClick={() => {
                                setSearch(""); setCategory("All"); setMinPrice(""); setMaxPrice("");
                            }}
                            className="mt-6 px-6 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
