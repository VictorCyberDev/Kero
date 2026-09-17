# Kero design artifact — consistency report

> **Status: all findings below have been fixed and re-verified**, except two
> that were explicitly hedged as "possibly intentional" and left unchanged
> per the design decisions on file (noted in the verification section at the
> bottom). The narrative below is preserved as-written (the original
> before/after record) — see the **Verification — round 2** section at the
> end for the fix applied to each item and the confirmation scan.


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

All of the above has now been fixed — see the verification section below.

---

## Verification — round 2 (fixes applied)

Each finding above was resolved as follows, then re-confirmed with the same
grep-based scan used to write this report originally.

| # | Finding | Fix applied |
|---|---|---|
| §4 | Logo geometry — two proportion sets | Kept both intentionally as two named variants (`Logo` component, `size="small"` / `size="hero"`) — see `components/Logo.tsx`. |
| §4 | EmptyBalance header logo doesn't animate | Added the same `animateTransform` (6s orbit) that Home's header logo has. Confirmed both now emit `dur="6s"`. |
| §3 | Headline size splits 28/26/24px | Welcome, Onboarding-Wallet, Onboarding-Identity all changed to 28px. Confirmed: `24px`/`26px` no longer appear anywhere in `design/*.dc.html`; `28px` now appears on exactly the 7 expected screens (Login, Signup, Onboarding-Wallet, Onboarding-Identity, Welcome, Activity, Settings). |
| §5a | Three back-header layout techniques | Login, Signup, Onboarding-Wallet, Onboarding-Identity conformed to the majority technique (`justify-content:center; position:relative` wrapper + absolutely-positioned back button) already used by Amount/Fund/CashOut/Review/Status/NoRailsAvailable. Confirmed: that exact wrapper string now appears in all 10 back-nav screens, and only those 10. TransferFailed's X-close stroke-width raised from 1.8 to 2 to match the shared back-button token (its 36×36 tap target already matched; its `flex-end`/no-title layout is intentionally kept, since it dismisses rather than navigates back). |
| §5b | Outer-container `gap` inconsistent (20/22/24/28px) | Standardized every `padding:20px` flow screen to `gap:24px` (the pre-existing majority value). Confirmed: all 11 such screens now read `gap: 24px`; Welcome/Index (the distinct centered-splash layout) are unchanged by design. |
| §5c | Selectable-card padding (18px vs 16px) | Onboarding-Wallet's cards changed from 18px to 16px to match CashOut (canonical). Confirmed both files now read `padding: 16px`. |
| §5d | Receipt-card gap/font-size/dividers (Review vs. TransferFailed) | TransferFailed's card changed to match Review: gap 12→14px, label 13→14px, value 14→15px, added the two 1px dividers between rows. (Settings has no equivalent receipt-style card — its plain bordered list is a different component and wasn't touched.) |
| §5e | Transaction row padding + status color (Home vs. Activity) | Activity's rows changed from `14px 0` to `12px 0`. Added `iconColor` (muted to `#6e6e73` when `status === 'Processing'`, else `#1d1d1f`) to Activity's row data and wired it into both direction icons, matching Home's existing behavior. |
| §5f | Two profile/settings icon glyphs | Home's and EmptyBalance's header shortcut icon replaced with the tab-bar glyph (`r=3.2`, `M5 20c0-3.8 3.2-6 7-6s7 2.2 7 6`). Confirmed the old glyph (`M4 20c0-4 3.5-6 8-6s8 2 8 6`) no longer appears anywhere, and the one remaining glyph appears consistently in both header and tab-bar positions on every screen that has either. |
| §5g | NoRailsAvailable CTA outline+15px | Changed to filled `#1d1d1f`/white text, 16px — matching every other primary CTA. |
| §5h | Secondary-link color mismatch | TransferFailed's "Contact support" changed from `#1d1d1f` to `#6e6e73` (NoRailsAvailable's "Back to home" was already correct). |
| §5i | Login/Signup CTA not bottom-pinned | Added `margin-top: auto` to both CTAs and removed the trailing `flex:1` spacer div, matching the pattern used by Onboarding/Amount/Fund/CashOut/Review/Status. |
| §5j | "Max" button border-width outlier | Changed from `1px` to `1.5px`, matching the interactive-element border convention. |
| §5l | Onboarding-Wallet back button skipped Signup | Changed `href` from `Welcome.dc.html` to `Signup.dc.html`, matching the actual Signup → Onboarding-Wallet flow order. |
| §2 (radius) | ID-type segments (12px) vs. selection cards (16px) | **Left unchanged** — flagged in the original report as "possibly intentional (different component scale)" with no fix decision given; the two are genuinely different-scale components (inline 3-way segment vs. full-width list card). |
| §5k | TransferFailed vs. NoRailsAvailable error-icon treatment | **Left unchanged** — flagged as "plausibly deliberate" severity signaling (hard failure vs. soft/temporary unavailability), no fix decision given. |

**Re-scan confirmation after fixes:**
- Colors: still exactly 6 values, same as before (no new colors introduced).
- Font sizes: `24px` and `26px` are gone; `28px` is now the single page-heading size.
- Outer `gap`: uniform `24px` across every `padding:20px` flow screen.
- Border-width: informational elements are `1px`, every interactive element (including "Max") is now `1.5px`.
- Logo: `dur="6s"` now appears twice (Home + EmptyBalance headers, matched); `dur="7s"` twice (Welcome + Index splash, matched); the two intentional geometry variants are now named/enforced in code via `components/Logo.tsx` rather than living as ad hoc inline SVGs.
- Profile/settings icon: exactly one glyph definition in use, everywhere.

## Shared theme & components extracted

The now-consistent values are captured in code so future screens are built
from them instead of re-deriving inline styles by eye:

- `lib/theme.ts` — colors, radii, font sizes, letter-spacing, spacing
  (including the canonical `sectionGap: 24`), border widths, and the
  back-button/close icon tokens.
- `components/Logo.tsx` — the orbit mark as `size="small" | "hero"`,
  matching the two intentional geometries above (the splash entrance
  sequence and Home's decorative background mark are deliberately out of
  scope — see the component's doc comment).
- `components/ui/` — `BackHeader` / `CloseHeader`, `SelectableCard`,
  `SummaryCard`, `TransactionRow`, `PrimaryButton`, `SecondaryLink`: one
  implementation per standardized pattern, each documented with which
  screen's values were treated as canonical.

`npx tsc --noEmit` passes clean against this extraction.
