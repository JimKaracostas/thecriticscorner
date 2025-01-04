import React from 'react';
import { useParams } from 'react-router-dom';
import { PostCard } from './PostCard';
import { useRealtimePosts } from '../../hooks/useRealtimePosts';

export function CategoryPosts() {
  const { category } = useParams(); // e.g., "reviews" or "news"
  const { posts, loading, error } = useRealtimePosts(category); // Fetch posts for the current category

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  // Filter posts strictly by category
  const filteredPosts = posts.filter((post) => post.categories?.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8 capitalize">
        {category?.replace('-', ' ')}
      </h1>
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          No posts found in this category.
        </div>
      )}
    </div>
  );
}
