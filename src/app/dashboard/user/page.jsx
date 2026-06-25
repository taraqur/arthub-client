"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Camera } from "lucide-react";
import { uploadImage } from "@/services/imageUpload";

export default function UserProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "", image: "", subscriptionTier: "free" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setProfile({
            name: data.name || "",
            email: data.email || "",
            image: data.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
            subscriptionTier: data.subscriptionTier || "free"
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadImage(file);
      setProfile(prev => ({ ...prev, image: imageUrl }));
    } catch (err) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile.name, image: profile.image }),
        credentials: "include"
      });
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto w-full pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Profile</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Manage your account details and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
            <div className="absolute -bottom-12 left-8">
                <div className="relative group" onClick={() => fileInputRef.current?.click()}>
                    <img 
                        src={profile.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name || 'default'}`} 
                        alt={profile.name || 'User'} 
                        className={`w-24 h-24 rounded-full border-4 border-white object-cover bg-white ${uploadingImage ? 'opacity-50' : ''}`}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        {uploadingImage ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {profile.subscriptionTier} Tier
                </span>
            </div>
        </div>

        <div className="pt-16 p-8">
            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-900">Full Name</label>
                        <input 
                            type="text" 
                            value={profile.name} 
                            onChange={e => setProfile({...profile, name: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-900">Email Address</label>
                        <input 
                            type="email" 
                            disabled 
                            value={profile.email} 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 font-medium">Email cannot be changed.</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-900">Profile Image URL</label>
                    <input 
                        type="url" 
                        value={profile.image} 
                        onChange={e => setProfile({...profile, image: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="https://example.com/avatar.jpg"
                    />
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={saving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-200 disabled:opacity-50"
                    >
                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
