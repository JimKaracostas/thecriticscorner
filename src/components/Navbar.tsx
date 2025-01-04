import React, { useState } from 'react';
import { Logo } from './navigation/Logo';
import { NavigationLink } from './navigation/NavigationLink';
import { UserMenu } from './navigation/UserMenu';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { session } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the mobile menu

  return (
    <nav className="bg-primary sticky top-0 z-50 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center space-x-4">
            <NavigationLink to="/reviews">Reviews</NavigationLink>
            <NavigationLink to="/news">News</NavigationLink>
            <NavigationLink to="/admin/dashboard">Dashboard</NavigationLink>
            <UserMenu />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-secondary hover:text-white focus:outline-none"
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-primary border-t border-primary/20">
          <div className="space-y-1 px-2 py-3">
            <NavigationLink to="/reviews">Reviews</NavigationLink>
            <NavigationLink to="/news">News</NavigationLink>
            <NavigationLink to="/admin/dashboard">Dashboard</NavigationLink>
          </div>
          <div className="px-4 py-3 border-t border-primary/20">
            <UserMenu />
          </div>
        </div>
      )}
    </nav>
  );
}
