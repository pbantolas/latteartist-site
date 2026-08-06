# LatteArtist SEO content plan

## Objective

Build topical authority around deliberate latte-art practice while giving each visitor a clear path between technique guides, troubleshooting pages, and the LatteArtist product page.

The App Store listing is the source of truth for product claims. Community discussions can identify language and questions, but they are not treated as technical evidence.

## Source-of-truth rules

- Product facts come from the live US App Store listing and Apple lookup metadata for app ID `6744374882`.
- Safe claims: capture or choose a pour photo; log pattern, personal rating, milk, cup, volume, and notes; focus on a pattern; compare first and latest; browse history by pattern; create Pour Cards; export and restore data.
- Do not claim AI scoring, automatic diagnosis, technique coaching, training plans, or automatic analysis.
- Technique guidance must be supported by reputable instruction, preferably espresso-machine manufacturers or established coffee education sources.
- Reddit is used for topic discovery and natural vocabulary such as “microfoam,” “wet paint,” “blob,” “stretching,” “vortex,” “base,” and “cut-through.” Conflicting advice, exact timing, temperatures, and brand recommendations are not promoted as universal facts.

## Topic architecture

| Priority | URL | Primary intent | Role | Status |
| --- | --- | --- | --- | --- |
| 1 | `/learn/latte-art-for-beginners/` | latte art for beginners | Broad pillar and learning path | Implemented |
| 1 | `/learn/how-to-steam-milk-for-latte-art/` | how to steam milk for latte art | Foundational technique | Implemented |
| 1 | `/learn/latte-art-heart/` | how to pour a latte art heart | First-pattern guide | Implemented |
| 1 | `/learn/latte-art-troubleshooting/` | latte art troubleshooting / why is my latte art a blob | Symptom-led problem solver | Implemented |
| 1 | `/learn/latte-art-practice-routine/` | how to practice latte art | Product-aligned practice method | Implemented |
| 1 | `/latte-art-tracker/` | latte art tracker / latte art journal | Commercial product page | Implemented |
| 2 | `/learn/latte-art-tulip/` | how to pour tulip latte art | Intermediate pattern | Planned |
| 2 | `/learn/latte-art-rosetta/` | how to pour rosetta latte art | Intermediate pattern | Planned |
| 2 | `/learn/oat-milk-latte-art/` | how to make latte art with oat milk | Milk-specific troubleshooting | Planned |
| 3 | `/learn/latte-art-cup-shape/` | best cup shape for latte art | Equipment variable | Planned |
| 3 | `/learn/latte-art-pitcher-guide/` | latte art milk pitcher size and spout | Equipment variable | Planned |
| 3 | `/learn/latte-art-glossary/` | latte art terms | Jargon and internal-link hub | Planned |

## Internal-link model

- The `/learn/` hub links to every guide.
- The beginner pillar links to milk texture, heart, troubleshooting, and practice.
- Every pattern guide links back to milk texture and troubleshooting.
- Troubleshooting links to the guide that explains each relevant foundation.
- The practice guide links to every stage of the learning path and to the product page.
- Every guide includes a contextual LatteArtist CTA after the instructional content.
- The product page links to the guide hub and practice routine, and the global navigation and footer expose both the learning hub and product page.

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

The initial topic list used the live App Store page, Apple’s lookup metadata and screenshots, current public r/latteart JSON feed results, existing r/latteart discussions, and manufacturer educational material from La Marzocco and Breville. Reddit’s direct search API returned `403` from the development environment, so the accessible public listing feed and individual indexed threads were used as a secondary signal rather than a complete dataset.
