/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        violet: colors.violet,
        amber: colors.amber,
        emerald: colors.emerald,
        rose: colors.rose,
        blue: colors.blue,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
