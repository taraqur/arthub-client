"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState('artist'); // Mock role: 'artist', 'buyer', 'admin'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDashboardDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Artworks', href: '/browse' },
    { name: 'Artists', href: '/artists' },
  ];

  const dashboardLinks = {
    artist: [
      { name: 'My Artworks', href: '/dashboard/artworks' },
      { name: 'Sales', href: '/dashboard/sales' },
    ],
    buyer: [
      { name: 'My Collection', href: '/dashboard/collection' },
      { name: 'Orders', href: '/dashboard/orders' },
    ],
    admin: [
      { name: 'All Users', href: '/admin/users' },
      { name: 'Platform Settings', href: '/admin/settings' },
    ]
  };

  const currentDashboardLinks = dashboardLinks[userRole] || [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-300 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* Left Side: Logo & Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-3xl font-bold tracking-tight text-gray-900">
                ARTHUB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-black font-bold'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Dashboard Dropdown */}
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDashboardDropdownOpen(false), 200)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                      pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
                        ? 'text-black font-bold'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Dashboard
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isDashboardDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-left ${
                      isDashboardDropdownOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="py-2" role="menu">
                      {currentDashboardLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            pathname === link.href ? 'bg-gray-50 text-black font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                          }`}
                          role="menuitem"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Search Bar & Actions */}
          <div className="flex items-center gap-4 lg:gap-6 ml-auto">
            
            {/* Middle Search Bar (Made smaller) */}
            <div className="hidden sm:block w-64">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full bg-[#f8f9fa] text-sm text-gray-900 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              
              {/* Heart Icon */}
              <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Login / Actions */}
              {isLoggedIn ? (
                 <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-black text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link 
                    href="/register"
                    className="bg-[#1a1a1a] hover:bg-black text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black focus:outline-none transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-white shadow-inner">
          
          {/* Mobile Search */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-[#f8f9fa] text-sm text-gray-900 rounded-md pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === link.href
                  ? 'text-black bg-gray-50'
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Dashboard Links */}
          {isLoggedIn && (
            <div className="pt-4 pb-2 border-t border-gray-100 mt-4">
              <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Dashboard ({userRole})
              </div>
              {currentDashboardLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-black bg-gray-50'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Actions */}
          <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors py-2.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorites
              </button>
            </div>

            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-4 py-3 rounded-md text-base font-medium hover:bg-black transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-3 rounded-md text-base font-medium hover:bg-gray-50 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-4 py-3 rounded-md text-base font-medium hover:bg-black transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
