/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FFFFFF", //blanc
          secondary: "#272727", //noir
          accent: "#C043FF", //noir
          neutral: "#E7E8E7", //gris
          "base-100": "#FFFFFF", //blanc
          "base-200": "#E7E8E7", //blanc
          "base-content": "#272727", //gris
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
          "base-200": "#0F0F0F", //noir
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
