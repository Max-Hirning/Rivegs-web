import type {Config} from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      screens: {
        "sm": "376px",
        "md": "426px",
        "lg": "851px",
        "xl": "1025px",
        "2xl": "1441px",
      },
    },
  },
  content: [
    "./src/UI/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  important: true,
};

export default config;