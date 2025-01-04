import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ReactMarkdown from 'react-markdown'; // Import react-markdown for styling markdown content
import { PostFormFields } from './PostFormFields';
import { createPost, updatePost, getPostById } from '../../services/postService';
import { PostFormData, DEFAULT_POST_FORM_DATA } from '../../types/post';

export function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [formData, setFormData] = useState<PostFormData>(DEFAULT_POST_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
  };

  const fetchPost = async () => {
    try {
      const post = await getPostById(id!);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          featured_image: post.featured_image,
          category_id: post.category_id,
          rating: post.rating,
          published: post.published,
          featured: post.featured,
        });
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post');
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const selectedCategory = categories.find(c => c.id === formData.category_id);
      const isReview = selectedCategory?.slug === 'reviews';
      const postData = {
        ...formData,
        rating: isReview ? formData.rating : null,
      };

      if (id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData, user.id);
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === formData.category_id);
  const showRating = selectedCategory?.slug === 'reviews';

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg px-4 py-5 sm:rounded-lg sm:p-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {id ? 'Edit Post' : 'Create New Post'}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-500 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <PostFormFields
          formData={formData}
          onChange={handleFieldChange}
          categories={categories}
          showRating={showRating}
        />

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </form>

      {/* Markdown Preview for the content */}
      <div className="mt-8 bg-gray-100 p-4 rounded-md shadow">
        <h3 className="text-lg font-medium text-gray-900">Markdown Preview:</h3>
        <ReactMarkdown className="prose prose-gray">{formData.content}</ReactMarkdown>
      </div>
    </div>
  );
}
