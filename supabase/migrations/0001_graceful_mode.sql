/*
  # Initial Schema Setup

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text)
      - `category_id` (uuid, foreign key)
      - `rating` (integer)
      - `published` (boolean)
      - `author_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  category_id uuid REFERENCES categories(id),
  rating integer CHECK (rating >= 0 AND rating <= 100),
  published boolean DEFAULT false,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can modify categories"
  ON categories
  USING (auth.role() = 'authenticated');

-- RLS Policies for posts
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can CRUD their own posts"
  ON posts
  USING (auth.uid() = author_id);

-- Insert initial categories
INSERT INTO categories (name, slug) VALUES
  ('Reviews', 'reviews'),
  ('News', 'news')
ON CONFLICT (slug) DO NOTHING;