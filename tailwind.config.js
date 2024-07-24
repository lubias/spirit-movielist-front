/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "black-06": "#0F0F0F",
        "black-08": "#141414",
        "black-10": "#1A1A1A",
        "black-12": "#1F1F1F",
        "black-15": "#262626",
        "green-45": "#408C75",
      },
      borderColor: {
        "black-12": "#1F1F1F",
        "red-45": "#e500004f",
        "black-15": "#262626",
        "black-20": "#333333",
        "green-45": "#408C75",
      },
      boxShadow: {
        'custom': 'rgba(64, 140, 117, 1) 0px 0px 7px'
      },
      colors: {
        "green-45": "#408C75",
      }
    },
  },
  plugins: [],
};
