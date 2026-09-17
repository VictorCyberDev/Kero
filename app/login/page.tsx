"use client";

import { useState } from "react";
import { Screen, BackHeader, TextField, PrimaryButton, SecondaryLink } from "@/components/ui";
import { colors, fontSize, letterSpacing } from "@/lib/theme";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/welcome" />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: fontSize.pageHeading, fontWeight: 600, color: colors.textPrimary, letterSpacing: letterSpacing.pageHeading }}>
          Log in
        </div>
        <div style={{ fontSize: fontSize.bodyEmphasis, color: colors.textSecondary }}>Welcome back.</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <TextField id="loginEmail" label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} autoComplete="email" />
        <TextField
          id="loginPassword"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />
        <SecondaryLink href="#">Forgot password?</SecondaryLink>
      </div>

      {/* TODO(pollar): submit should call usePollar().login(...) once the
          login method (email-code vs. this email+password form) is decided —
          see the Pollar SDK findings. For now this just continues the flow. */}
      <PrimaryButton href="/home" pinToBottom>
        Log in
      </PrimaryButton>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, paddingBottom: 12 }}>
        <span style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Don&apos;t have an account?</span>
        <SecondaryLink href="/signup" variant="accent">
          Sign up
        </SecondaryLink>
      </div>
    </Screen>
  );
}
