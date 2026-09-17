import { Screen, PrimaryButton } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { colors, fontSize, letterSpacing } from "@/lib/theme";

export default function WelcomePage() {
  return (
    <Screen padding="splash" gap={28} center>
      <Logo size="hero" />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div
          style={{
            fontSize: fontSize.pageHeading,
            fontWeight: 600,
            letterSpacing: letterSpacing.pageHeading,
            color: colors.textPrimary,
          }}
        >
          Welcome to Kero
        </div>
        <div style={{ fontSize: fontSize.bodyEmphasis, color: colors.textSecondary, textAlign: "center" }}>
          Log in or create an account to continue.
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        <PrimaryButton href="/signup">Create account</PrimaryButton>
        <PrimaryButton href="/login" variant="outline">
          Log in
        </PrimaryButton>
      </div>
    </Screen>
  );
}
