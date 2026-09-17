"use client";

import { useRouter } from "next/navigation";
import { Screen, BackHeader, SummaryCard, PrimaryButton } from "@/components/ui";
import { useKeroStore, RAILS, RAIL_DESTINATIONS, KERO_FEE_RATE, computeFee } from "@/lib/store";
import { colors, fontSize, radii } from "@/lib/theme";

export default function ReviewPage() {
  const router = useRouter();
  const amount = useKeroStore((state) => state.cashOutAmount);
  const selectedRail = useKeroStore((state) => state.selectedRail);
  const recipient = useKeroStore((state) => state.recipient);
  const submitCashOut = useKeroStore((state) => state.submitCashOut);

  const rail = selectedRail ?? "bank";
  const railInfo = RAILS[rail];
  const destination = RAIL_DESTINATIONS[rail];
  const amountNumber = Number(amount) || 0;
  const { fee, recipientGets } = computeFee(amountNumber);
  const feePct = (KERO_FEE_RATE * 100).toFixed(1);

  const handleConfirm = () => {
    submitCashOut();
    router.push("/status");
  };

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/cash-out" title="Review" />

      <SummaryCard
        rows={[
          { label: destination.label, value: destination.value },
          { label: "Recipient", value: recipient.name },
        ]}
      />

      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: radii.card,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 600, color: colors.textPrimary }}>Why Kero</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={colors.textPrimary} strokeWidth={1.6} />
            <path d="M8 12.5L10.5 15L16 9" stroke={colors.textPrimary} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: fontSize.body, color: colors.textPrimary }}>
            Kero — {feePct}% fee, arrives {railInfo.eta}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={colors.borderMuted} strokeWidth={1.6} />
          </svg>
          <div style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Traditional wire — ~8.78% fee*, 3–5 business days</div>
        </div>
        <div style={{ fontSize: fontSize.micro, color: colors.textSecondary, fontStyle: "italic", lineHeight: 1.5 }}>
          *Sub-Saharan Africa average cost of sending $200, World Bank Remittance Prices Worldwide, Q1 2025
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Amount</span>
          <span style={{ fontSize: fontSize.bodyEmphasis, color: colors.textPrimary }}>{amountNumber.toFixed(2)} USDC</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Fee ({feePct}%)</span>
          <span style={{ fontSize: fontSize.bodyEmphasis, color: colors.textPrimary }}>-{fee.toFixed(2)} USDC</span>
        </div>
        <div style={{ height: 1, background: colors.border, margin: "4px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 600, color: colors.textPrimary }}>Recipient gets</span>
          <span style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 600, color: colors.textPrimary }}>{recipientGets.toFixed(2)} USDC equiv.</span>
        </div>
        <div style={{ fontSize: fontSize.micro, color: colors.textSecondary }}>Converted at the local bank rate at payout</div>
      </div>

      <PrimaryButton onClick={handleConfirm} pinToBottom disabled={amountNumber <= 0}>
        Confirm
      </PrimaryButton>
    </Screen>
  );
}
