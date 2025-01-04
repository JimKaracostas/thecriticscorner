import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Post } from '../types/post';

export function usePost(slug?: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            categories:category_id (
              name,
              slug
            )
          `)
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}