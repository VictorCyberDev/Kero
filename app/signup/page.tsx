"use client";

import { useState } from "react";
import { Screen, BackHeader, TextField, PrimaryButton, SecondaryLink } from "@/components/ui";
import { colors, fontSize, letterSpacing } from "@/lib/theme";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/welcome" />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: fontSize.pageHeading, fontWeight: 600, color: colors.textPrimary, letterSpacing: letterSpacing.pageHeading }}>
          Create your account
        </div>
        <div style={{ fontSize: fontSize.bodyEmphasis, color: colors.textSecondary }}>Takes about a minute.</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <TextField id="signupEmail" label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} autoComplete="email" />
        <TextField
          id="signupPassword"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
      </div>

      {/* TODO(pollar): submit should create the account/wallet via usePollar()
          once the login/signup method is decided — see the Pollar SDK findings. */}
      <PrimaryButton href="/onboarding/wallet" pinToBottom>
        Create account
      </PrimaryButton>

      <div style={{ fontSize: fontSize.micro, color: colors.textSecondary, textAlign: "center", lineHeight: 1.5 }}>
        By continuing, you agree to Kero&apos;s Terms of Service and Privacy Policy.
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, paddingBottom: 12 }}>
        <span style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Already have an account?</span>
        <SecondaryLink href="/login" variant="accent">
          Log in
        </SecondaryLink>
      </div>
    </Screen>
  );
}
