import * as React from "react";
import Link from "next/link";
import { borderWidth, colors, fontSize, radii } from "../../lib/theme";

export interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** Every flow screen pins its primary CTA to the bottom via margin-top: auto. */
  pinToBottom?: boolean;
  disabled?: boolean;
  /** "filled" (default) is the dark pill used everywhere; "outline" is Welcome's secondary "Log in" action — same shape/size, bordered instead of filled. */
  variant?: "filled" | "outline";
  /** Escape hatch for page-local concerns components/ui can't know about (e.g. the splash entrance animation). */
  className?: string;
}

/**
 * The filled dark pill CTA used everywhere in the app (16px/600 on
 * #1d1d1f). NoRailsAvailable previously broke this with an outline+15px
 * treatment — fixed, see CONSISTENCY_REPORT.md item 7.
 */
export function PrimaryButton({
  children,
  href,
  onClick,
  pinToBottom,
  disabled,
  variant = "filled",
  className,
}: PrimaryButtonProps) {
  const outline = variant === "outline";
  const style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: outline ? colors.background : disabled ? colors.surfaceMuted : colors.textPrimary,
    color: outline ? colors.textPrimary : disabled ? colors.borderMuted : colors.background,
    borderRadius: radii.card,
    padding: "16px 0",
    fontSize: fontSize.cta,
    fontWeight: 600,
    marginTop: pinToBottom ? "auto" : undefined,
    border: outline ? `${borderWidth.interactive}px solid ${colors.border}` : "none",
    cursor: disabled ? "default" : "pointer",
  };

  if (href && !disabled) {
    return (
      <Link href={href} style={style} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} style={style} className={className}>
      {children}
    </button>
  );
}
