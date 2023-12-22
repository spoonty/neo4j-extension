/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-blue-400': 'var(--light-blue-400)',
      }
    },
  },
  plugins: [],
}