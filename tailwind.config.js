/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-dark': 'var(--background-dark)',
        'light-gray': 'var(--light-gray)',
      },
    },
  },
  plugins: [],
}
