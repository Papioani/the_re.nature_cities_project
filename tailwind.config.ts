import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Paths to your pages, components, and other relevant files in the src directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/deliverables/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/fonts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/partners/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/project-outline/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/styles/**/*.{css}", // Include any global styles
    "./src/app/the-action/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/the-re.nature/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/wind-tunnel/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(var(--gradient-start), var(--gradient-end))",
      },
    },
  },
  plugins: [],
};
export default config;
