import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavigationLink({ to, children }: NavigationLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-secondary text-white'
          : 'text-text-secondary hover:text-white hover:bg-secondary/80'
      }`}
    >
      {children}
    </Link>
  );
}