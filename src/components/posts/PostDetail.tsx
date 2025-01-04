import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // For rendering markdown
import { usePost } from '../../hooks/usePost';

export function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(slug);
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-white">Post not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center text-white hover:text-secondary/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back
        </button>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.created_at));

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(`/${post.categories?.slug || ''}`)}
        className="mb-8 inline-flex items-center text-white hover:text-secondary/80"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to {post.categories?.name || 'previous page'}
      </button>


      <div className="bg-primary rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={post.featured_image || DEFAULT_IMAGE}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {post?.categories?.slug === 'reviews' && post?.rating && (
              <span className="bg-secondary text-white px-4 py-2 rounded-full text-lg flex items-center">
                <Star className="w-5 h-5 mr-2 fill-current" />
                {post.rating}/100
              </span>
            )}
            {post.categories?.name && (
              <span className="bg-accent text-white px-4 py-2 rounded-full text-lg">
                {post.categories.name}
              </span>
            )}
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center text-white text-sm mb-8">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>
          <div
            className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-a:text-white text-white prose-strong:text-white"
          >
            {/* Ensure proper markdown rendering */}
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}
