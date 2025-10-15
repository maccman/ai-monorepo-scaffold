module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,astro}'],
  plugins: [
    require('@tailwindcss/typography'),
    require('tw-animate-css'), // Note: tailwindcss-animate has been deprecated
  ],
}
