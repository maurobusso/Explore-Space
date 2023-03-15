/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "*.{html,js}",
    "node_modules/flowbite/**/*.js"
  ],
  
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

// run this command in the terminal for tailwind npx tailwindcss -i src/style.css -o dist/output.css --watch