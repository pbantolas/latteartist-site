# LatteArtist SEO content plan

## Objective

Build topical authority around deliberate latte-art practice while giving each visitor a clear path between technique guides, troubleshooting pages, and the LatteArtist product page.

The App Store listing is the source of truth for product claims. Community discussions can identify language and questions, but they are not treated as technical evidence.

## Source-of-truth rules

- Product facts come from the live US App Store listing and Apple lookup metadata for app ID `6744374882`.
- Safe claims: capture or choose a pour photo; log pattern, personal rating, milk, cup, volume, and notes; focus on a pattern; compare first and latest; browse history by pattern; create Pour Cards; export and restore data.
- Do not claim AI scoring, automatic diagnosis, technique coaching, training plans, or automatic analysis.
- Technique guidance must be supported by trusted specialty-coffee educators, not forum consensus alone.
- Reddit is used for topic discovery and natural vocabulary such as “microfoam,” “wet paint,” “blob,” “stretching,” “vortex,” “base,” and “cut-through.” Conflicting advice, exact timing, temperatures, and brand recommendations are not promoted as universal facts.

## Topic architecture

| Priority | URL | Primary intent | Role | Status |
| --- | --- | --- | --- | --- |
| 1 | `/learn/latte-art-for-beginners/` | latte art for beginners | Broad pillar and learning path | Implemented |
| 1 | `/learn/how-to-steam-milk-for-latte-art/` | how to steam milk for latte art | Foundational technique | Implemented |
| 1 | `/learn/latte-art-heart/` | how to pour a latte art heart | First-pattern guide | Implemented |
| 1 | `/learn/latte-art-troubleshooting/` | latte art troubleshooting / why is my latte art a blob | Symptom-led problem solver | Implemented |
| 1 | `/learn/latte-art-practice-routine/` | how to practice latte art | Product-aligned practice method | Implemented |
| 2 | `/learn/latte-art-tulip/` | how to pour tulip latte art | Intermediate pattern | Implemented |
| 2 | `/learn/latte-art-rosetta/` | how to pour rosetta latte art | Intermediate pattern | Implemented |
| 2 | `/learn/oat-milk-latte-art/` | how to make latte art with oat milk | Milk-specific troubleshooting | Implemented |
| 2 | `/learn/milk-too-thick-too-thin/` | latte art milk too thick or too thin | Milk texture diagnostic | Implemented |
| 2 | `/learn/what-is-microfoam/` | what is microfoam | Foundational definition | Implemented |
| 2 | `/learn/steaming-milk-weak-machine/` | steaming milk on entry-level machines | Milk texture for weak steam | Implemented |
| 2 | `/learn/latte-art-symmetry/` | latte art off centre / not symmetrical | Symptom-led problem solver | Implemented |
| 3 | `/learn/latte-art-cup-shape/` | best cup shape for latte art | Equipment variable | Planned |
| 3 | `/learn/latte-art-pitcher-guide/` | latte art milk pitcher size and spout | Equipment variable | Planned |
| 3 | `/learn/latte-art-glossary/` | latte art terms | Jargon and internal-link hub | Planned |

## Internal-link model

- The `/learn/` hub links to every guide.
- The beginner pillar links to milk texture, heart, troubleshooting, and practice.
- Every pattern guide links back to milk texture and troubleshooting.
- Troubleshooting links to the guide that explains each relevant foundation.
- The practice guide links to the relevant stages of the learning path.
- Every guide includes a contextual LatteArtist CTA after the instructional content.
- The homepage carries the product story and links to the guide hub. The global navigation and footer expose the learning hub without a duplicate product landing page.

Avoid repeating the same exact anchor text on every page. Prefer anchors that fit the sentence and clearly describe the destination.

## Editorial pattern for each guide

1. Answer the search intent in the opening paragraph.
2. Define community jargon in plain language.
3. Break the task into observable stages.
4. Use symptom-first troubleshooting where relevant.
5. State when more than one cause is possible.
6. Suggest a one-variable experiment.
7. Link to the next useful guide, not every possible page.
8. Place the app CTA after the useful answer and describe only verified features.
9. Include author, publication or update date, reading time, canonical URL, Article schema, and breadcrumbs.

## Measurement and refresh cadence

- Submit `/sitemap.xml` in Google Search Console after deployment.
- Check indexing, impressions, queries, and average position by page monthly.
- Track App Store outbound clicks separately from guide page views.
- Add FAQ sections only when Search Console queries show a real recurring question; do not manufacture FAQ schema.
- Review App Store feature claims after every app release.
- Refresh technique pages when trusted sources or the product workflow materially change.
- Expand the cluster based on impressions and community questions, not volume alone.

## Research notes

The initial topic list used the live App Store page, Apple’s lookup metadata, the current public r/latteart JSON feed, and existing r/latteart discussions. Reddit’s direct search API returned `403` from the development environment, so the accessible public listing feed and individual indexed threads were used as a secondary signal rather than a complete dataset.

## Topic backlog from community research (2026-08-06)

