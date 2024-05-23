/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors:{
      'main-green' : '#166534', 
      'hover-green' : '#15803d',
    },
    fontFamily: {
      'premier-sans': ['PremierSans-Heavy', 'Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}