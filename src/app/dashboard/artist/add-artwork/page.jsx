"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Info } from "lucide-react";

export default function AddArtworkPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Digital Art",
    tags: "",
    image: null
  });
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgbb = async (file) => {
    // Note: In production, the IMGBB API key should be injected via env variables
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "dummy"; 
    
    // For the sake of this mock/simulation, if no valid key is provided, we return a placeholder.
    if (IMGBB_API_KEY === "dummy") {
       return new Promise(resolve => setTimeout(() => resolve("https://api.dicebear.com/7.x/shapes/svg?seed=" + Math.random()), 1000));
    }

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      return data.data.url;
    }
    throw new Error("Failed to upload image");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      let imageUrl = "";
      if (formData.image) {
        imageUrl = await uploadToImgbb(formData.image);
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        imageUrl: imageUrl
      };

      const res = await fetch("http://localhost:5000/api/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });

      if (res.ok) {
        router.push('/dashboard/artist/artworks');
      } else {
        alert("Failed to create artwork.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Artwork</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Upload and list your new masterpiece to the marketplace.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        {/* Image Upload Area */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900">Artwork File <span className="text-red-500">*</span></label>
          <div className="flex justify-center items-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-200 transition-colors overflow-hidden relative">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-600 font-semibold"><span className="text-purple-600">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-400 font-medium">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  )}
                  <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleImageChange} required />
              </label>
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1 font-medium"><Info className="w-3 h-3"/> Image will be uploaded to imgBB</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">Title <span className="text-red-500">*</span></label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="E.g. Neon Dreams" />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">Price (USD) <span className="text-red-500">*</span></label>
            <input type="number" min="0" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="0.00" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">Category <span className="text-red-500">*</span></label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all">
              <option value="Digital Art">Digital Art</option>
              <option value="3D Model">3D Model</option>
              <option value="Photography">Photography</option>
              <option value="Illustration">Illustration</option>
              <option value="Vector">Vector</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900">Tags</label>
            <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="cyberpunk, neon, future (comma separated)" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900">Description <span className="text-red-500">*</span></label>
          <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none" placeholder="Describe your artwork..."></textarea>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Publishing..." : "Publish Artwork"}
          </button>
        </div>
      </form>
    </div>
  );
}
