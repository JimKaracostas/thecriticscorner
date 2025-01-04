import React, { useEffect, useState } from 'react';
import { Category } from '../../types/category';
import { getCategories } from '../../services/categoryService';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CategorySelect({ value, onChange, className = '' }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-10 bg-primary/20 rounded" />;
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
        focus:border-secondary focus:ring focus:ring-secondary/50 
        bg-background text-white ${className}`}
      required
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}