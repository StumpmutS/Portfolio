import type { Config } from "tailwindcss";
import { parkwindPlugin } from "@park-ui/tailwind-plugin";

const config: Config = {
  theme: {
    extend: {
      spacing: {
        dmain: "32px",
        dcard: "24px",
        dcardDetail: "12px"
      },
      borderWidth: {
        dmain: "4px"
      }
    }
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [parkwindPlugin]
};
export default config;
