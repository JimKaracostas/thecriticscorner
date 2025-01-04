/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D1B4E', // Deep purple
        secondary: '#8A4FFF', // Bright purple
        accent: '#B088F9', // Light purple
        background: '#000000', // Black
        text: {
          primary: '#FFFFFF',
          secondary: '#E5E5E5',
          muted: '#A0A0A0'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#111827',
            },
            h3: {
              color: '#111827',
            },
            strong: {
              color: '#111827',
            },
            a: {
              color: '#8A4FFF',
              '&:hover': {
                color: '#7B3FEF',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};