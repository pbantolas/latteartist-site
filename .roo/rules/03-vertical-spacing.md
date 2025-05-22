# Vertical Rhythm Guide

## 1. Introduction

This guide outlines the standardized approach to vertical rhythm on the LatteArtist website. Its purpose is to ensure consistent visual spacing between major page sections, establish clear rules for developers, and improve the overall aesthetic and maintainability of the site.

## 2. Core Principle: Page-Controlled Rhythm

The primary principle is that **inter-section spacing is managed by the page layout file** (e.g., [`src/pages/index.astro`](src/pages/index.astro:1)), not by individual components trying to space themselves from others. Components should focus on their internal padding and layout.

## 3. Standard Vertical Spacing

We use a responsive vertical spacing system based on Tailwind CSS utility classes.

-   **Initial Top Space for Page Content:**

    -   The main layout file, [`src/layouts/Layout.astro`](src/layouts/Layout.astro:1), provides the initial top padding for the entire page content area.
    -   Class: `pt-16 md:pt-20 lg:pt-24`
    -   This creates:
        -   `4rem` (`16`) top padding on mobile.
        -   `5rem` (`20`) top padding on medium screens (`md:`).
        -   `6rem` (`24`) top padding on large screens (`lg:`).

-   **Inter-Section Gap:**
    -   The gap between subsequent thematic sections is achieved by applying a top margin to the wrapper `div` of each section (except the first one on the page).
    -   Class: `mt-16 md:mt-20 lg:mt-24`
    -   This creates a consistent vertical gap of:
        -   `4rem` (`16`) on mobile.
        -   `5rem` (`20`) on medium screens (`md:`).
        -   `6rem` (`24`) on large screens (`lg:`).

## 4. Thematic Page Section Components

-   **Definition:** These are major content blocks on a page, like a features section, a testimonial section, or an FAQ section.
-   **Wrapping:** In the page layout file (e.g., [`src/pages/index.astro`](src/pages/index.astro:1)), each thematic component instance is typically wrapped in a `div`. This wrapper `div` is what receives the `mt-*` classes for inter-section spacing (see section 6).
-   **Internal Padding:**
    -   Components should define their own internal padding as necessary for their content. Common values include `p-8` for overall padding, or more specific `px-*` and `py-*` as needed.
    -   **Crucially, components should _not_ include large `margin-top`, `margin-bottom`, `padding-top`, or `padding-bottom` values that are intended to create space _between_ themselves and other sections.** This is handled by the page layout.

## 5. Component Titles (e.g., `<h2>`)

-   Most thematic sections will have a main title, typically an `<h2>`.
-   To ensure consistent spacing between the title and the content that follows it within the component, apply a standard bottom margin to the title element.
-   Recommended class: `mb-8` (2rem).
-   The space _above_ a component's title is part of the component's internal top padding (e.g., if the component has `p-8`, the title will naturally have `2rem` of space above it within its own section).

## 6. Section Wrappers in Page Layouts

When assembling a page from thematic components:

1.  The **first thematic section** on the page does not need an explicit top margin in the page file. Its top spacing is provided by the `pt-*` classes in [`src/layouts/Layout.astro`](src/layouts/Layout.astro:1).
2.  **Each subsequent thematic section** should be wrapped in a `div`, and this `div` should receive the standard inter-section top margin classes.

**Example from [`src/pages/index.astro`](src/pages/index.astro:1):**

```html
---
// src/pages/index.astro
import Layout from "../layouts/Layout.astro";
import ImageColumn from "../components/ImageColumn.astro"; // Part of Hero
import SignupForm from "../components/SignupForm.astro";   // Part of Hero
import FeaturesCard from "../components/FeaturesCard.astro";
import TrustSection from "../components/TrustSection.astro";
import FaqAccordion from "../components/FaqAccordion.astro";
---

<Layout title="...">
    <!-- Hero Section (First Thematic Block) -->
    <section class="md:flex md:gap-8 md:max-w-6xl md:mx-auto">
        <!-- Left column - text and signup form -->
        <div class="md:w-3/5 md:mt-8">
            <h1 class="text-2xl md:text-4xl font-bold mb-6">...</h1>
            <p class="text-lg md:text-xl ... mb-4">...</p>
            <p class="md:text-lg ... mb-8">...</p>
            <SignupForm />
        </div>
        <!-- Right column - image -->
        <div class="mt-8 md:mt-0 md:w-2/5">
            <ImageColumn />
        </div>
    </section>

    <!-- Features Section (Subsequent Thematic Block) -->
    <div class="w-full md:w-full mt-16 md:mt-20 lg:mt-24">
        <FeaturesCard />
    </div>

    <!-- Trust Section (Subsequent Thematic Block) -->
    <div class="w-full md:w-full mt-16 md:mt-20 lg:mt-24">
        <TrustSection />
    </div>

    <!-- FAQ Section (Subsequent Thematic Block) -->
    <div class="mt-16 md:mt-20 lg:mt-24">
        <FaqAccordion />
    </div>
</Layout>
```

## 7. Responsive Breakpoints

The vertical rhythm system explicitly uses Tailwind's default responsive breakpoints:

-   `md:` (min-width: `768px`)
-   `lg:` (min-width: `1024px`)

These prefixes are applied to the `pt-*` classes in `Layout.astro` and the `mt-*` classes on section wrappers in page files to ensure the rhythm scales appropriately.

## 8. Multi-Column Layouts within Components

-   The vertical rhythm guidelines primarily address the spacing _between_ major, typically full-width, thematic section blocks.
-   If a component internally uses a multi-column layout (e.g., a two-column list of features, a grid of cards), that internal layout is managed by the component itself.
-   The component as a whole, including its internal columns and padding, will still adhere to the external vertical rhythm set by the page layout's `mt-*` classes.
-   Internal spacing within multi-column layouts (e.g., using `gap-x`, `gap-y`, or margins on column items) is independent of the inter-section rhythm.

## 9. Quick Checklist for Developers

When adding or modifying sections:

-   **Is this the first thematic section on the page?**
    -   No top margin needed on its wrapper in the page file. [`Layout.astro`](src/layouts/Layout.astro:1) handles its top spacing (`pt-16 md:pt-20 lg:pt-24`).
-   **Is this a subsequent thematic section?**
    -   Wrap its component instance in a `div` in the page file.
    -   Add `mt-16 md:mt-20 lg:mt-24` to this wrapper `div`.
-   **Are you creating a new thematic section component?**
    -   Define internal padding as needed (e.g., `p-8`, `px-4 py-6`).
    -   If it includes a main title (`<h2>`), add `mb-8` below the title.
    -   **Do not** add large top/bottom margins or paddings to the component's outermost element for inter-section spacing.
-   **Horizontal Padding:** Ensure consistent horizontal padding for page content. A common pattern is `px-4 sm:px-6 lg:px-8` applied either to the section wrapper in the page or to the component's outermost element if it's intended to constrain its content width.

By following these guidelines, we can maintain a clean, consistent, and responsive vertical flow throughout the LatteArtist website.
