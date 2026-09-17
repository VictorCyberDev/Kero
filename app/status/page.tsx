"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Screen, BackHeader, CloseHeader, SummaryCard, PrimaryButton, SecondaryLink } from "@/components/ui";
import { useKeroStore, RAILS } from "@/lib/store";
import { colors, fontSize, radii } from "@/lib/theme";

export default function StatusPage() {
  const router = useRouter();
  const submission = useKeroStore((state) => state.lastSubmission);

  useEffect(() => {
    if (!submission) {
      router.replace("/home");
    }
  }, [submission, router]);

  if (!submission) {
    return null;
  }

  const railTitle = RAILS[submission.rail].title;

  if (submission.outcome === "failed") {
    return (
      <Screen padding="compact" gap={24}>
        <CloseHeader href="/home" />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: radii.pill,
              border: `1.5px solid ${colors.textPrimary}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
              <path d="M7 7L17 17M17 7L7 17" stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontSize: fontSize.brandMark, fontWeight: 600, color: colors.textPrimary }}>Transfer failed</div>
          <div style={{ fontSize: fontSize.body, color: colors.textSecondary, textAlign: "center", lineHeight: 1.5, maxWidth: 280 }}>
            {railTitle} couldn&apos;t process this transfer. No funds were deducted from your balance.
          </div>

          <div style={{ width: "100%", marginTop: 8 }}>
            <SummaryCard
              rows={[
                { label: "Amount", value: `${Number(submission.amount).toFixed(2)} USDC` },
                { label: "Rail", value: railTitle },
                { label: "Reference", value: submission.reference, mono: true },
              ]}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <PrimaryButton href="/cash-out">Try again</PrimaryButton>
          <SecondaryLink>Contact support</SecondaryLink>
        </div>
      </Screen>
    );
  }

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/home" title="Status" />

      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 4px 0" }}>
        <svg width={350} height={110} viewBox="0 0 350 110" fill="none">
          <path d="M20 90 Q107 50 195 50" stroke={colors.textPrimary} strokeWidth={3} strokeLinecap="round" fill="none" />
          <path d="M195 50 Q272 55 330 90" stroke={colors.border} strokeWidth={3} strokeLinecap="round" fill="none" />
          <circle cx="20" cy="90" r="7" fill={colors.textPrimary} />
          <circle cx="195" cy="50" r="9" fill={colors.textPrimary} stroke={colors.background} strokeWidth={2.5} />
          <circle cx="330" cy="90" r="7" fill={colors.background} stroke={colors.borderMuted} strokeWidth={2} />
        </svg>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${colors.border}` }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: radii.pill,
              background: colors.surfaceMuted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5L9.5 17L19 7" stroke={colors.textPrimary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 500, color: colors.textPrimary }}>Sent from Kero wallet</div>
            <div style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Today</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${colors.border}` }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: radii.pill,
              background: colors.surfaceMuted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke={colors.textPrimary} strokeWidth={1.8} />
              <path d="M12 8V12L14.5 14" stroke={colors.textPrimary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 500, color: colors.textPrimary }}>Processing · {railTitle}</div>
            <div style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Today</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: radii.pill,
              background: colors.background,
              border: `1.5px solid ${colors.borderMuted}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke={colors.borderMuted} strokeWidth={1.8} />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: fontSize.bodyEmphasis, fontWeight: 500, color: colors.textSecondary }}>Delivered to recipient</div>
            <div style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Pending</div>
          </div>
        </div>
      </div>

      <div style={{ border: `1px solid ${colors.border}`, borderRadius: radii.card, padding: 16, fontSize: fontSize.label, color: colors.textSecondary, lineHeight: 1.55 }}>
        This transaction settles entirely within Nigeria via {railTitle}. Payments funded through Pollar&apos;s Bolivia BOB ramp run on Pollar&apos;s mainnet
        infrastructure — shown as simulated in this build for the hackathon demo.
      </div>

      <PrimaryButton href="/home" pinToBottom>
        Done
      </PrimaryButton>
    </Screen>
  );
}
