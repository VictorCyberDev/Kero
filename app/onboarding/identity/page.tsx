"use client";

import { useState } from "react";
import { Screen, BackHeader, TextField, SegmentedControl, PrimaryButton } from "@/components/ui";
import { borderWidth, colors, fontSize, letterSpacing, radii } from "@/lib/theme";

const ID_TYPES = [
  { value: "national-id", label: "National ID" },
  { value: "passport", label: "Passport" },
  { value: "drivers-license", label: "Driver's license" },
];

export default function OnboardingIdentityPage() {
  const [fullName, setFullName] = useState("");
  const [idType, setIdType] = useState("national-id");

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/onboarding/wallet" title="Step 2 of 2" />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: fontSize.pageHeading, fontWeight: 600, color: colors.textPrimary, letterSpacing: letterSpacing.pageHeading }}>
          Verify your identity
        </div>
        <div style={{ fontSize: fontSize.bodyEmphasis, color: colors.textSecondary, lineHeight: 1.5 }}>
          Required once, to enable cash-out to local bank accounts and mobile money.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <TextField id="fullname" label="Full name" placeholder="e.g. Ada Obi" value={fullName} onChange={setFullName} autoComplete="name" />

        <div>
          <label style={{ display: "block", fontSize: fontSize.label, color: colors.textSecondary, marginBottom: 6 }}>Country</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: `${borderWidth.static}px solid ${colors.border}`,
              borderRadius: radii.input,
              padding: 14,
              fontSize: fontSize.bodyEmphasis,
              color: colors.textPrimary,
            }}
          >
            <span>Nigeria</span>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke={colors.textSecondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: fontSize.label, color: colors.textSecondary, marginBottom: 6 }}>ID type</label>
          <SegmentedControl options={ID_TYPES} value={idType} onChange={setIdType} />
        </div>
      </div>

      {/* TODO(pollar): KYC should go through usePollar().openKycModal(...) once
          confirmed — see the SDK findings. */}
      <PrimaryButton href="/home" pinToBottom>
        Finish setup
      </PrimaryButton>
    </Screen>
  );
}
