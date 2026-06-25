"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      verifyPaymentSession(sessionId);
    } else {
      setVerifying(false);
      setError("No session ID found in the URL.");
    }
  }, [searchParams]);

  const verifyPaymentSession = async (sessionId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
        credentials: "include",
      });
      if (res.ok) {
        setVerifying(false);
        setTimeout(() => {
          router.push("/dashboard/user/purchases");
        }, 3000);
      } else {
        const data = await res.json();
        // If it was already processed, we can consider it successful
        if (data.message === "Already processed") {
           setVerifying(false);
           setTimeout(() => {
             router.push("/dashboard/user/purchases");
           }, 3000);
           return;
        }
        setError(data.message || "Failed to verify session.");
        setVerifying(false);
      }
    } catch (e) {
      console.error("Failed to verify session", e);
      setError("An error occurred while verifying the payment.");
      setVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
      {verifying ? (
        <>
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
          <p className="text-gray-500">Please wait while we confirm your transaction.</p>
        </>
      ) : error ? (
        <>
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link href="/" className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors tracking-wide">
            Return Home
          </Link>
        </>
      ) : (
        <>
          <div className="mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="w-20 h-20 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-6">Your transaction has been verified and your account is updated.</p>
          <p className="text-sm text-gray-400 mb-6">Redirecting you to your dashboard...</p>
          <Link href="/dashboard/user/purchases" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors tracking-wide">
            Go to Dashboard
          </Link>
        </>
      )}
    </div>
  );
}

export default function Success() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <Suspense fallback={<div className="text-gray-500 flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5"/> Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
