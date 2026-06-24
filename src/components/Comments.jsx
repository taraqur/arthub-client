"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Loader2, Trash2, Edit2, X, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function Comments({ artworkId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchComments();
    checkAuthAndPurchase();
  }, [artworkId]);

  const checkAuthAndPurchase = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, { credentials: "include" });
        if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            
            // Check purchase
            const purchaseRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/purchases/check/${artworkId}`, { credentials: "include" });
            if (purchaseRes.ok) {
                const purchaseData = await purchaseRes.json();
                setHasPurchased(purchaseData.purchased);
            }
        }
    } catch(e) {}
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${artworkId}`);
      if (res.ok) {
        setComments(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !hasPurchased) return;
    
    try {
      setSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId, comment: newComment }),
        credentials: "include"
      });
      
      if (res.ok) {
        const commentData = await res.json();
        setComments([commentData, ...comments]);
        setNewComment("");
        toast.success("Comment posted successfully!");
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to post comment");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
      if (!confirm("Are you sure you want to delete this comment?")) return;
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`, {
              method: "DELETE",
              credentials: "include"
          });
          if (res.ok) {
              setComments(comments.filter(c => c._id !== commentId));
              toast.success("Comment deleted successfully");
          } else {
              const err = await res.json();
              toast.error(err.message || "Failed to delete comment");
          }
      } catch(e) {
          toast.error("An error occurred");
      }
  };

  const handleEditSubmit = async (commentId) => {
      if (!editContent.trim()) return;
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ comment: editContent }),
              credentials: "include"
          });
          if (res.ok) {
              const updated = await res.json();
              setComments(comments.map(c => c._id === commentId ? updated : c));
              setEditingId(null);
              toast.success("Comment updated successfully");
          } else {
              const err = await res.json();
              toast.error(err.message || "Failed to update comment");
          }
      } catch(e) {
          toast.error("An error occurred");
      }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 mt-12">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-8">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            Verified Reviews ({comments.length})
        </h3>

        {user ? (
            hasPurchased ? (
                <form onSubmit={handleSubmit} className="mb-10 flex gap-4">
                    <img 
                        src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                        alt={user.name} 
                        className="w-12 h-12 rounded-full object-cover bg-slate-100 shrink-0 border border-slate-200" 
                    />
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts on this artwork..."
                            className="w-full border border-slate-200 bg-slate-50 rounded-2xl pl-5 pr-14 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <button 
                            type="submit" 
                            disabled={!newComment.trim() || submitting}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-sm"
                        >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mb-10 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-center text-sm font-medium text-indigo-700 flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    You must purchase this artwork to leave a review.
                </div>
            )
        ) : (
            <div className="mb-10 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-sm font-medium text-slate-600">
                Please log in to leave a review.
            </div>
        )}

        <div className="space-y-6">
            {loading ? (
                <div className="text-center text-slate-400 text-sm py-8 flex flex-col items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                    Loading reviews...
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center text-slate-500 text-sm py-12 bg-slate-50 rounded-2xl border border-slate-100">
                    No reviews yet. Be the first to share your thoughts after purchasing!
                </div>
            ) : (
                comments.map(comment => (
                    <div key={comment._id} className="flex gap-4 group">
                        <img 
                            src={comment.userImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userName}`} 
                            alt={comment.userName} 
                            className="w-12 h-12 rounded-full object-cover bg-slate-100 shrink-0 border border-slate-200" 
                        />
                        <div className="flex-1">
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-extrabold text-slate-900 text-sm tracking-wide">{comment.userName}</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                {editingId === comment._id ? (
                                    <div className="mt-2 relative">
                                        <input
                                            type="text"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="w-full border border-indigo-200 bg-white rounded-xl pl-3 pr-20 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            autoFocus
                                        />
                                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                            <button onClick={() => handleEditSubmit(comment._id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-600 leading-relaxed">{comment.comment}</p>
                                )}
                            </div>
                            
                            {user && user.id === comment.userId && editingId !== comment._id && (
                                <div className="flex items-center gap-3 mt-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => { setEditingId(comment._id); setEditContent(comment.comment); }}
                                        className="text-xs font-bold text-indigo-500 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider"
                                    >
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(comment._id)}
                                        className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 uppercase tracking-wider"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  );
}
