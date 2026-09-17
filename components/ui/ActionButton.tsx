import * as React from "react";
import Link from "next/link";
import { borderWidth, colors, fontSize, radii } from "../../lib/theme";

export interface ActionButtonProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  href?: string;
  variant: "filled" | "outline" | "disabled";
}

/**
 * The two-up action row on Home/EmptyBalance ("Cash out" / "Fund").
 * Deliberately smaller than PrimaryButton (14px padding, 15px font, not
 * 16/16) — that's how Home.dc.html actually draws it, a distinct pattern
 * from the single full-width primary CTA, not a bug to unify away.
 */
export function ActionButton({ children, icon, href, variant }: ActionButtonProps) {
  const style: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radii.card,
    padding: "14px 0",
    fontSize: fontSize.bodyEmphasis,
    fontWeight: 600,
    background: variant === "filled" ? colors.textPrimary : variant === "disabled" ? colors.surfaceMuted : colors.background,
    color: variant === "filled" ? colors.background : variant === "disabled" ? colors.borderMuted : colors.textPrimary,
    border: variant === "outline" ? `${borderWidth.static}px solid ${colors.border}` : "none",
  };

  if (href && variant !== "disabled") {
    return (
      <Link href={href} style={style}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <div style={style}>
      {icon}
      {children}
    </div>
  );
}
