"use client";

import { useState } from 'react';
import Link from 'next/link';
import { signUp, signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [role, setRole] = useState('buyer'); // 'buyer' or 'artist'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn.social({
      provider: 'google',
      callbackURL: '/'
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    setError(null);

    const { data, error } = await signUp.email({
      name,
      email,
      password,
      role // sending role to custom field if implemented on backend
    });

    if (error) {
      setError(error.message || 'Something went wrong');
      setLoading(false);
    } else {
      if (role === 'artist') {
        router.push('/dashboard/artist');
      } else if (role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[460px] bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 my-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Create Account</h1>
          <p className="text-slate-500 text-xs">Join ArtHub to purchase or publish artwork.</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. John Doe" 
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-400" 
              />
            </div>
          </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com" 
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-400" 
              />
            </div>
          </div>

          {/* Select Role */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">Select Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all duration-200 ${
                  role === 'buyer' 
                    ? 'bg-indigo-50 border-indigo-500' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className={`font-bold text-sm ${role === 'buyer' ? 'text-indigo-600' : 'text-slate-700'}`}>User (Buyer)</span>
                <span className="text-[10px] text-slate-500 text-center leading-tight mt-0.5 px-1">Browse & Buy Art</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('artist')}
                className={`flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all duration-200 ${
                  role === 'artist' 
                    ? 'bg-indigo-50 border-indigo-500' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className={`font-bold text-sm ${role === 'artist' ? 'text-indigo-600' : 'text-slate-700'}`}>Artist</span>
                <span className="text-[10px] text-slate-500 text-center leading-tight mt-0.5 px-1">Upload & Sell Art</span>
              </button>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-3 pt-1">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-400 tracking-widest" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">Confirm Pass</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-slate-400 tracking-widest" 
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-center">
            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white rounded-xl font-bold tracking-wide hover:bg-indigo-700 transition-colors py-2.5 text-[14px] shadow-sm disabled:opacity-70">
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  REGISTER
                </>
              )}
            </button>
          </div>

          <div className="text-center relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[11px] text-slate-400 font-medium">OR</span>
            </div>
          </div>

          {/* Google Button */}
          <button type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 rounded-xl py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-70">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Register with Google
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
