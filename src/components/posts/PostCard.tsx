import React from 'react';
import { Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  if (!post?.categories?.slug) {
    return null; // Do not render if the category slug is missing
  }

  const isReview = post.categories.slug === 'reviews';

  return (
    <Link to={`/${post.categories.slug}/${post.slug}`}>
      <article className="bg-primary rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.featured_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Category & Rating Badges */}
          <div className="absolute top-4 right-4 flex gap-2">
            {isReview && post.rating && (
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Star className="w-4 h-4 mr-1 fill-current" />
                {post.rating}/100
              </span>
            )}
            {post.categories.name && (
              <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                {post.categories.name}
              </span>
            )}
          </div>
        </div>
        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h2>
          <p className="text-text-secondary mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center text-accent text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>
      </article>
    </Link>
  );
}
