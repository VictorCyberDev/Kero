"use client";

import { Screen, BackHeader, PrimaryButton } from "@/components/ui";
import { useKeroStore } from "@/lib/store";
import { borderWidth, colors, fontSize, letterSpacing, radii } from "@/lib/theme";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

export default function AmountPage() {
  const balance = useKeroStore((state) => state.balance);
  const amount = useKeroStore((state) => state.cashOutAmount);
  const setCashOutAmount = useKeroStore((state) => state.setCashOutAmount);

  const press = (key: string) => {
    if (key === "⌫") {
      setCashOutAmount(amount.length > 1 ? amount.slice(0, -1) : "0");
      return;
    }
    if (key === "." && amount.includes(".")) return;
    setCashOutAmount(amount === "0" && key !== "." ? key : amount + key);
  };

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/home" title="Cash out" />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 0 4px 0" }}>
        <div style={{ fontSize: fontSize.label, color: colors.textSecondary }}>
          Available: {balance.toFixed(2)} USDC
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <div style={{ fontSize: fontSize.amountEntry, fontWeight: 600, letterSpacing: letterSpacing.bigNumeral, color: colors.textPrimary }}>
            {amount}
          </div>
          <div style={{ fontSize: fontSize.amountUnit, fontWeight: 500, color: colors.textSecondary }}>USDC</div>
        </div>
        <button
          type="button"
          onClick={() => setCashOutAmount(balance.toFixed(2))}
          style={{
            border: `${borderWidth.interactive}px solid ${colors.border}`,
            borderRadius: radii.pill,
            padding: "6px 14px",
            fontSize: fontSize.micro,
            fontWeight: 600,
            color: colors.textPrimary,
            background: colors.background,
            marginTop: 4,
          }}
        >
          Max
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
        {KEYS.map((key) => (
          <button
            key={key}
            onClick={() => press(key)}
            style={{
              height: 60,
              border: "none",
              borderRadius: radii.keypadKey,
              background: colors.surfaceMuted,
              fontSize: fontSize.keypadKey,
              fontWeight: 500,
              color: colors.textPrimary,
            }}
          >
            {key}
          </button>
        ))}
      </div>

      <PrimaryButton href="/cash-out" pinToBottom disabled={Number(amount) <= 0}>
        Continue
      </PrimaryButton>
    </Screen>
  );
}
