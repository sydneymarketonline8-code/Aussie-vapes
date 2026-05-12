/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#3b3b3b',
          dark: '#1f1f1f',
          soft: '#5a5a5a',
        },
        body: '#232323',
        mute: '#7a7a7a',
        line: '#e6e6e6',
        soft: {
          50: '#fafafa',
          100: '#f6f6f6',
          200: '#f1f1f1',
          300: '#e9e9e9',
        },
        price: '#ff0000',
        sale: '#ff4c4c',
        success: '#4cbb6c',
        warning: '#ff9a52',
        info: '#2fb5d2',
        brand: '#3b3b3b',
        'brand-dark': '#1f1f1f',
      },
      fontFamily: {
        sans: ['Exo 2', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Dosis', 'Helvetica', 'Arial', 'sans-serif'],
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.2s ease-out',
        'slide-right': 'slideRight 0.25s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
