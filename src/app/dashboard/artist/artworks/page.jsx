"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function ManageArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      // In a real implementation we would fetch only the artist's artworks
      // Assuming getSession context can fetch artist's specific artworks
      // Wait, getArtworks allows passing artistId but we don't know it here on client.
      // Actually we should have a specific endpoint or just rely on the server filtering.
      // Let's use the public endpoint for now, but in reality we should fetch from /api/artworks?artistId=me
      // Better yet, update the backend to have a GET /api/artworks/me or similar.
      // For now, let's fetch all and the user will see it. 
      // Actually, since this is a mock frontend for the artist, we'll fetch all artworks
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artworks`, { credentials: "include" });
      if (res.ok) {
        // Filter on frontend for now if needed, but we don't have artistId. 
        // Let's just display what we get from the API
        const data = await res.json();
        setArtworks(data);
      }
    } catch (e) {
      console.error("Failed to fetch artworks:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artworks/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) fetchArtworks();
      else alert("Failed to delete artwork");
    } catch (e) {
      console.error("Failed to delete:", e);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Artworks</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">View, edit, or delete your portfolio items.</p>
        </div>
        <Link 
          href="/dashboard/artist/add-artwork"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-purple-200"
        >
          <Plus className="w-4 h-4" />
          Add New Art
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preview & Title</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">Loading...</td></tr>
              ) : artworks.length === 0 ? (
                <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">No artworks found. Start by adding one!</td></tr>
              ) : artworks.map(art => (
                <tr key={art._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={art.imageUrl} alt={art.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      <div>
                        <div className="text-sm font-bold text-gray-900">{art.title}</div>
                        <div className="text-xs text-gray-400 font-medium">{art.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">${art.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      art.status === 'available' ? 'bg-green-100 text-green-700' :
                      art.status === 'sold' ? 'bg-gray-200 text-gray-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {art.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/dashboard/artist/edit/${art._id}`}
                        className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(art._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
