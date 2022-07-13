/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.php", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ppt-blue": {
          400: "#DFF5FE",
          300: "#F3FBFF",
        },
        "ppt-red": {
          500: "#DD5C56",
        },
        "ppt-black": "#4A474F",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin")],
};
