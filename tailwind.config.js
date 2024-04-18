/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "light",
      {
        DarkMode: {
          primary: "#FF0000",
          secondary: "#FFFFFF",
          accent: "#ff0fc4",
          neutral: "#ff0fc4",
          "base-100": "#1A202C",
          "base-content": "#ff0fc4",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",
        secondary: "#00FF00",
        tertiary: "#0000FF",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
