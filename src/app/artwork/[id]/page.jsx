"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, ShieldCheck } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Comments from "@/components/Comments";

export default function ArtworkDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buying, setBuying] = useState(false);

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artworks/${id}`);
                if (!res.ok) throw new Error("Artwork not found");
                const data = await res.json();
                setArtwork(data);
            } catch (error) {
                console.error("Error:", error);
                toast.error("Could not load artwork details.");
            } finally {
                setLoading(false);
            }
        };
        fetchArtwork();
    }, [id]);

    const handleBuyNow = async () => {
        if (!session) {
            toast("Please sign in to purchase.", { icon: "🔒" });
            router.push("/login");
            return;
        }

        try {
            setBuying(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ artworkId: id })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to initiate purchase.");
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Purchase error:", error);
            toast.error(error.message || "Failed to process purchase.");
            setBuying(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!artwork) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Artwork not found</h2>
            <Link href="/browse" className="text-indigo-600 hover:underline">Return to Gallery</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
                <Link href="/browse" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Gallery
                </Link>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="bg-slate-100 flex items-center justify-center p-8 lg:p-12 min-h-[400px]">
                            <img 
                                src={artwork.imageUrl || 'https://via.placeholder.com/600'} 
                                alt={artwork.title}
                                className="max-w-full max-h-[600px] object-contain rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="p-8 lg:p-12 flex flex-col">
                            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-lg mb-4 w-fit">
                                {artwork.category}
                            </div>
                            
                            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                                {artwork.title}
                            </h1>
                            <p className="text-lg text-slate-500 font-medium mb-6">
                                by <span className="text-slate-900 font-bold">{artwork.artistName}</span>
                            </p>

                            <div className="prose prose-slate mb-8 max-w-none text-slate-600">
                                <p>{artwork.description}</p>
                            </div>

                            <div className="mt-auto">
                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                    <span>Secure transaction via <strong>Stripe</strong>. Instant digital delivery.</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Price</p>
                                        <div className="text-4xl font-extrabold text-slate-900">
                                            ${artwork.price?.toLocaleString()}
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={handleBuyNow}
                                        disabled={buying || artwork.status === 'sold'}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {buying ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : artwork.status === 'sold' ? (
                                            "SOLD OUT"
                                        ) : (
                                            <>
                                                <ShoppingBag className="w-5 h-5" />
                                                BUY NOW
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="max-w-4xl mx-auto">
                    <Comments artworkId={id} />
                </div>
            </div>
        </div>
    );
}
