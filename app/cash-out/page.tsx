"use client";

import { Screen, BackHeader, SelectableCard, PrimaryButton, SecondaryLink } from "@/components/ui";
import { useKeroStore, type RailId } from "@/lib/store";
import { colors, fontSize, radii } from "@/lib/theme";

function RailIcon({ rail }: { rail: RailId }) {
  if (rail === "bank") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <path d="M3 10L12 4L21 10" stroke={colors.textPrimary} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10V19M10 10V19M14 10V19M19 10V19" stroke={colors.textPrimary} strokeWidth={1.7} strokeLinecap="round" />
        <path d="M4 19H20" stroke={colors.textPrimary} strokeWidth={1.7} strokeLinecap="round" />
      </svg>
    );
  }
  if (rail === "momo") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <rect x="7" y="3" width="10" height="18" rx="2" stroke={colors.textPrimary} strokeWidth={1.7} />
        <path d="M11 18H13" stroke={colors.textPrimary} strokeWidth={1.7} strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke={colors.textPrimary} strokeWidth={1.7} />
      <path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" stroke={colors.textPrimary} strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}

export default function CashOutPage() {
  const amount = useKeroStore((state) => state.cashOutAmount);
  const availableRails = useKeroStore((state) => state.availableRails);
  const selectedRail = useKeroStore((state) => state.selectedRail);
  const setSelectedRail = useKeroStore((state) => state.setSelectedRail);

  if (availableRails.length === 0) {
    return (
      <Screen padding="compact" gap={24}>
        <BackHeader href="/amount" title="Cash out" />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <svg width={56} height={56} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8.5" stroke={colors.borderMuted} strokeWidth={1.6} strokeDasharray="3 4" />
            <path d="M6 6L18 18" stroke={colors.borderMuted} strokeWidth={1.6} strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: fontSize.headerTitle, fontWeight: 600, color: colors.textPrimary, textAlign: "center" }}>
            No cash-out rails available right now
          </div>
          <div style={{ fontSize: fontSize.body, color: colors.textSecondary, textAlign: "center", lineHeight: 1.5, maxWidth: 280 }}>
            We couldn&apos;t find a local rail for this corridor at the moment. This is usually temporary.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <PrimaryButton variant="outline">Notify me when available</PrimaryButton>
          <SecondaryLink href="/home">Back to home</SecondaryLink>
        </div>
      </Screen>
    );
  }

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/amount" title="Cash out" />

      <div
        style={{
          background: colors.surfaceMuted,
          borderRadius: radii.card,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: fontSize.body, color: colors.textSecondary }}>You&apos;re sending</div>
        <div style={{ fontSize: fontSize.headerTitle, fontWeight: 600, color: colors.textPrimary }}>{Number(amount).toFixed(2)} USDC</div>
      </div>

      <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 600, color: colors.textPrimary }}>Choose how to receive it</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {availableRails.map((rail) => (
          <SelectableCard
            key={rail.id}
            title={rail.title}
            subtitle={rail.subtitle}
            selected={selectedRail === rail.id}
            onSelect={() => setSelectedRail(rail.id)}
            icon={<RailIcon rail={rail.id} />}
          />
        ))}
      </div>

      <PrimaryButton href="/review" pinToBottom disabled={!selectedRail}>
        Continue
      </PrimaryButton>
    </Screen>
  );
}
