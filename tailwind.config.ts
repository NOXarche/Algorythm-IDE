import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0E0E10',
        foreground: '#ffffff',
        accent: {
          DEFAULT: '#FF8C32',
          light: '#FFA63F',
          gold: '#FFD580'
        },
        brand: {
          purple: '#8A2BE2',
          bgDark: '#1E1E2E'
        }
      },
      boxShadow: {
        glow: '0 0 12px rgba(255,140,50,0.5)'
      },
      fontFamily: {
        heading: ['Orbitron', 'Rajdhani', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;
