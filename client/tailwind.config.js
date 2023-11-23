/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  content: "./src/**/*.{js,jsx,ts,tsx}",
  theme: {
    extend: {},
  },
  plugins: [],
};
