export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category_id: string;
  rating?: number;
  published: boolean;
  featured: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
    slug: string;
  };
}

export interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category_id: string;
  rating?: number;
  published: boolean;
  featured: boolean;
}

export const DEFAULT_POST_FORM_DATA: PostFormData = {
  title: '',
  content: '',
  excerpt: '',
  featured_image: '',
  category_id: '',
  rating: undefined,
  published: false,
  featured: false,
};