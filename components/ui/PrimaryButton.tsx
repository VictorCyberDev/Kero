import * as React from "react";
import { colors, fontSize, radii } from "../../lib/theme";

export interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** Every flow screen pins its primary CTA to the bottom via margin-top: auto. */
  pinToBottom?: boolean;
  disabled?: boolean;
}

/**
 * The filled dark pill CTA used everywhere in the app (16px/600 on
 * #1d1d1f). NoRailsAvailable previously broke this with an outline+15px
 * treatment — fixed, see CONSISTENCY_REPORT.md item 7.
 */
export function PrimaryButton({ children, href, onClick, pinToBottom, disabled }: PrimaryButtonProps) {
  const style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: disabled ? colors.surfaceMuted : colors.textPrimary,
    color: disabled ? colors.borderMuted : colors.background,
    borderRadius: radii.card,
    padding: "16px 0",
    fontSize: fontSize.cta,
    fontWeight: 600,
    marginTop: pinToBottom ? "auto" : undefined,
    border: "none",
    cursor: disabled ? "default" : "pointer",
  };

  if (href && !disabled) {
    return (
      <a href={href} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}
