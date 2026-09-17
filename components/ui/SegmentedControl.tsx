import * as React from "react";
import { borderWidth, colors, fontSize, radii } from "../../lib/theme";

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * The ID-type selector (Onboarding-Identity): a row of equal-width
 * segments. Uses radii.control (12px), not radii.card (16px) — a
 * segmented control is a smaller-scale component than a full-width
 * selection card (SelectableCard), so it gets its own radius step.
 */
export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "12px 0",
              border: `${borderWidth.interactive}px solid ${selected ? colors.textPrimary : colors.border}`,
              borderRadius: radii.control,
              fontSize: fontSize.label,
              fontWeight: selected ? 600 : 400,
              color: selected ? colors.textPrimary : colors.textSecondary,
              background: "none",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
