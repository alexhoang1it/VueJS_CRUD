/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ["./node_modules/flowbite/**/*.js", "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./src/*/.{vue,js,ts,jsx,tsx}",],
  variants: {
    extend: {},
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

