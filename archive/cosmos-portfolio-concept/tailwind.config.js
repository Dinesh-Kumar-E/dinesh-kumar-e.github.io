/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
      },
      colors: {
        cosmic: {
          dark: '#0a0a0a',
          light: '#e1e1e1', 
          accent: '#64ffda',
          blue: '#2196f3',
          purple: '#9c27b0',
        },
      },
      animation: {
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 2s infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
