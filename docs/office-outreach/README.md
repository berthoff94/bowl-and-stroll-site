# Bowl & Stroll — L2 8TD Office Outreach Campaign

> New-business campaign targeting offices within a ~3 minute walk of 14a Water Street, Liverpool, L2 8TD.
> Goal: land first **group orders** (bulk lunch orders via StoreKit group ordering) and open the door to **catering** business.

---

## The Offer

### Discount code: `WATERST25`

| Detail | Value |
|---|---|
| Discount | **25% off your first group/bulk order** |
| Minimum spend | £60 (roughly 8+ bowls) |
| Where | StoreKit group ordering — https://order.storekit.com/bowl-and-stroll/menu |
| Limit | One redemption per business |
| Valid | Mon–Fri until 30 September 2026 |
| Positioning | "New neighbour" welcome offer for offices around Water Street |

**How group ordering works (the pitch):** one person starts a group order on StoreKit and shares the link; everyone in the office picks their own bowl/sub/açaí; one payment, one collection time (or one delivery). No lunch-run spreadsheets.

### ⚠️ Setup required in StoreKit (manual step)

This repo can't create the code itself — it must be created in the StoreKit dashboard before any email is sent:

1. StoreKit dashboard → **Marketing → Promo codes → New code**
2. Code: `WATERST25` — 25% off, min. basket £60
3. Restrict to: online ordering (collection + delivery), Mon–Fri
4. Usage: 1 per customer, set expiry **30/09/2026**
5. Test with a dummy group order before the first email goes out

### Catering (advertised in every email)

Every template also pitches catering — the step up from group orders:

- Custom bowl platters for 10+ people
- Office lunch packages with delivery
- Event catering with setup available
- Dietary options for every guest
- Catering menu: https://order.storekit.com/bowl-and-stroll-catering/menu

---

## Target Offices (immediate area of L2 8TD)

Verified occupiers, ordered by walking distance from 14a Water Street:

| # | Office | Building | Distance | Angle |
|---|---|---|---|---|
| 1 | Oriel Chambers (barristers) | 14 Water Street (same building!) | 0 min — upstairs | "We're literally downstairs" |
| 2 | HMRC Regional Centre (~3,500 staff) | India Buildings, 31 Water Street | 1 min — across the road | Huge team-lunch volume |
| 3 | Brabners LLP | Horton House, Exchange Flags | 2 min | Deal lunches, trainee events |
| 4 | DLA Piper | Walker House, Exchange Flags | 2 min | Client meetings, working lunches |
| 5 | Deloitte | Exchange Flags | 2 min | Busy-season fuel, team socials |
| 6 | Bibby Line Group | Exchange Flags (recently relocated HQ) | 2 min | Welcome-to-the-neighbourhood |
| 7 | Princes Group | Royal Liver Building (HQ — they own it) | 3 min | Food company, big HQ |
| 8 | Grant Thornton | Royal Liver Building | 3 min | Audit season team lunches |
| 9 | Evelyn Partners | Royal Liver Building | 3 min | Client meetings, partner lunches |
| 10 | Rathbones (~380 staff, largest UK base) | Port of Liverpool Building | 3 min | Team lunches, client events |
| 11 | Liverpool City Council | Cunard Building | 3 min | Meeting catering, support-local |
| 12 | Serviced-office community teams (Regus etc.) | Horton House, Exchange Flags | 2 min | Tenant events & perks partner |

Also nearby (watch list): Martins Bank Building, 4 Water Street — major office refurb currently due to complete 2026; add to the flow when tenants move in. Royal Liver Building also houses Barnett Waddingham, Mott MacDonald, Pro Global, Intellica — reuse template 8/9 style for these as follow-on targets.

**Before sending:** find the right contact per office — office manager, practice/chambers manager, EA to office head, workplace/facilities team, or social committee. LinkedIn + main switchboard. Never send to a guessed address.

---

## Email Flow: "New Business — Office Outreach"

A 3-touch sequence, tracked with the Gmail label **New Business Outreach**:

| Touch | When | Content |
|---|---|---|
| 1. Intro | Day 0 | Custom per-office email (see `templates/`) — code + catering |
| 2. Nudge | Day 4–5 | Short follow-up, re-share code, offer to drop off a sample platter (`templates/follow-ups.md`) |
| 3. Last call | Day 10–12 | Final touch before the code "gets passed to the next building" (`templates/follow-ups.md`) |

Process:
1. Drafts for touch 1 live in Gmail (label: **New Business Outreach**) — review, add the named contact, send.
2. When a reply comes in, move the thread out of the flow and book the order/catering call.
3. No reply after touch 3 → park for 90 days, then re-run with a seasonal angle (Christmas platters, January health kick).

---

## Templates

One custom intro email per office in `templates/`, plus shared follow-ups:

```
templates/
├── 01-oriel-chambers.md
├── 02-hmrc-india-buildings.md
├── 03-brabners.md
├── 04-dla-piper.md
├── 05-deloitte.md
├── 06-bibby-line-group.md
├── 07-princes-group.md
├── 08-grant-thornton.md
├── 09-evelyn-partners.md
├── 10-rathbones.md
├── 11-liverpool-city-council.md
├── 12-serviced-offices-exchange-flags.md
└── follow-ups.md   (touches 2 & 3, shared)
```
