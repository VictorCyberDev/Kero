"use client";

import { useState } from "react";
import { Screen, BottomTabBar, TransactionRow } from "@/components/ui";
import { useKeroStore } from "@/lib/store";
import { borderWidth, colors, fontSize, letterSpacing, radii } from "@/lib/theme";

type Filter = "all" | "sent" | "received";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sent", label: "Sent" },
  { id: "received", label: "Received" },
];

export default function ActivityPage() {
  const transactions = useKeroStore((state) => state.transactions);
  const [filter, setFilter] = useState<Filter>("all");

  const items = transactions.filter((transaction) => {
    if (filter === "sent") return transaction.direction === "out";
    if (filter === "received") return transaction.direction === "in";
    return true;
  });

  return (
    <Screen padding="none">
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px 12px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: fontSize.pageHeading, fontWeight: 600, color: colors.textPrimary, letterSpacing: letterSpacing.pageHeading }}>
          Activity
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {FILTERS.map((item) => {
            const active = item.id === filter;
            return (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: radii.pill,
                  fontSize: fontSize.label,
                  fontWeight: 600,
                  border: `${borderWidth.interactive}px solid ${active ? colors.textPrimary : colors.border}`,
                  background: active ? colors.textPrimary : colors.background,
                  color: active ? colors.background : colors.textPrimary,
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {items.length === 0 ? (
          <div style={{ fontSize: fontSize.body, color: colors.textSecondary, textAlign: "center", padding: "40px 0" }}>No activity yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                title={transaction.title}
                status={transaction.status}
                date={transaction.date}
                amount={transaction.amount}
                direction={transaction.direction}
              />
            ))}
          </div>
        )}
      </div>

      <BottomTabBar active="activity" />
    </Screen>
  );
}
