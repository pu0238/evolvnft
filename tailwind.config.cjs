/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        cal: ["CalSans", ...defaultTheme.fontFamily.sans],
        josefin: ["JosefinSans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
