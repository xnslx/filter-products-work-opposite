const plugin = require("tailwindcss/plugin");
const defaultTheme = require('tailwindcss/defaultTheme')

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
      sans:['Prompt',  ...defaultTheme.fontFamily.sans]
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            hr: {
              borderColor: theme("colors.gray.200"),
              borderTopWidth: "1px",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            "ol > li::before": {
              color: theme("colors.gray.900"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.gray.900"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
