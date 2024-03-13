/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'dancing-script' : ['Dancing Script', 'cursive']
      },
      colors: {
        blackBodyBg: '#141414',
        customBlack: '#0e0e0e',
        mainColor: '#01AA55',
        secondaryColor: '#F62E2C',
        yellow: '#FFBA16'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'scale(1) rotate(-15deg)' },
          '50%': { transform: 'scale(0.9) rotate(-15deg)' },
          '100%': { transform: 'scale(1) rotate(-15deg)' },
        },
      },
      animation: {
        'waving-hand': 'wave 2s linear infinite',
      },
    },
  },
  plugins: [],
}