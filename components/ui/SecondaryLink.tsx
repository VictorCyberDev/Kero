import * as React from "react";
import Link from "next/link";
import { colors, fontSize } from "../../lib/theme";

export interface SecondaryLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

/**
 * The muted text link under a primary CTA ("Back to home", "Contact
 * support"). Color is canonical at the secondary text color — TransferFailed
 * previously used the primary text color here, see CONSISTENCY_REPORT.md item 7.
 */
export function SecondaryLink({ children, href, onClick }: SecondaryLinkProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSize.body,
    fontWeight: 500,
    color: colors.textSecondary,
    padding: "8px 0",
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
