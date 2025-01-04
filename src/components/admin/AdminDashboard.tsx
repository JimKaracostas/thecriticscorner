import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { PostsList } from './PostsList';

export function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/admin/new-post')}
              className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
        <PostsList />
      </div>
    </div>
  );
}