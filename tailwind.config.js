/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-dark': 'var(--background-dark)',
        'main-dark': 'var(--main-dark)',
        'main-dark-opacity': 'var(--main-dark-opacity)',
        'light-dark': 'var(--light-dark)',
        'border-dark': 'var(--border-dark)',
        'text-gray': 'var(--text-gray)',
        'light-gray': 'var(--light-gray)',
        'light-blue': 'var(--light-blue)',
      },
    },
  },
  plugins: [],
}
