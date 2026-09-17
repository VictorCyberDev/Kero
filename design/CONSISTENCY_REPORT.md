# Kero design artifact — consistency report

Scope: all 17 `.dc.html` screens in `design/` (Welcome, Login, Signup, Index,
Onboarding-Wallet, Onboarding-Identity, Home, EmptyBalance, Amount, Fund,
CashOut, Review, Status, Activity, Settings, NoRailsAvailable,
TransferFailed). Read in full, byte-for-byte, plus the bundled design-system
reference docs (`brand-colors.md`, `brand-typography.md`,
`design-system-components.md`, `craft.md`). This is a report only — nothing
has been changed.

**Note on brand kit**: the bundled `brand-colors.md`/`brand-typography.md`
describe the *Anthropic* brand (Ivory/Slate/Clay, Anthropic Sans/Serif). None
of the 17 Kero screens use it — every screen instead uses an Apple-HIG-style
palette (`#1d1d1f` / `#6e6e73` / `#e5e5ea` / `#f5f5f7` / `#c7c7cc` /
`#ffffff`) and `-apple-system` type. That's presumably intentional (Kero is
its own product, not an Anthropic-branded surface), but flagging it since the
brand docs shipped in the same bundle — worth confirming it's a deliberate
opt-out rather than an oversight.

---

## 1. Colors

Exactly **6 colors** are used across all 17 files — no stray hex values, no
`rgba()`, nothing outside this set:

| Color | Role | Occurrences |
|---|---|---|
| `#1d1d1f` | Primary text, icons, filled-button background | 178 |
| `#6e6e73` | Secondary/muted text | 88 |
| `#ffffff` | Page background, text-on-dark, card fills | 63 |
| `#e5e5ea` | Borders, dividers | 36 |
| `#f5f5f7` | Card/pill/icon-circle fill | 19 |
| `#c7c7cc` | Disabled/muted borders & icons | 17 |

This part is clean — no drift, no near-duplicate grays (e.g. no stray
`#1c1c1e` or `#8e8e93`). One notable design choice worth confirming as
intentional: **the app never uses color for semantic/status meaning.**
"Delivered", "Processing", and "Failed" transaction states (see
Activity.dc.html) all render in the identical grayscale palette — no
green/red anywhere in any file.

---

## 2. Border-radius

| Value | Count | Used for |
|---|---|---|
| `16px` | 26 | Primary CTAs, most cards, selectable-option cards |
| `999px` | 23 | Circular icon frames, pills/badges, radio buttons |
| `12px` | 7 | Text inputs, fake-select, ID-type segments |
| `2px` | 7 | Tiny QR-code cell squares (Fund.dc.html) |
| `3px` | 3 | Large QR-code cell squares (Fund.dc.html) |
| `24px` | 2 | Balance-card containers (Home, EmptyBalance) |
| `14px` | 2 | Numeric keypad keys (Amount), address chip (Fund) |
| `20px` | 1 | QR code frame (Fund) |

The tiers are mostly clean (16 for CTAs/cards, 999 for circles/pills, 12 for
inputs). One inconsistency: the **ID-type segmented selector**
(Onboarding-Identity) uses `12px` while the **wallet/rail selectable cards**
(Onboarding-Wallet, CashOut) — a visually similar "choose one option"
pattern — use `16px`. Possibly intentional (different component scale), but
worth a decision.

---

## 3. Font sizes

Full distinct set found: `11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28,
34, 44, 52` px.

Most roles are consistent (back-button screen titles are `17px/600`
everywhere; body/subtitle text is `15px` everywhere; CTA labels are `16px`
everywhere except one case below; tab-bar labels are `11px` everywhere).

**The one real discrepancy**: the top-level page headline — semantically the
same element on five different "first thing you see" screens — is set at
**three different sizes**:

| Screen | Headline | Size |
|---|---|---|
| Login | "Log in" | **28px** |
| Signup | "Create your account" | **28px** |
| Activity | "Activity" | **28px** |
| Settings | "Settings" | **28px** |
| Welcome | "Welcome to Kero" | **24px** |
| Onboarding-Wallet | "Create your wallet" | **26px** |
| Onboarding-Identity | "Verify your identity" | **26px** |

Letter-spacing is `-0.4px` in all seven cases — only the size splits three
ways (28 / 26 / 24). Subtitle text under these headlines is consistently
`15px` in every case, so the drift is isolated to the headline itself.

Secondary finding: the amount-entry keypad display (Amount.dc.html, `52px`)
vs. the home-balance display (Home/EmptyBalance, `44px`) — likely intentional
hierarchy (entry screen wants a bigger numeral), flagged for awareness only.

---

## 4. Logo / orbit mark

The mark (ring + center dot + orbiting dot) appears in **5 places**, and its
geometry is **not** consistent across them:

