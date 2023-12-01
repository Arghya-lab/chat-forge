// eslint-disable-next-line no-undef
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
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
      },}
  },
  plugins: [],
})

