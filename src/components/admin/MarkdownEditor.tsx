import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MarkdownEditor({ value, onChange, className = '' }: MarkdownEditorProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <p className="font-medium mb-2">Markdown Guide:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li># Heading 1</li>
          <li>## Heading 2</li>
          <li>**Bold Text**</li>
          <li>*Italic Text*</li>
          <li>[Link Text](URL)</li>
          <li>- Bullet Point</li>
          <li>1. Numbered List</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Editor
          </label>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full h-[400px] rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary text-black ${className}`}
            placeholder="Write your content in Markdown..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className="prose prose-sm max-w-none h-[400px] overflow-y-auto p-4 bg-white rounded-md border border-gray-300 text-black">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
