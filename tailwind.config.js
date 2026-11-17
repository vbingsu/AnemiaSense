/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#12306B',
        coral: '#F86858',
        lavender: '#EEF1FB',
        'app-blue': '#1450A6',
        'app-gray': '#5A6275',
        'app-border': '#D5DAEA',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      height: {
        dvh: '100dvh',
      },
    },
  },
  plugins: [],
}
