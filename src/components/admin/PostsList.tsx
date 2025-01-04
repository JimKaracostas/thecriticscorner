import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DeletePostModal } from '../posts/DeletePostModal';
import { useRealtimePosts } from '../../hooks/useRealtimePosts';
import { deletePost } from '../../services/postService';
import { Post } from '../../types/post';
import { useAuth } from '../../hooks/useAuth';

export function PostsList() {
  const { posts, loading } = useRealtimePosts(undefined, true);
  const [deletePostData, setDeletePostData] = useState<Post | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleDelete = async () => {
    if (!deletePostData || !session?.user) return;

    try {
      await deletePost(deletePostData.id, session.user.id);
      setDeletePostData(null);
      setDeleteError(null);
    } catch (error) {
      setDeleteError('Failed to delete post. Please try again.');
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <>
      {deleteError && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-md text-red-500">
          {deleteError}
        </div>
      )}

      <div className="bg-primary rounded-lg shadow-xl overflow-hidden">
        <ul className="divide-y divide-accent/20">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-lg font-medium text-white truncate">{post.title}</p>
                  <div className="mt-1 flex items-center space-x-3">
                    <p className="text-sm text-text-secondary">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-900/50 text-green-200'
                          : 'bg-yellow-900/50 text-yellow-200'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.categories?.name && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                        {post.categories.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/admin/edit/${post.id}`)}
                    className="p-2 rounded-full text-white bg-secondary hover:bg-secondary/90 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeletePostData(post)}
                    className="p-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <DeletePostModal
        isOpen={!!deletePostData}
        onClose={() => setDeletePostData(null)}
        onConfirm={handleDelete}
        title={deletePostData?.title || ''}
      />
    </>
  );
}
