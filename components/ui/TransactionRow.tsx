import * as React from "react";
import { colors, fontSize, radii } from "../../lib/theme";

export type TransactionDirection = "in" | "out";

export interface TransactionRowProps {
  title: string;
  status: string;
  date: string;
  amount: string;
  direction: TransactionDirection;
  showDivider?: boolean;
}

const ICON_PATH: Record<TransactionDirection, string> = {
  in: "M17 7L7 17M7 17H15M7 17V9",
  out: "M7 17L17 7M17 7H9M17 7V15",
};

/**
 * The transaction row used on Home and Activity. Home is canonical:
 * 12px vertical padding, and a "Processing" row's icon is muted to the
 * secondary text color rather than full-strength — see
 * CONSISTENCY_REPORT.md item 5.
 */
export function TransactionRow({ title, status, date, amount, direction, showDivider = true }: TransactionRowProps) {
  const iconColor = status === "Processing" ? colors.textSecondary : colors.textPrimary;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: showDivider ? `1px solid ${colors.border}` : undefined }}>
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
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <path d={ICON_PATH[direction]} stroke={iconColor} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 500, color: colors.textPrimary }}>{title}</div>
        <div style={{ fontSize: fontSize.body, color: colors.textSecondary }}>
          {status} · {date}
        </div>
      </div>
      <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 600, color: colors.textPrimary }}>{amount}</div>
    </div>
  );
}
