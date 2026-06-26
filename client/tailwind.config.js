/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: { DEFAULT: '#7B5EA7', light: '#9b7ec7', dark: '#5a4080' },
        gold:   { DEFAULT: '#C9A84C', light: '#e0c070', dark: '#a07830' },
        dark:   { DEFAULT: '#1a1a2e', light: '#2a2a4e' },
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
