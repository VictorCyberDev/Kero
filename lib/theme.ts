/**
 * Kero design tokens, extracted from design/*.dc.html after the
 * consistency fixes in design/CONSISTENCY_REPORT.md. Every value here is
 * the single canonical usage confirmed across all 17 screens — if a screen
 * needs a new value, add it here first rather than hardcoding it inline.
 */

export const colors = {
  textPrimary: "#1d1d1f",
  textSecondary: "#6e6e73",
  background: "#ffffff",
  border: "#e5e5ea",
  surfaceMuted: "#f5f5f7",
  borderMuted: "#c7c7cc",
} as const;

export const radii = {
  input: 12,
  card: 16,
  pill: 999,
  keypadKey: 14,
  balanceCard: 24,
  qrFrame: 20,
} as const;

export const fontSize = {
  tabLabel: 11,
  micro: 12,
  label: 13,
  body: 14,
  bodyEmphasis: 15,
  cta: 16,
  headerTitle: 17,
  amountUnit: 18,
  brandMark: 20,
  pageHeading: 28,
  wordmark: 34,
  balanceAmount: 44,
  amountEntry: 52,
} as const;

export const letterSpacing = {
  pageHeading: -0.4,
  bigNumeral: -1,
} as const;

export const spacing = {
  /** Outer frame padding for single-column flow screens (Amount, CashOut, Review, ...). */
  screenPaddingCompact: 20,
  /** Outer frame padding for centered splash screens (Welcome, Index). */
  screenPaddingSplash: 40,
  /** Canonical gap between stacked sections on a single-column flow screen. */
  sectionGap: 24,
  /** Every icon-only header button (back, close, header shortcuts) is a 36x36 tap target. */
  tapTarget: 36,
} as const;

export const borderWidth = {
  /** Static/informational elements: inputs, badges, dividers-as-borders. */
  static: 1,
  /** Interactive elements: selectable cards, filter chips, outline buttons/links. */
  interactive: 1.5,
} as const;

/** The back-chevron glyph is pixel-identical everywhere it appears — treat it as one token. */
export const iconToken = {
  backButton: {
    displaySize: 20,
    viewBox: "0 0 24 24",
    path: "M15 5L8 12L15 19",
    strokeWidth: 2,
    color: colors.textPrimary,
  },
  close: {
    displaySize: 18,
    viewBox: "0 0 24 24",
    path: "M6 6L18 18M18 6L6 18",
    strokeWidth: 2,
    color: colors.textSecondary,
  },
} as const;
