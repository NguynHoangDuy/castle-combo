/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shield colors
        shield: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          green: '#22C55E',
          red: '#EF4444',
          orange: '#F97316',
          yellow: '#EAB308',
        },
        // Game UI colors
        castle: {
          primary: '#1e293b',
          secondary: '#334155',
          accent: '#f59e0b',
          background: '#0f172a',
        },
      },
      fontFamily: {
        medieval: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
