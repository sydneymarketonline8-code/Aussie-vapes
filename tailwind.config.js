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
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate, 0deg))' },
          '50%': { transform: 'translateY(-6px) rotate(var(--tw-rotate, 0deg))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
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
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up-delay-1': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both',
        'fade-up-delay-2': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both',
        'fade-up-delay-3': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.24s both',
        'fade-up-delay-4': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.32s both',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'zoom-in': 'zoomIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
