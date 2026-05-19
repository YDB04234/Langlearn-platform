/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          english: '#1E3A5F',
          japanese: '#FFB7C5',
          korean: '#98D8C8',
          DEFAULT: '#6366F1',
        },
        secondary: '#2D3436',
        accent: '#F9CA24',
        danger: '#E74C3C',
        surface: {
          light: '#F5F6FA',
          dark: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        display: ['Ma Shan Zheng', 'cursive'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
