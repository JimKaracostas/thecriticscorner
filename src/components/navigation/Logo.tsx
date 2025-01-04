import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="text-secondary transition-transform group-hover:scale-110">
        <Gamepad2 size={32} className="transform -rotate-12" />
      </div>
      <span className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
        The Critics' Corner
      </span>
    </Link>
  );
}