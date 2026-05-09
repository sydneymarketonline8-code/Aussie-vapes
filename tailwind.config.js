/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#06b6d4',
        'brand-dark': '#0891b2',
        'brand-light': '#67e8f9',
        surface: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#141414',
          700: '#1c1c1c',
          600: '#242424',
          500: '#2d2d2d',
          400: '#3d3d3d',
        },
        sale: '#ef4444',
        'sale-dark': '#dc2626',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.2s ease-out',
        'slide-right': 'slideRight 0.25s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
}
