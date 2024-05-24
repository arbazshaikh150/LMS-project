/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui") , require("@tailwindcss/line-clamp")],
}

// npx tailwindcss init -p
// For vite project , created the postcss condig file

// Pluggins mai yeh properties add karne se woh libraries ki css aa jayegi ,, extra components type smjh lo , (tailwind ka)
