/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#08060D',
        'dark-card': '#0B0814',
        'luxury-text': '#F1F1EE',
        'luxury-violet': '#5B21B6',
        'luxury-indigo': '#3730A3',
        'luxury-lavender': '#8B5CF6',
        'electric-blue': '#5B21B6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
