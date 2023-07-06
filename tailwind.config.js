/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#4B90B9',
        sub: '#f8c678',
        gray10: '#F2F2F2',
        gray30: '#949494',
        gray20: '#CDCDCD',
      },
      gridTemplateColumns: {
        'auto-min-max':
          'repeat(auto-fit, minmax(min(calc(50% - 1rem), 100%), 1fr))',
      },
    },
  },
  plugins: [],
}
