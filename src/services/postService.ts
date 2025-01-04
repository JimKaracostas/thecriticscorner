import { supabase } from '../lib/supabase';
import { Post, PostFormData } from '../types/post';
import { generateSlug } from '../utils/slugify';

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories:category_id (
        name,
        slug
      )
    `)
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
}

export async function createPost(postData: PostFormData, userId: string) {
  const slug = generateSlug(postData.title);
  
  const { data, error } = await supabase
    .from('posts')
    .insert([{ 
      ...postData, 
      slug,
      author_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function updatePost(id: string, postData: Partial<PostFormData>) {
  const updates: any = {
    ...postData,
    updated_at: new Date().toISOString()
  };
  
  // Only update slug if title is being changed
  if (postData.title) {
    updates.slug = generateSlug(postData.title);
  }
  
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      categories:category_id (
        name,
        slug
      )
    `)
    .single();
    
  if (error) throw error;
  return data;
}

export async function deletePost(id: string, userId: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('author_id', userId);
    
  if (error) throw error;
}

export async function getPostsByCategory(categorySlug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories:category_id (
        name,
        slug
      )
    `)
    .eq('categories.slug', categorySlug)
    .eq('published', true)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
}