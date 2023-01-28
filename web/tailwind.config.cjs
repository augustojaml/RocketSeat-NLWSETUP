/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#09090a",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
      fontFamily: {
        sans: "'Josefin Sans', sans-serif",
      },
    },
  },
  plugins: [],
};

/**
  font-family: 'Josefin Sans', sans-serif;
  font-family: 'Nunito Sans', sans-serif;
 */
