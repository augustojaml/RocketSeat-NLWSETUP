/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090a",
      },
      fontFamily: {
        FontWeight400: "JosefinSans_400Regular",
        FontWeight600: "JosefinSans_600SemiBold",
        FontWeight700: "JosefinSans_700Bold",
        FontWeight900: "JosefinSans_700Bold",
      },
    },
  },
  plugins: [],
};

/**
regular: "JosefinSans_400Regular",
semibold: "JosefinSans_600SemiBold",
bold: "JosefinSans_700Bold",
extrabold: "JosefinSans_700Bold",

regular: "NunitoSans_400Regular",
semibold: "NunitoSans_600SemiBold",
bold: "NunitoSans_700Bold",
extrabold: "NunitoSans_800ExtraBold",


 */
