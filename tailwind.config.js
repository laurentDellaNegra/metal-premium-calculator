/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'page-background': '#1B2A32',
        'component-background': '#22343C',
        'active-background': '#324F61',
        danger: '#F54F47',
        success: '#60B515',
        success: '#49AFD9',
        border: '#0F171C',
        'text-and-icon': '#ADBBC4',
        'input-value': '#E9ECEF',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
