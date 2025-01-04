import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export function UserMenu() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin', { replace: true });
  };

  if (!session) return null;

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </button>
  );
}