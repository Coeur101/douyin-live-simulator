/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      animation: {
        'danmaku-scroll': 'danmaku-scroll 8s linear infinite',
        'like-float': 'like-float 2s ease-out forwards',
        'gift-burst': 'gift-burst 3s ease-out forwards',
      },
      keyframes: {
        'danmaku-scroll': {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'like-float': {
          '0%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'translateY(-50px) scale(1.2)', 
            opacity: '0.8' 
          },
          '100%': { 
            transform: 'translateY(-100px) scale(0.8)', 
            opacity: '0' 
          }
        },
        'gift-burst': {
          '0%': { 
            transform: 'scale(0) rotate(0deg)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'scale(1.5) rotate(180deg)', 
            opacity: '0.9' 
          },
          '100%': { 
            transform: 'scale(1) rotate(360deg)', 
            opacity: '0' 
          }
        }
      }
    },
  },
  plugins: [],
}