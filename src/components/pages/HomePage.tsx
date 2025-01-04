import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRealtimePosts } from '../../hooks/useRealtimePosts';
import { PostCard } from '../posts/PostCard';

export function HomePage() {
  const { posts: featuredPosts, loading } = useRealtimePosts(undefined, false, true);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the dropdown menu

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center">
        <Gamepad2 className="mx-auto h-16 w-16 text-secondary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Welcome to The Critics' Corner
        </h1>
        <p className="mt-6 text-lg leading-8 text-text-secondary max-w-2xl mx-auto">
          Your trusted source for in-depth game reviews and the latest gaming news. 
          Discover new games, stay updated with industry trends, and join our community 
          of passionate gamers.
        </p>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex mt-10 items-center justify-center gap-x-6">
          <Link to="/reviews" className="btn-primary">
            Read Reviews
          </Link>
          <Link to="/news" className="btn-secondary">
            Latest News
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className="sm:hidden mt-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn-primary"
          >
            {menuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          {menuOpen && (
            <div className="mt-4 space-y-2">
              <Link to="/reviews" className="block text-center btn-primary">
                Read Reviews
              </Link>
              <Link to="/news" className="block text-center btn-secondary">
                Latest News
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Featured Posts Section */}
      {loading ? (
        <div className="mt-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      ) : featuredPosts.length > 0 ? (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
