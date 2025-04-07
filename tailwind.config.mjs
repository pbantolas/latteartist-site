/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: ["selector", '[data-theme="dark"]'], // Use attribute selector for dark mode
	theme: {
		extend: {
			colors: {
				// Map CSS variables to Tailwind color names
				primary: "var(--text-primary)",
				secondary: "var(--text-secondary)",
				accent: "var(--brand-accent)",
				link: "var(--link-color)",
				"link-highlight-bg": "var(--link-highlight-bg)",
				"link-highlight-text": "var(--link-highlight-text)",
				card: "var(--card-background)",
				"gradient-start": "var(--bg-gradient-start)",
				"gradient-end": "var(--bg-gradient-end)",
				"title-light": "var(--title-color-light)", // Specific title color for light mode if needed
				"title-dark": "var(--title-color-dark)", // Specific title color for dark mode if needed
			},
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
	],
};
