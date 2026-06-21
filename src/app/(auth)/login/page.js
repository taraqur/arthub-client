"use client";

import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[460px] bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 my-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 text-xs">Sign in to buy art and manage uploads.</p>
        </div>
        
        <form className="space-y-4">
          {/* Email Address */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-400" 
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-400 tracking-widest" 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-center">
            <button type="submit" className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white rounded-xl font-bold tracking-wide hover:bg-indigo-700 transition-colors py-2.5 text-[14px] shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              SIGN IN
            </button>
          </div>

          <div className="text-center relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Google Button */}
          <button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 rounded-xl py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign In with Google
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            New to ArtHub?{' '}
            <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
