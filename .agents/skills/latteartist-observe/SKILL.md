---
name: latteartist-observe
description: Collect and compare LatteArtist SEO, website engagement, and App Store acquisition data for a weekly Observe report using Google Search Console, Umami, and App Store Connect. Use for running the Observe workflow or reviewing those trends; content improvements belong to the separate Improve workflow.
---

# LatteArtist Observe

Answer what people search for, which pages receive that traffic, what visitors do, and whether website traffic contributes to app downloads.

Read [the Observe workflow](references/observe.md) before collection or calculation. It defines authentication, provider commands and identifiers, date boundaries, metric definitions, and persisted output. Run repository-relative commands from the repository root. When reviewing existing reports, inspect their raw evidence and completeness metadata; live collection is needed only for a refresh.

## Scope and reporting safeguards

- Keep provider access read-only. On authentication failure, stop collection and report remediation. Setup or repair requires existing user authorization; an Observe request alone does not authorize credential replacement.
- Never print or persist credentials, login responses, or tokens.
- Keep stable-window comparisons separate from the fresh tail. Preserve provider gaps and partial data explicitly; do not replace missing current data with historical results.
- Keep event counts, sessions, visitors, referral views, campaign metrics, and attributed downloads distinct. Report unavailable metrics as `—` and measured zeroes as `0`.
- Keep observations separate from recommendations. Do not turn an Observe request into content edits or tracking changes.

## Deliverables

Save a concise report, structured summary, and raw evidence using the layout and minimum fields in the reference. Report the collection scope, data limitations, and unusual movements without treating small samples as established trends.
