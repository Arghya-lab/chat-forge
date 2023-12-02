import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
      body: ["Noto Sans", "sans-serif"],
    },
    extend: {
      colors: {
        neutral: {
          50: "#fafafa",
          100: "#e1e1e1",
          200: "#c8c8c8",
          300: "#afafaf",
          400: "#969696",
          500: "#7d7d7d",
          600: "#646464",
          700: "#4b4b4b",
          800: "#323232",
          900: "#191919",
        },
        shadow: {
          50: "#4a4c51",
          100: "#424549",
          200: "#313338",
          300: "#2f3136",
          400: "#2b2d31",
          500: "#282b30",
          600: "#292b2f",
          700: "#23272a",
          800: "#202225",
          900: "#1e1f22",
        },
        pearl: {
          50: "#fefefe",
          100: "#f9f9f9",
          200: "#f6f6f6",
          300: "#ededed",
          400: "#e9e9e9",
          500: "#e4e4e4",
          600: "#dedede",
          700: "#d9d9d9",
          800: "#d4d4d4",
          900: "#d0d0d0",
        },
      },
    },
  },
  plugins: [],
});
