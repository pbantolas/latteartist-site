# Design Guide - Colors

This document outlines the fundamental colors used throughout the LatteArtist website for future reference.

## Core Theme Colors (CSS Variables)

These colors are defined as CSS variables in [`src/styles/global.css`](src/styles/global.css) and form the base of the site's theme.

### Light Mode

-   **Brand Accent**: `var(--brand-accent)` - `#3330e4` (Used for primary interactive elements, highlights)
-   **Primary Text**: `var(--text-primary)` - `#2c2c2e` (Main text color)
-   **Secondary Text**: `var(--text-secondary)` - `#5a5a5e` (Subdued text, captions)
-   **Text on Accent**: `var(--text-on-accent)` - `#ffffff` (Text used on accent-colored backgrounds)
-   **Background Gradient Start**: `var(--bg-gradient-start)` - `#fafafa` (Part of the main page background)
-   **Background Gradient End**: `var(--bg-gradient-end)` - `#f5f5f5` (Part of the main page background)
-   **Card Background**: `var(--bg-card)` - `#ffffff` (Background for card-like elements)

### Dark Mode

-   **Brand Accent**: `var(--brand-accent)` - `#7a78ff`
-   **Primary Text**: `var(--text-primary)` - `#f2f2f7`
-   **Secondary Text**: `var(--text-secondary)` - `#b0b0b5`
-   **Text on Accent**: `var(--text-on-accent)` - `#ffffff` (Remains white, ensure contrast with dark accent)
-   **Background Gradient Start**: `var(--bg-gradient-start)` - `#1c1c1e`
-   **Background Gradient End**: `var(--bg-gradient-end)` - `#161618`
-   **Card Background**: `var(--bg-card)` - `#2A2A2A`

### Abstracted Theme Colors

These variables from [`src/styles/global.css`](src/styles/global.css) map the mode-specific variables to generic theme color names:

-   `--color-primary`: (Maps to `var(--text-primary)`)
-   `--color-secondary`: (Maps to `var(--text-secondary)`)
-   `--color-accent`: (Maps to `var(--brand-accent)`)
-   `--color-on-accent`: (Maps to `var(--text-on-accent)`)
-   `--color-card`: (Maps to `var(--bg-card)`)
-   `--color-gradient-start`: (Maps to `var(--bg-gradient-start)`)
-   `--color-gradient-end`: (Maps to `var(--bg-gradient-end)`)

## Additional Fundamental Inline Colors

These are base colors found directly within Astro components, not including minor variations for hover/focus states.

-   **Light Gray (Borders/Backgrounds)**: `gray-100`, `gray-200` (Tailwind shades)
    -   _Usage_: Borders in light mode, "Planned" tag background, inactive nav link hover background.
    -   _Note_: These are Tailwind utility classes. The exact hex values depend on the Tailwind configuration but represent light shades of gray.
-   **Dark Gray (Borders/Backgrounds)**: `gray-700`, `gray-800` (Tailwind shades)
    -   _Usage_: Borders in dark mode, "Planned" tag background, inactive nav link hover background.
    -   _Note_: Tailwind utility classes representing dark shades of gray.
-   **Neutral Text Colors**: `neutral-300`, `neutral-700` (Tailwind shades)
    -   _Usage_: Navigation link text.
-   **Indigo (Borders)**: `indigo-300` (light mode), `indigo-500` (dark mode) (Tailwind shades)
    -   _Usage_: Blockquote borders in [`TrustSection.astro`](src/components/TrustSection.astro).

This guide focuses on the foundational colors. Specific shades for states like hover, focus, or very subtle borders are often derived or slightly adjusted from these core colors.
