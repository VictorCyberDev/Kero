"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen, BackHeader, PrimaryButton } from "@/components/ui";
import { useKeroStore } from "@/lib/store";
import { borderWidth, colors, fontSize, radii } from "@/lib/theme";
import styles from "./page.module.css";

const WALLET_ADDRESS = "GA3D…K91F";

const QR_CELLS = [
  { column: "1 / span 2", row: "1 / span 2", radius: 3 },
  { column: "6 / span 2", row: "1 / span 2", radius: 3 },
  { column: "1 / span 2", row: "6 / span 2", radius: 3 },
  { column: "4", row: "2", radius: 2 },
  { column: "4", row: "4", radius: 2 },
  { column: "6", row: "4", radius: 2 },
  { column: "2", row: "4", radius: 2 },
  { column: "5", row: "5", radius: 2 },
  { column: "4", row: "6", radius: 2 },
  { column: "6", row: "6", radius: 2 },
];

export default function FundPage() {
  const router = useRouter();
  const fundWallet = useKeroStore((state) => state.fundWallet);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to fall back to.
    }
  };

  const handleDone = () => {
    // No live payments backend — this is the one real "deposit" simulation
    // in the app, matching Home's "Received ... Simulated for demo" copy.
    fundWallet();
    router.push("/home");
  };

  return (
    <Screen padding="compact" gap={24}>
      <BackHeader href="/home" title="Fund" />

      <div style={{ fontSize: fontSize.bodyEmphasis, color: colors.textSecondary, textAlign: "center", lineHeight: 1.5 }}>
        Send USDC to this address to fund your Kero wallet
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 200,
            height: 200,
            border: `${borderWidth.static}px solid ${colors.border}`,
            borderRadius: radii.qrFrame,
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "repeat(7, 1fr)",
            gap: 4,
            padding: 20,
          }}
        >
          {QR_CELLS.map((cell, index) => (
            <div
              key={index}
              style={{ gridColumn: cell.column, gridRow: cell.row, background: colors.textPrimary, borderRadius: cell.radius }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: colors.surfaceMuted,
          // Same 14px radius as the Amount keypad keys — the consistency audit
          // already grouped these under one value, so reusing that token here.
          borderRadius: radii.keypadKey,
          padding: "14px 16px",
        }}
      >
        <div style={{ fontSize: fontSize.body, fontFamily: "ui-monospace, monospace", color: colors.textPrimary }}>{WALLET_ADDRESS}</div>
        <button
          type="button"
          onClick={handleCopy}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: fontSize.label, fontWeight: 600, color: colors.textPrimary }}
        >
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
            <rect x="8" y="8" width="12" height="12" rx="2" stroke={colors.textPrimary} strokeWidth={1.7} />
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke={colors.textPrimary} strokeWidth={1.7} />
          </svg>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ border: `${borderWidth.static}px solid ${colors.border}`, borderRadius: radii.pill, padding: "6px 14px", fontSize: fontSize.micro, fontWeight: 600, color: colors.textSecondary }}>
          Stellar · Testnet
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "8px 0" }}>
        <div className={styles.pulseDot} style={{ width: 8, height: 8, borderRadius: radii.pill, background: colors.textPrimary }} />
        <div style={{ fontSize: fontSize.body, color: colors.textSecondary }}>Waiting for incoming payment…</div>
      </div>

      <div style={{ fontSize: fontSize.micro, color: colors.textSecondary, textAlign: "center", lineHeight: 1.5 }}>
        Funds typically arrive within a few seconds on testnet, via Pollar&apos;s sponsored transactions.
      </div>

      <PrimaryButton onClick={handleDone} pinToBottom>
        Done
      </PrimaryButton>
    </Screen>
  );
}
