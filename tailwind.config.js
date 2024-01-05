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
        'main-gray': 'var(--main-gray)',
        'light-gray': 'var(--light-gray)',
        'light-blue': 'var(--light-blue)',
        'red-alert': 'var(--red-alert)',
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
        'toast-in': {
          from: {
            transform: 'translateX(calc(100% + 10px))',
          },
          to: { transform: 'translateX(0)' },
        },
        'toast-out': {
          from: { transform: 'translateX(0)' },
          to: {
            transform: 'translateX(calc(100% + 10px))',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.1s ease',
        'fade-out': 'fade-out 0.1s ease',
        'toast-in': 'toast-in 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-out': 'toast-out 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
