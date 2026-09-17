import * as React from "react";
import Link from "next/link";
import { colors, fontSize, iconToken, spacing } from "../../lib/theme";

const tapTargetStyle: React.CSSProperties = {
  width: spacing.tapTarget,
  height: spacing.tapTarget,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export interface BackHeaderProps {
  /** Optional centered title (e.g. "Cash out"). Onboarding screens pass a step counter instead. */
  title?: React.ReactNode;
  href?: string;
  onBack?: () => void;
}

/**
 * The canonical back-nav header: centered content with the back button
 * pulled out via absolute positioning, so a title (or step counter) sits
 * dead-center regardless of the button's width.
 */
export function BackHeader({ title, href, onBack }: BackHeaderProps) {
  const icon = (
    <svg width={iconToken.backButton.displaySize} height={iconToken.backButton.displaySize} viewBox={iconToken.backButton.viewBox} fill="none">
      <path
        d={iconToken.backButton.path}
        stroke={iconToken.backButton.color}
        strokeWidth={iconToken.backButton.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "8px 0 0 0" }}>
      {href ? (
        <Link href={href} style={{ position: "absolute", left: 0, ...tapTargetStyle }} aria-label="Back">
          {icon}
        </Link>
      ) : (
        <button type="button" onClick={onBack} style={{ position: "absolute", left: 0, ...tapTargetStyle }} aria-label="Back">
          {icon}
        </button>
      )}
      {title && <div style={{ fontSize: fontSize.headerTitle, fontWeight: 600, color: colors.textPrimary }}>{title}</div>}
    </div>
  );
}

export interface CloseHeaderProps {
  href?: string;
  onClose?: () => void;
}

/**
 * The dismiss-style header (TransferFailed): a right-aligned X, not a
 * back-chevron, since it closes/dismisses rather than navigates back.
 * Shares the back button's stroke-width and 36x36 tap target.
 */
export function CloseHeader({ href, onClose }: CloseHeaderProps) {
  const icon = (
    <svg width={iconToken.close.displaySize} height={iconToken.close.displaySize} viewBox={iconToken.close.viewBox} fill="none">
      <path d={iconToken.close.path} stroke={iconToken.close.color} strokeWidth={iconToken.close.strokeWidth} strokeLinecap="round" />
    </svg>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "8px 0 0 0" }}>
      {href ? (
        <Link href={href} style={tapTargetStyle} aria-label="Close">
          {icon}
        </Link>
      ) : (
        <button type="button" onClick={onClose} style={tapTargetStyle} aria-label="Close">
          {icon}
        </button>
      )}
    </div>
  );
}
