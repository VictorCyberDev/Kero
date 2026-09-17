import * as React from "react";
import Link from "next/link";
import { colors, fontSize } from "../../lib/theme";

export interface SecondaryLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /**
   * "muted" (default) — the link under a primary CTA ("Back to home",
   * "Contact support"): secondary color, 8px vertical padding.
   * "accent" — the inline "Sign up" / "Log in" link at the bottom of
   * Login/Signup: bold, primary-text color, no padding.
   */
  variant?: "muted" | "accent";
}

/**
 * Color is canonical at the secondary text color for the "muted" variant —
 * TransferFailed previously used the primary text color here, see
 * CONSISTENCY_REPORT.md item 7.
 */
export function SecondaryLink({ children, href, onClick, variant = "muted" }: SecondaryLinkProps) {
  const accent = variant === "accent";
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSize.body,
    fontWeight: accent ? 600 : 500,
    color: accent ? colors.textPrimary : colors.textSecondary,
    padding: accent ? 0 : "8px 0",
    background: "none",
    border: "none",
  };

  if (href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}
