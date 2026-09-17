import * as React from "react";
import { colors, spacing } from "../../lib/theme";

export interface ScreenProps {
  children: React.ReactNode;
  /**
   * "compact" — 20px outer padding, every list/flow screen.
   * "splash" — 40px outer padding, Welcome/Index only.
   * "none" — no outer padding (tab-root screens manage their own inner scroll padding).
   */
  padding?: "compact" | "splash" | "none";
  gap?: number;
  center?: boolean;
}

const MAX_WIDTH = 430;

/**
 * The shared outer frame every screen renders inside: a mobile-width column
 * that fills the viewport height and stays centered on wider screens,
 * replacing the mockups' fixed 390x844 artboard.
 */
export function Screen({ children, padding = "none", gap, center = false }: ScreenProps) {
  const paddingValue =
    padding === "compact" ? spacing.screenPaddingCompact : padding === "splash" ? spacing.screenPaddingSplash : 0;

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        maxWidth: MAX_WIDTH,
        margin: "0 auto",
        boxSizing: "border-box",
        background: colors.background,
        display: "flex",
        flexDirection: "column",
        padding: paddingValue,
        gap,
        alignItems: center ? "center" : undefined,
        justifyContent: center ? "center" : undefined,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
