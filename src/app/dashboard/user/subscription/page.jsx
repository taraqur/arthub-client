"use client";

import { useEffect, useState } from "react";
import { Check, Star, Zap, Loader2 } from "lucide-react";

export default function SubscriptionPage() {
  const [currentTier, setCurrentTier] = useState("free");
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCurrentTier(data.subscriptionTier || "free");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (tier) => {
    if (tier === currentTier) return;
    
    try {
      setUpgrading(tier);
      
      const res = await fetch("http://localhost:5000/api/payments/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
        credentials: "include"
      });
      const data = await res.json();
      
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Failed to initiate subscription upgrade.");
        setUpgrading(null);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred");
      setUpgrading(null);
    }
  };

  const plans = [
    {
      id: "free",
      name: "Basic Collector",
      price: "0",
      description: "Perfect for getting started and browsing the marketplace.",
      icon: Star,
      features: [
        "Browse all public artworks",
        "Standard support",
        "Purchase individual pieces",
        "Leave comments and reviews"
      ]
    },
    {
      id: "pro",
      name: "Pro Enthusiast",
      price: "9.99",
      description: "For serious art collectors wanting early access.",
      icon: Zap,
      features: [
        "Everything in Basic",
        "24-hour early access to new drops",
        "High-res downloads (4K)",
        "Priority support",
        "10% discount on all purchases"
      ]
    },
    {
      id: "premium",
      name: "Premium Patron",
      price: "24.99",
      description: "The ultimate experience with exclusive artist perks.",
      icon: Star, // using star again or a crown if we had it
      features: [
        "Everything in Pro",
        "Exclusive VIP only artworks",
        "Direct messaging with artists",
        "Physical print options (1/yr)",
        "Zero transaction fees"
      ]
    }
  ];

  if (loading) return <div className="p-10 text-center text-gray-500">Loading subscription details...</div>;

  return (
    <div className="max-w-6xl mx-auto w-full pb-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Subscription Plans</h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Upgrade your experience to get early access to exclusive drops, high-resolution downloads, and priority support.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrent = currentTier === plan.id;
          const Icon = plan.icon;
          const isPro = plan.id === "pro";
          
          return (
            <div 
              key={plan.id} 
              className={`relative rounded-3xl p-8 flex flex-col bg-white transition-all duration-300 ${
                isPro 
                  ? "border-2 border-blue-500 shadow-xl shadow-blue-500/10 scale-105 z-10" 
                  : "border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-gray-200"
              }`}
            >
              {isPro && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPro ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">{plan.name}</h3>
              </div>
              
              <div className="mb-4">
                <span className="text-4xl font-black text-gray-900">${plan.price}</span>
                <span className="text-gray-500 font-medium">/month</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-8 flex-1">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                    <Check className={`w-5 h-5 shrink-0 ${isPro ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrent || upgrading === plan.id}
                className={`w-full py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  isCurrent
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : isPro
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                    : "bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-200"
                }`}
              >
                {upgrading === plan.id && <Loader2 className="w-4 h-4 animate-spin" />}
                {isCurrent ? "Current Plan" : upgrading === plan.id ? "Processing..." : `Upgrade to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
