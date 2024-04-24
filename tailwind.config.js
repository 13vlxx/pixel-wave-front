/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FFFFFF", //blanc
          secondary: "#1A202C", //noir
          accent: "#1A202C", //noir
          neutral: "#BFC9CA", //gris
          "base-100": "#FFFFFF", //blanc
          "base-content": "#1A202C", //gris
          success: "#00bc62", //vert
          warning: "#ff9400", //orange
          error: "#ff626e", //rouge
        },
      },
      {
        dark: {
          primary: "#272727", //noir
          secondary: "#FFFFFF", //blanc
          accent: "#C043FF", //violet #9966CC
          neutral: "#323232", //gris
          "base-100": "#272727", //noir
          "base-content": "#FFFFFF", //violet
          success: "#00bc62", //vert
          warning: "#ff9400", //orange
          error: "#ff626e", //rouge
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
