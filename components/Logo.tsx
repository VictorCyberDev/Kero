import * as React from "react";
import { colors } from "../lib/theme";

export type LogoSize = "small" | "hero";

export interface LogoProps {
  /**
   * "hero" — thin-stroke mark for large display sizes (splash, empty-state
   * icon, 72-120px). "small" — thicker mark tuned for the 26px nav header,
   * where a 1.4px stroke disappears. These are two intentionally distinct
   * geometries for the same mark, not a bug — see CONSISTENCY_REPORT.md.
   */
  size?: LogoSize;
  /** Both variants animate identically within themselves: same orbit position, each at its own duration. */
  animate?: boolean;
  color?: string;
  /** Overrides the variant's default display size (72 for hero, 26 for small). */
  displaySize?: number;
  className?: string;
}

interface LogoGeometry {
  ringRadius: number;
  ringStrokeWidth: number;
  centerDotRadius: number;
  orbitDotRadius: number;
  orbitDurationSeconds: number;
  defaultDisplaySize: number;
}

const GEOMETRY: Record<LogoSize, LogoGeometry> = {
  hero: {
    ringRadius: 8.5,
    ringStrokeWidth: 1.4,
    centerDotRadius: 1.6,
    orbitDotRadius: 2.4,
    orbitDurationSeconds: 7,
    defaultDisplaySize: 72,
  },
  small: {
    ringRadius: 8.5,
    ringStrokeWidth: 2,
    centerDotRadius: 2,
    orbitDotRadius: 3,
    orbitDurationSeconds: 6,
    defaultDisplaySize: 26,
  },
};

// Orbit dot position is shared by both variants (in 0-24 viewBox units).
const ORBIT_DOT = { cx: 18.5, cy: 6.5 };

/**
 * The Kero orbit mark. Note this component intentionally does NOT cover:
 * - Index.dc.html's splash entrance sequence (draw-in ring, pop-in dot,
 *   delayed orbit start) — a one-time page-load animation, not a logo state.
 * - Home.dc.html's decorative background "ghost" mark in the balance card —
 *   a separately hand-tuned flourish at a different scale, not a scaled
 *   instance of this component.
 */
export function Logo({
  size = "hero",
  animate = true,
  color = colors.textPrimary,
  displaySize,
  className,
}: LogoProps) {
  const geometry = GEOMETRY[size];
  const resolvedSize = displaySize ?? geometry.defaultDisplaySize;

  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Kero"
    >
      <circle cx="12" cy="12" r={geometry.ringRadius} stroke={color} strokeWidth={geometry.ringStrokeWidth} />
      <circle cx="12" cy="12" r={geometry.centerDotRadius} fill={color} />
      <circle cx={ORBIT_DOT.cx} cy={ORBIT_DOT.cy} r={geometry.orbitDotRadius} fill={color}>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur={`${geometry.orbitDurationSeconds}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}
