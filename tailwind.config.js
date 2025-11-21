/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#05070d',
        surface: '#0f111a',
        accent: '#A3E635',
        accentWarm: '#FF8A00'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', '"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 15px 60px rgba(163, 230, 53, 0.1)'
      }
    }
  },
  plugins: []
};

