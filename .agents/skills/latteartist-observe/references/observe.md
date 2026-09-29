# SEO Observe — Weekly Checklist

Scope: LatteArtist (https://latteartist.coffeeatpetros.com), iOS app "Latte Art Tracker: LatteArtist".

## 0. Authenticate before collecting data

Run the preflight before making any collection calls:

```bash
scripts/setup-agent-auth --check
```

The preflight must have permission to access the macOS Login keychain and local CLI session stores. Use the available permission mechanism when sandbox restrictions prevent access for this command or subsequent `security`, `gog`, and `asc` commands; restricted access can make healthy credentials appear missing. Do not treat a permission error as proof that credentials need replacement.

It validates all three sources without printing secrets:

* Umami: the dedicated generic-password entries in the Login keychain, then an API login
* Google Search Console: a refreshable `gog` OAuth token with the `searchconsole` scope
* App Store Connect: a cached `asc web` session

If preflight fails, stop collection and report the printed remediation. Repair only when the user has authorized that setup or repair; then rerun preflight before continuing. To create or replace the dedicated Umami entries, run `scripts/setup-agent-auth` interactively. For Google and ASC, follow the specific remediation printed by the preflight.

## 1. Time window

Use:

* **Stable window**: last 28 complete days, where the latest complete date is **today − 3** (provider lag: GSC and ASC data is partial for the most recent days). All comparisons and trends use this window.
* **Fresh tail**: the excluded days (today − 2 → today). Shown separately as raw counts in the report, never compared against prior periods.
* Previous 28 complete days for comparison (against the stable window)
* Optionally note the last 7 days for recent movement

### Exact boundaries

Resolve today once in the user's timezone (default for this repository: `Europe/London`) and persist that timezone and the UTC collection timestamp. Let `D` be that date:

* Stable: `D − 30` through `D − 3`, inclusive (28 dates).
* Previous: `D − 58` through `D − 31`, inclusive (28 dates).
* Fresh tail: `D − 2` through `D`, inclusive; today is incomplete.

GSC and ASC receive inclusive date strings. For Umami, convert local midnight on the start date and local midnight after the end date to epoch milliseconds using a timezone-aware library, including daylight-saving transitions. Set `startAt` to the first boundary and `endAt` to one millisecond before the second. Cap the fresh-tail end at collection time.

Use the same calendar dates across providers. Record each provider's reported timezone when available; otherwise mark it unknown and disclose that equal date labels may cover different instants. Persist exact Umami epoch boundaries. Record completeness separately for each provider/window: `complete`, `partial`, `unavailable`, or `unknown`. Provider lag can still affect the stable window; do not assume completeness from the three-day cutoff alone.

---

## 2. Pull from Google Search Console

### Queries

For each query collect:

* Query
* Clicks
* Impressions
* CTR
* Average position
* Change vs previous period

### Pages

For each landing page collect:

* URL/path
* Clicks
* Impressions
* CTR
* Average position
* Change vs previous period

### Query × Page

Keep the query-to-page relationship available so we can see:

* Which page ranks for a query
* Multiple pages ranking for the same query
* Queries that do not have an obviously suitable page

### Pull

Tool: gog. Target property: `sc-domain:coffeeatpetros.com` (LatteArtist is a subdomain of that domain property).

One query per collection, run for the current window and again for the previous window:

```bash
gog searchconsole searchanalytics query sc-domain:coffeeatpetros.com \
  --dimensions QUERY --from <from> --to <to> --max 1000 --json \
  --filter 'PAGE:includingRegex:^https://latteartist\.coffeeatpetros\.com/'
```

Apply that PAGE filter to **every** request, including QUERY-only requests, totals, and all three windows. Filtering returned PAGE rows cannot remove other subdomains from a QUERY-only response. Select a stored account with the `searchconsole` scope via `--account` if gog cannot resolve it unambiguously.

* Queries: `--dimensions QUERY`
* Pages: `--dimensions PAGE` — keep only rows for `https://latteartist.coffeeatpetros.com/*`
* Query × Page: `--dimensions QUERY,PAGE`

Plain text output (drop `--json`) already shows clicks/impressions/CTR/position; use `--json` for the persisted history.

Query and query×page results can omit anonymized queries and may show impressions with few or no clicks at this traffic level. Do not label every query zero as confirmed suppression. Use scoped page data for reported clicks and document query coverage limitations.

Use `--offset` to paginate when a response reaches `--max`; stop when a page contains fewer rows than requested. Preserve raw pages. GSC can still return only top rows, so do not claim complete coverage solely because pagination finished. Derive CTR from summed clicks divided by summed impressions; weight average position by impressions when aggregating rows. Never average row CTRs or positions without weighting.

---

## 3. Pull from Umami

For each page/path collect:

### Traffic

* Pageviews
* Visitors / sessions
* Organic traffic where identifiable

### Engagement

* `guide_engaged`
* Engagement rate

### App Store CTA

* `app_store_cta_seen`
* `app_store_click`

Break CTA events down by:

* Page/path
* `placement`
* `page_type`
* `topic`
* `cta_variant`

### Counts and rates

For each normalized page and window, use the same visitor identity and counting method for numerators and denominators:

* `V`: distinct page visitors.
* `E`: distinct page visitors who fired `guide_engaged`.
* `S`: distinct page visitors who fired `app_store_cta_seen`.
* `C`: distinct page visitors who fired `app_store_click`.
* `SC`: distinct page visitors with both a CTA-seen and CTA-click event for that page in the window.

Engagement rate = `E / V`; CTA exposure rate = `S / V`; CTA click rate = `C / V`; seen → click rate = `SC / S`. Show percentages and their numerator/denominator. For placement-specific rates, match both events to the same placement.

These are within-window visitor rates, not proof of event order or causal conversion. If only `sessionId` is available, it supports distinct-session counts, not visitor counts; compute consistently labeled session rates only if page-session denominators are also available. Never divide raw event counts by visitor totals and call the result a visitor rate. Keep raw event counts separately.

Report `—` when the denominator is zero or required identity/denominator data is unavailable. A zero numerator with a positive, measured denominator yields `0%` only when instrumentation and collection coverage are established. Exposure and seen → click rates require verified CTA-seen instrumentation covering the window; one event in a later window does not establish earlier coverage. Until coverage is established, retain raw counts and report these rates as unavailable.

Referrer metrics may count pageviews rather than visitors. Label organic referrer pageviews accordingly; report organic visitors only when distinct visitor data for that segment is available. Do not interchange visitors and sessions.

### Pull

Self-hosted at https://umami.bantolas.dev. Credentials are dedicated generic-password entries in the macOS Login keychain (services `agent-latteartist-umami-username` and `agent-latteartist-umami-password`, account `$USER`), created by `scripts/setup-agent-auth`. Run these commands with permission to access the Login keychain.

1. Log in:

   ```bash
   UM_USER=$(security find-generic-password -a "$USER" -s agent-latteartist-umami-username -w)
   UM_PASS=$(security find-generic-password -a "$USER" -s agent-latteartist-umami-password -w)
   LOGIN_RESPONSE=$(curl --fail --silent --show-error -X POST https://umami.bantolas.dev/api/auth/login \
     -H 'Content-Type: application/json' \
     --data "$(jq -nc --arg username "$UM_USER" --arg password "$UM_PASS" \
       '{username: $username, password: $password}')")
   TOKEN=$(jq -er '.token | strings | select(length > 0)' <<<"$LOGIN_RESPONSE")
   TEAM_ID=$(jq -er '.user.teams[0].id' <<<"$LOGIN_RESPONSE")
   unset UM_USER UM_PASS LOGIN_RESPONSE
   ```

2. Find the website id (the agent user is view-only; the LatteArtist website is team-scoped):

   ```bash
   curl --fail --silent --show-error https://umami.bantolas.dev/api/teams/$TEAM_ID/websites \
     -H "Authorization: Bearer $TOKEN"    # website named "LatteArtist"
   ```

3. Dates are epoch milliseconds (`startAt`/`endAt`). Run each for both windows:

   ```bash
   curl --fail --silent --show-error "https://umami.bantolas.dev/api/websites/<websiteId>/stats?startAt=$FROM&endAt=$TO" \
     -H "Authorization: Bearer $TOKEN"    # pageviews, visitors, bounces
   curl --fail --silent --show-error "https://umami.bantolas.dev/api/websites/<websiteId>/metrics?type=path&startAt=$FROM&endAt=$TO" \
     -H "Authorization: Bearer $TOKEN"    # pageviews per path
   curl --fail --silent --show-error "https://umami.bantolas.dev/api/websites/<websiteId>/metrics?type=referrer&startAt=$FROM&endAt=$TO" \
     -H "Authorization: Bearer $TOKEN"    # organic = google.com etc.
   ```

4. Events and their properties (the `events` endpoint paginates, add `&page=N`):

   ```bash
   curl --fail --silent --show-error "https://umami.bantolas.dev/api/websites/<websiteId>/events?startAt=$FROM&endAt=$TO" \
     -H "Authorization: Bearer $TOKEN"     # rows: urlPath + eventName
   curl --fail --silent --show-error "https://umami.bantolas.dev/api/websites/<websiteId>/event-data?startAt=$FROM&endAt=$TO" \
     -H "Authorization: Bearer $TOKEN"     # eventProperties: placement, page_type, topic, cta_variant
   ```

   Inspect pagination metadata and fetch all pages from both endpoints where paginated. Join the property record's `eventId` to the event row's identifier (often `id`); inspect the actual response fields rather than assuming both are named `eventId`. Group properties per event before counting so multiple properties do not multiply event totals. Record unmatched property records or missing event pages as coverage gaps.

Unset `TOKEN` and `TEAM_ID` when collection finishes. Do not save login responses in the report's raw evidence.

---

## 4. Pull from App Store Connect

Initially keep this simple.

Collect:

* First-time downloads
* Product page views
* Website campaign (`ct=website`) metrics where available
* Change vs previous period

Do not try to attribute individual downloads to individual guides yet.

Treat ASC primarily as:

> Is website/App Store acquisition improving overall?

### Pull

Tool: asc CLI (web-session analytics, not the App Analytics report instances). Requires a cached Apple web session, check with `asc web auth status` (login once with `asc web auth login`). App: Latte Art Tracker: LatteArtist, app id `6744374882`.

Per window, one call each:

```bash
asc web analytics overview --app 6744374882 --start <from> --end <to>
asc web analytics sources --app 6744374882 --start <from> --end <to>
```

* First-time downloads: `units` (acquisition)
* Product page views: `pageViewCount`; impressions: `impressionsTotal`
* Website referrals: `sources` → `WebRef`. Read the response's `measure` and label it precisely; the CLI defaults to `pageViewUnique` (product-page views measured by unique devices). This group includes web referrals broadly, not just LatteArtist or `ct=website`.
* Website campaign: query `asc web analytics campaigns --app 6744374882 --start <from> --end <to>` and identify the actual website campaign in the response. Preserve its metric names and units. Do not infer campaign results from `WebRef`.
* Website-attributed downloads: report only when a response explicitly provides a download metric scoped to the website campaign. Otherwise report `—`. Overall `units`, referral page views, and campaign page views are separate measurements.
* Change vs previous period: use explicit stable and previous responses. Use `previousTotal` / `percentChange` only if their date coverage matches the selected previous window.

Inspect response wrappers, measure names, and aggregation types. A `totals.value` labeled `AVERAGE` is not a window sum. Daily unique-device counts summed across dates are device-days, not distinct devices for the whole window; label that aggregation if used. Preserve raw daily values when a correct period total is unavailable.

Do not use the App Analytics report-instances flow (`asc analytics request` → per-day `instances` → segment CSVs). It only has daily granularity, so a 28-day window means 30+ downloads per report; the web analytics endpoints return the same metrics for the whole window in one call.

---

## 5. Normalize the data

Use the website path as the main page identifier.

Example:

`/guides/how-to-pour-latte-art`

Normalize away:

* Domain
* Trailing slash differences
* Query parameters
* Tracking parameters

Join GSC pages and Umami pages using this normalized path.

Keep `topic` and `page_type` as metadata, not as the primary identifier.

---

## 6. Basic definitions

### Search demand

Primarily:

* GSC impressions
* Query growth/decline

### Search performance

Primarily:

* Clicks
* CTR
* Average position

### Engagement

Primarily:

* `guide_engaged`
* Engagement rate

### App intent

Primarily:

* App Store CTA clicks
* CTA click rate
* Seen → click rate

### App outcome

Primarily:

* ASC first-time downloads
* Website campaign performance

---

## 7. Present the weekly report

Keep the human-facing report concise.

### Conventions

* `0` — we measured it and there were none
* `—` — metric unavailable / insufficient instrumentation (e.g. CTA exposure metrics until `app_store_cta_seen` fires)

### Site overview

Show:

* Organic clicks
* Organic impressions
* Organic visitors
* App Store clicks
* Website-referral product-page views (with metric units)
* Website campaign metrics and attributed downloads where available
* Change vs previous period

### Top queries

Small table:

| Query | Clicks | Impressions | CTR | Position | Change |
| ----- | -----: | ----------: | --: | -------: | -----: |

### Top pages

Small table:

| Page | GSC clicks | Organic visits | Engagement | App Store clicks |
| ---- | ---------: | -------------: | ---------: | ---------------: |

### Fresh tail

Raw counts for the days after the stable window (today − 2 → today). Report them as-is with no comparison:

> Fresh data: 15 downloads, 1 App Store click, 1 engaged guide visit. Not included in trend comparisons.

Keep it to one line unless something stands out (spike, new behaviour). GSC tail data is often still partial; say so if it is.

* Growing query/page
* Declining query/page
* New query appearing
* Strong App Store click behaviour
* Weak engagement
* Interesting mismatch between search traffic and app intent

Keep this report observational; put requested recommendations in a separate Improve response.

---

## 8. Keep observations separate from recommendations

Observe should describe:

> What happened?

and:

> What looks unusual or interesting?

It should not automatically become:

> Rewrite this article.

Those recommendations belong to the separate Improve workflow.

---

## 9. Persist enough history

Use `reports/YYYY-MM-DD/` based on the run date, with:

* `observe.md`: concise human-facing report.
* `summary.json`: normalized metrics, provenance, limitations, and observations.
* `raw/`: provider responses, including all retrieved pages, named by provider, collection, window, and page number.

Inspect an existing same-date run before writing; retain it and use a timestamped subdirectory for a new run rather than overwriting evidence.

Minimum summary structure:

```json
{
  "schema_version": 1,
  "run_date": "YYYY-MM-DD",
  "collected_at": "UTC ISO-8601 timestamp",
  "timezone": "Europe/London",
  "windows": {
    "stable": {"from": "YYYY-MM-DD", "to": "YYYY-MM-DD"},
    "previous": {"from": "YYYY-MM-DD", "to": "YYYY-MM-DD"},
    "fresh_tail": {"from": "YYYY-MM-DD", "to": "YYYY-MM-DD"}
  },
  "providers": {},
  "stable": {},
  "previous": {},
  "fresh_tail": {},
  "queries": [],
  "pages": [],
  "observations": [],
  "limitations": []
}
```

Populate `providers` with property/site/app identifiers, CLI versions, source timezone if known, exact Umami epoch boundaries, raw-file paths, and completeness plus reasons for each window. Persist query rows and page rows with normalized paths and window labels; link large event datasets via raw-file paths.

Represent a metric as `{ "value": 0, "unit": "events", "status": "measured", "source": "raw/filename.json" }`. Use JSON `null` with `status: "unavailable"` and a `reason` for missing metrics; render those as `—`. Retain numerator/denominator and counting method for rates. Distinguish event, pageview, visitor, session, unique-device, device-day, and download units.

For comparable counts, record absolute change and percent change `(stable − previous) / previous × 100`. A zero or unavailable previous value makes percent change unavailable; retain the absolute change when both counts exist. Express CTR/rate differences in percentage points and position changes as numeric differences. Do not compare the fresh tail or metrics whose scopes/counting methods changed without disclosing the mismatch. Validate JSON and ensure raw-file links exist before delivery.

---

## Guiding principle

The initial Observe workflow should answer four simple questions:

1. **What are people searching for?**
2. **Which pages are getting that traffic?**
3. **What do visitors do once they arrive?**
4. **Is website traffic ultimately contributing to app downloads?**

Add more sophisticated scoring or ranking rules only after repeated weekly runs show that they are useful.
