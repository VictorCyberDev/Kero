"use client";

import { useState } from "react";
import { Screen, BackHeader, SelectableCard, PrimaryButton } from "@/components/ui";
import { colors, fontSize, letterSpacing } from "@/lib/theme";

type WalletOption = "new" | "import";

export default function OnboardingWalletPage() {
  const [selected, setSelected] = useState<WalletOption>("new");

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/signup" title="Step 1 of 2" />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: fontSize.pageHeading, fontWeight: 600, color: colors.textPrimary, letterSpacing: letterSpacing.pageHeading }}>
          Create your wallet
        </div>
        <div style={{ fontSize: fontSize.bodyEmphasis, color: colors.textSecondary, lineHeight: 1.5 }}>
          Your wallet is created and secured through Pollar. You hold the keys — Kero never has access to your funds.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SelectableCard
          title="Create new wallet"
          subtitle="Recommended for first-time users"
          selected={selected === "new"}
          onSelect={() => setSelected("new")}
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke={colors.textPrimary} strokeWidth={1.8} strokeLinecap="round" />
            </svg>
          }
        />
        <SelectableCard
          title="Import existing wallet"
          subtitle="Restore with a recovery phrase"
          selected={selected === "import"}
          onSelect={() => setSelected("import")}
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <path d="M12 4V15M7 10L12 15L17 10" stroke={colors.textPrimary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 18H19" stroke={colors.textPrimary} strokeWidth={1.8} strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      {/* TODO(pollar): should call usePollar().login(...) / the smart-wallet
          passkey flow for "Create new wallet" once confirmed — see the SDK
          findings. "Import existing wallet" has no obvious equivalent in the
          SDK's login options and needs its own decision. */}
      <PrimaryButton href="/onboarding/identity" pinToBottom>
        Continue
      </PrimaryButton>
    </Screen>
  );
}
