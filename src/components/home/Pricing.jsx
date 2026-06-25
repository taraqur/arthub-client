"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);
  const [upgrading, setUpgrading] = useState(null);
  const [currentTier, setCurrentTier] = useState("free");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCurrentTier(data.subscriptionTier || "free");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubscribe = async (tier) => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (tier === currentTier) {
      alert("You are already subscribed to this package.");
      return;
    }

    try {
      setUpgrading(tier);
      
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, userId: session.user.id, buyerName: session.user.name || session.user.fullName }),
      });
      const data = await res.json();
      
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || data.error || "Failed to initiate subscription upgrade.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred");
    } finally {
      setUpgrading(null);
    }
  };

  const plans = [
    {
      id: "free",
      name: "Free (Default)",
      price: "$0",
      description: "Perfect for casual art lovers getting started.",
      features: [
        "Max 3 purchases allowed",
        "Browse thousands of artworks",
        "Save favorites",
        "Basic search filters"
      ],
      buttonText: "Current Plan",
      isPopular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "For serious collectors who want premium access.",
      features: [
        "Max 9 purchases allowed",
        "Early access to new drops",
        "Advanced search filters",
        "Priority support"
      ],
      buttonText: "Subscribe Now",
      isPopular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      period: "/month",
      description: "The ultimate experience for art patrons and galleries.",
      features: [
        "Unlimited purchases allowed",
        "VIP invitations to events",
        "Personalized art curation",
        "Zero transaction fees",
        "24/7 dedicated support"
      ],
      buttonText: "Become Premium",
      isPopular: false,
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer: "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we believe in complete transparency. The price you see is what you pay. Transaction fees may apply depending on your plan when purchasing art."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time with a single click in your billing dashboard. You'll retain access until the end of your current billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for all new paid subscriptions if you are not completely satisfied with our platform."
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-100 opacity-50 blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pricing Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to elevate your art collection journey. Whether you are just browsing or a serious collector, we have you covered.
          </p>
        </div>

        {/* Pricing Cards (Made smaller using max-w-5xl and tighter padding/gap) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl bg-white p-6 sm:p-8 shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.isPopular ? 'border-black ring-1 ring-black' : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-gray-500 font-medium">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={upgrading === plan.id}
                className={`w-full py-2.5 px-4 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2 ${
                  plan.isPopular 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {upgrading === plan.id ? (
                  <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <p className="text-gray-600">Everything you need to know about the product and billing.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
