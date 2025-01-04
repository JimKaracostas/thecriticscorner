/*
  # Add featured posts functionality

  1. Changes
    - Add `featured` column to posts table
    - Add index for faster featured posts queries
*/

ALTER TABLE posts ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured) WHERE featured = true;