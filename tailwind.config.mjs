/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: ["selector", '[data-theme="dark"]'], // Use attribute selector for dark mode
	theme: {
		extend: {
			// Colors are now defined in src/styles/global.css using @theme
		},
	},
	plugins: [
		// Plugin for text-balance utility (optional, requires installation if not default)
		plugin(function ({ addUtilities }) {
			addUtilities({
				".text-balance": {
					"text-wrap": "balance",
				},
			});
		}),
		require("@tailwindcss/typography"),
	],
};
