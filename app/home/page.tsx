"use client";

import Link from "next/link";
import { Screen, BottomTabBar, ActionButton, TransactionRow } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { useKeroStore } from "@/lib/store";
import { colors, fontSize, letterSpacing, radii } from "@/lib/theme";

function formatUsdc(amount: number) {
  return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function HomePage() {
  const balance = useKeroStore((state) => state.balance);
  const transactions = useKeroStore((state) => state.transactions);
  const isEmpty = balance <= 0;
  const recent = transactions.slice(0, 3);

  return (
    <Screen padding="none">
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px 12px 20px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size="small" />
            <span style={{ fontSize: fontSize.brandMark, fontWeight: 600, letterSpacing: -0.3, color: colors.textPrimary }}>kero</span>
          </div>
          <Link
            href="/settings"
            style={{
              width: 36,
              height: 36,
              borderRadius: radii.pill,
              background: colors.surfaceMuted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.2" stroke={colors.textSecondary} strokeWidth={1.8} />
              <path d="M5 20c0-3.8 3.2-6 7-6s7 2.2 7 6" stroke={colors.textSecondary} strokeWidth={1.8} strokeLinecap="round" />
            </svg>
          </Link>
        </div>

        <div style={{ position: "relative", background: colors.surfaceMuted, borderRadius: radii.balanceCard, padding: 24, overflow: "hidden" }}>
          {!isEmpty && (
            <svg width={120} height={120} viewBox="0 0 120 120" style={{ position: "absolute", top: -30, right: -30, opacity: 0.25 }}>
              <circle cx="60" cy="60" r="44" stroke={colors.textPrimary} strokeWidth={1.2} fill="none" />
              <circle cx="60" cy="60" r="5" fill={colors.textPrimary} />
              <circle cx="91" cy="29" r="7" fill={colors.textPrimary}>
                <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="14s" repeatCount="indefinite" />
              </circle>
            </svg>
          )}
          <div style={{ fontSize: fontSize.label, color: colors.textSecondary, marginBottom: 6 }}>Available balance</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div
              style={{
                fontSize: fontSize.balanceAmount,
                fontWeight: 600,
                letterSpacing: letterSpacing.bigNumeral,
                color: colors.textPrimary,
              }}
            >
              {formatUsdc(balance)}
            </div>
            <div style={{ fontSize: fontSize.amountUnit, fontWeight: 500, color: colors.textSecondary }}>USDC</div>
          </div>
          <div style={{ fontSize: fontSize.label, color: colors.textSecondary, marginTop: 8 }}>Testnet · Pollar wallet</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <ActionButton
            href={isEmpty ? undefined : "/amount"}
            variant={isEmpty ? "disabled" : "filled"}
            icon={
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke={isEmpty ? colors.borderMuted : colors.background}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Cash out
          </ActionButton>
          <ActionButton
            href="/fund"
            variant={isEmpty ? "filled" : "outline"}
            icon={
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 7L7 17M7 17H15M7 17V9"
                  stroke={isEmpty ? colors.background : colors.textPrimary}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Fund
          </ActionButton>
        </div>

        {isEmpty ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "40px 20px" }}>
            <Logo size="hero" displaySize={56} color={colors.borderMuted} animate={false} />
            <div style={{ fontSize: fontSize.cta, fontWeight: 600, color: colors.textPrimary }}>No funds yet</div>
            <div style={{ fontSize: fontSize.body, color: colors.textSecondary, textAlign: "center" }}>
              Your transactions will appear here once you fund your wallet.
            </div>
            <Link
              href="/fund"
              style={{
                marginTop: 6,
                padding: "10px 22px",
                border: "1.5px solid " + colors.textPrimary,
                borderRadius: radii.pill,
                fontSize: fontSize.body,
                fontWeight: 600,
                color: colors.textPrimary,
              }}
            >
              Fund wallet
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: fontSize.headerTitle, fontWeight: 600, color: colors.textPrimary }}>Recent activity</div>
              <Link href="/activity" style={{ fontSize: fontSize.label, fontWeight: 600, color: colors.textSecondary }}>
                See all
              </Link>
            </div>
            {recent.map((transaction, index) => {
              const row = (
                <TransactionRow
                  title={transaction.title}
                  status={transaction.status}
                  date={transaction.date}
                  amount={transaction.amount}
                  direction={transaction.direction}
                  showDivider={index < recent.length - 1}
                />
              );
              return transaction.status === "Processing" ? (
                <Link key={transaction.id} href="/status">
                  {row}
                </Link>
              ) : (
                <div key={transaction.id}>{row}</div>
              );
            })}
          </div>
        )}
      </div>

      <BottomTabBar active="home" />
    </Screen>
  );
}
