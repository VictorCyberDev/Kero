import * as React from "react";
import { colors, fontSize, radii } from "../../lib/theme";

export interface SummaryRow {
  label: string;
  value: string;
  mono?: boolean;
}

export interface SummaryCardProps {
  rows: SummaryRow[];
}

/**
 * The gray receipt-style card (Review, TransferFailed): label-left,
 * value-right rows separated by 1px dividers. Spacing is canonical —
 * matched from Review.dc.html, see CONSISTENCY_REPORT.md item 4.
 */
export function SummaryCard({ rows }: SummaryCardProps) {
  return (
    <div style={{ background: colors.surfaceMuted, borderRadius: radii.card, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
      {rows.map((row, index) => (
        <React.Fragment key={row.label}>
          {index > 0 && <div style={{ height: 1, background: colors.border }} />}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: fontSize.body, color: colors.textSecondary }}>{row.label}</span>
            <span
              style={{
                fontSize: fontSize.bodyEmphasis,
                fontWeight: 500,
                color: colors.textPrimary,
                fontFamily: row.mono ? "ui-monospace, monospace" : undefined,
              }}
            >
              {row.value}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
