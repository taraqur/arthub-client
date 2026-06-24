"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";

export default function CurationsPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/artworks`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setArtworks(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/artworks/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: "include"
      });
      if (res.ok) fetchArtworks();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this artwork?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/artworks/${id}`, {
        method: 'DELETE',
        credentials: "include"
      });
      if (res.ok) fetchArtworks();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Curations</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Review and manage submitted artworks.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Artwork</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Artist</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500 text-sm">Loading...</td></tr>
              ) : artworks.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-500 text-sm">No artworks found.</td></tr>
              ) : artworks.map(art => (
                <tr key={art._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={art.imageUrl} alt={art.title} className="w-12 h-12 rounded object-cover bg-gray-100" />
                      <div className="text-sm font-bold text-gray-900">{art.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {art.artistId?.name || art.artistId?.email || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    ${art.price}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      art.status === 'available' ? 'bg-green-100 text-green-700' :
                      art.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {art.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleStatusChange(art._id, 'available')} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Approve/Make Available">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleStatusChange(art._id, 'rejected')} className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Reject">
                        <X className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(art._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
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
