import * as React from "react";
import Link from "next/link";
import { colors, fontSize } from "../../lib/theme";

export type TabId = "home" | "activity" | "settings";

const TABS: { id: TabId; href: string; label: string }[] = [
  { id: "home", href: "/home", label: "Home" },
  { id: "activity", href: "/activity", label: "Activity" },
  { id: "settings", href: "/settings", label: "Settings" },
];

function TabIcon({ id, color }: { id: TabId; color: string }) {
  if (id === "home") {
    return (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <path d="M4 11L12 4L20 11" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10V19H18V10" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "activity") {
    return (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <path d="M4 12H8L10 6L14 18L16 12H20" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.2" stroke={color} strokeWidth={1.8} />
      <path d="M5 20c0-3.8 3.2-6 7-6s7 2.2 7 6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

/** The persistent bottom nav on Home/Activity/Settings (and EmptyBalance, Home's zero-balance state). */
export function BottomTabBar({ active }: { active: TabId }) {
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${colors.border}`, padding: "10px 0 22px 0", background: colors.background }}>
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const color = isActive ? colors.textPrimary : colors.textSecondary;
        const itemStyle: React.CSSProperties = { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 };
        const content = (
          <>
            <TabIcon id={tab.id} color={color} />
            <span style={{ fontSize: fontSize.tabLabel, color, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
          </>
        );

        if (isActive) {
          return (
            <div key={tab.id} style={itemStyle}>
              {content}
            </div>
          );
        }

        return (
          <Link key={tab.id} href={tab.href} style={itemStyle}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
