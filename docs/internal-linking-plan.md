# Internal linking plan (ian.is internal-links report)

Source: `internal-links-latteartist.coffeeatpetros.com.csv` — 72 ranked suggestions
(18 `strong`, 54 `possible`) with source, target, sentence, anchor phrase, role and
the target's current inbound link count.

## How the tiers were applied

| Tier | Rule | Rows |
| --- | --- | --- |
| `strong` (p ≥ 0.75) | Always applied | 18 |
| `possible` p ≥ 0.68 | Applied | 14 |
| `possible` p 0.58–0.67 | Applied only where the target has ≤ 3 inbound links (orphan defence) or the fix matched an existing pattern used by sibling guides | 3 |
| `possible` p ≤ 0.57 | Applied only exact body-sentence placements for underlinked targets | 3 |
| Everything else | Skipped, listed below | 34 |

Two adjustments made while applying:

1. **Card-teaser placements were relocated.** Many suggested sentences come from the
   "Related guides" cards at the bottom of each page (rendered from another guide's
   `description` frontmatter). Putting a link inside a card that already links to its
   own guide is confusing, so each of those was moved to the nearest real body
   sentence covering the same idea.
2. **Anchors were kept descriptive.** Where the suggested anchor was empty or generic,
   the anchor uses the target's own keywords (e.g. `microfoam`, `foam dumps out later`,
   `practice without wasting coffee`).

## Applied links (39)

### Inbound lift for weak pages

Before: `how-to-practice-latte-art-without-wasting-coffee` 1 inbound · `oat-milk-latte-art` 2 · `steaming-milk-weak-machine` 3.

| Source | Anchor → target | Row(s) | Confidence |
| --- | --- | --- | --- |
| latte-art-for-beginners | "practice without wasting coffee" → how-to-practice | 3 | 0.80 |
| latte-art-practice-routine | "useful reps" → how-to-practice | 9 | 0.78 |
| latte-art-heart | "practice without wasting coffee" → how-to-practice | 16 | 0.76 |
| latte-art-troubleshooting | "practice without wasting coffee" → how-to-practice | 25 | 0.73 |
| how-to-steam-milk-for-latte-art | "Rehearse the steam-wand setup dry" → how-to-practice | 29 | 0.69 |
| oat-milk-latte-art | "practice without wasting coffee" → how-to-practice | 44 | 0.60 |
| milk-too-thick-too-thin | "oat milk guide" → oat-milk-latte-art | 37 | 0.65 |
| latte-art-courses-london | "alternative milks" → oat-milk-latte-art | 60 | 0.53 |
| latte-art-for-beginners | "entry-level espresso machine" → steaming-milk-weak-machine | 32 | 0.67 |
| what-is-microfoam | "entry-level espresso machine" → steaming-milk-weak-machine | 28 | 0.72 |
| how-to-practice... | "new to a machine" → steaming-milk-weak-machine | 64 | 0.52 |
| latte-art-courses-london | "espresso machine" → steaming-milk-weak-machine | 68 | 0.51 |

### Strong tier (all 18 applied)

| Source | Anchor → target | Row | Confidence |
| --- | --- | --- | --- |
| latte-art-for-beginners | "**microfoam**: tiny bubbles" → what-is-microfoam | 0 | 0.84 |
| latte-art-for-beginners | "A foam dump" → milk-too-thick-too-thin | 1 | 0.83 |
| how-to-steam-milk-for-latte-art | "Make your usual pour" → latte-art-practice-routine | 2 | 0.81 |
| latte-art-troubleshooting | "glossy and flowing" → what-is-microfoam | 4 | 0.80 |
| what-is-microfoam | "Latte art relies on it" → latte-art-for-beginners | 5 | 0.79 |
| latte-art-courses-london | "microfoam" → what-is-microfoam | 6 | 0.78 |
| how-to-practice... | "looks glossy" → what-is-microfoam | 7 | 0.78 |
| how-to-practice... | "little too thick" → milk-too-thick-too-thin | 8 | 0.78 |
| latte-art-troubleshooting | "what showed up in the cup" → latte-art-for-beginners | 10 | 0.78 |
| latte-art-rosetta | "the last white dump" → milk-too-thick-too-thin | 11 | 0.77 |
| latte-art-rosetta | "looks glossy, like wet paint" → what-is-microfoam | 12 | 0.77 |
| steaming-milk-weak-machine | "latte art" → latte-art-for-beginners | 13 | 0.77 |
| steaming-milk-weak-machine | "troubleshooting guide" → latte-art-troubleshooting | 14 | 0.77 |
| latte-art-tulip | "thin milk merges layers" → milk-too-thick-too-thin | 15 | 0.76 |
| latte-art-heart | "foam dumps out later" → milk-too-thick-too-thin | 17 | 0.75 |

### Remaining applied `possible` rows

Rows 18 (courses → how-to-practice), 19 (how-to-practice → for-beginners),
20 ("Save rosettas" → latte-art-rosetta), 21 (oat-milk → for-beginners),
22 ("get the milk glossier" → how-to-steam-milk-for-latte-art),
23 ("get the spout close" → for-beginners), 24 ("best first pattern" → for-beginners),
26 ("build an even base" → for-beginners), 27 ("glossy" → what-is-microfoam),
30 ("microfoam" → what-is-microfoam), 31 ("placement" → latte-art-symmetry),
38 (heart → symmetry, consistency with rosetta/tulip/for-beginners fix tables),
53 (releases → support; /support had zero contextual inbound links).

Bonus fix: tulip's "as in the heart guide" now links to `/learn/latte-art-heart/`
(the tool pointed this at the beginner guide; the heart guide is the honest target).

## Skipped suggestions (and why)

- **Rows 33–36, 39–43, 45, 47, 51, 57, 59, 65, 69–70** — targets already carry
  4–13 inbound links and the placement sentence was a related-card teaser or the
  confidence did not justify another link from the same pages.
- **Rows 46, 48, 49, 52, 55, 56, 58, 61–63, 66, 67, 71** — no usable sentence or
  anchor was found (the tool itself could not place these in real body text).
- **Row 51 / 57 (support FAQ)** — good reader-facing ideas (link "diagnose a problem"
  → troubleshooting, "compare how a pattern changes over time" → practice routine),
  but the FAQ answers render as plain text in `FaqAccordion.astro`; adding links means
  changing the component to render HTML. Phase 2 candidate.
- **Rows 43 / 58 (rosetta ↔ tulip ↔ heart pattern cross-links)** — natural sibling
  links but targets already have 4–11 inbound; phase 2 polish.

## Phase 2 (optional)

1. Teach `FaqAccordion.astro` to render links in answers, apply rows 51 + 57.
2. Add the sibling pattern cross-links (rosetta → tulip, heart → tulip).
3. Re-run the report after the next content push to confirm `how-to-practice...`
   (was 1 inbound) and `oat-milk-latte-art` (was 2) now score as healthy targets.
