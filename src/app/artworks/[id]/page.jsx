"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArtworkDetails() {
  const params = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/artworks/${params.id}`);
        if (!res.ok) throw new Error("Artwork not found");
        const data = await res.json();
        setArtwork(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) {
      fetchArtwork();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error || "Artwork not found"}</p>
          <Link href="/browse" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Browse</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Image Display */}
          <div className="bg-[#e4e4e4] p-6 md:p-10 flex items-center justify-center relative min-h-[500px] border-[12px] border-gray-100/50">
            {/* Left Arrow */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-black/20 text-white transition-colors bg-black/10 backdrop-blur-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            
            {/* Right Arrow */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-black/20 text-white transition-colors bg-black/10 backdrop-blur-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="max-w-full max-h-[600px] object-contain shadow-lg" 
            />
          </div>

          {/* Right: Details Section */}
          <div className="flex flex-col pt-2 lg:pt-6">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
                {artwork.category}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1.5 font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(artwork.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-400 tracking-wider text-sm mb-3 uppercase font-semibold">
              ID#{artwork._id.slice(-5)}
            </p>
            
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">
              {artwork.title}
            </h1>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              {artwork.description}
            </p>
            
            {/* Artist Box */}
            <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-8 bg-gray-50/80 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={artwork.artistId?.avatar || '/default-avatar.png'} alt={artwork.artistId?.name || 'Artist'} className="w-12 h-12 rounded-full object-cover border border-white shadow-sm bg-white" />
                <div>
                  <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-0.5">Artist</p>
                  <Link href={`/artists/${artwork.artistId?._id}`} className="text-gray-900 font-bold text-sm hover:text-indigo-600 transition-colors">
                    {artwork.artistId?.name || 'Unknown Artist'}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified
              </div>
            </div>

            <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
              <div>
                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-1.5">Purchase Price</p>
                <p className="text-4xl font-black text-gray-900">${artwork.price?.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider mb-1.5">Availability</p>
                <p className={`font-extrabold text-sm tracking-wide uppercase ${artwork.status === 'sold' ? 'text-red-500' : 'text-emerald-600'}`}>
                  {artwork.status || 'Available'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              <button className="w-full bg-[#5A4AF4] hover:bg-[#4d3ee0] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                BUY NOW WITH STRIPE
              </button>
              <button className="w-full py-3.5 px-4 bg-white border border-gray-300 text-gray-900 font-semibold hover:border-gray-900 hover:bg-gray-50 transition-colors rounded-lg shadow-sm">
                Add To Wishlist
              </button>
            </div>

            {/* Benefits Box */}
            <div className="bg-[#fcfcfc] border border-gray-100 p-6 rounded-sm mb-6">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Shipping : Less than one week
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure delivery : United States + $162
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free returns within Two Weekes
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Authenticity Certificate
                </li>
                <li className="flex items-start gap-3 text-gray-600 text-sm">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="mb-3">Secured Payment Gateways</p>
                    <div className="flex gap-2.5 items-center">
                      <div className="w-11 h-7 bg-[#1434CB] rounded-sm text-[8px] text-white flex items-center justify-center font-bold tracking-wider">VISA</div>
                      <div className="w-11 h-7 bg-gradient-to-r from-[#EB001B] to-[#F79E1B] rounded-sm relative overflow-hidden flex items-center justify-center">
                         <div className="w-3.5 h-3.5 bg-[#EB001B] rounded-full absolute -ml-2.5"></div>
                         <div className="w-3.5 h-3.5 bg-[#F79E1B] rounded-full absolute ml-2.5 opacity-90"></div>
                      </div>
                      <div className="w-11 h-7 bg-[#006FCF] rounded-sm text-[7px] text-white flex items-center justify-center font-bold italic">AMEX</div>
                      <div className="w-11 h-7 bg-[#0064C8] rounded-sm flex items-center justify-center relative">
                        <div className="w-3 h-3 bg-[#EB001B] rounded-full absolute -ml-2.5"></div>
                        <div className="w-3 h-3 bg-[#00A4E4] rounded-full absolute ml-2.5 opacity-90"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm mt-2">
              Have any question? <span className="font-semibold text-gray-900 cursor-pointer hover:underline">Ask Us</span>
            </p>

          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-8">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Reviews & Comments (0)</h2>
          </div>
          
          <div className="border border-gray-300 rounded-xl py-5 px-6 mb-12 bg-white shadow-sm flex items-center">
            <p className="text-sm text-gray-500">
              Please <a href="/login" className="text-indigo-600 font-bold hover:underline">sign in</a> and verify your purchase history to leave a review.
            </p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-400 font-medium">No comments or reviews have been posted yet.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
