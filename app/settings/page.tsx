import { Screen, BottomTabBar } from "@/components/ui";
import { colors, fontSize, letterSpacing, radii } from "@/lib/theme";

function ChevronRow({ label, showDivider = true }: { label: string; showDivider?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 0",
        borderBottom: showDivider ? `1px solid ${colors.border}` : undefined,
      }}
    >
      <span style={{ fontSize: fontSize.bodyEmphasis, color: colors.textPrimary }}>{label}</span>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke={colors.borderMuted} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Screen padding="none">
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px 12px 20px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: fontSize.pageHeading, fontWeight: 600, color: colors.textPrimary, letterSpacing: letterSpacing.pageHeading }}>
          Settings
        </div>

        {/* Placeholder profile until real Pollar auth is wired — see the SDK findings. */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: colors.surfaceMuted, borderRadius: radii.card, padding: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: radii.pill,
              background: colors.textPrimary,
              color: colors.background,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: fontSize.cta,
              fontWeight: 600,
            }}
          >
            NV
          </div>
          <div>
            <div style={{ fontSize: fontSize.cta, fontWeight: 600, color: colors.textPrimary }}>Nnajiofor Victor</div>
            <div style={{ fontSize: fontSize.label, color: colors.textSecondary }}>Testnet · Pollar wallet</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: fontSize.bodyEmphasis, color: colors.textPrimary }}>Wallet address</span>
            <span style={{ fontSize: fontSize.body, fontFamily: "ui-monospace, monospace", color: colors.textSecondary }}>GA3D…K91F</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: fontSize.bodyEmphasis, color: colors.textPrimary }}>Network</span>
            <div style={{ border: `1px solid ${colors.border}`, borderRadius: radii.pill, padding: "4px 10px", fontSize: fontSize.micro, fontWeight: 600, color: colors.textSecondary }}>
              Testnet
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: fontSize.bodyEmphasis, color: colors.textPrimary }}>Identity verification</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke={colors.textPrimary} strokeWidth={1.6} />
                <path d="M8 12.5L10.5 15L16 9" stroke={colors.textPrimary} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: fontSize.body, color: colors.textPrimary, fontWeight: 500 }}>Verified</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <ChevronRow label="Notifications" />
          <ChevronRow label="Security" />
          <ChevronRow label="Help & support" />
          <ChevronRow label="About Kero" showDivider={false} />
        </div>

        <button
          type="button"
          style={{ background: "none", border: "none", fontSize: fontSize.bodyEmphasis, fontWeight: 500, color: colors.textPrimary, padding: "12px 0", textAlign: "center" }}
        >
          Log out
        </button>
      </div>

      <BottomTabBar active="settings" />
    </Screen>
  );
}
