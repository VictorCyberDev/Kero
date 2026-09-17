import { Screen, PrimaryButton } from "@/components/ui";
import { colors, fontSize, letterSpacing } from "@/lib/theme";
import styles from "./page.module.css";

// Ring circumference for r=8.5 (2 * PI * r ≈ 53.4) — matches the CSS
// stroke-dasharray in page.module.css, which draws the ring over 1.1s.
const RING_RADIUS = 8.5;

export default function IndexPage() {
  return (
    <Screen padding="splash" gap={24} center>
      <svg width={120} height={120} viewBox="0 0 24 24" fill="none">
        <circle className={styles.ring} cx="12" cy="12" r={RING_RADIUS} stroke={colors.textPrimary} strokeWidth={1.4} />
        <circle className={styles.anchor} cx="12" cy="12" r={1.6} fill={colors.textPrimary} />
        <circle cx="18.5" cy="6.5" r={2.4} fill={colors.textPrimary} opacity={0}>
          <animate attributeName="opacity" from="0" to="1" dur="0.01s" begin="1.3s" fill="freeze" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="7s"
            begin="1.3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      <div
        className={styles.word}
        style={{ fontSize: fontSize.wordmark, fontWeight: 600, letterSpacing: letterSpacing.wordmark, color: colors.textPrimary }}
      >
        kero
      </div>

      <div
        className={styles.tagline}
        style={{ fontSize: fontSize.cta, color: colors.textSecondary, textAlign: "center" }}
      >
        Send and receive across borders.
      </div>

      <div style={{ flex: 1 }} />

      <PrimaryButton href="/welcome" className={styles.continue}>
        Continue
      </PrimaryButton>
    </Screen>
  );
}
