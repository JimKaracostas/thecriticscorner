import React from 'react';
import { PostFormData } from '../../types/post';
import { MarkdownEditor } from './MarkdownEditor';

interface PostFormFieldsProps {
  formData: PostFormData;
  onChange: (field: string, value: any) => void;
  categories: Array<{ id: string; name: string; slug: string }>;
  showRating: boolean;
}

export function PostFormFields({ formData, onChange, categories, showRating }: PostFormFieldsProps) {
  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm text-black";

  
  return (
    <>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          className={inputClasses}
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          required
          className={inputClasses}
          value={formData.category_id}
          onChange={(e) => onChange('category_id', e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {showRating && (
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating (0-100)
          </label>
          <input
            type="number"
            id="rating"
            min="0"
            max="100"
            className={inputClasses}
            value={formData.rating || ''}
            onChange={(e) => onChange('rating', parseInt(e.target.value) || undefined)}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={(value) => onChange('content', value)}
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows={3}
          className={inputClasses}
          value={formData.excerpt}
          onChange={(e) => onChange('excerpt', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">
          Featured Image URL
        </label>
        <input
          type="url"
          id="featured_image"
          className={inputClasses}
          value={formData.featured_image}
          onChange={(e) => onChange('featured_image', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
            checked={formData.featured}
            onChange={(e) => onChange('featured', e.target.checked)}
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Feature this post
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
            checked={formData.published}
            onChange={(e) => onChange('published', e.target.checked)}
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Publish post
          </label>
        </div>
      </div>
    </>
  );
}