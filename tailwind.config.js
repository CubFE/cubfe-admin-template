/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '35px': '35px',
        '1200px': '1200px',
      },
      colors: 
      {
        'primary': '#002ea6',
        'primary-600': '#01288f',
        'primary-800': '#002076',
        'danger': '#e91e63',
        'hover-blue': '#F2F3FF',
        'dark':'#222225',
        'dark-sidebar': '#2f2f32',
        'dark-main-bg': '#3b3b3f'
      },
      keyframes: {
        'slide-in-top': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-out-top': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
        },
        'slide-in-bottom': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-out-bottom': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
        },
        'slide-in-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-out-left': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-out-right': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
      },
      animation: {
        'slide-in-top': 'slide-in-top 0.5s ease-out',
        'slide-out-top': 'slide-out-top 0.5s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-out',
        'slide-out-bottom': 'slide-out-bottom 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-out-left': 'slide-out-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-out-right': 'slide-out-right 0.5s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  important: true,
}