| Location | Ring r / stroke-width | Center dot r | Orbit dot r | Orbit position | Orbit duration |
|---|---|---|---|---|---|
| Welcome.dc.html (static) | 8.5 / 1.4 | 1.6 | 2.4 | (18.5, 6.5) | 7s |
| Index.dc.html (splash, animated draw-in) | 8.5 / 1.4 | 1.6 | 2.4 | (18.5, 6.5) | 7s (starts at 1.3s) |
| Home.dc.html header | 8.5 / **2** | **2** | **3** | (18.5, 6.5) | **6s** |
| EmptyBalance.dc.html header | 8.5 / **2** | **2** | **3** | (18.5, 6.5) | **no animation** |
| EmptyBalance.dc.html empty-state icon (muted, `#c7c7cc`) | 8.5 / 1.4 | 1.6 | 2.4 | (18.5, 6.5) | no animation (static by design) |
| Home.dc.html balance-card ghost (decorative, 120 viewBox) | 44 / 1.2 | 5 | 7 | (91, 29) | 14s |

Findings:
- There are **two incompatible sets of stroke/dot proportions** for what
  should be one logomark at the same `viewBox="0 0 24 24"`: a "thin" variant
  (stroke 1.4, dots 1.6/2.4 — Welcome, Index, EmptyBalance's muted icon) and
  a "thick" variant (stroke 2, dots 2/3 — Home header, EmptyBalance header).
  Since both use the identical viewBox, this isn't just display-size
  scaling — they're objectively different shapes.
- **Home.dc.html's header logo spins (6s) but EmptyBalance.dc.html's header
  logo — geometrically identical — does not animate at all.** Both are
  "Home tab" states of the same screen family; this looks like drift rather
  than intent.
- Orbit duration itself is inconsistent even among the animated ones: 7s
  (Welcome/Index) vs. 6s (Home header) vs. 14s (Home's decorative ghost,
  understandable at that different scale).
- The decorative "ghost" mark in Home's balance card is a separately
  hand-tuned asset (not a proportional scale-up of the primary mark — ratios
  are close but not exact), which is reasonable for a background flourish
  but confirms it isn't generated from a shared source.

---

## 5. Screens that deviate for what should be the same UI pattern

### 5a. Back-button header — three different implementations
- **Group A** (Login, Signup): plain flex row, back-chevron only, no title
  text, no centering technique.
- **Group B** (Onboarding-Wallet, Onboarding-Identity): adds
  `position: relative` to the wrapper but never uses it (no absolutely
  positioned child) — dead CSS — plus a "Step X of 2" label that sits
  immediately right of the back button rather than being centered.
- **Group C** (Amount, Fund, CashOut, Review, Status, NoRailsAvailable — the
  majority, 6 screens): the "correct" technique — `justify-content:center`
  on the wrapper with the back button pulled out via
  `position:absolute;left:0`, giving a properly centered title.
- **Group D** (TransferFailed): no back button at all — a right-aligned
  X/close icon instead (`stroke-width:1.8`, `18×18`, color `#6e6e73`), vs.
  the back-chevron everywhere else (`stroke-width:2`, `20×20`, color
  `#1d1d1f`). Semantically defensible (dismiss vs. navigate-back), but it's
  the only screen that breaks the pattern, and the icon's own weight/size
  also differs from every other icon-only header button.

The back-chevron **glyph itself** (`M15 5L8 12L15 19`, 20×20, `#1d1d1f`,
stroke-width 2) is pixel-identical everywhere it's used — only the
surrounding layout technique differs.

### 5b. Screen-level spacing (outer container `gap`)
All single-column screens share the same `390×844`, `padding:20px` frame,
but the `gap` between stacked sections varies with no obvious system:

| gap | Screens |
|---|---|
| 20px | Amount, Review |
| 22px | CashOut, Fund, Status |
| 24px | Onboarding-Wallet, Onboarding-Identity, NoRailsAvailable, TransferFailed |
| 28px | Login, Signup |

Notably, **Amount → CashOut → Review → Status is one continuous flow** and
alternates 20 / 22 / 20 / 22 with no apparent reason. (Welcome/Index use
`padding:40px` with their own 24/28 gaps — a different, centered-splash
layout, which is reasonably its own category.)

### 5c. Selectable-option card — padding mismatch
Onboarding-Wallet's wallet-choice cards and CashOut's payout-rail cards are
the same component (40×40 icon circle, 15px/13px title+subtitle, 22×22 radio,
11×11 dot, `border-radius:16px`) but:
- Onboarding-Wallet: `padding: 18px`
- CashOut: `padding: 16px`

### 5d. Receipt/summary card — three attributes differ
Review's payment-breakdown card and TransferFailed's failure-detail card use
the same visual idea (gray rounded card, label-left/value-right rows) but:
- Row `gap`: 14px (Review) vs. 12px (TransferFailed)
- Label size: 14px (Review) vs. 13px (TransferFailed)
- Value size: 15px (Review) vs. 14px (TransferFailed)
- Review inserts explicit 1px divider lines between rows; TransferFailed has
  none (relies on `gap` alone).

### 5e. Transaction row — padding and status-color mismatch between Home and Activity
Same component (40×40 icon circle, 15px title, 13px status/date, 15px
amount) appears on both screens:
- **Padding**: Home uses `12px 0`, Activity uses `14px 0`.
- **Status coloring**: on Home.dc.html, the "Processing" row's icon is
  deliberately muted to `#6e6e73` (vs. `#1d1d1f` for completed rows) — but
  Activity.dc.html hard-codes every icon to `#1d1d1f` regardless of status
  (`isIn`/`isOut` only control the icon *shape*, not color). The identical
  "Cash out · MTN Mobile Money / Processing" transaction would show a muted
  icon on Home and a full-black icon on Activity.

### 5f. Two different "settings/profile" icon glyphs on the same screen
Home.dc.html and EmptyBalance.dc.html each contain **two** renderings of the
profile/settings person icon:
- Header shortcut (top-right, links to Settings): circle `r=4`, path
  `M4 20c0-4 3.5-6 8-6s8 2 8 6`.
- Bottom tab-bar "Settings" icon: circle `r=3.2`, path
  `M5 20c0-3.8 3.2-6 7-6s7 2.2 7 6`.

These are two distinct hand-drawn glyphs for the same concept, appearing
together on the same screen, consistently across both files (so it's a
systemic pair, not a one-off).

### 5g. Primary CTA — NoRailsAvailable breaks the "filled dark pill" convention
Every screen's primary action is `background:#1d1d1f; color:#ffffff;
font-size:16px;` — except **NoRailsAvailable**, where "Notify me when
available" is outline-style (`border:1.5px solid #1d1d1f; background:#fff`)
**and** `font-size:15px` instead of 16px. This may be intentional (a passive
opt-in action vs. a hard commit), but it means the one place in the app that
most needs a clear primary/secondary hierarchy doesn't visually match the
"primary CTA" convention used everywhere else.

### 5h. Secondary text-link color inconsistency
- NoRailsAvailable's "Back to home": `color:#6e6e73`
- TransferFailed's "Contact support": `color:#1d1d1f`

Same role (secondary link under a primary CTA), same size/weight/padding
(14px/500/`8px 0`), different color.

### 5i. Bottom-pinning technique for the primary CTA (3 techniques, 1 visible difference)
- Spacer `<div style="flex:1"></div>` **before** the CTA: Welcome, Index.
- `margin-top:auto` directly on the CTA: Onboarding-Wallet,
  Onboarding-Identity, Amount, Fund, CashOut, Review, Status.
- `flex:1` wrapper around the *content above* the CTA: TransferFailed,
  NoRailsAvailable.
- **Login and Signup have neither** — their spacer div comes *after* the CTA,
  so the primary button sits directly under the form fields rather than
  pinned to the bottom of the screen. This is the one case where the
  difference is actually visible (button position on screen), not just an
  implementation detail.

### 5j. Border-width tiers — one outlier
The app otherwise cleanly separates `1px` (informational: inputs, static
badges) from `1.5px` (interactive: selectable cards, filter chips, outline
buttons/links). The **"Max" button** in Amount.dc.html is clickable but uses
`border:1px`, breaking that pattern.

### 5k. Error-state icon treatments differ (may be intentional severity signal)
- TransferFailed: solid 64×64 circle frame (`border:1.5px solid #1d1d1f`)
  around a bold black X.
- NoRailsAvailable: no frame at all — a bare 56×56 dashed, muted-gray
  (`#c7c7cc`) icon.

Plausibly deliberate (hard failure vs. temporary/soft unavailability), but
there's no shared "problem state" component between the two — worth
confirming that's a conscious severity distinction rather than drift.

### 5l. Navigation: one back-button doesn't point to the literal previous screen
Every back button in the app returns to the screen the user actually came
from (e.g. Onboarding-Identity → Onboarding-Wallet, Amount → Home, Review →
CashOut) — except **Onboarding-Wallet's back button, which points to
Welcome**, even though the actual flow is Signup → Onboarding-Wallet. It
skips over Signup. Worth confirming whether that's deliberate ("back" here
means "abandon signup entirely") or an oversight.

---

## Summary

The color palette (6 colors, no stray values) and the back-chevron glyph
itself are fully consistent — the underlying visual language is coherent.
The drift is concentrated in a handful of places:

1. **Logo mark geometry/animation** — two incompatible proportion sets plus
   one missing animation (EmptyBalance header vs. Home header).
2. **Headline size** — 28 / 26 / 24px for the same semantic role.
3. **Back-button header** — three layout techniques plus one X-close outlier.
4. **Two reused components** (selectable cards; receipt/summary cards) each
   have one attribute that quietly differs between their two instances.
5. **Home vs. Activity** disagree on transaction-row padding and on whether
   a "Processing" transaction's icon should be muted.
6. **Two hand-drawn profile icons** for one concept, on the same screens.
7. A few one-off CTA/link styling breaks (NoRailsAvailable's CTA,
   secondary-link color, Login/Signup's un-pinned CTA position).

None of this is fixed — flagging so you can decide what's intentional design
variation vs. drift before anything gets built against it.
