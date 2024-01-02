/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1240px',
        '2xl': '1440px',
      },
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
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'fade-out': {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.1s ease',
        'fade-out': 'fade-out 0.1s ease',
      },
    },
  },
  plugins: [],
}
