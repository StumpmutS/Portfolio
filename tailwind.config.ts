import type { Config } from "tailwindcss";
import { parkwindPlugin } from "@park-ui/tailwind-plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [parkwindPlugin]
};
export default config;
