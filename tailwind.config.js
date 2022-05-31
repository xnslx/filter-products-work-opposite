const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("threes", ({ modifySelectors, separator }) => {
        console.log("modifySelectors", modifySelectors);
        console.log("separator", separator);
        modifySelectors(({ className }) => {
          return `.${e(`threes${separator}${className}`)}:nth-child(3n)`;
        });
      });
    }),
  ],
  theme: {
    fontFamily: {
      sans: ["Prompt", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
