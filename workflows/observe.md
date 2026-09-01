# SEO Observe — Weekly Checklist

Scope: LatteArtist (https://latteartist.coffeeatpetros.com), iOS app "Latte Art Tracker: LatteArtist".

## 0. Authenticate before collecting data

Run the preflight before making any collection calls:

```bash
scripts/setup-agent-auth --check
```

The preflight must have permission to access the macOS Login keychain and local CLI session stores. In an agent sandbox, request elevated permission for this command and for the subsequent `security`, `gog`, and `asc` commands; otherwise healthy credentials may appear to be missing.

It validates all three sources without printing secrets:

* Umami: the dedicated generic-password entries in the Login keychain, then an API login
* Google Search Console: a refreshable `gog` OAuth token with the `searchconsole` scope
* App Store Connect: a cached `asc web` session

Stop and repair authentication before proceeding if the preflight fails. To create or replace the dedicated Umami entries, run `scripts/setup-agent-auth` interactively. For Google and ASC, follow the specific remediation printed by the preflight.

## 1. Time window

Use:

* **Stable window**: last 28 complete days, where the latest complete date is **today − 3** (provider lag: GSC and ASC data is partial for the most recent days). All comparisons and trends use this window.
* **Fresh tail**: the excluded days (today − 2 → today). Shown separately as raw counts in the report, never compared against prior periods.
* Previous 28 complete days for comparison (against the stable window)
* Optionally note the last 7 days for recent movement

Use the same date range across GSC, Umami and App Store Connect where possible.

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
  --dimensions QUERY --from <from> --to <to> --max 1000 --json
```

* Queries: `--dimensions QUERY`
* Pages: `--dimensions PAGE` — keep only rows for `https://latteartist.coffeeatpetros.com/*`
* Query × Page: `--dimensions QUERY,PAGE`

Plain text output (drop `--json`) already shows clicks/impressions/CTR/position; use `--json` for the persisted history.

At this traffic level Google suppresses click counts in the query and query×page dimensions (only impressions survive); page-level clicks are the reliable source. Trust page totals over query totals until volumes grow.

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

Useful derived definitions:

**CTA exposure rate**

`visitors who saw CTA / page visitors`

**CTA click rate**

`visitors who clicked App Store CTA / page visitors`

**CTA seen → click rate**

`visitors who clicked / visitors who saw CTA`

Instrumentation gate: the two exposure-based rates depend on `app_store_cta_seen`. Until that event has fired at least once, they are unavailable — report `—`, never `0`. (`app_store_click` firing proves click tracking works; a missing `app_store_cta_seen` does not prove no one saw the CTA.)

### Pull

Self-hosted at https://umami.bantolas.dev. Credentials are dedicated generic-password entries in the macOS Login keychain (services `agent-latteartist-umami-username` and `agent-latteartist-umami-password`, account `$USER`), created by `scripts/setup-agent-auth`. Run these commands with permission to access the Login keychain.

1. Log in:

   ```bash
   UM_USER=$(security find-generic-password -a "$USER" -s agent-latteartist-umami-username -w)
   UM_PASS=$(security find-generic-password -a "$USER" -s agent-latteartist-umami-password -w)
   LOGIN_RESPONSE=$(curl --fail --silent --show-error -X POST https://umami.bantolas.dev/api/auth/login \
     -H 'Content-Type: application/json' \
     -d "{\"username\":\"$UM_USER\",\"password\":\"$UM_PASS\"}")
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

   Join `event-data` to `events` on `eventId` to break the CTA events down by page and property.

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
* Website campaign: `sources` → the `WebRef` group (page views from website / `ct=website`); `asc web analytics campaigns` gives the campaign-level breakdown once campaigns exist
* Change vs previous period: `previousTotal` / `percentChange` in the same response (compares against the previous equal-length window)

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
* Website-attributed downloads
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

Do not recommend changes yet unless something is very obvious.

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

Each weekly Observe run should save:

* Date range
* Summary metrics
* Query data
* Page data
* Umami page/event data
* ASC summary
* Short observations

Prefer structured data such as JSON alongside the human-readable report so future runs can compare against previous observations.

---

## Guiding principle

The initial Observe workflow should answer four simple questions:

1. **What are people searching for?**
2. **Which pages are getting that traffic?**
3. **What do visitors do once they arrive?**
4. **Is website traffic ultimately contributing to app downloads?**

Add more sophisticated scoring or ranking rules only after repeated weekly runs show that they are useful.
