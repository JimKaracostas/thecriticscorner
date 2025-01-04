import React from 'react';

export function Logo() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M20 12.5C20 8 16 4 12 4M4 12.5C4 17 8 21 12 21" />
      <path d="M12 4C8 4 4 8 4 12.5M12 21C16 21 20 17 20 12.5" />
    </svg>
  );
}