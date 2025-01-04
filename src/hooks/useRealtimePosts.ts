import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Post } from '../types/post';
import { useAuth } from './useAuth';

export function useRealtimePosts(categorySlug?: string, adminView: boolean = false, featuredOnly: boolean = false) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    let channel: RealtimeChannel;

    async function fetchPosts() {
      try {
        let query = supabase
          .from('posts')
          .select(`
            *,
            categories:category_id (
              name,
              slug
            )
          `)
          .order('created_at', { ascending: false });

        // For admin view, show all posts by the current user
        if (adminView && session?.user) {
          query = query.eq('author_id', session.user.id);
        } else {
          // For public view, only show published posts
          query = query.eq('published', true);
          
          // Filter by category if specified
          if (categorySlug) {
            query = query.eq('categories.slug', categorySlug);
          }
          
          // Filter featured posts if specified
          if (featuredOnly) {
            query = query.eq('featured', true);
          }
        }

        const { data, error: fetchError } = await query;
        if (fetchError) throw fetchError;
        setPosts(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    function setupRealtimeSubscription() {
      channel = supabase
        .channel('posts_channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'posts',
          },
          async (payload) => {
            await fetchPosts();
          }
        )
        .subscribe();
    }

    fetchPosts();
    setupRealtimeSubscription();

    return () => {
      channel?.unsubscribe();
    };
  }, [categorySlug, adminView, featuredOnly, session]);

  return { posts, loading, error };
}