import * as React from "react";
import { borderWidth, colors, fontSize, radii } from "../../lib/theme";

export interface SelectableCardProps {
  title: string;
  subtitle: string;
  selected: boolean;
  icon: React.ReactNode;
  onSelect: () => void;
}

/**
 * The "choose one option" card used for wallet setup and cash-out rail
 * selection. Padding, radius and radio sizing are canonical (matched from
 * CashOut.dc.html — see CONSISTENCY_REPORT.md item 4).
 */
export function SelectableCard({ title, subtitle, selected, icon, onSelect }: SelectableCardProps) {
  const borderColor = selected ? colors.textPrimary : colors.border;
  const radioColor = selected ? colors.textPrimary : colors.borderMuted;

  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 16,
        border: `${borderWidth.interactive}px solid ${borderColor}`,
        borderRadius: radii.card,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: radii.pill,
          background: colors.surfaceMuted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 600, color: colors.textPrimary }}>{title}</div>
        <div style={{ fontSize: fontSize.label, color: colors.textSecondary, marginTop: 2 }}>{subtitle}</div>
      </div>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: radii.pill,
          border: `2px solid ${radioColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {selected && <div style={{ width: 11, height: 11, borderRadius: radii.pill, background: colors.textPrimary }} />}
      </div>
    </div>
  );
}
