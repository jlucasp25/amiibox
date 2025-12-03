/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Smash Ultimate color palette
        'smash': {
          'flame': '#FF4655',
          'ember': '#FF6B35',
          'gold': '#FFA500',
          'red': '#E63946',
          'crimson': '#A4161A',
          'steel': '#8B8C89',
          'gunmetal': '#3D4849',
          'midnight': '#1D1E2C',
          'void': '#0B0C10',
          'electric': '#00D9FF',
          'neon': '#39FF14',
        },
        // Background colors
        'bg': {
          'primary': '#0B0C10',
          'secondary': '#1D1E2C',
          'tertiary': '#2A2D3A',
          'card': '#1F2937',
        },
      },
      fontFamily: {
        'display': ['Impact', 'Arial Black', 'sans-serif'],
        'body': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'flicker': 'flicker 3s infinite',
        'shine': 'shine 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 70, 85, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 70, 85, 0.6), 0 0 60px rgba(255, 107, 53, 0.4)',
          },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'shine': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'smash': '0 4px 20px rgba(255, 70, 85, 0.3), 0 0 40px rgba(255, 107, 53, 0.1)',
        'smash-lg': '0 8px 40px rgba(255, 70, 85, 0.5), 0 0 60px rgba(255, 107, 53, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(255, 70, 85, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-fire': 'linear-gradient(135deg, #FF4655 0%, #FF6B35 50%, #FFA500 100%)',
        'gradient-steel': 'linear-gradient(135deg, #3D4849 0%, #8B8C89 100%)',
        'gradient-void': 'linear-gradient(180deg, #0B0C10 0%, #1D1E2C 100%)',
      },
    },
  },
  plugins: [],
}
