/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../src/img/heroimg.jpg')",
      },
      fontFamily: {
        'myFont': ['"Golos Text"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
