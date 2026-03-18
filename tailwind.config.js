/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#08090d',
          800: '#0f1118',
          700: '#171b27',
          600: '#1e2436',
          500: '#252d44',
        },
        brand: {
          400: '#5ba4ff',
          500: '#1d6fe8',
          600: '#1450b0',
        },
        accent: {
          400: '#ff9a6b',
          500: '#ff6b2b',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Impact"', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionDuration: { 400: '400ms' },
    },
  },
  plugins: [],
}