Sources mined through a Chrome DevTools Protocol browser session (direct curl and old.reddit.com were IP-blocked; the Reddit JSON API and Home-Barista search worked through the browser):

- `r/latteart` top of year and all time, Question flair, and searches for `help`, `how do I`, and `oat milk`
- `r/espresso` searches for `latte art`, `steaming milk`, and `microfoam`
- `r/Coffee` search for `latte art`
- `home-barista.com/forums` searches for `latte art`, `microfoam steaming`, `latte art practice`, and `oat milk latte art`

Recurring pain points, in rough order of frequency: milk texture before pattern skill, designs that drift or lack symmetry, art too small for the cup, weak steam on entry-level machines (Bambino, Dedica, Gaggia), oat-milk and other alt-milk behavior, progression timelines ("X months from blob to rosetta"), and self-filming pours for diagnosis. Community vocabulary to reuse in headings: blob, wiggle, stretch and roll, vortex, swirl and tap, definition, contrast, the wing, wrap, crash, free pour, barista edition.

Statuses: Planned (not started), Drafted, Implemented. When a topic ships, move its row into the architecture table above and remove it here.

### Patterns (progression ladder)

| Priority | Proposed URL | Working title / intent | Status |
| --- | --- | --- | --- |
| 3 | `/learn/latte-art-winged-tulip/` | Winged tulip and getting the wing base to wrap the design | Planned |
| 3 | `/learn/latte-art-ripple-heart/` | Ripple heart (wiggle heart): the step between heart and rosetta | Planned |
| 4 | `/learn/latte-art-slow-rosetta/` | Slow rosetta / "slowsetta": slower drag, more leaves | Planned |
| 4 | `/learn/latte-art-swan/` | How to pour a swan | Planned |
| 3 | `/learn/latte-art-progression/` | Latte art progression: blob to rosetta, what to expect month by month | Planned |

### Milk science and steaming

| Priority | Proposed URL | Working title / intent | Status |
| --- | --- | --- | --- |
| 3 | `/learn/swirl-and-tap/` | Swirl and tap: the ten-second fix after steaming | Planned |
| 3 | `/learn/milk-temperature-latte-art/` | Milk temperature for latte art: the sweet spot and why overheated milk will not pour | Planned |
| 3 | `/learn/microfoam-separating/` | Why microfoam separates while pouring and how to keep it integrated | Planned |
| 4 | `/learn/latte-art-bubbles/` | Big bubbles after sitting: what they tell you about your steam | Planned |
| 3 | `/learn/steam-wand-position/` | Steam wand position and angle: finding the vortex | Planned |
### Alternative milks

| Priority | Proposed URL | Working title / intent | Status |
| --- | --- | --- | --- |
| 4 | `/learn/alt-milk-latte-art/` | Soy, almond, and other alt milks ranked for latte art | Planned |
| 4 | `/learn/best-oat-milk-latte-art/` | Comparing barista oat milks for pouring | Planned |

### Pour diagnostics

| Priority | Proposed URL | Working title / intent | Status |
| --- | --- | --- | --- |
| 2 | `/learn/latte-art-too-small/` | Why your designs are too small: cup fill, canvas, and flow rate | Planned |
| 3 | `/learn/latte-art-drift/` | The drift: why designs slide as you pour | Planned |
| 3 | `/learn/latte-art-contrast/` | Contrast and definition: getting whiter lines (crema, freshness, pouring speed) | Planned |
| 4 | `/learn/free-pour-vs-etching/` | Free pour vs etching: what counts as latte art | Planned |
| 3 | `/learn/cortado-latte-art/` | Latte art in small cups: cortados and flat whites | Planned |

### Gear and practice workflow

| Priority | Proposed URL | Working title / intent | Status |
| --- | --- | --- | --- |
| 3 | `/learn/latte-art-pitcher-guide/` | Milk pitcher guide: size, spout shape, handleless pitchers | Planned (already in architecture table) |
| 3 | `/learn/latte-art-cup-shape/` | Does your cup matter: cup shape and capacity for latte art | Planned (already in architecture table) |
| 3 | `/learn/practice-without-wasting-milk/` | Practicing latte art without wasting milk (water and dish soap) | Planned |
| 3 | `/learn/film-your-pours/` | How to film and review your own pours to self-diagnose | Planned |
| 4 | `/learn/latte-art-without-espresso-machine/` | Latte art without an espresso machine: handheld frothers and instant coffee | Planned |
| 4 | `/learn/latte-art-throwdown/` | What is a latte art throwdown | Planned |

### Notes for writing from this backlog

- Prioritize the patterns and milk clusters first; they interlock with the existing heart, steaming, and troubleshooting guides into a tight hub.
- Every article ends with a contextual "log this pour" CTA using only verified app features (see source-of-truth rules above). The community already keeps progression albums, which aligns with the app's pour log.
- Reuse community vocabulary in headings (blob, wiggle, stretch, definition, wrap, crash) but verify technique claims against trusted specialty-coffee educators per the source-of-truth rules; forum consensus alone is not evidence.
- A `/learn/latte-art-glossary/` hub (already in the architecture table) can absorb long-tail jargon queries and link out to each of these guides.
