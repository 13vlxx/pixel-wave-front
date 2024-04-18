/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FFFFFF",
          secondary: "#1A202C",
          accent: "#1A202C",
          neutral: "#ff0fc4",
          "base-100": "#FFFFFF",
          "base-content": "#141b27",
          success: "#00bc62",
          warning: "#ff9400",
          error: "#ff626e",
        },
      },
      {
        dark: {
          primary: "#1A202C",
          secondary: "#FFFFFF",
          accent: "#C043FF",
          neutral: "#ff0fc4",
          "base-100": "#1A202C",
          "base-content": "#C043FF",
          success: "#00bc62",
          warning: "#ff9400",
          error: "#ff626e",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
