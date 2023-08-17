/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '767px' },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#4B90B9',
        sub: '#f8c678',
        gray5: '#f8f8f8',
        gray10: '#F2F2F2',
        gray30: '#949494',
        gray20: '#CDCDCD',
        rating: '#FFB500',
        navy: '#132337',
      },
      gridTemplateColumns: {
        'auto-min-max-50': 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))',

        'auto-min-max-33': 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',

        'auto-min-max-20': 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
      },
      width: {
        'max-width': '1200px',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      const newComponents = {
        '.inner': {
          width: '100%', // 全ての画面サイズで幅は100%
          padding: '0 20px',

          '@media (min-width: 640px)': {
            // 'sm'のブレークポイントでのスタイル
            maxWidth: '100%', // 幅の最大値は100%
          },
          '@media (min-width: 1024px)': {
            // 'lg'のブレークポイントでのスタイル
            width: '1160px', // 幅の最大値は1200px
            margin: '0 auto',
          },
        },
      }
      addComponents(newComponents)
    },
  ],
}
